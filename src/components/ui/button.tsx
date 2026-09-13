import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "pill" | "solid" | "outline" | "ghost" | "brush";
type Size = "sm" | "md" | "lg";

export function buttonCx(variant: Variant = "primary", size: Size = "md", className = "") {
  const base =
    "inline-flex items-center justify-center gap-2 font-body font-medium transition-colors duration-200 " +
    "focus-visible:outline-2 focus-visible:outline-apple-blue focus-visible:outline-offset-2 " +
    "disabled:opacity-30 disabled:pointer-events-none";

  const variantStyles: Record<Variant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    pill: "btn-pill",
    // Legacy aliases
    solid: "btn-primary",
    outline: "btn-secondary",
    ghost: "text-on-dark/40 hover:text-on-dark/70",
    brush: "btn-primary",
  };

  const sizeStyles: Record<Size, string> = {
    sm: "text-body-xs px-4 h-8",
    md: "text-nav px-5 h-10",
    lg: "text-nav px-6 h-12",
  };

  return `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

interface ButtonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={buttonCx(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}

export function ButtonButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonButtonProps) {
  return (
    <button className={buttonCx(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}