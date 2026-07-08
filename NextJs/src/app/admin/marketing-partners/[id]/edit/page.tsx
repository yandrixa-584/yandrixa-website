import { notFound } from "next/navigation";

import { AdminPartnerEditForm } from "@/components/admin/admin-record-edit-forms";
import { AdminSectionIntro } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { getPartnerApplicationRecordById } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminPartnerEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const record = await getPartnerApplicationRecordById(id);

  if (!record) {
    notFound();
  }

  return (
    <AdminShell currentPath="/admin/marketing-partners">
      <div className="space-y-6">
        <AdminSectionIntro eyebrow="Edit digital marketer" title={record.fullName} description="Update the application data and save the revised record." />
        <AdminPartnerEditForm record={record} />
      </div>
    </AdminShell>
  );
}
