import { BadgeCheck, BriefcaseBusiness, ClipboardCheck, HandCoins, ShieldBan, Users } from "lucide-react";

import { PartnerForm } from "@/components/forms/partner-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Independent Marketing Partner Program",
    description: "Learn how the Yandrixa Smart Solutions independent marketing partner program works and apply with the right expectations.",
    path: "/partners"
  });
}

const whoCanApply = [
  "Freelance marketers",
  "Lead-generation professionals",
  "Business consultants",
  "Sales professionals",
  "Community networkers",
  "Digital marketing specialists",
  "Professionals connected with startups or business owners"
];

const partnerProcess = [
  { title: "Apply", description: "Apply to become a partner and share your relevant background." },
  { title: "Align", description: "Understand Yandrixa services, positioning, and lead requirements." },
  { title: "Introduce", description: "Identify and introduce a qualified business lead." },
  { title: "Verify", description: "Yandrixa verifies the lead and starts the business conversation." },
  { title: "Convert", description: "Yandrixa handles pricing, agreement, delivery, and eligible commission processing." }
];

const conditions = [
  "This is a commission-based independent opportunity.",
  "It is not a fixed-salary or employment role.",
  "Commission applies only to approved and verified leads.",
  "The lead must not already exist in the Yandrixa pipeline.",
  "The lead must be genuinely interested in a relevant service.",
  "Marketing partners must not promise discounts, delivery dates, technical features, or guaranteed results without written approval.",
  "Marketing partners are not authorized to sign contracts on behalf of Yandrixa.",
  "Marketing partners must not collect cash, bank transfers, advances, or any other client payments.",
  "All pricing, proposals, agreements, invoices, and payments are handled directly by Yandrixa.",
  "Commission is processed only after Yandrixa receives the eligible client payment.",
  "Commission percentage and payment terms are confirmed separately through the partner agreement.",
  "Spam, misleading claims, impersonation, and unethical marketing are prohibited."
];

const benefits = [
  { icon: BriefcaseBusiness, title: "Work remotely", description: "Operate independently using your own lead-generation style and network." },
  { icon: Users, title: "Multiple service categories", description: "Refer leads for websites, software, automation, e-commerce, and digital marketing needs." },
  { icon: ClipboardCheck, title: "No delivery responsibility", description: "Yandrixa handles consultations, proposals, pricing, contracts, and project execution." },
  { icon: HandCoins, title: "Commission on eligible converted clients", description: "Qualified leads that convert and complete eligible payment can result in commission." },
  { icon: BadgeCheck, title: "Clear lead tracking", description: "Approved partners can work within a defined process rather than unclear informal arrangements." },
  { icon: ShieldBan, title: "Support materials for approved partners", description: "Positioning support can be shared once the partner relationship is confirmed." }
];

export default async function PartnersPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <PageHero
        eyebrow="Independent Marketing Partner Program"
        title="Connect businesses with the right digital solutions"
        description="Refer qualified businesses that need websites, software, AI automation, e-commerce, or digital marketing services. Earn commission when an approved client successfully completes the agreed payment."
        badges={["Independent", "Commission-based", "Not an employee role"]}
      />

      <section className="section-space pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-white">Who can apply</h2>
            <div className="mt-6 grid gap-3">
              {whoCanApply.map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-brand-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-2xl font-semibold text-white">Program position</h2>
            <p className="mt-4 text-base leading-7">{siteConfig.partnerProgram.disclosure}</p>
            <p className="mt-4 text-base leading-7">
              Yandrixa handles discovery, proposal, pricing, negotiation, agreement, payment, and project delivery after a qualified lead is verified.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="How it works"
            title="A clear path from partner application to eligible commission"
            description="The program is designed to be simple, ethical, and transparent about what partners can and cannot do."
          />
          <div className="mt-12">
            <ProcessTimeline steps={partnerProcess} />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Program conditions"
            title="Important conditions you must understand before applying"
            description="These points protect lead quality, client trust, and clear responsibility boundaries."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {conditions.map((item) => (
              <div key={item} className="surface-card p-5 text-base leading-7">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Benefits"
            title="Why the program can be a useful fit for the right independent partner"
            description="The model is built for professionals who can open genuine business conversations without handling delivery themselves."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((item) => (
              <div key={item.title} className="surface-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
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
        <div className="container-shell">
          <SectionHeading
            eyebrow="Apply now"
            title="Apply as an independent marketing partner"
            description="Complete the form with accurate information. Submitting the form does not mean automatic acceptance."
          />
          <div className="mt-10">
            <PartnerForm />
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <CtaBanner
            title="Still deciding whether the partner program is the right fit?"
            description="Review the program conditions carefully. If your network includes genuine business leads, the model can create long-term collaboration opportunities."
            primaryCta={{ label: "Contact Yandrixa", href: "/contact" }}
          />
        </div>
      </section>
    </>
  );
}
