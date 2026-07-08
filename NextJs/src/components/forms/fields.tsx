"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function FieldShell({ id, label, error, hint, children }: FieldShellProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {hint ? <p className="text-sm text-brand-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const fieldStyles =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-brand-muted/75 transition hover:border-white/20";

export function InputField({
  id,
  label,
  error,
  hint,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  return (
    <FieldShell id={id || props.name || ""} label={label} error={error} hint={hint}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldStyles, className)}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <FieldShell id={id || props.name || ""} label={label} error={error} hint={hint}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldStyles, className)}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}

export function TextareaField({
  id,
  label,
  error,
  hint,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; hint?: string }) {
  return (
    <FieldShell id={id || props.name || ""} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldStyles, "min-h-[150px] resize-y", className)}
        {...props}
      />
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-brand-muted">
        <input
          type="checkbox"
          id={id}
          className={cn("mt-1 h-4 w-4 rounded border-white/15 bg-transparent text-brand-green", className)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
