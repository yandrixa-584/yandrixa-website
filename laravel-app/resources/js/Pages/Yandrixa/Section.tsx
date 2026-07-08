import { useForm } from '@inertiajs/react';

import { YandrixaPublicLayout } from '@/Layouts/YandrixaPublicLayout';
import type { SiteProps } from '@/types/yandrixa';

type SectionData = {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
};

export default function Section({
    site,
    slug,
    section,
}: {
    site: SiteProps;
    slug: string;
    section: SectionData;
}) {
    return (
        <YandrixaPublicLayout title={section.title} site={site}>
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">{section.eyebrow}</p>
                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">{section.title}</h2>
                        <p className="mt-4 text-base leading-8 text-slate-300">{section.description}</p>
                        <div className="mt-8 space-y-3">
                            {section.points.map((point) => (
                                <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                                    {point}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        {slug === 'contact' ? <ContactForm /> : null}
                        {slug === 'partners' ? <PartnerForm headline={site.partnerProgram.headline} disclosure={site.partnerProgram.disclosure} /> : null}
                        {!['contact', 'partners'].includes(slug) ? (
                            <div className="rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur">
                                <h3 className="text-2xl font-semibold text-white">Need a tailored solution?</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                    Yandrixa can shape websites, software, integrations, automation, and marketing support around your exact business requirements.
                                </p>
                                <a
                                    href="/contact"
                                    className="mt-6 inline-flex rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950"
                                >
                                    Discuss your project
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>
        </YandrixaPublicLayout>
    );
}

function ContactForm() {
    const form = useForm({
        fullName: '',
        businessName: '',
        email: '',
        phoneOrWhatsApp: '',
        country: '',
        serviceRequired: '',
        projectStage: '',
        budgetRange: '',
        expectedTimeline: '',
        preferredContactMethod: '',
        existingWebsiteUrl: '',
        projectDescription: '',
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                form.post('/contact');
            }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur"
        >
            <h3 className="text-2xl font-semibold text-white">Project enquiry form</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <TextField label="Full name" value={form.data.fullName} onChange={(value) => form.setData('fullName', value)} />
                <TextField label="Business name" value={form.data.businessName} onChange={(value) => form.setData('businessName', value)} />
                <TextField label="Email" type="email" value={form.data.email} onChange={(value) => form.setData('email', value)} />
                <TextField label="Phone or WhatsApp" value={form.data.phoneOrWhatsApp} onChange={(value) => form.setData('phoneOrWhatsApp', value)} />
                <TextField label="Country" value={form.data.country} onChange={(value) => form.setData('country', value)} />
                <TextField label="Service required" value={form.data.serviceRequired} onChange={(value) => form.setData('serviceRequired', value)} />
                <TextField label="Project stage" value={form.data.projectStage} onChange={(value) => form.setData('projectStage', value)} />
                <TextField label="Budget range" value={form.data.budgetRange} onChange={(value) => form.setData('budgetRange', value)} />
                <TextField label="Expected timeline" value={form.data.expectedTimeline} onChange={(value) => form.setData('expectedTimeline', value)} />
                <TextField
                    label="Preferred contact method"
                    value={form.data.preferredContactMethod}
                    onChange={(value) => form.setData('preferredContactMethod', value)}
                />
                <div className="md:col-span-2">
                    <TextField
                        label="Existing website URL"
                        value={form.data.existingWebsiteUrl}
                        onChange={(value) => form.setData('existingWebsiteUrl', value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <TextAreaField
                        label="Project description"
                        value={form.data.projectDescription}
                        onChange={(value) => form.setData('projectDescription', value)}
                    />
                </div>
            </div>
            <button type="submit" disabled={form.processing} className="mt-6 rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950">
                {form.processing ? 'Submitting...' : 'Submit enquiry'}
            </button>
        </form>
    );
}

function PartnerForm({ headline, disclosure }: { headline: string; disclosure: string }) {
    const form = useForm({
        fullName: '',
        email: '',
        phone: '',
        cityCountry: '',
        profession: '',
        experience: '',
        industries: '',
        leadMethods: '',
        expectedLeadsPerMonth: '',
        profileUrl: '',
        introduction: '',
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                form.post('/partners');
            }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur"
        >
            <h3 className="text-2xl font-semibold text-white">{headline}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{disclosure}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <TextField label="Full name" value={form.data.fullName} onChange={(value) => form.setData('fullName', value)} />
                <TextField label="Email" type="email" value={form.data.email} onChange={(value) => form.setData('email', value)} />
                <TextField label="Phone" value={form.data.phone} onChange={(value) => form.setData('phone', value)} />
                <TextField label="City and country" value={form.data.cityCountry} onChange={(value) => form.setData('cityCountry', value)} />
                <TextField label="Profession" value={form.data.profession} onChange={(value) => form.setData('profession', value)} />
                <TextField
                    label="Expected leads per month"
                    value={form.data.expectedLeadsPerMonth}
                    onChange={(value) => form.setData('expectedLeadsPerMonth', value)}
                />
                <div className="md:col-span-2">
                    <TextField label="Profile URL" value={form.data.profileUrl} onChange={(value) => form.setData('profileUrl', value)} />
                </div>
                <div className="md:col-span-2">
                    <TextAreaField label="Experience" value={form.data.experience} onChange={(value) => form.setData('experience', value)} />
                </div>
                <div className="md:col-span-2">
                    <TextAreaField label="Industries" value={form.data.industries} onChange={(value) => form.setData('industries', value)} />
                </div>
                <div className="md:col-span-2">
                    <TextAreaField label="Lead methods" value={form.data.leadMethods} onChange={(value) => form.setData('leadMethods', value)} />
                </div>
                <div className="md:col-span-2">
                    <TextAreaField label="Introduction" value={form.data.introduction} onChange={(value) => form.setData('introduction', value)} />
                </div>
            </div>
            <button type="submit" disabled={form.processing} className="mt-6 rounded-2xl bg-lime-400 px-5 py-3 text-sm font-semibold text-slate-950">
                {form.processing ? 'Submitting...' : 'Submit application'}
            </button>
        </form>
    );
}

function TextField({
    label,
    value,
    onChange,
    type = 'text',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-400"
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
            <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-lime-400"
            />
        </label>
    );
}
