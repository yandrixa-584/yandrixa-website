import { notFound } from "next/navigation";

import { AdminLandingPageEditForm } from "@/components/admin/admin-record-edit-forms";
import { AdminSectionIntro } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { getLandingPageRecordById } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminLandingPageEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const record = await getLandingPageRecordById(id);

  if (!record) {
    notFound();
  }

  return (
    <AdminShell currentPath="/admin/landing-pages">
      <div className="space-y-6">
        <AdminSectionIntro eyebrow="Edit landing page" title={record.title} description="Update landing page content, publishing status, and campaign messaging." />
        <AdminLandingPageEditForm record={record} />
      </div>
    </AdminShell>
  );
}
