import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChartColumnBig,
  Layers3,
  LifeBuoy,
  LineChart,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import Link from "next/link";

import { BenefitCard } from "@/components/cards/benefit-card";
import { ProjectCard } from "@/components/cards/project-card";
import { ServiceCard } from "@/components/cards/service-card";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { generalFaqs } from "@/content/faqs";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { getSiteConfig } from "@/content/site-config";
import { testimonials } from "@/content/testimonials";

const processSteps = [
  {
    title: "Discover",
    description: "Understand the business, goals, users, challenges, and requirements."
  },
  {
    title: "Plan",
    description: "Define scope, architecture, priorities, timeline, and expected deliverables."
  },
  {
    title: "Design",
    description: "Create user flows, layouts, interfaces, and responsive experiences."
  },
  {
    title: "Build",
    description: "Develop, integrate, test, optimize, and secure the solution."
  },
  {
    title: "Launch and Grow",
    description: "Deploy the product, provide support, and improve it as the business grows."
  }
];

const businessOutcomes = [
  { icon: Sparkles, title: "Stronger online presence", description: "Present your business with clarity, trust, and a better first impression." },
  { icon: Workflow, title: "Faster internal processes", description: "Turn repetitive work into cleaner digital workflows and better team coordination." },
  { icon: ShieldCheck, title: "Better customer experience", description: "Create smoother interactions across enquiry, ordering, service, or account journeys." },
  { icon: Bot, title: "Reduced manual work", description: "Use automation where it actually saves time instead of adding unnecessary complexity." },
  { icon: ChartColumnBig, title: "Centralized business data", description: "Bring operations, reporting, and user activity into one organized system." },
  { icon: Layers3, title: "Scalable digital infrastructure", description: "Build a foundation that can grow with new users, features, and operational needs." },
  { icon: LineChart, title: "Improved lead capture", description: "Support campaigns and websites with clearer conversion paths and better tracking." },
  { icon: LifeBuoy, title: "Reliable long-term support", description: "Stay supported after launch with maintenance, fixes, and practical improvements." }
];

const whyYandrixa = [
  { icon: BriefcaseBusiness, title: "Business-first approach", description: "Solutions are shaped around business needs, not unnecessary technical complexity." },
  { icon: Layers3, title: "Scalable development", description: "Architecture is planned so websites and systems can grow without a full rebuild." },
  { icon: ShieldCheck, title: "Clean and maintainable code", description: "Projects are built to stay understandable, stable, and easier to support." },
  { icon: Sparkles, title: "Transparent communication", description: "Scope, priorities, and next steps stay visible throughout the project." },
  { icon: Workflow, title: "Flexible engagement", description: "Yandrixa can support new builds, upgrades, fixes, or phased product growth." },
  { icon: LifeBuoy, title: "Continued technical support", description: "Launch is not the end of the conversation when a business needs ongoing support." }
];

