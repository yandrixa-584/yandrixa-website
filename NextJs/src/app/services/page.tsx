import { ArrowRight, CircleHelp, Route, Wrench } from "lucide-react";

import { ServiceCard } from "@/components/cards/service-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SectionHeading } from "@/components/ui/section-heading";
import { generalFaqs } from "@/content/faqs";
import { serviceCategories, services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Services",
    description: "Explore Yandrixa Smart Solutions services across websites, software, APIs, automation, dashboards, e-commerce, and digital growth.",
    path: "/services"
  });
}

const businessMapping = [
  {
    title: "Need a stronger digital presence",
    solution: "Website strategy, redesign, landing pages, and SEO-aware implementation."
  },
  {
    title: "Need a custom internal or customer-facing system",
    solution: "Web applications, portals, dashboards, APIs, and workflow-based products."
  },
  {
    title: "Need more efficient operations",
    solution: "Automation, integrations, business systems, and clearer reporting."
  },
  {
    title: "Need better lead and growth infrastructure",
    solution: "Landing pages, lead-generation systems, tracking, and digital marketing support."
  }
];

const processSteps = [
  { title: "Discover", description: "Clarify business goals, current systems, risks, and user needs." },
  { title: "Plan", description: "Shape scope, delivery path, priorities, and technical direction." },
  { title: "Design", description: "Create structure, flows, interfaces, and content direction." },
  { title: "Build", description: "Develop, integrate, test, optimize, and review." },
  { title: "Support", description: "Launch, improve, maintain, and expand as needed." }
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Digital services built around business goals, delivery clarity, and scalable execution"
        description="Yandrixa supports businesses with websites, applications, APIs, e-commerce, automation, dashboards, and digital growth systems that are designed to stay practical and maintainable."
        badges={["Web development", "Software systems", "AI and automation", "Digital growth"]}
      />

      <section className="section-space pt-0">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Service categories"
            title="A structured service system that stays easy to update"
            description="Major services are grouped into categories so the website can scale without duplicating content across pages."
          />
          <div className="mt-12 space-y-8">
            {serviceCategories.map((category) => (
              <div key={category.title} className="surface-card p-6 sm:p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
                    <p className="mt-3 max-w-3xl text-base leading-7">{category.description}</p>
                  </div>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {category.serviceSlugs.map((slug) => {
                    const service = services.find((item) => item.slug === slug);
                    return service ? <ServiceCard key={service.slug} service={service} /> : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="From business problem to solution"
            title="Choose the right build path instead of forcing a one-size-fits-all package"
            description="Yandrixa scopes the work around the actual business requirement, user needs, and growth stage."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {businessMapping.map((item, index) => (
              <div key={item.title} className="surface-card p-6">
                <div className="flex items-center gap-4">
                  {index % 2 === 0 ? <Route className="h-6 w-6 text-brand-green" /> : <Wrench className="h-6 w-6 text-brand-green" />}
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="mt-4 text-base leading-7">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading eyebrow="Process" title="A project flow that keeps planning and delivery aligned" />
          <div className="mt-12">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to common service questions"
            description="The most common questions are kept visible here to reduce friction before an enquiry."
          />
          <div className="mt-10">
            <FAQAccordion items={generalFaqs.slice(0, 7)} />
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <CtaBanner
            title="Need help choosing the right service path?"
            description="Share the business problem, existing system, or growth goal. Yandrixa can help identify the most practical solution direction."
            primaryCta={{ label: "Request an enquiry", href: "/contact" }}
            secondaryCta={{ label: "View partner program", href: "/partners" }}
          />
        </div>
      </section>
    </>
  );
}
