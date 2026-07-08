"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { LandingPageRecord } from "@/types/admin";

export function AdminLandingPagesForm({
  initialLandingPages
}: {
  initialLandingPages: LandingPageRecord[];
}) {
  const router = useRouter();
  const [landingPage, setLandingPage] = useState({
    slug: "",
    status: "draft",
    title: "",
    eyebrow: "",
    summary: "",
    primaryCtaLabel: "",
    primaryCtaHref: "",
    secondaryCtaLabel: "",
    secondaryCtaHref: "",
    heroPoints: "",
    bodyTitle: "",
    bodyContent: ""
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");
    setError("");

    try {
      const response = await fetch("/api/admin/landing-pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...landingPage,
          heroPoints: landingPage.heroPoints
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        })
      });

      const payload = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !payload.success) {
        setError(payload.message || "Landing page could not be saved.");
        return;
      }

      setStatus("Landing page saved. Refreshing the list now.");
      setLandingPage({
        slug: "",
        status: "draft",
        title: "",
        eyebrow: "",
        summary: "",
        primaryCtaLabel: "",
        primaryCtaHref: "",
        secondaryCtaLabel: "",
        secondaryCtaHref: "",
        heroPoints: "",
        bodyTitle: "",
        bodyContent: ""
      });
      router.refresh();
    } catch {
      setError("Landing page could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="admin-panel p-6">
        <p className="admin-kicker">Create</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-950">Create dynamic landing page</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add campaign-specific pages that can be updated from admin instead of creating separate coded pages every time.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Slug" value={landingPage.slug} onChange={(value) => setLandingPage((current) => ({ ...current, slug: value }))} />
            <SelectField
              label="Status"
              value={landingPage.status}
              onChange={(value) => setLandingPage((current) => ({ ...current, status: value }))}
              options={["draft", "published"]}
            />
            <Field label="Title" value={landingPage.title} onChange={(value) => setLandingPage((current) => ({ ...current, title: value }))} />
            <Field label="Eyebrow" value={landingPage.eyebrow} onChange={(value) => setLandingPage((current) => ({ ...current, eyebrow: value }))} />
            <Field
              label="Primary CTA label"
              value={landingPage.primaryCtaLabel}
              onChange={(value) => setLandingPage((current) => ({ ...current, primaryCtaLabel: value }))}
            />
            <Field
              label="Primary CTA href"
              value={landingPage.primaryCtaHref}
              onChange={(value) => setLandingPage((current) => ({ ...current, primaryCtaHref: value }))}
            />
            <Field
              label="Secondary CTA label"
              value={landingPage.secondaryCtaLabel}
              onChange={(value) => setLandingPage((current) => ({ ...current, secondaryCtaLabel: value }))}
            />
            <Field
              label="Secondary CTA href"
              value={landingPage.secondaryCtaHref}
              onChange={(value) => setLandingPage((current) => ({ ...current, secondaryCtaHref: value }))}
            />
          </div>
          <TextAreaField
            label="Summary"
            value={landingPage.summary}
            rows={3}
            onChange={(value) => setLandingPage((current) => ({ ...current, summary: value }))}
          />
          <TextAreaField
            label="Hero points"
            value={landingPage.heroPoints}
            rows={4}
            hint="Use one point per line."
            onChange={(value) => setLandingPage((current) => ({ ...current, heroPoints: value }))}
          />
          <Field label="Body title" value={landingPage.bodyTitle} onChange={(value) => setLandingPage((current) => ({ ...current, bodyTitle: value }))} />
          <TextAreaField
            label="Body content"
            value={landingPage.bodyContent}
            rows={5}
            onChange={(value) => setLandingPage((current) => ({ ...current, bodyContent: value }))}
          />
          {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
          {status ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status}</p> : null}
          <div className="flex justify-end">
            <button type="submit" disabled={isSaving} className="admin-button-primary">
              {isSaving ? "Saving..." : "Save landing page"}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-panel p-6">
        <p className="admin-kicker">Inventory</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-950">Current landing pages</h3>
        <div className="mt-5 space-y-4">
          {initialLandingPages.map((item) => (
            <div key={item.id} className="admin-soft-panel p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-slate-950">{item.title}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                  item.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">/landing/{item.slug}</p>
            </div>
          ))}
          {!initialLandingPages.length ? <p className="text-sm text-slate-500">No landing pages created yet.</p> : null}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="admin-input" />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="admin-select">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows,
  hint
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="admin-textarea" />
      {hint ? <span className="mt-2 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}
