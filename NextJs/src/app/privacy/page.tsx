import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Privacy Policy",
    description: "Privacy information for Yandrixa Smart Solutions website visitors, enquiries, and partner applications.",
    path: "/privacy"
  });
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy policy"
        title="How website enquiry and partner application data may be handled"
        description="This page is a configurable legal placeholder and should be reviewed before production launch."
      />
      <section className="section-space pt-0">
        <div className="container-shell">
          <div className="surface-card max-w-4xl space-y-8 p-8">
            <section>
              <h2 className="text-2xl font-semibold text-white">Information collected</h2>
              <p className="mt-4 text-base leading-7">Yandrixa may collect information submitted through website forms, including contact details, business information, project requirements, partner-program details, and consent records.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Why information is collected</h2>
              <p className="mt-4 text-base leading-7">Submitted data may be used to review enquiries, respond to project requests, assess partner applications, maintain communication records, and protect the website from spam or abuse.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Storage and protection</h2>
              <p className="mt-4 text-base leading-7">Form submissions may be processed through configured email infrastructure and temporarily handled by website systems. Reasonable measures should be used to protect that data, but the final production setup must be reviewed before launch.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Third-party services</h2>
              <p className="mt-4 text-base leading-7">Configured services may include website hosting, analytics, email infrastructure, and other technical tools required for operating the website.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Analytics</h2>
              <p className="mt-4 text-base leading-7">If analytics is enabled, Yandrixa may use traffic and conversion data to understand website usage and improve website performance.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Privacy requests</h2>
              <p className="mt-4 text-base leading-7">For privacy-related requests, contact the configured business email address once final production contact details have been added.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
