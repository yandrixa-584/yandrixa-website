export const placeholders = {
  businessEmail: "{{BUSINESS_EMAIL}}",
  phoneNumber: "{{PHONE_NUMBER}}",
  whatsappNumber: "{{WHATSAPP_NUMBER}}",
  businessLocation: "{{BUSINESS_LOCATION}}",
  linkedinUrl: "{{LINKEDIN_URL}}",
  instagramUrl: "{{INSTAGRAM_URL}}"
} as const;

export const placeholderValues = new Set<string>(Object.values(placeholders));
