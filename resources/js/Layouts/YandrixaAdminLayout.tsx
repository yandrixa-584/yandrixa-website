import { Head, Link, router, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

import { FlashToast } from '@/Components/Yandrixa/FlashToast';
import type { FlashProps, SiteProps } from '@/types/yandrixa';

export function YandrixaAdminLayout({
    title,
    site,
    children,
}: PropsWithChildren<{
    title: string;
    site: SiteProps;
}>) {
    const page = usePage<any>();
    const authenticated = Boolean(page.props.admin?.authenticated);
    const currentPath = page.url || '';
    const navItems = [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Contacts', href: '/admin/contacts' },
        { label: 'Enquiries', href: '/admin/enquiries' },
        { label: 'Leads', href: '/admin/leads' },
        { label: 'Marketing Partners', href: '/admin/marketing-partners' },
        { label: 'Landing Pages', href: '/admin/landing-pages' },
        { label: 'Settings', href: '/admin/settings' },
    ];

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-slate-100 text-slate-900">
                <FlashToast success={page.props.flash?.success} error={page.props.flash?.error} />
                <div className={`grid min-h-screen ${authenticated ? 'lg:grid-cols-[280px_minmax(0,1fr)]' : ''}`}>
                    {authenticated ? (
                        <aside className="flex flex-col bg-slate-950 px-6 py-8 text-white">
                            <Link href="/" className="flex items-center gap-4">
                                <img src="/yandrixa-logo.png" alt={site.branding.name} className="h-14 w-14 rounded-2xl object-cover shadow-lg" />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime-300">
                                        Admin Panel
                                    </p>
                                    <h1 className="mt-1 text-2xl font-semibold">Yandrixa</h1>
                                </div>
                            </Link>
                            <p className="mt-2 text-sm text-slate-400">{page.props.admin?.email || 'Admin session'}</p>
                            <div className="mt-8 flex-1 space-y-2">
                                {navItems.map((item) => (
                                    <Link key={item.href} href={item.href} className={navClass(isActiveRoute(currentPath, item.href))}>
                                        {item.label}
                                    </Link>
                                ))}
                                <Link href="/admin/profile" className={navClass(isActiveRoute(currentPath, '/admin/profile'))}>
                                    Profile
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => router.post('/admin/logout')}
                                    className="block w-full rounded-2xl bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10"
                                >
                                    Logout
                                </button>
                                <Link href="/" className="block rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
                                    View Public Site
                                </Link>
                            </div>
                        </aside>
                    ) : null}
                    <main className="p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </>
    );
}

function isActiveRoute(currentPath: string, href: string) {
    if (href === '/admin') {
        return currentPath === '/admin';
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
}

function navClass(active: boolean) {
    return `block rounded-2xl px-4 py-3 text-sm transition ${
        active
            ? 'bg-lime-400 text-slate-950 font-semibold shadow-lg shadow-lime-400/20'
            : 'bg-white/5 text-slate-200 hover:bg-white/10'
    }`;
}
