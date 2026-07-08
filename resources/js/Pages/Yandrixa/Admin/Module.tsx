import { AdminDataGrid } from '@/Components/Yandrixa/AdminDataGrid';
import { YandrixaAdminLayout } from '@/Layouts/YandrixaAdminLayout';
import type { SiteProps } from '@/types/yandrixa';

export default function ModulePage({
    site,
    module,
    records,
}: {
    site: SiteProps;
    module: string;
    records: Array<Record<string, string | null>>;
}) {
    const config = moduleConfig(module);

    const rows = records.map((record) => ({
        ...record,
        module,
        actionModule: String(record.actionModule || module),
        status: record.deletedAt ? 'Deleted' : String(record.status || 'Active'),
        createdAt: formatDate(record.createdAt),
    }));

    const filters = [...config.filters].map((filter) => ({
        ...filter,
        options: [...new Set(rows.map((row) => String((row as Record<string, string | null | undefined>)[filter.key] || '')).filter(Boolean))],
    }));

    return (
        <YandrixaAdminLayout title={config.title} site={site}>
            <div className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-600">{config.kicker}</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-950">{config.title}</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{config.description}</p>
                </div>
                <AdminDataGrid columns={[...config.columns]} rows={rows} filters={filters} />
            </div>
        </YandrixaAdminLayout>
    );
}

function moduleConfig(module: string) {
    const configs = {
        contacts: {
            kicker: 'Contacts',
            title: 'Converted contacts list',
            description: 'Combined contact records derived from enquiries and marketing partner submissions.',
            columns: [
                { key: 'createdAt', label: 'Created' },
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'source', label: 'Source' },
                { key: 'company', label: 'Company / Role' },
                { key: 'location', label: 'Location' },
                { key: 'status', label: 'Status' },
            ],
            filters: [
                { key: 'source', label: 'Source' },
                { key: 'status', label: 'Status' },
            ],
        },
        enquiries: {
            kicker: 'Enquiries',
            title: 'Project enquiries',
            description: 'All website, software, and business solution enquiries submitted through the public site.',
            columns: [
                { key: 'createdAt', label: 'Created' },
                { key: 'fullName', label: 'Name' },
                { key: 'businessName', label: 'Business' },
                { key: 'email', label: 'Email' },
                { key: 'phoneOrWhatsApp', label: 'Phone / WhatsApp' },
                { key: 'serviceRequired', label: 'Service' },
                { key: 'budgetRange', label: 'Budget' },
                { key: 'status', label: 'Status' },
            ],
            filters: [
                { key: 'serviceRequired', label: 'Service' },
                { key: 'budgetRange', label: 'Budget' },
                { key: 'status', label: 'Status' },
            ],
        },
        leads: {
            kicker: 'Leads',
            title: 'Qualified leads',
            description: 'Enquiries that meet the lead qualification budget ranges and can be treated as higher-value leads.',
            columns: [
                { key: 'createdAt', label: 'Created' },
                { key: 'fullName', label: 'Name' },
                { key: 'businessName', label: 'Business' },
                { key: 'email', label: 'Email' },
                { key: 'serviceRequired', label: 'Service' },
                { key: 'budgetRange', label: 'Budget' },
                { key: 'expectedTimeline', label: 'Timeline' },
                { key: 'status', label: 'Status' },
            ],
            filters: [
                { key: 'serviceRequired', label: 'Service' },
                { key: 'budgetRange', label: 'Budget' },
                { key: 'status', label: 'Status' },
            ],
        },
        'marketing-partners': {
            kicker: 'Marketing partners',
            title: 'Digital marketers and partner applications',
            description: 'Independent partner applications with expected lead volume, industries, and channel details.',
            columns: [
                { key: 'createdAt', label: 'Created' },
                { key: 'fullName', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'cityCountry', label: 'City / Country' },
                { key: 'profession', label: 'Profession' },
                { key: 'expectedLeadsPerMonth', label: 'Expected Leads' },
                { key: 'status', label: 'Status' },
            ],
            filters: [
                { key: 'profession', label: 'Profession' },
                { key: 'status', label: 'Status' },
            ],
        },
        'landing-pages': {
            kicker: 'Landing pages',
            title: 'Dynamic landing pages',
            description: 'Campaign pages with editable headline, summary, CTAs, and body content.',
            columns: [
                { key: 'createdAt', label: 'Created' },
                { key: 'title', label: 'Title' },
                { key: 'slug', label: 'Slug' },
                { key: 'status', label: 'Status' },
                { key: 'primaryCtaLabel', label: 'Primary CTA' },
                { key: 'secondaryCtaLabel', label: 'Secondary CTA' },
            ],
            filters: [
                { key: 'status', label: 'Status' },
            ],
        },
    } as const;

    return configs[module as keyof typeof configs] || configs.enquiries;
}

function formatDate(value: string | null | undefined) {
    if (!value) {
        return '-';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString();
}
