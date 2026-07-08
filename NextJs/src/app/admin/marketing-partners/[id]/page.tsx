import { notFound } from "next/navigation";

import { AdminRecordDetail, DetailGrid } from "@/components/admin/admin-record-detail";
import { AdminSectionIntro } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { getPartnerApplicationRecordById } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminPartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const record = await getPartnerApplicationRecordById(id);

  if (!record) {
    notFound();
  }

  return (
    <AdminShell currentPath="/admin/marketing-partners">
      <div className="space-y-6">
        <AdminSectionIntro eyebrow="Digital marketer" title={record.fullName} description="Full marketing partner application details and source information." />
        <AdminRecordDetail title={record.profession} editHref={`/admin/marketing-partners/${record.id}/edit`}>
          <DetailGrid
            items={[
              { label: "Email", value: record.email },
              { label: "Phone", value: record.phone },
              { label: "City / Country", value: record.cityCountry },
              { label: "Profession", value: record.profession },
              { label: "Expected leads per month", value: record.expectedLeadsPerMonth },
              { label: "Profile URL", value: record.profileUrl || "-" },
              { label: "Experience", value: record.experience },
              { label: "Industries", value: record.industries },
              { label: "Lead methods", value: record.leadMethods },
              { label: "Introduction", value: record.introduction },
              { label: "Landing page URL", value: record.landingPageUrl || "-" },
              { label: "UTM source", value: record.utmSource || "-" }
            ]}
          />
        </AdminRecordDetail>
      </div>
    </AdminShell>
  );
}
