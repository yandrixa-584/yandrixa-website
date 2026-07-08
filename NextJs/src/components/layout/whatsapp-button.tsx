import { MessageCircleMore } from "lucide-react";

import { formatWhatsAppHref } from "@/lib/utils";

type WhatsAppButtonProps = {
  partner?: boolean;
  whatsappNumber: string;
};

export function WhatsAppButton({ partner = false, whatsappNumber }: WhatsAppButtonProps) {
  if (!whatsappNumber) {
    return null;
  }

  const message = partner
    ? "Hello Yandrixa, I would like to know more about the Independent Marketing Partner Program."
    : "Hello Yandrixa, I would like to discuss a digital solution for my business.";

  return (
    <a
      href={formatWhatsAppHref(whatsappNumber, message)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-brand-dark shadow-[0_18px_50px_rgba(163,255,18,0.35)] transition hover:-translate-y-1"
      aria-label={partner ? "Contact Yandrixa about the partner program on WhatsApp" : "Contact Yandrixa on WhatsApp"}
    >
      <MessageCircleMore className="h-6 w-6" />
    </a>
  );
}
