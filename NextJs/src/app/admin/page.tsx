import { AdminOverview } from "@/components/admin/admin-overview";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminData } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Admin Dashboard",
    description: "Manage Yandrixa Smart Solutions global settings and shared site content.",
    path: "/admin"
  });
}

export default async function AdminPage() {
  await requireAdminSession();
  const data = await readAdminData();

  return (
    <AdminShell currentPath="/admin">
      <AdminOverview data={data} />
    </AdminShell>
  );
}
