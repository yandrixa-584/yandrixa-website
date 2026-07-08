import { useForm } from '@inertiajs/react';

import { YandrixaAdminLayout } from '@/Layouts/YandrixaAdminLayout';
import type { SiteProps } from '@/types/yandrixa';

export default function EditRecordPage({
    site,
    module,
    record,
}: {
    site: SiteProps;
    module: string;
    record: Record<string, unknown>;
}) {
    const form = useForm(record as Record<string, string>);
    const isLandingPage = module === 'landing-pages';

    const fields =
        module === 'enquiries'
            ? [
                  'fullName',
                  'businessName',
                  'email',
                  'phoneOrWhatsApp',
                  'country',
                  'serviceRequired',
                  'projectStage',
                  'budgetRange',
                  'expectedTimeline',
                  'preferredContactMethod',
                  'existingWebsiteUrl',
                  'projectDescription',
              ]
            : module === 'marketing-partners'
              ? [
                    'fullName',
                    'email',
                    'phone',
                    'cityCountry',
                    'profession',
                    'experience',
                    'industries',
                    'leadMethods',
                    'expectedLeadsPerMonth',
                    'profileUrl',
                    'introduction',
                ]
              : [
                    'slug',
                    'status',
                    'title',
                    'eyebrow',
                    'summary',
                    'primaryCtaLabel',
                    'primaryCtaHref',
                    'secondaryCtaLabel',
                    'secondaryCtaHref',
                    'bodyTitle',
                    'bodyContent',
                ];

    return (
        <YandrixaAdminLayout title="Edit Record" site={site}>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-3xl font-semibold text-slate-950">Edit record</h2>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.put(`/admin/${module}/${record.id}`);
                    }}
                    className="mt-6 grid gap-4 md:grid-cols-2"
                >
                    {fields.map((field) => {
                        const multiline = ['projectDescription', 'experience', 'industries', 'leadMethods', 'introduction', 'summary', 'bodyContent'].includes(field);

                        if (multiline) {
                            return (
                                <div key={field} className="md:col-span-2">
                                    <TextAreaField
                                        label={labelize(field)}
                                        value={String(form.data[field] || '')}
                                        onChange={(value) => form.setData(field, value)}
                                    />
                                </div>
                            );
                        }

                        return (
                            <TextField
                                key={field}
                                label={labelize(field)}
                                value={String(form.data[field] || '')}
                                onChange={(value) => form.setData(field, value)}
                            />
                        );
                    })}

                    {isLandingPage ? (
                        <div className="md:col-span-2">
                            <TextAreaField
                                label="Hero points"
                                value={String((record.heroPoints as string[] | undefined)?.join('\n') || '')}
                                onChange={(value) => form.setData('heroPoints_text', value)}
                            />
                        </div>
                    ) : null}

                    <div className="md:col-span-2">
                        <button type="submit" disabled={form.processing} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                            {form.processing ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
        </YandrixaAdminLayout>
    );
}

function TextField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
            />
        </label>
    );
}

function TextAreaField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            <textarea
                rows={5}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
            />
        </label>
    );
}

function labelize(value: string) {
    return value.replace(/([A-Z])/g, ' $1').replaceAll('_', ' ').trim();
}
