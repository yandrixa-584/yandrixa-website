import Link from "next/link";

import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

type AdminNavItem = {
  label: string;
  href: string;
  description: string;
  shortLabel: string;
};

const adminNavItems: AdminNavItem[] = [
  { label: "Overview", href: "/admin", description: "Snapshot and quick metrics", shortLabel: "OV" },
  { label: "Contacts", href: "/admin/contacts", description: "Unique contact list", shortLabel: "CT" },
  { label: "Leads", href: "/admin/leads", description: "Qualified enquiry pipeline", shortLabel: "LD" },
  { label: "Enquiries", href: "/admin/enquiries", description: "Project enquiries", shortLabel: "EN" },
  { label: "Marketing Partners", href: "/admin/marketing-partners", description: "Partner applications", shortLabel: "MP" },
  { label: "Landing Pages", href: "/admin/landing-pages", description: "Dynamic campaign pages", shortLabel: "LP" },
  { label: "Settings", href: "/admin/settings", description: "Shared site settings", shortLabel: "ST" }
];

export function AdminShell({
  currentPath,
  children
}: {
  currentPath: string;
  children: React.ReactNode;
}) {
  const currentItem = adminNavItems.find((item) => item.href === currentPath) ?? adminNavItems[0];

  return (
    <div className="min-h-screen bg-[#eef3f9] text-slate-900">
      <div className="min-h-screen lg:grid lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="flex border-b border-slate-200 bg-[#0f172a] px-5 py-6 text-slate-200 lg:min-h-screen lg:flex-col lg:border-b-0 lg:border-r lg:border-r-slate-800">
          <div className="w-full">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-300 text-sm font-bold text-slate-950">
              YX
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">Yandrixa Admin</p>
              <p className="mt-1 text-sm text-slate-400">Business control workspace</p>
            </div>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Current module</p>
            <p className="mt-3 text-xl font-semibold text-white">{currentItem.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{currentItem.description}</p>
          </div>

          <nav className="mt-8 space-y-2">
            {adminNavItems.map((item) => {
              const active = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    active ? "bg-sky-500 text-slate-950 shadow-[0_18px_40px_rgba(14,165,233,0.35)]" : "text-slate-300 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl text-xs font-bold ${
                      active ? "bg-slate-950/10 text-slate-950" : "bg-white/8 text-slate-200"
                    }`}
                  >
                    {item.shortLabel}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className={`block text-xs ${active ? "text-slate-900/75" : "text-slate-400"}`}>{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-200">Workspace status</p>
            <p className="mt-3 text-sm font-semibold text-white">Live admin environment</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50/80">
              Manage contacts, enquiries, landing pages, and business settings from this separate back-office panel.
            </p>
          </div>
          </div>

          <div className="mt-8 w-full lg:mt-auto">
            <AdminLogoutButton />
          </div>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-slate-200 bg-white/90 px-5 py-5 backdrop-blur lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="admin-kicker">Admin Workspace</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{currentItem.label}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{currentItem.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/" className="admin-button-secondary">
                  View website
                </Link>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">Superadmin session active</div>
              </div>
            </div>
          </header>

          <main className="p-5 lg:p-8">
            <div className="min-w-0">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
