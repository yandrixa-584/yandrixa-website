import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import { YandrixaPublicLayout } from '@/Layouts/YandrixaPublicLayout';
import type { SiteProps } from '@/types/yandrixa';

const serviceImageMap: Record<string, { alt: string; src: string }> = {
    'Website Development': {
        src: '/service-school-suite.svg',
        alt: 'School management website and portal preview',
    },
    'Web Applications': {
        src: '/service-hospital-dashboard.svg',
        alt: 'Hospital management application dashboard preview',
    },
    'API Development': {
        src: '/service-api-monitoring.svg',
        alt: 'API monitoring and integration dashboard preview',
    },
    'AI and Automation': {
        src: '/service-automation-control.svg',
        alt: 'AI automation workflow control center preview',
    },
    Dashboards: {
        src: '/service-dashboard-ops.svg',
        alt: 'Business operations dashboard preview',
    },
    'Digital Growth': {
        src: '/service-growth-studio.svg',
        alt: 'Digital growth landing page and campaign studio preview',
    },
};

const serviceUseCaseMap: Record<string, string> = {
    'Website Development': 'Use case: school websites and enquiry funnels',
    'Web Applications': 'Use case: hospital and business management systems',
    'API Development': 'Use case: secure integrations and backend services',
    'AI and Automation': 'Use case: workflow automation and lead handling',
    Dashboards: 'Use case: reporting, operations, and performance tracking',
    'Digital Growth': 'Use case: landing pages and campaign execution',
};

const testimonialRatings: Array<{ stars: number; label: string }> = [
    { stars: 4, label: 'Trusted review' },
    { stars: 5, label: 'Strong feedback' },
    { stars: 4, label: 'Client note' },
    { stars: 5, label: 'Verified response' },
];

