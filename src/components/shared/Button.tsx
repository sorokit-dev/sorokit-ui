import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-sorokit-accent text-sorokit-accent-fg hover:opacity-90",
  secondary:
    "bg-sorokit-surface text-sorokit-text border border-sorokit-border hover:bg-sorokit-border/40",
  ghost: "bg-transparent text-sorokit-text hover:bg-sorokit-surface",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-sorokit px-4 py-2",
        "text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sorokit-accent focus-visible:ring-offset-2",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
