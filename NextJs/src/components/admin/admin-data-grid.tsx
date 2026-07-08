"use client";

import { useMemo, useState } from "react";

import { AdminRecordActions } from "@/components/admin/admin-record-actions";

export type AdminGridColumn = {
  key: string;
  label: string;
};

export type AdminGridFilter = {
  key: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export type AdminGridRow = {
  id: string;
  [key: string]: string;
};

export function AdminDataGrid({
  rows,
  columns,
  searchKeys,
  filters = [],
  emptyMessage
}: {
  rows: AdminGridRow[];
  columns: AdminGridColumn[];
  searchKeys: string[];
  filters?: AdminGridFilter[];
  emptyMessage: string;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    Object.fromEntries(filters.map((filter) => [filter.key, "all"]))
  );

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        !query ||
        searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(query));

      const matchesFilters = filters.every((filter) => {
        const selected = filterValues[filter.key] ?? "all";
        if (selected === "all") {
          return true;
        }

        return String(row[filter.key] ?? "") === selected;
      });

      return matchesSearch && matchesFilters;
    });
  }, [filterValues, filters, rows, search, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const paginatedRows = filteredRows.slice(pageStart, pageStart + pageSize);

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const hasActions = rows.some((row) => row.viewHref && row.editHref && row.entity);

  return (
    <div className="admin-panel overflow-hidden">
      <div className="border-b border-slate-200 p-5">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.7fr))]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Search</span>
            <input
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search records"
              className="admin-input"
            />
          </label>

          {filters.map((filter) => (
            <label key={filter.key} className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">{filter.label}</span>
              <select
                value={filterValues[filter.key] ?? "all"}
                onChange={(event) => handleFilterChange(filter.key, event.target.value)}
                className="admin-select"
              >
                <option value="all">All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Rows per page</span>
            <select value={String(pageSize)} onChange={(event) => handlePageSizeChange(event.target.value)} className="admin-select">
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
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
                >
                  {column.label}
                </th>
              ))}
              {hasActions ? (
                <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {paginatedRows.length ? (
              paginatedRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 align-top text-sm text-slate-700">
                      <span className="block min-w-[120px] whitespace-pre-line">{row[column.key] || "-"}</span>
                    </td>
                  ))}
                  {hasActions ? (
                    <td className="px-4 py-3 align-top">
                      <AdminRecordActions
                        entity={row.entity as "enquiries" | "partners" | "landing-pages"}
                        recordId={row.id}
                        viewHref={row.viewHref}
                        editHref={row.editHref}
                        deleted={row.deleted === "true"}
                      />
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (hasActions ? 1 : 0)} className="px-4 py-10 text-center text-sm text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing {filteredRows.length ? pageStart + 1 : 0} to {Math.min(pageStart + pageSize, filteredRows.length)} of {filteredRows.length} records
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
            className="admin-button-secondary px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={currentPage === totalPages}
            className="admin-button-secondary px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
