import { AdminLandingPagesForm } from "@/components/admin/admin-landing-pages-form";
import { LandingPagesGrid, AdminSectionIntro } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminData } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Admin Landing Pages",
    description: "Manage dynamic landing pages and campaign content.",
    path: "/admin/landing-pages"
  });
}

export default async function AdminLandingPagesPage() {
  await requireAdminSession();
  const data = await readAdminData();

  return (
    <AdminShell currentPath="/admin/landing-pages">
      <div className="space-y-6">
        <AdminSectionIntro
          eyebrow="Landing pages"
          title="Dynamic landing pages with editable content"
          description="Create and publish focused landing pages for campaigns, ad traffic, promotions, or specific services without building a brand-new page each time."
        />
        <AdminLandingPagesForm initialLandingPages={data.landingPages} />
        <LandingPagesGrid landingPages={data.landingPages} />
      </div>
    </AdminShell>
  );
}
