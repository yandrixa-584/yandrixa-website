import { Head, Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

import { FlashToast } from '@/Components/Yandrixa/FlashToast';
import type { FlashProps, SiteProps } from '@/types/yandrixa';

export function YandrixaPublicLayout({
    title,
    site,
    children,
}: PropsWithChildren<{
    title: string;
    site: SiteProps;
}>) {
    const page = usePage<any>();

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <FlashToast success={page.props.flash?.success} error={page.props.flash?.error} />
                <div className="fixed inset-0 bg-[url('/site-atmosphere-generated.png')] bg-cover bg-center opacity-25" />
                <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.2),transparent_38%),radial-gradient(circle_at_top_right,rgba(132,204,22,0.18),transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.92),rgba(2,6,23,0.98))]" />
                <header className="relative z-10 border-b border-white/10 bg-slate-950/60 backdrop-blur">
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
                    </div>
                </header>
                <main className="relative z-10">{children}</main>
                <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.4fr_1fr]">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">{site.branding.name}</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                                {site.content.footerDescription}
                            </p>
                        </div>
                        <div className="grid gap-3 text-sm text-slate-300">
                            <p>{site.contact.email || 'Update email in admin settings'}</p>
                            <p>{site.contact.phone || 'Update phone in admin settings'}</p>
                            <p>{site.contact.whatsapp || 'Update WhatsApp in admin settings'}</p>
                            <p>{site.contact.location || 'Update location in admin settings'}</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
