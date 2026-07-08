import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/content/site-config";
import { services } from "@/content/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteConfig = await getSiteConfig();
  const staticRoutes = ["", "/about", "/services", "/work", "/partners", "/contact", "/privacy", "/terms"];
  const monthly = "monthly" as const;
  const weekly = "weekly" as const;

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? weekly : monthly,
      priority: route === "" ? 1 : 0.7
    })),
    ...services.map((service) => ({
      url: `${siteConfig.siteUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: monthly,
      priority: 0.8
    }))
  ];
}
