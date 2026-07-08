import { Link, router } from '@inertiajs/react';

import { YandrixaAdminLayout } from '@/Layouts/YandrixaAdminLayout';
import type { SiteProps } from '@/types/yandrixa';

export default function RecordPage({
    site,
    module,
    record,
}: {
    site: SiteProps;
    module: string;
    record: Record<string, unknown>;
}) {
    const entries = Object.entries(record).filter(([key]) => key !== 'id');
    const deleted = Boolean(record.deletedAt);

    return (
        <YandrixaAdminLayout title="Record Details" site={site}>
            <div className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-600">{module.replaceAll('-', ' ')}</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-950">Record details</h2>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={`/admin/${module}/${record.id}/edit`} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                            Edit record
                        </Link>
                        {!deleted ? (
                            <button
                                type="button"
                                onClick={() => {
                                    if (!window.confirm('Delete this record?')) {
                                        return;
                                    }
                                    router.post(`/admin/${module}/${record.id}/delete`);
                                }}
                                className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800"
                            >
                                Delete
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    if (!window.confirm('Restore this record?')) {
                                        return;
                                    }
                                    router.post(`/admin/${module}/${record.id}/restore`);
                                }}
                                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
                            >
                                Restore
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => {
                                if (!window.confirm('Permanently delete this record? This cannot be undone.')) {
                                    return;
                                }
                                router.delete(`/admin/${module}/${record.id}`);
                            }}
                            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800"
                        >
                            Permanent Delete
                        </button>
                    </div>
                </div>
                <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                    <div className="grid divide-y divide-slate-200">
                        {entries.map(([key, value]) => (
                            <div key={key} className="grid gap-3 px-6 py-4 md:grid-cols-[220px_minmax(0,1fr)]">
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{labelize(key)}</p>
                                <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{formatValue(value)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </YandrixaAdminLayout>
    );
}

function labelize(value: string) {
    return value.replace(/([A-Z])/g, ' $1').replaceAll('_', ' ').trim();
}

function formatValue(value: unknown) {
    if (Array.isArray(value)) {
        return value.join('\n');
    }

    return String(value ?? '-');
}
