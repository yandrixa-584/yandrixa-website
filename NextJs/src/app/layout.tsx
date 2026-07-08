import type { Metadata } from "next";
import "@fontsource/inter";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import { Analytics } from "@/components/seo/analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RouteChrome } from "@/components/layout/route-chrome";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { getConfiguredContact, getSiteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({});
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  const configuredContact = await getConfiguredContact();

  return (
    <html lang="en">
      <body>
        <Analytics analytics={siteConfig.analytics} />
        <RouteChrome
          header={<Header brand={siteConfig.brand} subBrand={siteConfig.subBrand} />}
          footer={<Footer />}
          whatsappButton={<WhatsAppButton whatsappNumber={configuredContact.whatsapp ? siteConfig.contact.whatsapp : ""} />}
        >
          {children}
        </RouteChrome>
      </body>
    </html>
  );
}
