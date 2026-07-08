import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";

import settingsSeed from "@/data/business-settings.json";
import type { BusinessSettings } from "@/types/business-settings";

const stringField = z.string().trim();

const businessSettingsSchema: z.ZodType<BusinessSettings> = z.object({
  branding: z.object({
    name: stringField.min(1),
    brand: stringField.min(1),
    subBrand: stringField.min(1),
    tagline: stringField.min(1),
    domain: stringField.min(1)
  }),
  seo: z.object({
    siteUrl: stringField.min(1),
    defaultTitle: stringField.min(1),
    titleTemplate: stringField.min(1),
    siteDescription: stringField.min(1)
  }),
  contact: z.object({
    email: stringField.min(1),
    phone: stringField.min(1),
    whatsapp: stringField.min(1),
    location: stringField.min(1)
  }),
  social: z.object({
    linkedin: stringField,
    instagram: stringField,
    facebook: stringField,
    twitter: stringField
  }),
  links: z.object({
    consultationUrl: stringField
  }),
  analytics: z.object({
    id: stringField,
    enabled: z.boolean(),
    requiresConsent: z.boolean()
  }),
  content: z.object({
    footerDescription: stringField.min(1),
    trustPoints: z.array(stringField.min(1)).min(1)
  }),
  partnerProgram: z.object({
    headline: stringField.min(1),
    disclosure: stringField.min(1),
    commissionPercentage: stringField
  })
});

const settingsFilePath = path.join(process.cwd(), "src/data/business-settings.json");

const defaultBusinessSettings = businessSettingsSchema.parse(settingsSeed);

const normalizeTrustPoints = (value: string[]) => value.map((item) => item.trim()).filter(Boolean);

const normalizeBusinessSettings = (input: BusinessSettings) =>
  businessSettingsSchema.parse({
    ...input,
    content: {
      ...input.content,
      trustPoints: normalizeTrustPoints(input.content.trustPoints)
    }
  });

const ensureSettingsFile = async () => {
  try {
    await fs.access(settingsFilePath);
  } catch {
    await fs.mkdir(path.dirname(settingsFilePath), { recursive: true });
    await fs.writeFile(settingsFilePath, JSON.stringify(defaultBusinessSettings, null, 2));
  }
};

export const getDefaultBusinessSettings = () => defaultBusinessSettings;

export const getBusinessSettingsSchema = () => businessSettingsSchema;

export const readBusinessSettings = async () => {
  noStore();
  await ensureSettingsFile();
  const file = await fs.readFile(settingsFilePath, "utf8");
  const parsed = JSON.parse(file) as BusinessSettings;
  return normalizeBusinessSettings(parsed);
};

export const writeBusinessSettings = async (input: BusinessSettings) => {
  const normalized = normalizeBusinessSettings(input);
  await fs.writeFile(settingsFilePath, JSON.stringify(normalized, null, 2) + "\n");
  return normalized;
};
