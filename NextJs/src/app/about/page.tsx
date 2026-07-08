import { CheckCircle2, Compass, Handshake, Shield, Wrench, Zap } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "About",
    description: "Learn how Yandrixa Smart Solutions approaches practical digital solutions, collaboration, and long-term business support.",
    path: "/about"
  });
}

const principles = [
  { icon: Compass, title: "Understand before building", description: "Each project starts with business context, goals, users, and constraints." },
  { icon: CheckCircle2, title: "Keep solutions practical", description: "The focus stays on what helps the business move forward, not unnecessary complexity." },
  { icon: Handshake, title: "Communicate clearly", description: "Scope, priorities, tradeoffs, and next steps are discussed in straightforward language." },
  { icon: Wrench, title: "Build for maintainability", description: "Projects are designed so updates, support, and future growth remain manageable." },
  { icon: Shield, title: "Protect client trust", description: "Clean delivery practices, sensible security, and transparency matter from the start." },
  { icon: Zap, title: "Support long-term growth", description: "The goal is a stronger digital foundation, not only a one-time launch." }
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Yandrixa Smart Solutions"
        }}
      />
      <PageHero
        eyebrow="About Yandrixa"
        title="Building practical digital solutions for growing businesses"
        description="Yandrixa helps businesses strengthen their digital presence, improve operations, and build scalable systems through practical technology choices."
        badges={["Business-focused", "Scalable", "Maintainable", "Long-term support"]}
      />

      <section className="section-space pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Mission</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Reliable digital foundations for businesses that want to grow with clarity</h2>
            <p className="mt-4 text-base leading-7">
              To help businesses build reliable digital foundations, improve their operations, reach more customers, and scale through practical technology.
            </p>
          </div>
          <div className="surface-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Approach</p>
            <p className="text-base leading-7">
              Yandrixa works with businesses that need websites, applications, APIs, automation, dashboards, and marketing support shaped around actual operational needs.
            </p>
            <p className="mt-4 text-base leading-7">
              The aim is to create solutions that are understandable, maintainable, and useful for the next stage of growth, not just visually impressive.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Working principles"
            title="How Yandrixa approaches client collaboration and delivery"
            description="The process is shaped around clarity, practicality, maintainability, and long-term trust."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title} className="surface-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-purple/14 text-brand-green">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Technical expertise</p>
            <p className="mt-4 text-base leading-7">
              Yandrixa supports projects across websites, web applications, Laravel and Python backends, APIs, e-commerce, AI-assisted workflows, automation, and business dashboards.
            </p>
          </div>
          <div className="surface-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Long-term vision</p>
            <p className="mt-4 text-base leading-7">
              The goal is not only to launch something functional, but to help businesses create systems and digital assets that can keep improving as they grow.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <CtaBanner
            title="Need a team that can turn business requirements into practical digital execution?"
            description="Share what you are planning and Yandrixa can help shape the right path forward."
            primaryCta={{ label: "Start a Project", href: "/contact" }}
          />
        </div>
      </section>
    </>
  );
}