export default function Home({ site }: { site: SiteProps }) {
    const scrollingTestimonials = [...site.testimonials, ...site.testimonials];
    const feedbackTrackRef = useRef<HTMLDivElement | null>(null);
    const feedbackResumeTimeoutRef = useRef<number | null>(null);
    const [feedbackPaused, setFeedbackPaused] = useState(false);

    useEffect(() => {
        const node = feedbackTrackRef.current;

        if (!node) {
            return;
        }

        const interval = window.setInterval(() => {
            if (feedbackPaused) {
                return;
            }

            const loopWidth = node.scrollWidth / 2;
            const nextPosition = node.scrollLeft + 1;

            node.scrollLeft = nextPosition >= loopWidth ? 0 : nextPosition;
        }, 22);

        return () => window.clearInterval(interval);
    }, [feedbackPaused]);

    useEffect(() => {
        return () => {
            if (feedbackResumeTimeoutRef.current) {
                window.clearTimeout(feedbackResumeTimeoutRef.current);
            }
        };
    }, []);

    const moveFeedback = (direction: 'left' | 'right') => {
        const node = feedbackTrackRef.current;

        if (!node) {
            return;
        }

        const firstCard = node.querySelector<HTMLElement>('[data-feedback-card="true"]');
        const cardWidth = firstCard?.offsetWidth ?? 292;
        const trackStyles = window.getComputedStyle(node.firstElementChild as Element);
        const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || '20') || 20;
        const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;

        setFeedbackPaused(true);
        if (feedbackResumeTimeoutRef.current) {
            window.clearTimeout(feedbackResumeTimeoutRef.current);
        }

        node.scrollBy({ left: offset, behavior: 'smooth' });

        feedbackResumeTimeoutRef.current = window.setTimeout(() => {
            setFeedbackPaused(false);
        }, 1800);
    };

    return (
        <YandrixaPublicLayout title="Home" site={site}>
            <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">Build. Grow. Scale.</p>
                        <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                            Digital solutions that help businesses launch faster, operate better, and scale with confidence.
                        </h2>
                        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                            Yandrixa builds business websites, custom software, automation workflows, dashboards, and growth-focused digital systems with a
                            practical delivery approach.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/contact" className="rounded-2xl bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950">
                                Start a Project
                            </Link>
                            <Link href="/services" className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white">
                                Explore Services
                            </Link>
                        </div>
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            <StatCard label="Enquiries saved" value={String(site.stats.enquiries)} />
                            <StatCard label="Partner applications" value={String(site.stats.partnerApplications)} />
                            <StatCard label="Landing pages" value={String(site.stats.landingPages)} />
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-white/10 bg-[var(--panel-soft)] p-6 shadow-2xl backdrop-blur">
                        <div className="rounded-[28px] border border-white/15 bg-[var(--panel-strong)] p-6">
                            <h3 className="text-2xl font-semibold text-white">What we help with</h3>
                            <div className="mt-6 space-y-3">
                                {site.content.trustPoints.map((point) => (
                                    <div key={point} className="rounded-2xl border border-lime-400/20 bg-lime-400/10 px-4 py-3 text-sm text-slate-100">
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-8">
                <div className="mb-8 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">Our Services</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">Solutions built for websites, software, automation, and business growth.</h3>
                    <p className="mt-4 text-base leading-7 text-slate-300">
                        Practical service blocks with brighter previews and simpler content, so visitors can understand each offering at a glance.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {site.services.map((service) => (
                        <article
                            key={service.name}
                            className="overflow-hidden rounded-[30px] border border-white/10 bg-[var(--card-surface)] shadow-[0_18px_60px_rgba(15,23,42,0.26)] backdrop-blur transition hover:-translate-y-1 hover:border-lime-300/30"
                        >
                            <div className="border-b border-white/10 bg-[var(--card-frame)] p-3">
                                <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[22px] border border-white/10 bg-[var(--card-inset)] p-2 shadow-inner shadow-slate-950/40">
                                    <img
                                        src={(serviceImageMap[service.name] || serviceImageMap.Dashboards).src}
                                        alt={(serviceImageMap[service.name] || serviceImageMap.Dashboards).alt}
                                        className="h-full w-full rounded-[18px] object-contain object-center brightness-110 contrast-125 saturate-125"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(15,23,42,0))] p-6">
                                <div>
                                    <p className="text-xl font-semibold text-white">{service.name}</p>
                                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/95">
                                        {serviceUseCaseMap[service.name] || serviceUseCaseMap.Dashboards}
                                    </p>
                                </div>
                                <p className="max-w-[34ch] text-sm leading-7 text-slate-200">{service.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">Capability examples</p>
                        <h3 className="mt-3 text-3xl font-semibold text-white">Projects and platforms shaped around real operations.</h3>
                    </div>
                    <Link href="/work" className="text-sm font-semibold text-lime-300">
                        View all work
                    </Link>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {site.projects.map((project) => (
                        <div key={project.title} className="rounded-[30px] border border-white/10 bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                            <p className="text-xl font-semibold text-white">{project.title}</p>
                            <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-y border-white/10 bg-[var(--section-soft)] py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">Client feedback</p>
                            <h3 className="mt-3 text-3xl font-semibold text-white">Professional, practical, and easy to work with.</h3>
                        </div>
                        <div className="hidden items-center gap-3 md:flex">
                            <button
                                type="button"
                                onClick={() => moveFeedback('left')}
                                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[var(--panel-strong)] text-xl text-white transition hover:border-lime-300/40 hover:text-lime-300"
                                aria-label="Scroll feedback left"
                            >
                                ←
                            </button>
                            <button
                                type="button"
                                onClick={() => moveFeedback('right')}
                                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[var(--panel-strong)] text-xl text-white transition hover:border-lime-300/40 hover:text-lime-300"
                                aria-label="Scroll feedback right"
                            >
                                →
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center gap-3 md:hidden">
                        <button
                            type="button"
                            onClick={() => moveFeedback('left')}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[var(--panel-strong)] text-lg text-white transition hover:border-lime-300/40 hover:text-lime-300"
                            aria-label="Scroll feedback left"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={() => moveFeedback('right')}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[var(--panel-strong)] text-lg text-white transition hover:border-lime-300/40 hover:text-lime-300"
                            aria-label="Scroll feedback right"
                        >
                            →
                        </button>
                    </div>
                    <div
                        ref={feedbackTrackRef}
                        className="mt-8 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        onMouseEnter={() => setFeedbackPaused(true)}
                        onMouseLeave={() => setFeedbackPaused(false)}
                    >
                        <div className="flex w-max gap-5 pr-5">
                            {scrollingTestimonials.map((item, index) => (
                                <div
                                    key={`${item.name}-${item.company}-${index}`}
                                    data-feedback-card="true"
                                    className="w-[320px] flex-none rounded-[30px] border border-white/10 bg-[var(--card-surface)] p-6 transition duration-300 hover:-translate-y-2 hover:border-lime-400/45 hover:shadow-[0_22px_55px_rgba(163,230,53,0.16)]"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300/25 bg-lime-300/10 text-base font-semibold text-lime-200">
                                                {item.name
                                                    .split(' ')
                                                    .map((part) => part[0])
                                                    .join('')
                                                    .slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-white">{item.name}</p>
                                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-lime-200">
                                            Verified
                                        </span>
                                    </div>
                                    <div className="mt-5 flex gap-1 text-lime-300">
                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                            <span
                                                key={starIndex}
                                                className={starIndex < testimonialRatings[index % testimonialRatings.length].stars ? 'text-lime-300' : 'text-slate-600'}
                                            >
                                                ★
                                            </span>
                                        ))}
                                        <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                            {testimonialRatings[index % testimonialRatings.length].label}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-[15px] leading-8 text-slate-200">“{item.feedback}”</p>
                                    <div className="mt-6 border-t border-white/10 pt-4">
                                        <p className="text-sm font-semibold text-white">{item.company}</p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                                            {item.role} • {item.company}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </YandrixaPublicLayout>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
    );
}
