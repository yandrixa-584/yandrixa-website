import { Head, Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

import { FlashToast } from '@/Components/Yandrixa/FlashToast';
import type { SiteProps } from '@/types/yandrixa';

export function YandrixaAdminGuestLayout({
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
            <div className="min-h-screen bg-slate-100 text-slate-900">
                <FlashToast success={page.props.flash?.success} error={page.props.flash?.error} />
                <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
                    <div className="grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
                            <Link href="/" className="inline-flex items-center gap-4">
                                <img src="/yandrixa-logo.png" alt={site.branding.name} className="h-16 w-16 rounded-2xl object-cover shadow-lg" />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime-300">
                                        {site.branding.brand} Admin
                                    </p>
                                </div>
                            </Link>
                            <h1 className="mt-4 text-4xl font-semibold">{site.branding.name}</h1>
                            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                                Sign in to manage contacts, enquiries, leads, marketing partners, landing pages, and
                                shared site settings.
                            </p>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
