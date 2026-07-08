import { z } from "zod";

const name = z.string().trim().min(2, "Enter at least 2 characters.").max(100, "Too long.");
const email = z.email("Enter a valid email address.").max(120, "Too long.");
const optionalUrl = z.union([z.literal(""), z.url("Enter a valid URL.")]).optional();
const checked = z.boolean().refine((value) => value, "You must confirm this before submitting.");

const hiddenMeta = {
  website: z.string().max(0).optional(),
  startedAt: z.number(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  referrerUrl: z.string().max(500).optional(),
  landingPageUrl: z.string().max(500).optional()
};

export const contactSchema = z.object({
  fullName: name,
  businessName: z.string().trim().min(2, "Enter your business or company name.").max(120, "Too long."),
  email,
  phoneOrWhatsApp: z.string().trim().min(6, "Enter a valid phone or WhatsApp number.").max(40, "Too long."),
  country: z.string().trim().min(2, "Enter your country.").max(80, "Too long."),
  serviceRequired: z.string().trim().min(2, "Select a service.").max(80, "Too long."),
  projectStage: z.string().trim().min(2, "Select the current project stage.").max(80, "Too long."),
  budgetRange: z.string().trim().min(2, "Select a budget range.").max(80, "Too long."),
  expectedTimeline: z.string().trim().min(2, "Select an expected timeline.").max(80, "Too long."),
  projectDescription: z.string().trim().min(30, "Share a bit more detail about your project.").max(3000, "Too long."),
  existingWebsiteUrl: optionalUrl,
  preferredContactMethod: z.string().trim().min(2, "Select a preferred contact method.").max(40, "Too long."),
  consent: checked,
  ...hiddenMeta
});

export const partnerSchema = z.object({
  fullName: name,
  email,
  phone: z.string().trim().min(6, "Enter a valid phone number.").max(40, "Too long."),
  cityCountry: z.string().trim().min(2, "Enter your city and country.").max(120, "Too long."),
  profession: z.string().trim().min(2, "Enter your current profession.").max(120, "Too long."),
  experience: z.string().trim().min(10, "Share your relevant experience.").max(1000, "Too long."),
  industries: z.string().trim().min(10, "Describe your network or industries.").max(1000, "Too long."),
  leadMethods: z.string().trim().min(10, "Describe your preferred lead-generation methods.").max(1000, "Too long."),
  expectedLeadsPerMonth: z.string().trim().min(1, "Tell us your expected number of leads.").max(40, "Too long."),
  profileUrl: optionalUrl,
  introduction: z.string().trim().min(20, "Add a short introduction.").max(2000, "Too long."),
  understandsCommission: checked,
  willNotCollectPayments: checked,
  consent: checked,
  ...hiddenMeta
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type PartnerFormValues = z.infer<typeof partnerSchema>;

export const validateSubmissionTiming = (startedAt: number) => Date.now() - startedAt > 4_000;
