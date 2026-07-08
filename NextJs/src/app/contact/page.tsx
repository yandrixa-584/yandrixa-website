import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { getConfiguredContact, getSiteConfig } from "@/content/site-config";
import { formatPhoneHref, formatWhatsAppHref, isPlaceholder } from "@/lib/utils";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Contact",
    description: "Start a project enquiry with Yandrixa Smart Solutions and choose the most practical next step for your business.",
    path: "/contact"
  });
}

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();
  const hasConfiguredContact = await getConfiguredContact();
  const contactCards = [
    {
      title: "Email",
      icon: Mail,
      value: siteConfig.contact.email,
      href: isPlaceholder(siteConfig.contact.email) ? undefined : `mailto:${siteConfig.contact.email}`,
      enabled: hasConfiguredContact.email
    },
    {
      title: "Phone",
      icon: Phone,
      value: siteConfig.contact.phone,
      href: isPlaceholder(siteConfig.contact.phone) ? undefined : formatPhoneHref(siteConfig.contact.phone),
      enabled: hasConfiguredContact.phone
    },
    {
      title: "WhatsApp",
      icon: MessageCircle,
      value: siteConfig.contact.whatsapp,
      href: isPlaceholder(siteConfig.contact.whatsapp)
        ? undefined
        : formatWhatsAppHref(siteConfig.contact.whatsapp, "Hello Yandrixa, I would like to discuss a digital solution for my business."),
      enabled: hasConfiguredContact.whatsapp
    },
    { title: "Working location", icon: MapPin, value: siteConfig.location, href: undefined, enabled: hasConfiguredContact.location }
  ].filter((item) => item.enabled);

  return (
    <>
      <PageHero
        eyebrow="Contact Yandrixa"
        title="Tell us what you are building, improving, or planning next"
        description="Share your requirement through the enquiry form or reach out through the configured contact methods below. Response timing depends on scope and current workload."
        badges={["Project enquiries", "Consultation requests", "Technical support discussions"]}
      />

      <section className="section-space pt-0">
        <div className="container-shell grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />
          <div className="space-y-6">
            {contactCards.length ? (
              contactCards.map((item) => (
                <div key={item.title} className="surface-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-purple/12 text-brand-green">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-white">{item.title}</h2>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("https") ? "_blank" : undefined} rel="noreferrer" className="mt-3 block text-base leading-7 text-brand-muted transition hover:text-white">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-base leading-7">{item.value}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="surface-card p-6">
                <h2 className="text-xl font-semibold text-white">Direct contact details</h2>
                <p className="mt-3 text-base leading-7">
                  Direct contact details will appear here once email, phone, WhatsApp, or location settings are configured. For now, the enquiry form is the best way to reach out.
                </p>
              </div>
            )}
            <div className="surface-card p-6">
              <h2 className="text-xl font-semibold text-white">What happens next?</h2>
              <p className="mt-3 text-base leading-7">
                Yandrixa reviews the requirement, clarifies the business need, and suggests the most practical next step before discussing scope, pricing, or delivery details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <CtaBanner
            title="Need a faster way to start the conversation?"
            description="Use the contact form for detailed requirements or the direct contact methods above for an initial discussion."
            primaryCta={{ label: "Explore services", href: "/services" }}
          />
        </div>
      </section>
    </>
  );
}
