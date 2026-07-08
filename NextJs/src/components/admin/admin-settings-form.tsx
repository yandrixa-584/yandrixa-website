"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { BusinessSettings } from "@/types/business-settings";

type AdminSettingsFormProps = {
  adminEmail: string;
  initialSettings: BusinessSettings;
};

const cloneSettings = (value: BusinessSettings): BusinessSettings => JSON.parse(JSON.stringify(value)) as BusinessSettings;

export function AdminSettingsForm({ adminEmail, initialSettings }: AdminSettingsFormProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<BusinessSettings>(() => cloneSettings(initialSettings));
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const trustPointsText = settings.content.trustPoints.join("\n");

  const updateSection = <K extends keyof BusinessSettings, F extends keyof BusinessSettings[K]>(
    section: K,
    field: F,
    value: BusinessSettings[K][F]
  ) => {
    setSettings((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value
      }
    }));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");
    setError("");

    const payload: BusinessSettings = {
      ...settings,
      content: {
        ...settings.content,
        trustPoints: trustPointsText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      }
    };

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { success?: boolean; message?: string; settings?: BusinessSettings };

      if (!response.ok || !result.success || !result.settings) {
        setError(result.message || "Settings could not be saved.");
        return;
      }

      setSettings(cloneSettings(result.settings));
      setStatus("Settings saved. The site now uses the updated values.");
      router.refresh();
    } catch {
      setError("Settings could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="admin-panel flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="admin-kicker">Settings</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Manage global site settings</h1>
          <p className="mt-2 text-sm text-slate-500">
            Signed in as {adminEmail}. Updates here are reflected across the website wherever these values are used.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="admin-button-secondary disabled:opacity-70"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <section className="admin-panel p-6">
          <h2 className="text-xl font-semibold text-slate-950">Branding</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input label="Business name" value={settings.branding.name} onChange={(value) => updateSection("branding", "name", value)} />
            <Input label="Primary brand" value={settings.branding.brand} onChange={(value) => updateSection("branding", "brand", value)} />
            <Input label="Sub-brand" value={settings.branding.subBrand} onChange={(value) => updateSection("branding", "subBrand", value)} />
            <Input label="Tagline" value={settings.branding.tagline} onChange={(value) => updateSection("branding", "tagline", value)} />
            <Input label="Domain" value={settings.branding.domain} onChange={(value) => updateSection("branding", "domain", value)} />
          </div>
        </section>

        <section className="admin-panel p-6">
          <h2 className="text-xl font-semibold text-slate-950">SEO and public copy</h2>
          <div className="mt-5 grid gap-4">
            <Input label="Site URL" value={settings.seo.siteUrl} onChange={(value) => updateSection("seo", "siteUrl", value)} />
            <Input label="Default title" value={settings.seo.defaultTitle} onChange={(value) => updateSection("seo", "defaultTitle", value)} />
            <Input label="Title template" value={settings.seo.titleTemplate} onChange={(value) => updateSection("seo", "titleTemplate", value)} />
            <Textarea
              label="Default site description"
              value={settings.seo.siteDescription}
              onChange={(value) => updateSection("seo", "siteDescription", value)}
              rows={4}
            />
            <Textarea
              label="Footer description"
              value={settings.content.footerDescription}
              onChange={(value) => updateSection("content", "footerDescription", value)}
              rows={3}
            />
            <Textarea
              label="Trust points"
              value={trustPointsText}
              onChange={(value) =>
                updateSection(
                  "content",
                  "trustPoints",
                  value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
              rows={5}
              hint="Use one point per line."
            />
          </div>
        </section>

        <section className="admin-panel p-6">
          <h2 className="text-xl font-semibold text-slate-950">Contact and placeholders</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input label="Email" value={settings.contact.email} onChange={(value) => updateSection("contact", "email", value)} />
            <Input label="Phone number" value={settings.contact.phone} onChange={(value) => updateSection("contact", "phone", value)} />
            <Input label="WhatsApp number" value={settings.contact.whatsapp} onChange={(value) => updateSection("contact", "whatsapp", value)} />
            <Input label="Business location" value={settings.contact.location} onChange={(value) => updateSection("contact", "location", value)} />
            <Input label="Consultation link" value={settings.links.consultationUrl} onChange={(value) => updateSection("links", "consultationUrl", value)} />
          </div>
          <p className="mt-4 text-sm text-slate-500">
            If you enter placeholder text like <span className="font-semibold text-slate-900">{"{{BUSINESS_EMAIL}}"}</span>, the same placeholder will appear everywhere that field is used on the site.
          </p>
        </section>

        <section className="admin-panel p-6">
          <h2 className="text-xl font-semibold text-slate-950">Social links and analytics</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input label="LinkedIn URL" value={settings.social.linkedin} onChange={(value) => updateSection("social", "linkedin", value)} />
            <Input label="Instagram URL" value={settings.social.instagram} onChange={(value) => updateSection("social", "instagram", value)} />
            <Input label="Facebook URL" value={settings.social.facebook} onChange={(value) => updateSection("social", "facebook", value)} />
            <Input label="Twitter URL" value={settings.social.twitter} onChange={(value) => updateSection("social", "twitter", value)} />
            <Input label="Analytics ID" value={settings.analytics.id} onChange={(value) => updateSection("analytics", "id", value)} />
          </div>
          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <Checkbox
              label="Enable analytics"
              checked={settings.analytics.enabled}
              onChange={(value) => updateSection("analytics", "enabled", value)}
            />
            <Checkbox
              label="Require consent mode"
              checked={settings.analytics.requiresConsent}
              onChange={(value) => updateSection("analytics", "requiresConsent", value)}
            />
          </div>
        </section>

        <section className="admin-panel p-6">
          <h2 className="text-xl font-semibold text-slate-950">Partner program</h2>
          <div className="mt-5 grid gap-4">
            <Input label="Program headline" value={settings.partnerProgram.headline} onChange={(value) => updateSection("partnerProgram", "headline", value)} />
            <Textarea
              label="Program disclosure"
              value={settings.partnerProgram.disclosure}
              onChange={(value) => updateSection("partnerProgram", "disclosure", value)}
              rows={3}
            />
            <Input
              label="Commission percentage note"
              value={settings.partnerProgram.commissionPercentage}
              onChange={(value) => updateSection("partnerProgram", "commissionPercentage", value)}
            />
          </div>
        </section>

        {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
        {status ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status}</p> : null}

        <div className="flex justify-end">
          <button type="submit" disabled={isSaving} className="admin-button-primary">
            {isSaving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
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

function Textarea({
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
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="admin-textarea" />
      {hint ? <span className="mt-2 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}
