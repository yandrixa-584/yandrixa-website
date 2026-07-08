import { router, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { YandrixaAdminLayout } from '@/Layouts/YandrixaAdminLayout';
import type { SiteProps } from '@/types/yandrixa';

export default function SettingsPage({
    site,
    settings,
    mode = 'settings',
}: {
    site: SiteProps;
    settings: Record<string, any>;
    mode?: 'profile' | 'settings';
}) {
    const form = useForm<any>({
        ...settings,
        'content.trustPoints_text': (settings.content?.trustPoints || []).join('\n'),
    });

    const isProfileMode = mode === 'profile';

    return (
        <YandrixaAdminLayout title="Settings" site={site}>
            <div className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-600">{isProfileMode ? 'Profile' : 'Settings'}</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                        {isProfileMode ? 'Admin profile and business identity' : 'Central placeholder and content management'}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                        {isProfileMode
                            ? 'Manage the admin-facing identity, logo-linked business name, and main contact details used across the platform.'
                            : 'Update email, phone, WhatsApp, location, branding, and core messaging here. Changes reflect across the Laravel site wherever these shared values are used.'}
                    </p>
                </div>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        router.put('/admin/settings', {
                            ...form.data,
                            content: {
                                ...form.data.content,
                            },
                            analytics: {
                                ...form.data.analytics,
                                enabled: Boolean(form.data.analytics?.enabled),
                                requiresConsent: Boolean(form.data.analytics?.requiresConsent),
                            },
                            'content.trustPoints_text': form.data['content.trustPoints_text'],
                        });
                    }}
                    className="space-y-6"
                >
                    {isProfileMode ? (
                        <>
                            <SettingsCard title="Branding">
                                <SettingsInput form={form} path={['branding', 'name']} label="Brand name" />
                                <SettingsInput form={form} path={['branding', 'brand']} label="Short brand" />
                                <SettingsInput form={form} path={['branding', 'subBrand']} label="Sub brand" />
                                <SettingsInput form={form} path={['branding', 'tagline']} label="Tagline" />
                                <SettingsInput form={form} path={['branding', 'domain']} label="Domain" />
                            </SettingsCard>

                            <SettingsCard title="Contact placeholders">
                                <SettingsInput form={form} path={['contact', 'email']} label="Email" />
                                <SettingsInput form={form} path={['contact', 'phone']} label="Phone" />
                                <SettingsInput form={form} path={['contact', 'whatsapp']} label="WhatsApp" />
                                <SettingsInput form={form} path={['contact', 'location']} label="Location" />
                            </SettingsCard>
                        </>
                    ) : (
                        <>
                            <SettingsCard title="SEO and footer">
                                <SettingsInput form={form} path={['seo', 'siteUrl']} label="Site URL" />
                                <SettingsInput form={form} path={['seo', 'defaultTitle']} label="Default title" />
                                <SettingsInput form={form} path={['seo', 'titleTemplate']} label="Title template" />
                                <div className="md:col-span-2">
                                    <SettingsTextArea form={form} path={['seo', 'siteDescription']} label="Site description" />
                                </div>
                                <div className="md:col-span-2">
                                    <SettingsTextArea form={form} path={['content', 'footerDescription']} label="Footer description" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block">
                                        <span className="mb-2 block text-sm font-medium text-slate-700">Trust points</span>
                                        <textarea
                                            rows={5}
                                            value={String(form.data['content.trustPoints_text'] || '')}
                                            onChange={(event) => form.setData('content.trustPoints_text', event.target.value)}
                                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
                                        />
                                    </label>
                                </div>
                            </SettingsCard>

                            <SettingsCard title="Partner program">
                                <SettingsInput form={form} path={['partnerProgram', 'headline']} label="Headline" />
                                <SettingsInput form={form} path={['partnerProgram', 'commissionPercentage']} label="Commission percentage" />
                                <div className="md:col-span-2">
                                    <SettingsTextArea form={form} path={['partnerProgram', 'disclosure']} label="Disclosure" />
                                </div>
                            </SettingsCard>
                        </>
                    )}

                    <button type="submit" disabled={form.processing} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                        {form.processing ? 'Saving...' : isProfileMode ? 'Save profile' : 'Save settings'}
                    </button>
                </form>
            </div>
        </YandrixaAdminLayout>
    );
}

function SettingsCard({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">{title}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">{children}</div>
        </div>
    );
}

function SettingsInput({
    form,
    path,
    label,
}: {
    form: any;
    path: [string, string];
    label: string;
}) {
    const [group, field] = path;

    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            <input
                value={String(form.data[group]?.[field] || '')}
                onChange={(event) =>
                    form.setData(group, {
                        ...form.data[group],
                        [field]: event.target.value,
                    })
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
            />
        </label>
    );
}

function SettingsTextArea({
    form,
    path,
    label,
}: {
    form: any;
    path: [string, string];
    label: string;
}) {
    const [group, field] = path;

    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            <textarea
                rows={4}
                value={String(form.data[group]?.[field] || '')}
                onChange={(event) =>
                    form.setData(group, {
                        ...form.data[group],
                        [field]: event.target.value,
                    })
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
            />
        </label>
    );
}
