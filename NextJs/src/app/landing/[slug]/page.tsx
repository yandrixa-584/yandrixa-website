import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { getPublishedLandingPageBySlug, listPublishedLandingPages } from "@/lib/admin-data";
import { buildMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const landingPages = await listPublishedLandingPages();
  return landingPages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedLandingPageBySlug(slug);

  if (!page) {
    return buildMetadata({ title: "Landing Page", path: "/landing" });
  }

  return buildMetadata({
    title: page.title,
    description: page.summary,
    path: `/landing/${page.slug}`
  });
}

export default async function DynamicLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPublishedLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          description: page.summary
        }}
      />

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Badge className="border-brand-green/15 bg-brand-green/10 text-brand-green">{page.eyebrow}</Badge>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.12] text-white sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">{page.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={page.primaryCtaHref} className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-brand-green px-5 py-3 text-sm font-semibold text-brand-dark transition hover:brightness-110">
                {page.primaryCtaLabel}
              </a>
              <a href={page.secondaryCtaHref} className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                {page.secondaryCtaLabel}
              </a>
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-green">Highlights</p>
            <div className="mt-5 space-y-4">
              {page.heroPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-green" />
                  <p className="text-sm leading-6 text-white">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <div className="surface-card p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-brand-green">{page.bodyTitle}</p>
            <p className="mt-5 max-w-4xl whitespace-pre-line text-base leading-8 text-brand-muted">{page.bodyContent}</p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <CtaBanner
            title={page.title}
            description={page.summary}
            primaryCta={{ label: page.primaryCtaLabel, href: page.primaryCtaHref }}
            secondaryCta={{ label: page.secondaryCtaLabel, href: page.secondaryCtaHref }}
          />
        </div>
      </section>
    </>
  );
}
