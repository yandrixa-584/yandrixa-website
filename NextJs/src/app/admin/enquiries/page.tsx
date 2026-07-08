import { AdminSectionIntro, EnquiriesGrid } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminData } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Admin Enquiries",
    description: "Review project enquiries submitted through the Yandrixa website.",
    path: "/admin/enquiries"
  });
}

export default async function AdminEnquiriesPage() {
  await requireAdminSession();
  const data = await readAdminData();

  return (
    <AdminShell currentPath="/admin/enquiries">
      <div className="space-y-6">
        <AdminSectionIntro
          eyebrow="Enquiries"
          title="Project enquiries from the website"
          description="Each saved enquiry includes business details, requested service, timeline, budget range, and the original project description."
        />
        <EnquiriesGrid enquiries={data.enquiries} />
      </div>
    </AdminShell>
  );
}
