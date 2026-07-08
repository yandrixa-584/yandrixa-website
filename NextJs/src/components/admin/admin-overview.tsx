import type { AdminDataStore } from "@/types/admin";

export function AdminOverview({ data }: { data: AdminDataStore }) {
  const uniqueContacts = new Map<string, { name: string; email: string; source: string }>();

  data.enquiries.forEach((item) => {
    uniqueContacts.set(item.email, { name: item.fullName, email: item.email, source: "Project enquiry" });
  });

  data.partnerApplications.forEach((item) => {
    uniqueContacts.set(item.email, { name: item.fullName, email: item.email, source: "Marketing partner" });
  });

  const publishedLandingPages = data.landingPages.filter((item) => item.status === "published");

  return (
    <div className="space-y-6">
      <div className="admin-panel overflow-hidden">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-sky-900 px-6 py-7 text-white">
          <p className="admin-kicker text-sky-300">Overview</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Operations dashboard</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Keep track of website enquiries, partner applications, active campaign pages, and the most important incoming business signals in one focused workspace.
          </p>
        </div>
        <div className="grid gap-4 border-t border-slate-200 p-6 md:grid-cols-3">
          <StatusStrip label="Incoming pipeline" value={`${data.enquiries.length} new enquiries`} />
          <StatusStrip label="Partner channel" value={`${data.partnerApplications.length} active applications`} />
          <StatusStrip label="Campaign pages" value={`${publishedLandingPages.length} published pages`} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Contacts" value={String(uniqueContacts.size)} detail="Unique people captured from all forms" />
        <MetricCard label="Leads" value={String(data.enquiries.length)} detail="Project enquiry records currently stored" />
        <MetricCard label="Partners" value={String(data.partnerApplications.length)} detail="Marketing and referral partner applicants" />
        <MetricCard label="Live pages" value={String(publishedLandingPages.length)} detail="Published dynamic landing pages" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="admin-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="admin-kicker">Recent activity</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">Latest project enquiries</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Website forms</span>
          </div>
          <div className="mt-5 space-y-4">
            {data.enquiries.slice(0, 5).map((item) => (
              <div key={item.id} className="admin-soft-panel p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{item.fullName}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.businessName} • {item.email} • {item.phoneOrWhatsApp}
                    </p>
                  </div>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">{item.serviceRequired}</span>
                </div>
              </div>
            ))}
            {!data.enquiries.length ? <EmptyLine text="No enquiries saved yet." /> : null}
          </div>
        </div>

        <div className="space-y-6">
          <div className="admin-panel p-6">
            <p className="admin-kicker">Quick snapshot</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">Pipeline health</h3>
            <div className="mt-5 space-y-4">
              <ProgressRow label="Contacts captured" value={uniqueContacts.size} total={Math.max(uniqueContacts.size, 10)} colorClass="bg-sky-500" />
              <ProgressRow label="Qualified enquiries" value={data.enquiries.length} total={Math.max(data.enquiries.length, 10)} colorClass="bg-violet-500" />
              <ProgressRow label="Partners onboarded" value={data.partnerApplications.length} total={Math.max(data.partnerApplications.length, 10)} colorClass="bg-emerald-500" />
            </div>
          </div>

          <div className="admin-panel p-6">
            <h3 className="text-xl font-semibold text-slate-950">Recent partner applications</h3>
            <div className="mt-5 space-y-4">
              {data.partnerApplications.slice(0, 4).map((item) => (
                <div key={item.id} className="admin-soft-panel p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-slate-950">{item.fullName}</p>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      {item.profession}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    {item.email} • {item.phone} • {item.cityCountry}
                  </p>
                </div>
              ))}
              {!data.partnerApplications.length ? <EmptyLine text="No partner applications saved yet." /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="admin-panel p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-500">{detail}</p>
    </div>
  );
}

function StatusStrip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  total,
  colorClass
}: {
  label: string;
  value: number;
  total: number;
  colorClass: string;
}) {
  const width = Math.max(10, Math.min(100, Math.round((value / total) * 100)));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <span className="text-sm font-semibold text-slate-950">{value}</span>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-slate-100">
        <div className={`h-2.5 rounded-full ${colorClass}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function EmptyLine({ text }: { text: string }) {
  return <p className="rounded-2xl border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-500">{text}</p>;
}
