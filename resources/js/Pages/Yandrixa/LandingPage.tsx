import { Link } from '@inertiajs/react';

import { YandrixaPublicLayout } from '@/Layouts/YandrixaPublicLayout';
import type { SiteProps } from '@/types/yandrixa';

type LandingPage = {
    eyebrow: string;
    title: string;
    summary: string;
    heroPoints: string[];
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    bodyTitle: string;
    bodyContent: string;
};

export default function LandingPageView({ site, landingPage }: { site: SiteProps; landingPage: LandingPage }) {
    return (
        <YandrixaPublicLayout title={landingPage.title} site={site}>
            <section className="mx-auto max-w-6xl px-6 py-20">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">{landingPage.eyebrow}</p>
                <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{landingPage.title}</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{landingPage.summary}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={landingPage.primaryCtaHref} className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950">
                        {landingPage.primaryCtaLabel}
                    </Link>
                    <Link href={landingPage.secondaryCtaHref} className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white">
                        {landingPage.secondaryCtaLabel}
                    </Link>
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {landingPage.heroPoints.map((point) => (
                        <div key={point} className="rounded-[28px] border border-white/10 bg-[var(--panel-soft)] p-5 text-sm text-slate-100 backdrop-blur">
                            {point}
                        </div>
                    ))}
                </div>
                <div className="mt-14 rounded-[32px] border border-white/10 bg-[var(--panel-strong)] p-8 shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                    <h3 className="text-3xl font-semibold text-white">{landingPage.bodyTitle}</h3>
                    <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">{landingPage.bodyContent}</p>
                </div>
            </section>
        </YandrixaPublicLayout>
    );
}
