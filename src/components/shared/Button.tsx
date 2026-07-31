import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95";
    
    const variants = {
      primary: "bg-[rgb(var(--sorokit-primary))] text-[rgb(var(--sorokit-primary-foreground))] hover:opacity-90",
      secondary: "bg-[rgb(var(--sorokit-muted))] text-slate-900 hover:bg-slate-200",
      outline: "border border-slate-200 bg-transparent hover:bg-slate-100",
      ghost: "hover:bg-slate-100"
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg"
    };

    return (
      <button
        ref={ref}
        className={twMerge(base, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";