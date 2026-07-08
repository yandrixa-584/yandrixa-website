import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ServiceCard } from "@/components/cards/service-card";
import { JsonLd } from "@/components/seo/json-ld";
import { services, getServiceBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

const process = [
  { title: "Discover", description: "Clarify scope, users, systems, and business requirements." },
  { title: "Plan", description: "Shape the delivery approach, priorities, and solution architecture." },
  { title: "Design", description: "Structure interfaces, workflows, and content direction." },
  { title: "Build", description: "Develop, integrate, optimize, and test the solution carefully." },
  { title: "Launch and support", description: "Deploy the project, stabilize it, and support the next iteration." }
];

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return buildMetadata({ title: "Service not found", path: "/services" });
  }

  return buildMetadata({
    title: service.name,
    description: service.description,
    path: `/services/${service.slug}`
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => service.relatedSlugs.includes(item.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.category,
          description: service.description
        }}
      />
      <PageHero
        eyebrow={service.category}
        title={service.name}
        description={service.heroDescription}
        badges={service.technologies.slice(0, 4)}
      />

      <section className="section-space pt-0">
        <div className="container-shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }]} />
          <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-white">Who this service is for</h2>
              <div className="mt-6 space-y-3">
                {service.audiences.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-brand-muted">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold text-white">Service overview</h2>
              <p className="mt-4 text-base leading-7">{service.intro}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-brand-muted">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-white">Common business problems</h2>
            <div className="mt-6 space-y-4">
              {service.problems.map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-base leading-7 text-brand-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-white">Relevant technologies</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.technologies.map((item) => (
                <span key={item} className="rounded-full border border-brand-green/18 bg-brand-green/10 px-4 py-2 text-sm text-brand-green">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <ProcessTimeline steps={process} />
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <h2 className="text-3xl font-semibold text-white">Service-specific FAQ</h2>
          <div className="mt-10">
            <FAQAccordion items={service.faqs} />
          </div>
        </div>
      </section>

      {relatedServices.length ? (
        <section className="section-space">
          <div className="container-shell">
            <h2 className="text-3xl font-semibold text-white">Related services</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedServices.map((item) => (
                <ServiceCard key={item.slug} service={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-space pt-0">
        <div className="container-shell">
          <CtaBanner
            title={`Need ${service.shortName.toLowerCase()} support for your business?`}
            description="Share your business requirement and Yandrixa can help define the right next step, scope, and delivery direction."
            primaryCta={{ label: "Start a Project", href: "/contact" }}
            secondaryCta={{ label: "View all services", href: "/services" }}
          />
        </div>
      </section>
    </>
  );
}
