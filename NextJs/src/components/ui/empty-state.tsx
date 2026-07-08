import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  cta
}: {
  title: string;
  description: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="surface-card p-8 text-center">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-base leading-7">{description}</p>
      {cta ? <Button href={cta.href} variant="accent" className="mt-6">{cta.label}</Button> : null}
    </div>
  );
}
