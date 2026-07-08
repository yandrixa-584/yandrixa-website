import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-green">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-7 text-brand-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}
