import { Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type RecordValue = Record<string, string | null | undefined>;

type Column = {
    key: string;
    label: string;
};

type Filter = {
    key: string;
    label: string;
    options: string[];
};

function actionPath(module: string, id: string, action: 'delete' | 'restore') {
    return `/admin/${module}/${id}/${action}`;
}

export function AdminDataGrid({
    columns,
    rows,
    filters,
}: {
    columns: Column[];
    rows: RecordValue[];
    filters: Filter[];
}) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filterValues, setFilterValues] = useState<Record<string, string>>(
        Object.fromEntries(filters.map((filter) => [filter.key, 'all'])),
    );

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        return rows.filter((row) => {
            const matchesSearch =
                !query ||
                Object.values(row).some((value) =>
                    String(value ?? '')
                        .toLowerCase()
                        .includes(query),
                );

            const matchesFilters = filters.every((filter) => {
                const selected = filterValues[filter.key] || 'all';
                if (selected === 'all') {
                    return true;
                }

                return String(row[filter.key] ?? '') === selected;
            });

            return matchesSearch && matchesFilters;
        });
    }, [filterValues, filters, rows, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * pageSize;
    const visibleRows = filtered.slice(start, start + pageSize);

    return (
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.7fr))]">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Search</span>
                        <input
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search records"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
                        />
                    </label>

                    {filters.map((filter) => (
                        <label key={filter.key} className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-700">{filter.label}</span>
                            <select
                                value={filterValues[filter.key] || 'all'}
                                onChange={(event) => {
                                    setFilterValues((current) => ({ ...current, [filter.key]: event.target.value }));
                                    setPage(1);
                                }}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
                            >
                                <option value="all">All</option>
                                {filter.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ))}

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Rows</span>
                        <select
                            value={String(pageSize)}
                            onChange={(event) => {
                                setPageSize(Number(event.target.value));
                                setPage(1);
                            }}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-500"
                        >
                            {[10, 20, 30, 50].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                                >
                                    {column.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {visibleRows.length ? (
                            visibleRows.map((row) => {
                                const module = String(row.actionModule || row.module || '');
                                const id = String(row.id || '');
                                const deleted = Boolean(row.deletedAt);

                                return (
                                    <tr key={id} className="hover:bg-slate-50">
                                        {columns.map((column) => (
                                            <td key={column.key} className="px-4 py-3 align-top text-sm text-slate-700">
                                                <span className="block min-w-[120px] whitespace-pre-line">
                                                    {row[column.key] || '-'}
                                                </span>
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    href={`/admin/${module}/${id}`}
                                                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/${module}/${id}/edit`}
                                                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                                                >
                                                    Edit
                                                </Link>
                                                {!deleted ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (!window.confirm('Delete this record?')) {
                                                                return;
                                                            }

                                                            router.post(actionPath(module, id, 'delete'));
                                                        }}
                                                        className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800"
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

                                                            router.post(actionPath(module, id, 'restore'));
                                                        }}
                                                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800"
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

                                                        router.delete(`/admin/${module}/${id}`);
                                                    }}
                                                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-800"
                                                >
                                                    Permanent Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-sm text-slate-500">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>
                    Showing {filtered.length ? start + 1 : 0} to {Math.min(start + pageSize, filtered.length)} of {filtered.length}{' '}
                    records
                </p>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                        disabled={currentPage === 1}
                        className="rounded-xl border border-slate-200 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="rounded-xl bg-slate-100 px-3 py-2 font-medium text-slate-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-xl border border-slate-200 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
