import Link from "next/link";

import { AdminDataGrid, type AdminGridColumn, type AdminGridFilter, type AdminGridRow } from "@/components/admin/admin-data-grid";
import type { EnquiryRecord, LandingPageRecord, PartnerApplicationRecord } from "@/types/admin";

export function AdminSectionIntro({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="admin-panel p-6">
      <p className="admin-kicker">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export function ContactsGrid({
  contacts
}: {
  contacts: Array<{
    id: string;
    entity: "enquiries" | "partners";
    viewHref: string;
    editHref: string;
    deleted: boolean;
    status: string;
    name: string;
    email: string;
    phone: string;
    source: string;
    company?: string;
    location?: string;
  }>;
}) {
  const columns: AdminGridColumn[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "source", label: "Source" },
    { key: "status", label: "Status" },
    { key: "company", label: "Company / Role" },
    { key: "location", label: "Location" }
  ];
  const filters: AdminGridFilter[] = [
    {
      key: "source",
      label: "Source",
      options: [...new Set(contacts.map((item) => item.source))].map((value) => ({ label: value, value }))
    },
    {
      key: "status",
      label: "Status",
      options: [...new Set(contacts.map((item) => item.status))].map((value) => ({ label: value, value }))
    }
  ];
  const rows: AdminGridRow[] = contacts.map((item) => ({
    id: item.id,
    entity: item.entity,
    viewHref: item.viewHref,
    editHref: item.editHref,
    deleted: String(item.deleted),
    name: item.name,
    email: item.email,
    phone: item.phone,
    source: item.source,
    status: item.status,
    company: item.company || "",
    location: item.location || ""
  }));

  return (
    <AdminDataGrid
      rows={rows}
      columns={columns}
      searchKeys={["name", "email", "phone", "company", "location", "source", "status"]}
      filters={filters}
      emptyMessage="No contacts saved yet."
    />
  );
}

export function EnquiriesGrid({ enquiries }: { enquiries: EnquiryRecord[] }) {
  const columns: AdminGridColumn[] = [
    { key: "createdAt", label: "Created" },
    { key: "fullName", label: "Name" },
    { key: "businessName", label: "Business" },
    { key: "email", label: "Email" },
    { key: "phoneOrWhatsApp", label: "Phone / WhatsApp" },
    { key: "serviceRequired", label: "Service" },
    { key: "budgetRange", label: "Budget" },
    { key: "expectedTimeline", label: "Timeline" },
    { key: "country", label: "Country" },
    { key: "projectStage", label: "Stage" },
    { key: "status", label: "Status" }
  ];
  const filters: AdminGridFilter[] = [
    {
      key: "serviceRequired",
      label: "Service",
      options: [...new Set(enquiries.map((item) => item.serviceRequired))].map((value) => ({ label: value, value }))
    },
    {
      key: "budgetRange",
      label: "Budget",
      options: [...new Set(enquiries.map((item) => item.budgetRange))].map((value) => ({ label: value, value }))
    },
    {
      key: "status",
      label: "Status",
      options: ["Active", "Deleted"].map((value) => ({ label: value, value }))
    }
  ];
  const rows: AdminGridRow[] = enquiries.map((item) => ({
    id: item.id,
    viewHref: `/admin/enquiries/${item.id}`,
    editHref: `/admin/enquiries/${item.id}/edit`,
    deleted: String(Boolean(item.deletedAt)),
    createdAt: formatDate(item.createdAt),
    fullName: item.fullName,
    businessName: item.businessName,
    email: item.email,
    phoneOrWhatsApp: item.phoneOrWhatsApp,
    serviceRequired: item.serviceRequired,
    budgetRange: item.budgetRange,
    expectedTimeline: item.expectedTimeline,
    country: item.country,
    projectStage: item.projectStage,
    status: item.deletedAt ? "Deleted" : "Active"
  }));

  return (
    <AdminDataGrid
      rows={rows}
      columns={columns}
      searchKeys={["fullName", "businessName", "email", "phoneOrWhatsApp", "serviceRequired", "country", "projectStage", "status"]}
      filters={filters}
      emptyMessage="No enquiries saved yet."
    />
  );
}

export function PartnerApplicationsGrid({ partners }: { partners: PartnerApplicationRecord[] }) {
  const columns: AdminGridColumn[] = [
    { key: "createdAt", label: "Created" },
    { key: "fullName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "cityCountry", label: "City / Country" },
    { key: "profession", label: "Profession" },
    { key: "expectedLeadsPerMonth", label: "Expected Leads" },
    { key: "utmSource", label: "Campaign Source" },
    { key: "status", label: "Status" }
  ];
  const filters: AdminGridFilter[] = [
    {
      key: "profession",
      label: "Profession",
      options: [...new Set(partners.map((item) => item.profession))].map((value) => ({ label: value, value }))
    },
    {
      key: "utmSource",
      label: "Campaign Source",
      options: [...new Set(partners.map((item) => item.utmSource || "Direct"))].map((value) => ({ label: value, value }))
    },
    {
      key: "status",
      label: "Status",
      options: ["Active", "Deleted"].map((value) => ({ label: value, value }))
    }
  ];
  const rows: AdminGridRow[] = partners.map((item) => ({
    id: item.id,
    viewHref: `/admin/marketing-partners/${item.id}`,
    editHref: `/admin/marketing-partners/${item.id}/edit`,
    deleted: String(Boolean(item.deletedAt)),
    createdAt: formatDate(item.createdAt),
    fullName: item.fullName,
    email: item.email,
    phone: item.phone,
    cityCountry: item.cityCountry,
    profession: item.profession,
    expectedLeadsPerMonth: item.expectedLeadsPerMonth,
    utmSource: item.utmSource || "Direct",
    status: item.deletedAt ? "Deleted" : "Active"
  }));

  return (
    <AdminDataGrid
      rows={rows}
      columns={columns}
      searchKeys={["fullName", "email", "phone", "cityCountry", "profession", "expectedLeadsPerMonth", "utmSource", "status"]}
      filters={filters}
      emptyMessage="No marketing partner applications yet."
    />
  );
}

export function LeadsGrid({ enquiries }: { enquiries: EnquiryRecord[] }) {
  const qualified = enquiries.filter((item) =>
    ["INR 50,000 to 2,00,000", "INR 2,00,000 to 5,00,000", "Above INR 5,00,000"].includes(item.budgetRange)
  );
  const columns: AdminGridColumn[] = [
    { key: "createdAt", label: "Created" },
    { key: "fullName", label: "Name" },
    { key: "businessName", label: "Business" },
    { key: "email", label: "Email" },
    { key: "serviceRequired", label: "Service" },
    { key: "budgetRange", label: "Budget" },
    { key: "expectedTimeline", label: "Timeline" },
    { key: "preferredContactMethod", label: "Preferred Contact" },
    { key: "status", label: "Status" }
  ];
  const filters: AdminGridFilter[] = [
    {
      key: "serviceRequired",
      label: "Service",
      options: [...new Set(qualified.map((item) => item.serviceRequired))].map((value) => ({ label: value, value }))
    },
    {
      key: "budgetRange",
      label: "Budget",
      options: [...new Set(qualified.map((item) => item.budgetRange))].map((value) => ({ label: value, value }))
    },
    {
      key: "status",
      label: "Status",
      options: ["Active", "Deleted"].map((value) => ({ label: value, value }))
    }
  ];
  const rows: AdminGridRow[] = qualified.map((item) => ({
    id: item.id,
    viewHref: `/admin/enquiries/${item.id}`,
    editHref: `/admin/enquiries/${item.id}/edit`,
    deleted: String(Boolean(item.deletedAt)),
    createdAt: formatDate(item.createdAt),
    fullName: item.fullName,
    businessName: item.businessName,
    email: item.email,
    serviceRequired: item.serviceRequired,
    budgetRange: item.budgetRange,
    expectedTimeline: item.expectedTimeline,
    preferredContactMethod: item.preferredContactMethod,
    status: item.deletedAt ? "Deleted" : "Active"
  }));

  return (
    <AdminDataGrid
      rows={rows}
      columns={columns}
      searchKeys={["fullName", "businessName", "email", "serviceRequired", "budgetRange", "preferredContactMethod", "status"]}
      filters={filters}
      emptyMessage="No qualified leads found yet. Leads here are filtered from enquiries by budget range."
    />
  );
}

export function LandingPagesGrid({ landingPages }: { landingPages: LandingPageRecord[] }) {
  const columns: AdminGridColumn[] = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "status", label: "Publishing" },
    { key: "recordStatus", label: "Record Status" },
    { key: "updatedAt", label: "Updated" }
  ];
  const filters: AdminGridFilter[] = [
    {
      key: "status",
      label: "Publishing",
      options: ["draft", "published"].map((value) => ({ label: value, value }))
    },
    {
      key: "recordStatus",
      label: "Record Status",
      options: ["Active", "Deleted"].map((value) => ({ label: value, value }))
    }
  ];
  const rows: AdminGridRow[] = landingPages.map((item) => ({
    id: item.id,
    viewHref: `/admin/landing-pages/${item.id}`,
    editHref: `/admin/landing-pages/${item.id}/edit`,
    deleted: String(Boolean(item.deletedAt)),
    title: item.title,
    slug: item.slug,
    status: item.status,
    recordStatus: item.deletedAt ? "Deleted" : "Active",
    updatedAt: formatDate(item.updatedAt)
  }));

  return (
    <AdminDataGrid
      rows={rows}
      columns={columns}
      searchKeys={["title", "slug", "status", "recordStatus"]}
      filters={filters}
      emptyMessage="No landing pages created yet."
    />
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
