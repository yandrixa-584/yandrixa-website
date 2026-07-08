import Link from "next/link";
import type { Route } from "next";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-muted">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href ? <Link href={item.href as Route} className="transition hover:text-white">{item.label}</Link> : <span className="text-white">{item.label}</span>}
            {index < items.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
