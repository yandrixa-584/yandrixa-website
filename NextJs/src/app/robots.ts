import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/content/site-config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteConfig();

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`
  };
}
