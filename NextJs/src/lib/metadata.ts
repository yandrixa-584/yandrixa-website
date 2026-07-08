import type { Metadata } from "next";

import { getSiteConfig } from "@/content/site-config";
import { absoluteUrl } from "@/lib/utils";

export const buildMetadata = async ({
  title,
  description,
  path = "/"
}: {
  title?: string;
  description?: string;
  path?: string;
}): Promise<Metadata> => {
  const siteConfig = await getSiteConfig();
  const resolvedTitle = title ? siteConfig.titleTemplate.replace("%s", title) : siteConfig.defaultTitle;
  const resolvedDescription = description || siteConfig.description;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: absoluteUrl(path)
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [absoluteUrl("/opengraph-image")]
    }
  };
};
