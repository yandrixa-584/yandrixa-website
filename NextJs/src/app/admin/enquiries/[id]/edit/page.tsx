import { notFound } from "next/navigation";

import { AdminEnquiryEditForm } from "@/components/admin/admin-record-edit-forms";
import { AdminSectionIntro } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { getEnquiryRecordById } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminEnquiryEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const record = await getEnquiryRecordById(id);

  if (!record) {
    notFound();
  }

  return (
    <AdminShell currentPath="/admin/enquiries">
      <div className="space-y-6">
        <AdminSectionIntro eyebrow="Edit enquiry" title={record.fullName} description="Update the enquiry fields and save the revised record." />
        <AdminEnquiryEditForm record={record} />
      </div>
    </AdminShell>
  );
}
