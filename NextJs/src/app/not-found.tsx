import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="surface-card mx-auto max-w-3xl p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">This page could not be found</h1>
          <p className="mt-4 text-base leading-7">
            The link may be outdated or the page may have moved. You can continue from the homepage, service pages, or contact page.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" variant="accent">Home</Button>
            <Button href="/services" variant="outline">Services</Button>
            <Button href="/contact" variant="outline">Contact</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
