import { Link, useForm } from '@inertiajs/react';

import { YandrixaAdminGuestLayout } from '@/Layouts/YandrixaAdminGuestLayout';
import type { SiteProps } from '@/types/yandrixa';

export default function Login({
    site,
    defaults,
}: {
    site: SiteProps;
    defaults: {
        email: string;
        password: string;
    };
}) {
    const form = useForm({
        email: defaults.email,
        password: defaults.password,
    });

    return (
        <YandrixaAdminGuestLayout title="Admin Login" site={site}>
            <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <Link href="/" className="mb-6 inline-flex items-center gap-4">
                    <img src="/yandrixa-logo.png" alt={site.branding.name} className="h-14 w-14 rounded-2xl object-cover shadow-lg" />
                    <span className="text-base font-semibold text-slate-950">{site.branding.name}</span>
                </Link>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-600">Admin Login</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">Sign in to the Yandrixa admin panel</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                    Use the current admin credentials below or change them later through environment configuration.
                </p>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.post('/admin/login');
                    }}
                    className="mt-6 space-y-4"
                >
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                        <input
                            type="email"
                            value={form.data.email}
                            onChange={(event) => form.setData('email', event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
                        />
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                        <input
                            type="password"
                            value={form.data.password}
                            onChange={(event) => form.setData('password', event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
                        />
                    </label>
                    <button type="submit" disabled={form.processing} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                        {form.processing ? 'Signing in...' : 'Login to Admin'}
                    </button>
                </form>
            </div>
        </YandrixaAdminGuestLayout>
    );
}
