import { Globe, MessageCircleMore, Send, Share2 } from "lucide-react";

const icons = {
  linkedin: Share2,
  instagram: Globe,
  facebook: MessageCircleMore,
  twitter: Send
};

type SocialLinksProps = {
  social: {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
};

export function SocialLinks({ social }: SocialLinksProps) {
  const entries = Object.entries(social).filter(([, value]) => value);

  if (!entries.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {entries.map(([key, value]) => {
        const Icon = icons[key as keyof typeof icons];
        return (
          <a
            key={key}
            href={value}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-muted transition hover:-translate-y-0.5 hover:border-brand-green/40 hover:text-white"
            aria-label={`Visit Yandrixa on ${key}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
