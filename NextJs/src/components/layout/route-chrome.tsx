"use client";

import { usePathname } from "next/navigation";

type RouteChromeProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  whatsappButton: React.ReactNode;
};

export function RouteChrome({ children, header, footer, whatsappButton }: RouteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? null : (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-brand-green focus:px-4 focus:py-3 focus:text-brand-dark"
        >
          Skip to content
        </a>
      )}
      {isAdminRoute ? null : header}
      <main id="main-content">{children}</main>
      {isAdminRoute ? null : footer}
      {isAdminRoute ? null : whatsappButton}
    </>
  );
}
