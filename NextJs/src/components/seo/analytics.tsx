"use client";

import Script from "next/script";

type AnalyticsProps = {
  analytics: {
    enabled: boolean;
    id: string;
  };
};

export function Analytics({ analytics }: AnalyticsProps) {
  if (!analytics.enabled) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${analytics.id}`} strategy="afterInteractive" />
      <Script id="ga-setup" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analytics.id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
