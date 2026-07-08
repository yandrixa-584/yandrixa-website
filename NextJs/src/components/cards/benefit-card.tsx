import type { LucideIcon } from "lucide-react";

export function BenefitCard({
  icon: Icon,
  title,
  description
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="surface-card h-full p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-base leading-7">{description}</p>
    </div>
  );
}
