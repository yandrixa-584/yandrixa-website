import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  variant?: "primary" | "accent" | "outline" | "ghost";
  className?: string;
  arrow?: boolean;
};

type LinkButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
    href: string;
  };

type NativeButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const styles = {
  primary:
    "bg-brand-purple text-white shadow-[0_18px_40px_rgba(123,63,228,0.32)] hover:-translate-y-0.5 hover:bg-[#8B55ED]",
  accent:
    "bg-brand-green text-brand-dark shadow-[0_18px_40px_rgba(163,255,18,0.22)] hover:-translate-y-0.5 hover:bg-[#b7ff4d]",
  outline:
    "border border-white/12 bg-white/5 text-white hover:-translate-y-0.5 hover:bg-white/10",
  ghost: "text-brand-green hover:text-white"
};

const baseClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 disabled:pointer-events-none disabled:opacity-60";

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, arrow = false } = props;

  if ("href" in props && props.href) {
    const {
      href,
      children: _children,
      variant: _variant,
      className: _className,
      arrow: _arrow,
      ...linkProps
    } = props as LinkButtonProps;

    return (
      <Link href={href as Route} className={cn(baseClassName, styles[variant], className)} {...linkProps}>
        {children}
        {arrow ? <ArrowRight className="h-4 w-4 transition-transform duration-300" /> : null}
      </Link>
    );
  }

  const {
    children: _children,
    variant: _variant,
    className: _className,
    arrow: _arrow,
    ...buttonProps
  } = props as NativeButtonProps;

  return (
    <button className={cn(baseClassName, styles[variant], className)} {...buttonProps}>
      {children}
      {arrow ? <ArrowRight className="h-4 w-4 transition-transform duration-300" /> : null}
    </button>
  );
}
