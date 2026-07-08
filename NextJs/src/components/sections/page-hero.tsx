import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
  badges
}: {
  eyebrow: string;
  title: string;
  description: string;
  badges?: string[];
}) {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="surface-card relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="absolute inset-0 bg-hero-radial opacity-80" />
          <div className="relative max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-green">{eyebrow}</p>
            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.15] text-white sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-brand-muted sm:text-lg">{description}</p>
            {badges?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {badges.map((badge) => (
                  <Badge key={badge}>{badge}</Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