export default async function HomePage() {
  const siteConfig = await getSiteConfig();
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      email: siteConfig.contact.email.startsWith("{{") ? undefined : siteConfig.contact.email
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.siteUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      description: siteConfig.description,
      areaServed: "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: generalFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <section className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container-shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative z-10">
            <Badge className="mb-6 border-brand-green/15 bg-brand-green/10 text-brand-green">
              Web • Software • AI • Digital Growth
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.12] text-white sm:text-5xl lg:text-[3.7rem]">
              Build smarter digital solutions. <span className="text-gradient">Grow your reach.</span> Scale with confidence.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
              Yandrixa Smart Solutions helps startups and businesses build professional websites, scalable web applications, APIs, e-commerce platforms, AI automations, and digital growth systems.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="accent">Start Your Project</Button>
              <Button href="/partners" variant="outline">Become a Marketing Partner</Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {siteConfig.trustPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-brand-muted">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-hero-radial opacity-80" />
            <div className="relative space-y-5">
              <div className="rounded-[22px] border border-white/10 bg-[#0c1120] p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">Delivery Dashboard</p>
                      <Badge>Website</Badge>
                    </div>
                    <div className="mt-4 grid gap-3">
                      <div className="h-3 rounded-full bg-white/8">
                        <div className="h-full w-[72%] rounded-full bg-brand-purple" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 2xl:grid-cols-3">
                        <div className="rounded-2xl bg-white/5 p-3">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-brand-muted">API</p>
                          <p className="mt-3 text-2xl font-semibold text-white">12</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-3">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-brand-muted">Automation</p>
                          <p className="mt-3 text-2xl font-semibold text-white">07</p>
                        </div>
                        <div className="col-span-2 rounded-2xl bg-white/5 p-3 2xl:col-span-1">
                          <p className="text-[11px] uppercase tracking-[0.12em] text-brand-muted">Leads</p>
                          <p className="mt-3 text-2xl font-semibold text-white">Ready</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    {["Website", "API", "Automation", "Marketing", "Growth"].map((tag, index) => (
                      <div
                        key={tag}
                        className={`flex min-h-[56px] items-center justify-center rounded-2xl border px-3 py-3 text-center text-xs leading-tight sm:text-sm ${
                          index % 2 === 0 ? "border-brand-green/20 bg-brand-green/10 text-brand-green" : "border-white/8 bg-white/5 text-white"
                        }`}
                      >
                        <span className="max-w-full text-balance">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/10 bg-brand-purple/10 p-4">
                  <p className="text-sm font-semibold text-white">Connected systems</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-brand-green" />
                    <span className="h-px flex-1 bg-gradient-to-r from-brand-green via-white/30 to-transparent" />
                    <span className="h-3 w-3 rounded-full bg-white" />
                  </div>
                  <p className="mt-4 text-sm">APIs, forms, dashboards, workflows, and support channels aligned in one direction.</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Project rhythm</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span>Discover</span>
                    <ArrowRight className="h-4 w-4 text-brand-green" />
                    <span>Plan</span>
                    <ArrowRight className="h-4 w-4 text-brand-green" />
                    <span>Build</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <div className="surface-card relative overflow-hidden p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">For Businesses</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Need a digital solution for your business?</h2>
            <p className="mt-4 text-base leading-7">
              Explore websites, applications, automation, e-commerce, marketing, and custom software services built around your goals.
            </p>
            <Button href="/services" variant="accent" className="mt-8">
              Explore Our Services
            </Button>
          </div>
          <div className="surface-card relative overflow-hidden p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">For Marketing Partners</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Have access to potential business clients?</h2>
            <p className="mt-4 text-base leading-7">
              Partner with Yandrixa, introduce qualified clients, and earn commission on successfully converted and paid projects.
            </p>
            <Button href="/partners" variant="outline" className="mt-8">
              View Partner Program
            </Button>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Service overview"
            title="Solutions designed to move your business forward"
            description="Yandrixa combines technical development, automation, and growth support so businesses can solve real operational and market-facing problems."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.slice(0, 8).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Business outcomes"
            title="Technology should solve business problems, not create more of them"
            description="The right digital solution should reduce friction, improve visibility, and support growth without becoming another problem to manage."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {businessOutcomes.map((item) => (
              <BenefitCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Process"
            title="A clear process from idea to launch"
            description="Projects move forward with a practical sequence that keeps planning, design, development, and launch aligned."
          />
          <div className="mt-12">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Capabilities"
            title="Solutions we can build"
            description="These examples show the kinds of systems Yandrixa can design and deliver. They are editable capability entries, not invented client claims."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition hover:text-white">
              View selected capabilities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Why Yandrixa"
            title="Reliable delivery built around practical business needs"
            description="We combine technical development with business understanding, helping clients choose practical solutions instead of unnecessary complexity."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyYandrixa.map((item) => (
              <BenefitCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="surface-card overflow-hidden p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Independent marketing partners</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">Turn your network into a growth opportunity</h2>
                <p className="mt-4 max-w-3xl text-base leading-7">
                  Introduce businesses that need websites, software, automation, or digital marketing. Yandrixa handles consultations, proposals, project delivery, and client payments.
                </p>
                <p className="mt-4 text-sm text-brand-muted">{siteConfig.partnerProgram.disclosure}</p>
              </div>
              <Button href="/partners" variant="accent">Join as a Marketing Partner</Button>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsMarquee items={testimonials} />

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading eyebrow="FAQ" title="Questions people usually ask before getting started" />
          <div className="mt-10">
            <FAQAccordion items={generalFaqs} />
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <CtaBanner
            title="Have an idea, requirement, or business challenge?"
            description="Tell us what you are planning. We will help you understand the most practical next step."
            primaryCta={{ label: "Start a Project", href: "/contact" }}
            secondaryCta={{ label: "Contact Yandrixa", href: "/contact" }}
          />
        </div>
      </section>
    </>
  );
}
