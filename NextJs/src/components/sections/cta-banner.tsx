import { Button } from "@/components/ui/button";

export function CtaBanner({
  title,
  description,
  primaryCta,
  secondaryCta
}: {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="surface-card overflow-hidden p-8 sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_auto] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Start a conversation</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button href={primaryCta.href} variant="accent">{primaryCta.label}</Button>
          {secondaryCta ? <Button href={secondaryCta.href} variant="outline">{secondaryCta.label}</Button> : null}
        </div>
      </div>
    </section>
  );
}
