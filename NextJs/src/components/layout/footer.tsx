import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { SocialLinks } from "@/components/ui/social-links";
import { navigation } from "@/content/navigation";
import { getConfiguredContact, getSiteConfig } from "@/content/site-config";
import { services } from "@/content/services";
import { formatPhoneHref, formatWhatsAppHref, isPlaceholder } from "@/lib/utils";

export async function Footer() {
  const siteConfig = await getSiteConfig();
  const hasConfiguredContact = await getConfiguredContact();
  const serviceLinks = services.slice(0, 6);

  return (
    <footer className="border-t border-white/8 bg-[#080a10]">
      <div className="container-shell section-space grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#070a12] shadow-glow">
              <Image
                src="/yandrixa-logo.png"
                alt="Yandrixa Smart Solutions logo"
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-cover"
              />
            </div>
            <div>
              <p className="font-heading text-2xl font-semibold text-white">{siteConfig.name}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-brand-green">{siteConfig.tagline}</p>
            </div>
          </div>
          <p className="max-w-md text-base leading-7">{siteConfig.footerDescription}</p>
          <SocialLinks social={siteConfig.social} />
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white">Services</p>
          <div className="space-y-3">
            {serviceLinks.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}` as Route} className="block text-sm text-brand-muted transition hover:text-white">
                {service.shortName}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white">Company</p>
          <div className="space-y-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="block text-sm text-brand-muted transition hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/privacy" className="block text-sm text-brand-muted transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block text-sm text-brand-muted transition hover:text-white">Terms</Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white">Contact</p>
          <div className="space-y-3 text-sm text-brand-muted">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Email</p>
              {isPlaceholder(siteConfig.contact.email) ? (
                <p>{siteConfig.contact.email}</p>
              ) : (
                <a href={`mailto:${siteConfig.contact.email}`} className="transition hover:text-white">{siteConfig.contact.email}</a>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Phone</p>
              {hasConfiguredContact.phone ? (
                <a href={formatPhoneHref(siteConfig.contact.phone)} className="transition hover:text-white">{siteConfig.contact.phone}</a>
              ) : (
                <p>{siteConfig.contact.phone}</p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">WhatsApp</p>
              {hasConfiguredContact.whatsapp ? (
                <a
                  href={formatWhatsAppHref(siteConfig.contact.whatsapp, "Hello Yandrixa, I would like to discuss a digital solution for my business.")}
                  className="transition hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteConfig.contact.whatsapp}
                </a>
              ) : (
                <p>{siteConfig.contact.whatsapp}</p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Location</p>
              <p>{siteConfig.location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/8 py-5">
        <div className="container-shell flex flex-col gap-2 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Managed through the Yandrixa admin settings.</p>
        </div>
      </div>
    </footer>
  );
}
