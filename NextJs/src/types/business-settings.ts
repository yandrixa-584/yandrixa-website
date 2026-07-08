export type BusinessSettings = {
  branding: {
    name: string;
    brand: string;
    subBrand: string;
    tagline: string;
    domain: string;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    titleTemplate: string;
    siteDescription: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
  };
  social: {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  links: {
    consultationUrl: string;
  };
  analytics: {
    id: string;
    enabled: boolean;
    requiresConsent: boolean;
  };
  content: {
    footerDescription: string;
    trustPoints: string[];
  };
  partnerProgram: {
    headline: string;
    disclosure: string;
    commissionPercentage: string;
  };
};
