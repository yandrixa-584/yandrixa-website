import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatPhoneHref = (value: string) => `tel:${value.replace(/[^\d+]/g, "")}`;

export const formatWhatsAppHref = (value: string, message: string) =>
  `https://wa.me/${value.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;

export const absoluteUrl = (path = "") => {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://yandrixa.in";
  return new URL(path, base).toString();
};

export const isPlaceholder = (value?: string) => !value || value.startsWith("{{");

export const currentTimestamp = () => Date.now();
