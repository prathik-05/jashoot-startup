import crypto from "crypto";

export function getStudioAccessKey(): string {
  return (process.env.STUDIO_ACCESS_KEY || "").trim();
}

const SESSION_SALT = "jashoots_studio_sec_salt_v2_hyd";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours maximum session lifetime

/**
 * Derives a cryptographically signed, timestamped session token.
 * Token structure: <expiresAtTimestamp>.<hmacSignature>
 */
export function generateStudioSessionToken(key: string): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${expiresAt}`;
  const sig = crypto
    .createHmac("sha256", SESSION_SALT)
    .update(`${key}:${payload}`)
    .digest("hex");

  return `${payload}.${sig}`;
}

/**
 * Validates whether the incoming cookie token matches the expected signature
 * for the current access key AND hasn't expired.
 * Uses timingSafeEqual to protect against side-channel timing attacks.
 */
export function isValidStudioSession(token: string | undefined): boolean {
  const key = getStudioAccessKey();
  if (!key || !token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, sig] = parts;
  const expiresAt = parseInt(payload, 10);

  // Expired or invalid timestamp
  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  const expectedSig = crypto
    .createHmac("sha256", SESSION_SALT)
    .update(`${key}:${payload}`)
    .digest("hex");

  try {
    const sigBuffer = Buffer.from(sig, "utf-8");
    const expectedBuffer = Buffer.from(expectedSig, "utf-8");
    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}
