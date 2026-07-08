import type { ContactMethod, NavItem } from "@/types/content";
import { placeholders, placeholderValues } from "@/content/business-settings";
import { readBusinessSettings } from "@/lib/site-settings";

const cleanValue = (value: string) => (placeholderValues.has(value) ? "" : value);

export const getSiteConfig = async () => {
  const businessSettings = await readBusinessSettings();

  return {
    name: businessSettings.branding.name,
    brand: businessSettings.branding.brand,
    subBrand: businessSettings.branding.subBrand,
    tagline: businessSettings.branding.tagline,
    domain: businessSettings.branding.domain,
    siteUrl: businessSettings.seo.siteUrl,
    defaultTitle: businessSettings.seo.defaultTitle,
    titleTemplate: businessSettings.seo.titleTemplate,
    description: businessSettings.seo.siteDescription,
    location: businessSettings.contact.location,
    contact: {
      email: businessSettings.contact.email,
      phone: businessSettings.contact.phone,
      whatsapp: businessSettings.contact.whatsapp
    },
    social: {
      linkedin: cleanValue(businessSettings.social.linkedin),
      instagram: cleanValue(businessSettings.social.instagram),
      facebook: cleanValue(businessSettings.social.facebook),
      twitter: cleanValue(businessSettings.social.twitter)
    },
    analytics: {
      id: businessSettings.analytics.id,
      enabled: businessSettings.analytics.enabled && Boolean(businessSettings.analytics.id),
      requiresConsent: businessSettings.analytics.requiresConsent
    },
    consultationUrl: cleanValue(businessSettings.links.consultationUrl),
    partnerProgram: businessSettings.partnerProgram,
    trustPoints: businessSettings.content.trustPoints,
    navigation: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Marketing Partners", href: "/partners" },
      { label: "Contact", href: "/contact" }
    ] satisfies NavItem[],
    footerDescription: businessSettings.content.footerDescription,
    contactMethods: [
      {
        label: "Email",
        value: businessSettings.contact.email,
        href: cleanValue(businessSettings.contact.email) ? `mailto:${businessSettings.contact.email}` : undefined
      },
      {
        label: "Phone",
        value: businessSettings.contact.phone,
        href: cleanValue(businessSettings.contact.phone) ? `tel:${businessSettings.contact.phone}` : undefined
      },
      {
        label: "WhatsApp",
        value: businessSettings.contact.whatsapp,
        href: cleanValue(businessSettings.contact.whatsapp)
          ? `https://wa.me/${businessSettings.contact.whatsapp.replace(/[^\d]/g, "")}`
          : undefined
      },
      { label: "Location", value: businessSettings.contact.location }
    ] satisfies ContactMethod[],
    legal: {
      privacyContact: cleanValue(businessSettings.contact.email) || placeholders.businessEmail
    }
  };
};

export const getConfiguredContact = async () => {
  const businessSettings = await readBusinessSettings();

  return {
    email: Boolean(cleanValue(businessSettings.contact.email)),
    phone: Boolean(cleanValue(businessSettings.contact.phone)),
    whatsapp: Boolean(cleanValue(businessSettings.contact.whatsapp)),
    location: Boolean(cleanValue(businessSettings.contact.location))
  };
};
