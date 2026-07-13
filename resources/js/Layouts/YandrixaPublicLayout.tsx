import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState, type CSSProperties, type PropsWithChildren } from 'react';

import { FlashToast } from '@/Components/Yandrixa/FlashToast';
import type { FlashProps, SiteProps } from '@/types/yandrixa';

const publicThemes = [
    {
        id: 'aurora',
        label: 'Aurora',
        vars: {
            '--page-bg': '#07111f',
            '--page-overlay':
                'radial-gradient(circle_at_top_left,rgba(96,165,250,0.22),transparent 34%),radial-gradient(circle_at_top_right,rgba(132,204,22,0.16),transparent 30%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.12),transparent 24%),linear-gradient(180deg,rgba(8,17,31,0.84),rgba(15,23,42,0.88),rgba(24,24,43,0.92))',
            '--header-bg': 'linear-gradient(90deg,rgba(15,23,42,0.72),rgba(30,41,59,0.68))',
            '--mobile-menu-bg': 'linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.94))',
            '--footer-shell-bg': 'linear-gradient(180deg,rgba(15,23,42,0.6),rgba(30,41,59,0.62))',
            '--footer-card-bg':
                'radial-gradient(circle_at_top_left,rgba(132,204,22,0.16),transparent 30%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent 28%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.96))',
            '--panel-soft': 'linear-gradient(180deg,rgba(255,255,255,0.1),rgba(148,163,184,0.06))',
            '--panel-strong': 'linear-gradient(180deg,rgba(30,41,59,0.86),rgba(51,65,85,0.72))',
            '--card-surface': 'linear-gradient(180deg,rgba(51,65,85,0.86),rgba(30,41,59,0.88))',
            '--card-frame':
                'radial-gradient(circle_at_top_left,rgba(163,230,53,0.18),transparent 42%),radial-gradient(circle_at_top_right,rgba(96,165,250,0.16),transparent 28%),linear-gradient(180deg,rgba(255,255,255,0.1),rgba(15,23,42,0.05))',
            '--card-inset': 'linear-gradient(180deg,rgba(15,23,42,0.72),rgba(30,41,59,0.76))',
            '--section-soft': 'linear-gradient(180deg,rgba(255,255,255,0.05),rgba(148,163,184,0.04))',
        },
    },
    {
        id: 'ocean',
        label: 'Ocean',
        vars: {
            '--page-bg': '#041923',
            '--page-overlay':
                'radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent 34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent 30%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.12),transparent 25%),linear-gradient(180deg,rgba(4,25,35,0.86),rgba(8,47,73,0.86),rgba(15,118,110,0.32))',
            '--header-bg': 'linear-gradient(90deg,rgba(8,47,73,0.78),rgba(15,118,110,0.62))',
            '--mobile-menu-bg': 'linear-gradient(180deg,rgba(8,47,73,0.96),rgba(15,118,110,0.88))',
            '--footer-shell-bg': 'linear-gradient(180deg,rgba(8,47,73,0.66),rgba(15,118,110,0.58))',
            '--footer-card-bg':
                'radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent 28%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.18),transparent 24%),linear-gradient(180deg,rgba(8,47,73,0.94),rgba(6,78,59,0.88))',
            '--panel-soft': 'linear-gradient(180deg,rgba(125,211,252,0.12),rgba(45,212,191,0.08))',
            '--panel-strong': 'linear-gradient(180deg,rgba(8,47,73,0.86),rgba(15,118,110,0.7))',
            '--card-surface': 'linear-gradient(180deg,rgba(14,116,144,0.82),rgba(15,118,110,0.8))',
            '--card-frame':
                'radial-gradient(circle_at_top_left,rgba(45,212,191,0.22),transparent 42%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.16),transparent 28%),linear-gradient(180deg,rgba(255,255,255,0.1),rgba(8,47,73,0.08))',
            '--card-inset': 'linear-gradient(180deg,rgba(8,47,73,0.8),rgba(14,116,144,0.72))',
            '--section-soft': 'linear-gradient(180deg,rgba(125,211,252,0.08),rgba(45,212,191,0.06))',
        },
    },
    {
        id: 'sunset',
        label: 'Sunset',
        vars: {
            '--page-bg': '#1f1020',
            '--page-overlay':
                'radial-gradient(circle_at_top_left,rgba(251,146,60,0.22),transparent 34%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent 30%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.12),transparent 24%),linear-gradient(180deg,rgba(31,16,32,0.86),rgba(88,28,135,0.5),rgba(127,29,29,0.4))',
            '--header-bg': 'linear-gradient(90deg,rgba(88,28,135,0.74),rgba(190,24,93,0.58))',
            '--mobile-menu-bg': 'linear-gradient(180deg,rgba(88,28,135,0.94),rgba(127,29,29,0.88))',
            '--footer-shell-bg': 'linear-gradient(180deg,rgba(88,28,135,0.62),rgba(127,29,29,0.56))',
            '--footer-card-bg':
                'radial-gradient(circle_at_top_left,rgba(251,146,60,0.16),transparent 30%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.18),transparent 28%),linear-gradient(180deg,rgba(88,28,135,0.9),rgba(58,12,46,0.94))',
            '--panel-soft': 'linear-gradient(180deg,rgba(251,146,60,0.12),rgba(244,114,182,0.08))',
            '--panel-strong': 'linear-gradient(180deg,rgba(88,28,135,0.82),rgba(127,29,29,0.66))',
            '--card-surface': 'linear-gradient(180deg,rgba(157,23,77,0.82),rgba(88,28,135,0.78))',
            '--card-frame':
                'radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent 42%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.16),transparent 28%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(88,28,135,0.08))',
            '--card-inset': 'linear-gradient(180deg,rgba(88,28,135,0.76),rgba(127,29,29,0.7))',
            '--section-soft': 'linear-gradient(180deg,rgba(251,146,60,0.07),rgba(244,114,182,0.06))',
        },
    },
] as const;

