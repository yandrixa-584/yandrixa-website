import { notFound } from "next/navigation";

import { AdminRecordDetail, DetailGrid } from "@/components/admin/admin-record-detail";
import { AdminSectionIntro } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { getEnquiryRecordById } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminEnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const record = await getEnquiryRecordById(id);

  if (!record) {
    notFound();
  }

  return (
    <AdminShell currentPath="/admin/enquiries">
      <div className="space-y-6">
        <AdminSectionIntro eyebrow="Enquiry" title={record.fullName} description="Full enquiry details and captured submission metadata." />
        <AdminRecordDetail title={record.businessName} editHref={`/admin/enquiries/${record.id}/edit`}>
          <DetailGrid
            items={[
              { label: "Email", value: record.email },
              { label: "Phone / WhatsApp", value: record.phoneOrWhatsApp },
              { label: "Country", value: record.country },
              { label: "Service required", value: record.serviceRequired },
              { label: "Project stage", value: record.projectStage },
              { label: "Budget range", value: record.budgetRange },
              { label: "Expected timeline", value: record.expectedTimeline },
              { label: "Preferred contact", value: record.preferredContactMethod },
              { label: "Existing website", value: record.existingWebsiteUrl || "-" },
              { label: "Landing page URL", value: record.landingPageUrl || "-" },
              { label: "UTM source", value: record.utmSource || "-" },
              { label: "Project description", value: record.projectDescription }
            ]}
          />
        </AdminRecordDetail>
      </div>
    </AdminShell>
  );
}
