import { Link } from '@inertiajs/react';

import { YandrixaAdminLayout } from '@/Layouts/YandrixaAdminLayout';
import type { SiteProps } from '@/types/yandrixa';

export default function Dashboard({
    site,
    summary,
    recentEnquiries,
    recentPartners,
}: {
    site: SiteProps;
    summary: Record<string, number>;
    recentEnquiries: Array<Record<string, string>>;
    recentPartners: Array<Record<string, string>>;
}) {
    const cards = [
        { label: 'Contacts', value: summary.contacts, href: '/admin/contacts' },
        { label: 'Enquiries', value: summary.enquiries, href: '/admin/enquiries' },
        { label: 'Leads', value: summary.leads, href: '/admin/leads' },
        { label: 'Marketing Partners', value: summary.marketingPartners, href: '/admin/marketing-partners' },
        { label: 'Landing Pages', value: summary.landingPages, href: '/admin/landing-pages' },
    ];

    return (
        <YandrixaAdminLayout title="Admin Dashboard" site={site}>
            <div className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-600">Admin Overview</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-950">Separate Laravel admin workspace</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                        Manage enquiries, leads, contacts, marketing partners, landing pages, and site-wide placeholder content from one side panel.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {cards.map((card) => (
                        <Link key={card.label} href={card.href} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1">
                            <p className="text-sm text-slate-500">{card.label}</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-950">{card.value}</p>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    <RecentList title="Recent enquiries" items={recentEnquiries} fields={['fullName', 'serviceRequired', 'budgetRange']} />
                    <RecentList title="Recent partner applications" items={recentPartners} fields={['fullName', 'profession', 'expectedLeadsPerMonth']} />
                </div>
            </div>
        </YandrixaAdminLayout>
    );
}

function RecentList({
    title,
    items,
    fields,
}: {
    title: string;
    items: Array<Record<string, string>>;
    fields: string[];
}) {
    return (
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
            <div className="mt-5 space-y-3">
                {items.length ? (
                    items.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <p className="font-semibold text-slate-900">{item[fields[0]] || 'Record'}</p>
                            <p className="mt-1 text-sm text-slate-600">
                                {fields.slice(1).map((field) => item[field]).filter(Boolean).join(' • ')}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-500">No records yet.</p>
                )}
            </div>
        </div>
    );
}
