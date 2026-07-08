import { AdminSectionIntro, ContactsGrid } from "@/components/admin/admin-record-pages";
import { AdminShell } from "@/components/admin/admin-shell";
import { readAdminData } from "@/lib/admin-data";
import { requireAdminSession } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Admin Contacts",
    description: "View unique contacts captured through Yandrixa forms.",
    path: "/admin/contacts"
  });
}

export default async function AdminContactsPage() {
  await requireAdminSession();
  const data = await readAdminData();
  const leadBudgets = new Set(["INR 50,000 to 2,00,000", "INR 2,00,000 to 5,00,000", "Above INR 5,00,000"]);
  const contacts = [
    ...data.enquiries.map((item) => ({
      id: item.id,
      entity: "enquiries" as const,
      viewHref: `/admin/enquiries/${item.id}`,
      editHref: `/admin/enquiries/${item.id}/edit`,
      deleted: Boolean(item.deletedAt),
      status: item.deletedAt ? "Deleted" : "Active",
      name: item.fullName,
      email: item.email,
      phone: item.phoneOrWhatsApp,
      source: leadBudgets.has(item.budgetRange) ? "Lead" : "Enquiry",
      company: item.businessName,
      location: item.country
    })),
    ...data.partnerApplications.map((item) => ({
      id: item.id,
      entity: "partners" as const,
      viewHref: `/admin/marketing-partners/${item.id}`,
      editHref: `/admin/marketing-partners/${item.id}/edit`,
      deleted: Boolean(item.deletedAt),
      status: item.deletedAt ? "Deleted" : "Active",
      name: item.fullName,
      email: item.email,
      phone: item.phone,
      source: "Digital Marketer",
      company: item.profession,
      location: item.cityCountry
    }))
  ];

  return (
    <AdminShell currentPath="/admin/contacts">
      <div className="space-y-6">
        <AdminSectionIntro
          eyebrow="Contacts"
          title="Unique people and businesses captured from the website"
          description="This module builds a shared contact database from enquiries, qualified leads, and digital marketer applications so you can manage one combined list."
        />
        <ContactsGrid contacts={contacts} />
      </div>
    </AdminShell>
  );
}
