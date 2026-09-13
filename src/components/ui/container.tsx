import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return (
    <Tag className={`container ${className}`}>
      {children}
    </Tag>
  );
}