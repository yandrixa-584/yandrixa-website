export type EnquiryRecord = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: null | string;
  type: "project-enquiry";
  fullName: string;
  businessName: string;
  email: string;
  phoneOrWhatsApp: string;
  country: string;
  serviceRequired: string;
  projectStage: string;
  budgetRange: string;
  expectedTimeline: string;
  preferredContactMethod: string;
  existingWebsiteUrl: string;
  projectDescription: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerUrl?: string;
  landingPageUrl?: string;
};

export type PartnerApplicationRecord = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: null | string;
  type: "marketing-partner";
  fullName: string;
  email: string;
  phone: string;
  cityCountry: string;
  profession: string;
  experience: string;
  industries: string;
  leadMethods: string;
  expectedLeadsPerMonth: string;
  profileUrl: string;
  introduction: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerUrl?: string;
  landingPageUrl?: string;
};

export type LandingPageRecord = {
  id: string;
  slug: string;
  status: "draft" | "published";
  deletedAt?: null | string;
  title: string;
  eyebrow: string;
  summary: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  heroPoints: string[];
  bodyTitle: string;
  bodyContent: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminDataStore = {
  enquiries: EnquiryRecord[];
  partnerApplications: PartnerApplicationRecord[];
  landingPages: LandingPageRecord[];
};
