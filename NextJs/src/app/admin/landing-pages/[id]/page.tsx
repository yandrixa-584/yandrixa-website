import { notFound } from "next/navigation";

import { AdminRecordDetail, DetailGrid } from "@/components/admin/admin-record-detail";
import { AdminSectionIntro } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { getLandingPageRecordById } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminLandingPageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const record = await getLandingPageRecordById(id);

  if (!record) {
    notFound();
  }

  return (
    <AdminShell currentPath="/admin/landing-pages">
      <div className="space-y-6">
        <AdminSectionIntro eyebrow="Landing page" title={record.title} description="Full landing page content and campaign configuration." />
        <AdminRecordDetail title={`/landing/${record.slug}`} editHref={`/admin/landing-pages/${record.id}/edit`}>
          <DetailGrid
            items={[
              { label: "Slug", value: record.slug },
              { label: "Publishing status", value: record.status },
              { label: "Eyebrow", value: record.eyebrow },
              { label: "Summary", value: record.summary },
              { label: "Primary CTA", value: `${record.primaryCtaLabel} -> ${record.primaryCtaHref}` },
              { label: "Secondary CTA", value: `${record.secondaryCtaLabel} -> ${record.secondaryCtaHref}` },
              { label: "Hero points", value: record.heroPoints.join("\n") },
              { label: "Body title", value: record.bodyTitle },
              { label: "Body content", value: record.bodyContent }
            ]}
          />
        </AdminRecordDetail>
      </div>
    </AdminShell>
  );
}
