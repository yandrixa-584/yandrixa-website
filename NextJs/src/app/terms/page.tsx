import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Terms and Conditions",
    description: "Website terms and informational limitations for Yandrixa Smart Solutions.",
    path: "/terms"
  });
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms and conditions"
        title="Important notes about website content, enquiries, and partner-program information"
        description="This legal content is a configurable placeholder and should be reviewed before production launch."
      />
      <section className="section-space pt-0">
        <div className="container-shell">
          <div className="surface-card max-w-4xl space-y-8 p-8">
            <section>
              <h2 className="text-2xl font-semibold text-white">Website information purpose</h2>
              <p className="mt-4 text-base leading-7">The website is intended to provide general information about Yandrixa Smart Solutions services, capabilities, and enquiry channels.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Project acceptance</h2>
              <p className="mt-4 text-base leading-7">Submitting an enquiry does not guarantee project acceptance. Scope, feasibility, pricing, and timelines are confirmed separately.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">No guaranteed outcomes</h2>
              <p className="mt-4 text-base leading-7">Website content does not guarantee rankings, leads, revenue, or business growth. Any service engagement is defined through a separate project agreement.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Intellectual property</h2>
              <p className="mt-4 text-base leading-7">Unless otherwise agreed in writing, website content, design, and branding remain protected and must not be reused without permission.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">External links</h2>
              <p className="mt-4 text-base leading-7">External links are provided for convenience. Yandrixa is not responsible for the content or policies of third-party websites.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Partner-program note</h2>
              <p className="mt-4 text-base leading-7">The partner program is governed by a separate agreement. Website information about the program is introductory and does not replace formal partner terms.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