export function YandrixaPublicLayout({
    title,
    site,
    children,
}: PropsWithChildren<{
    title: string;
    site: SiteProps;
}>) {
    const page = usePage<any>();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [themeId, setThemeId] = useState<(typeof publicThemes)[number]['id']>('aurora');

    useEffect(() => {
        const savedTheme = window.localStorage.getItem('yandrixa-public-theme');
        if (savedTheme && publicThemes.some((theme) => theme.id === savedTheme)) {
            setThemeId(savedTheme as (typeof publicThemes)[number]['id']);
        }
    }, []);

    const activeTheme = publicThemes.find((theme) => theme.id === themeId) || publicThemes[0];

    const updateTheme = (nextThemeId: (typeof publicThemes)[number]['id']) => {
        setThemeId(nextThemeId);
        window.localStorage.setItem('yandrixa-public-theme', nextThemeId);
    };

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-[var(--page-bg)] text-slate-100" style={activeTheme.vars as CSSProperties}>
                <FlashToast success={page.props.flash?.success} error={page.props.flash?.error} />
                <div className="fixed inset-0 bg-[url('/site-atmosphere-generated.png')] bg-cover bg-center opacity-20" />
                <div className="fixed inset-0" style={{ backgroundImage: activeTheme.vars['--page-overlay'] }} />
                <header className="relative z-10 border-b border-white/10 backdrop-blur" style={{ backgroundImage: activeTheme.vars['--header-bg'] }}>
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                        <Link href="/" className="flex items-center gap-4">
                            <img src="/yandrixa-logo.png" alt={site.branding.name} className="h-14 w-14 rounded-2xl object-cover shadow-lg" />
                            <div>
                                <h1 className="text-xl font-semibold">{site.branding.name}</h1>
                            </div>
                        </Link>
                        <nav className="hidden gap-6 lg:flex">
                            {site.navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-slate-300 transition hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <label className="hidden items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white md:flex">
                            <span className="font-semibold text-slate-200">Theme</span>
                            <select
                                value={themeId}
                                onChange={(event) => updateTheme(event.target.value as (typeof publicThemes)[number]['id'])}
                                className="rounded-xl border border-white/10 bg-slate-950/35 px-3 py-1.5 text-sm font-semibold text-white outline-none transition focus:border-lime-300"
                                aria-label="Select public site theme"
                            >
                                {publicThemes.map((theme) => (
                                    <option key={theme.id} value={theme.id}>
                                        {theme.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            className="inline-flex items-center rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-lime-300/40 hover:bg-white/15 lg:hidden"
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle navigation menu"
                        >
                            Menu
                        </button>
                    </div>
                    {mobileMenuOpen ? (
                        <div className="border-t border-white/10 px-6 py-4 lg:hidden" style={{ backgroundImage: activeTheme.vars['--mobile-menu-bg'] }}>
                            <label className="mb-3 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white">
                                <span className="font-semibold text-slate-200">Theme</span>
                                <select
                                    value={themeId}
                                    onChange={(event) => updateTheme(event.target.value as (typeof publicThemes)[number]['id'])}
                                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/35 px-3 py-1.5 text-sm font-semibold text-white outline-none transition focus:border-lime-300"
                                    aria-label="Select public site theme"
                                >
                                    {publicThemes.map((theme) => (
                                        <option key={theme.id} value={theme.id}>
                                            {theme.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <nav className="flex flex-col gap-2">
                                {site.navigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-lime-300/40 hover:text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ) : null}
                </header>
                <main className="relative z-10">{children}</main>
                <footer className="relative z-10 border-t border-white/10 backdrop-blur" style={{ backgroundImage: activeTheme.vars['--footer-shell-bg'] }}>
                    <div className="mx-auto max-w-7xl px-6 py-14">
                        <div className="overflow-hidden rounded-[34px] border border-white/10 p-8 shadow-[0_25px_80px_rgba(2,6,23,0.32)]" style={{ backgroundImage: activeTheme.vars['--footer-card-bg'] }}>
                            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
                                <div>
                                    <Link href="/" className="flex items-center gap-4">
                                        <img src="/yandrixa-logo.png" alt={site.branding.name} className="h-16 w-16 rounded-2xl object-cover shadow-lg" />
                                        <div>
                                            <p className="text-2xl font-semibold text-white">{site.branding.name}</p>
                                            <p className="mt-1 text-sm uppercase tracking-[0.24em] text-lime-300">Build. Grow. Scale.</p>
                                        </div>
                                    </Link>
                                    <p className="mt-5 max-w-xl text-sm leading-8 text-slate-300">
                                        {site.content.footerDescription}
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <Link href="/contact" className="rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-lime-300">
                                            Start your project
                                        </Link>
                                        <Link href="/services" className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-lime-300/40 hover:bg-white/10">
                                            Explore services
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-lime-300">Quick Links</p>
                                    <div className="mt-5 grid gap-3">
                                        {site.navigation.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-lime-300/40 hover:bg-white/10 hover:text-white"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-lime-300">Contact</p>
                                    <div className="mt-5 grid gap-3">
                                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Email</p>
                                            <p className="mt-2 text-sm text-white">{site.contact.email || 'Update email in admin settings'}</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Phone</p>
                                            <p className="mt-2 text-sm text-white">{site.contact.phone || 'Update phone in admin settings'}</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">WhatsApp</p>
                                            <p className="mt-2 text-sm text-white">{site.contact.whatsapp || 'Update WhatsApp in admin settings'}</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Location</p>
                                            <p className="mt-2 text-sm text-white">{site.contact.location || 'Update location in admin settings'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                                <p>{site.branding.name} creates practical digital systems for business growth.</p>
                                <p>Designed for clarity, performance, and trust.</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
