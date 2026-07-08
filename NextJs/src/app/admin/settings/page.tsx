import { AdminSettingsForm } from "@/components/admin/admin-settings-form";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminCredentials } from "@/lib/admin-auth";
import { requireAdminSession } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/metadata";
import { readBusinessSettings } from "@/lib/site-settings";

export async function generateMetadata() {
  return buildMetadata({
    title: "Admin Settings",
    description: "Manage shared business settings for the Yandrixa website.",
    path: "/admin/settings"
  });
}

export default async function AdminSettingsPage() {
  await requireAdminSession();
  const settings = await readBusinessSettings();
  const credentials = getAdminCredentials();

  return (
    <AdminShell currentPath="/admin/settings">
      <AdminSettingsForm adminEmail={credentials.email} initialSettings={settings} />
    </AdminShell>
  );
}
