import Link from "next/link";

export function AdminRecordDetail({
  title,
  editHref,
  children
}: {
  title: string;
  editHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="admin-panel flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="admin-kicker">Record view</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2>
        </div>
        <Link href={editHref} className="admin-button-primary">
          Edit record
        </Link>
      </div>
      <div className="admin-panel p-6">{children}</div>
    </div>
  );
}

export function DetailGrid({
  items
}: {
  items: Array<{
    label: string;
    value: string;
  }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="admin-soft-panel p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-900">{item.value || "-"}</p>
        </div>
      ))}
    </div>
  );
}
