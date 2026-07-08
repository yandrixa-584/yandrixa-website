import { Link } from '@inertiajs/react';

import { YandrixaPublicLayout } from '@/Layouts/YandrixaPublicLayout';
import type { SiteProps } from '@/types/yandrixa';

export default function Home({ site }: { site: SiteProps }) {
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

                    <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                        <div className="rounded-[28px] border border-white/15 bg-slate-950/70 p-6">
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
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {site.services.map((service) => (
                        <div key={service.name} className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                            <p className="text-lg font-semibold text-white">{service.name}</p>
                            <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
                        </div>
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
                        <div key={project.title} className="rounded-[30px] border border-white/10 bg-slate-950/60 p-6">
                            <p className="text-xl font-semibold text-white">{project.title}</p>
                            <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-y border-white/10 bg-white/5 py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">Client feedback</p>
                            <h3 className="mt-3 text-3xl font-semibold text-white">Professional, practical, and easy to work with.</h3>
                        </div>
                    </div>
                    <div className="mt-8 grid gap-5 lg:grid-cols-4">
                        {site.testimonials.map((item) => (
                            <div key={`${item.name}-${item.company}`} className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-1 hover:border-lime-400/30">
                                <p className="text-sm leading-7 text-slate-300">{item.feedback}</p>
                                <div className="mt-5">
                                    <p className="text-sm font-semibold text-white">{item.name}</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                        {item.role} • {item.company}
                                    </p>
                                </div>
                            </div>
                        ))}
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
