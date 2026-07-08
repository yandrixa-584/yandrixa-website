"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { EnquiryRecord, LandingPageRecord, PartnerApplicationRecord } from "@/types/admin";

export function AdminEnquiryEditForm({ record }: { record: EnquiryRecord }) {
  const router = useRouter();
  const [form, setForm] = useState(record);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");
    setError("");

    try {
      const response = await fetch(`/api/admin/records/enquiries/${record.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          record: {
            ...form,
            updatedAt: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        setError("Enquiry could not be saved.");
        return;
      }

      setStatus("Enquiry updated successfully.");
      router.refresh();
    } catch {
      setError("Enquiry could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="admin-panel space-y-5 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" value={form.fullName} onChange={(value) => setForm((current) => ({ ...current, fullName: value }))} />
        <Field label="Business name" value={form.businessName} onChange={(value) => setForm((current) => ({ ...current, businessName: value }))} />
        <Field label="Email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
        <Field label="Phone or WhatsApp" value={form.phoneOrWhatsApp} onChange={(value) => setForm((current) => ({ ...current, phoneOrWhatsApp: value }))} />
        <Field label="Country" value={form.country} onChange={(value) => setForm((current) => ({ ...current, country: value }))} />
        <Field label="Service required" value={form.serviceRequired} onChange={(value) => setForm((current) => ({ ...current, serviceRequired: value }))} />
        <Field label="Project stage" value={form.projectStage} onChange={(value) => setForm((current) => ({ ...current, projectStage: value }))} />
        <Field label="Budget range" value={form.budgetRange} onChange={(value) => setForm((current) => ({ ...current, budgetRange: value }))} />
        <Field label="Expected timeline" value={form.expectedTimeline} onChange={(value) => setForm((current) => ({ ...current, expectedTimeline: value }))} />
        <Field
          label="Preferred contact method"
          value={form.preferredContactMethod}
          onChange={(value) => setForm((current) => ({ ...current, preferredContactMethod: value }))}
        />
        <Field
          label="Existing website URL"
          value={form.existingWebsiteUrl}
          onChange={(value) => setForm((current) => ({ ...current, existingWebsiteUrl: value }))}
        />
      </div>
      <TextArea label="Project description" value={form.projectDescription} onChange={(value) => setForm((current) => ({ ...current, projectDescription: value }))} />
      <ActionFooter error={error} status={status} isSaving={isSaving} saveLabel="Save enquiry" />
    </form>
  );
}

export function AdminPartnerEditForm({ record }: { record: PartnerApplicationRecord }) {
  const router = useRouter();
  const [form, setForm] = useState(record);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");
    setError("");

    try {
      const response = await fetch(`/api/admin/records/partners/${record.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          record: {
            ...form,
            updatedAt: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        setError("Partner application could not be saved.");
        return;
      }

      setStatus("Partner application updated successfully.");
      router.refresh();
    } catch {
      setError("Partner application could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="admin-panel space-y-5 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" value={form.fullName} onChange={(value) => setForm((current) => ({ ...current, fullName: value }))} />
        <Field label="Email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
        <Field label="Phone" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
        <Field label="City / Country" value={form.cityCountry} onChange={(value) => setForm((current) => ({ ...current, cityCountry: value }))} />
        <Field label="Profession" value={form.profession} onChange={(value) => setForm((current) => ({ ...current, profession: value }))} />
        <Field
          label="Expected leads per month"
          value={form.expectedLeadsPerMonth}
          onChange={(value) => setForm((current) => ({ ...current, expectedLeadsPerMonth: value }))}
        />
        <Field label="Profile URL" value={form.profileUrl} onChange={(value) => setForm((current) => ({ ...current, profileUrl: value }))} />
      </div>
      <TextArea label="Experience" value={form.experience} onChange={(value) => setForm((current) => ({ ...current, experience: value }))} />
      <TextArea label="Industries" value={form.industries} onChange={(value) => setForm((current) => ({ ...current, industries: value }))} />
      <TextArea label="Lead methods" value={form.leadMethods} onChange={(value) => setForm((current) => ({ ...current, leadMethods: value }))} />
      <TextArea label="Introduction" value={form.introduction} onChange={(value) => setForm((current) => ({ ...current, introduction: value }))} />
      <ActionFooter error={error} status={status} isSaving={isSaving} saveLabel="Save application" />
    </form>
  );
}

export function AdminLandingPageEditForm({ record }: { record: LandingPageRecord }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...record, heroPointsText: record.heroPoints.join("\n") });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");
    setError("");

    try {
      const response = await fetch(`/api/admin/records/landing-pages/${record.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          record: {
            ...record,
            ...form,
            heroPoints: form.heroPointsText.split("\n").map((item) => item.trim()).filter(Boolean),
            updatedAt: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        setError("Landing page could not be saved.");
        return;
      }

      setStatus("Landing page updated successfully.");
      router.refresh();
    } catch {
      setError("Landing page could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="admin-panel space-y-5 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Slug" value={form.slug} onChange={(value) => setForm((current) => ({ ...current, slug: value }))} />
        <Field label="Status" value={form.status} onChange={(value) => setForm((current) => ({ ...current, status: value as "draft" | "published" }))} />
        <Field label="Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} />
        <Field label="Eyebrow" value={form.eyebrow} onChange={(value) => setForm((current) => ({ ...current, eyebrow: value }))} />
        <Field label="Primary CTA label" value={form.primaryCtaLabel} onChange={(value) => setForm((current) => ({ ...current, primaryCtaLabel: value }))} />
        <Field label="Primary CTA href" value={form.primaryCtaHref} onChange={(value) => setForm((current) => ({ ...current, primaryCtaHref: value }))} />
        <Field
          label="Secondary CTA label"
          value={form.secondaryCtaLabel}
          onChange={(value) => setForm((current) => ({ ...current, secondaryCtaLabel: value }))}
        />
        <Field
          label="Secondary CTA href"
          value={form.secondaryCtaHref}
          onChange={(value) => setForm((current) => ({ ...current, secondaryCtaHref: value }))}
        />
      </div>
      <TextArea label="Summary" value={form.summary} onChange={(value) => setForm((current) => ({ ...current, summary: value }))} />
      <TextArea label="Hero points" value={form.heroPointsText} onChange={(value) => setForm((current) => ({ ...current, heroPointsText: value }))} />
      <Field label="Body title" value={form.bodyTitle} onChange={(value) => setForm((current) => ({ ...current, bodyTitle: value }))} />
      <TextArea label="Body content" value={form.bodyContent} onChange={(value) => setForm((current) => ({ ...current, bodyContent: value }))} />
      <ActionFooter error={error} status={status} isSaving={isSaving} saveLabel="Save landing page" />
    </form>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="admin-input" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="admin-textarea" />
    </label>
  );
}

function ActionFooter({
  error,
  status,
  isSaving,
  saveLabel
}: {
  error: string;
  status: string;
  isSaving: boolean;
  saveLabel: string;
}) {
  return (
    <>
      {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      {status ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status}</p> : null}
      <div className="flex justify-end">
        <button type="submit" disabled={isSaving} className="admin-button-primary">
          {isSaving ? "Saving..." : saveLabel}
        </button>
      </div>
    </>
  );
}
