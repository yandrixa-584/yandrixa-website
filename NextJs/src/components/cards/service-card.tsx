import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Service } from "@/types/content";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="surface-card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-green/25"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-purple/14 text-brand-green">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">{service.shortName}</h3>
      <p className="mt-3 flex-1 text-base leading-7">{service.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-green">
        Explore service
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
    </Link>
  );
}
