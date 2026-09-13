// Static structural validation for the JASHOOTS Supabase migration suite.
// Cross-checks tables, FK targets, enums, RLS coverage, per-table columns,
// seed PK uniqueness, ordering. Run:  node scripts/validate-migrations.mjs
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "supabase", "migrations");
const errors = [];

const stripComments = (sql) => sql.replace(/(--[^\n]*\n)/g, "\n");

function extractTableDefs(sql) {
  const out = {};
  const re = /create table if not exists\s+public\.([a-z_]+)\s*\(/g;
  let m;
  while ((m = re.exec(sql))) {
    const name = m[1];
    let i = re.lastIndex;
    let depth = 1;
    let inStr = null;
    while (i < sql.length && depth > 0) {
      const ch = sql[i];
      if (inStr) {
        if (ch === "\\") { i += 2; continue; }
        if (ch === inStr) inStr = null;
      } else if (ch === "'" || ch === '"') {
        inStr = ch;
      } else if (ch === "(") {
        depth++;
      } else if (ch === ")") {
        depth--;
      }
      i++;
    }
    out[name] = sql.slice(re.lastIndex, i - 1);
  }
  return out;
}

async function main() {
  const dirNames = await readdir(dir);
  const files = dirNames.filter((f) => f.endsWith(".sql")).sort();
  const migrations = [];
  for (const f of files) {
    const m = /^(\d{14})_.*\.sql$/.exec(f);
    if (!m) errors.push(`${f}: filename must start with a 14-digit timestamp`);
    else migrations.push(await readFile(join(dir, f), "utf8"));
  }
  if (!migrations.length) {
    console.error("✗ no valid migration files");
    process.exit(1);
  }

  const allSql = stripComments(migrations.join("\n"));

  if (files.join("|") !== [...files].sort().join("|"))
    errors.push("migration files are not in alphabetical/chronological order");
  if (new Set(files).size !== files.length) errors.push("duplicate migration filenames");

  const defs = extractTableDefs(allSql);
  const tables = new Set(Object.keys(defs));
  const external = new Set(["auth.users", "storage.buckets", "storage.objects"]);

  const enums = {};
  for (const m of allSql.matchAll(/create type\s+public\.([a-z_]+)\s+as enum\s*\(([^)]*)\)/g))
    enums[m[1]] = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);

  // ---- FK targets exist --------------------------------------------------
  for (const m of allSql.matchAll(/references\s+([a-z_]+)\.([a-z_]+)\s*\(/gi)) {
    const schema = m[1].toLowerCase();
    const table = m[2];
    if (!external.has(`${schema}.${table}`) && schema !== "public")
      errors.push(`FK → unknown external schema ${schema}.${table}`);
    if (schema === "public" && !tables.has(table))
      errors.push(`FK → missing public.${table}`);
  }

  // ---- enum defaults resolve ---------------------------------------------
  for (const m of allSql.matchAll(/public\.([a-z_]+)\s+not null default '([^']+)'/g)) {
    if (enums[m[1]] && !enums[m[1]].includes(m[2]))
      errors.push(`enum ${m[1]} has no value '${m[2]}'`);
  }

  // ---- RLS coverage: direct + DO-block bulk enables -----------------------
  const rlsEnabled = new Set();
  for (const m of allSql.matchAll(/alter table\s+public\.([a-z_]+)\s+enable row level security/g))
    rlsEnabled.add(m[1]);
  for (const match of allSql.matchAll(/do \$\$[\s\S]*?\$\$/g)) {
    if (/\benable row level security\b/.test(match[0])) {
      for (const m of match[0].matchAll(/'([a-z_]+)'/g)) rlsEnabled.add(m[1]);
    }
  }
  for (const t of tables)
    if (!rlsEnabled.has(t)) errors.push(`public.${t}: RLS not enabled`);

  const policyTables = new Set();
  for (const m of allSql.matchAll(/create policy\s+"[^"]*"\s+on\s+public\.([a-z_]+)/g))
    policyTables.add(m[1]);
  for (const t of tables)
    if (!policyTables.has(t)) errors.push(`public.${t}: no RLS policies`);

  // ---- policy USING columns exist on target table -------------------------
  const needsPublished = [
    "service_categories","services","packages","portfolio_projects","testimonials",
    "faqs","about_content","coverage_cities","method_steps","why_features",
    "why_shoot_different","seo_meta","home_sections",
  ];
  for (const t of needsPublished)
    if (!/\bpublished\b/.test(defs[t] ?? "")) errors.push(`public.${t}: policy uses published but column missing`);
  for (const t of ["promo_block", "home_sections"])
    if (!/\benabled\b/.test(defs[t] ?? "")) errors.push(`public.${t}: policy uses enabled but column missing`);
  if (!/\bvalue\b/.test(defs["proof_stats"] ?? ""))
    errors.push("public.proof_stats: value column needed for real-data-only read policy");

  // ---- seed PK UUID uniqueness (first value of each insert tuple) ----------
  const pkUuids = [...allSql.matchAll(/\(\s*'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',/g)].map((m) => m[1]);
  const dup = [...new Set(pkUuids.filter((u, i) => pkUuids.indexOf(u) !== i))];
  if (dup.length) errors.push(`duplicate seed PK UUIDs: ${dup.join(", ")}`);

  // ---- storage policies reference existing buckets -------------------------
  for (const m of allSql.matchAll(/bucket_id\s*=\s*'([^']+)'/g)) {
    if (!allSql.includes(`('${m[1]}'`)) errors.push(`storage policy references undeclared bucket '${m[1]}'`);
  }

  if (errors.length) {
    console.error(`✗ ${errors.length} schema error(s):`);
    errors.forEach((e) => console.error(`  • ${e}`));
    process.exit(1);
  }
  console.log(
    `✓ migration suite valid: ${files.length} files, ${tables.size} tables, ` +
    `${Object.keys(enums).length} enums, ${policyTables.size} tables with policies, ${pkUuids.length} seed rows`,
  );
}

main().catch((e) => {
  console.error("validation crashed:", e.message);
  process.exit(1);
});