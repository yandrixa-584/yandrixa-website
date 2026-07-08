import { AdminSectionIntro, PartnerApplicationsGrid } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminData } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Admin Marketing Partners",
    description: "Review independent marketing partner applications.",
    path: "/admin/marketing-partners"
  });
}

export default async function AdminMarketingPartnersPage() {
  await requireAdminSession();
  const data = await readAdminData();

  return (
    <AdminShell currentPath="/admin/marketing-partners">
      <div className="space-y-6">
        <AdminSectionIntro
          eyebrow="Marketing partners"
          title="Partner applications and business-network introductions"
          description="Review who applied, their professional background, how they generate leads, and what they expect to contribute each month."
        />
        <PartnerApplicationsGrid partners={data.partnerApplications} />
      </div>
    </AdminShell>
  );
}
