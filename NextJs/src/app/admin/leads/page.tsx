import { AdminSectionIntro, LeadsGrid } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminData } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Admin Leads",
    description: "View qualified leads from stored project enquiries.",
    path: "/admin/leads"
  });
}

export default async function AdminLeadsPage() {
  await requireAdminSession();
  const data = await readAdminData();

  return (
    <AdminShell currentPath="/admin/leads">
      <div className="space-y-6">
        <AdminSectionIntro
          eyebrow="Leads"
          title="Qualified enquiry pipeline"
          description="This first version treats higher-budget project enquiries as leads so you can quickly spot the strongest incoming opportunities."
        />
        <LeadsGrid enquiries={data.enquiries} />
      </div>
    </AdminShell>
  );
}
