"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { CheckboxField, InputField, TextareaField } from "@/components/forms/fields";
import { FormStatus } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { currentTimestamp } from "@/lib/utils";
import { partnerSchema, type PartnerFormValues } from "@/lib/validation";

export function PartnerForm() {
  const [status, setStatus] = useState<{ state: "idle" | "success" | "error"; message?: string }>({ state: "idle" });

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      cityCountry: "",
      profession: "",
      experience: "",
      industries: "",
      leadMethods: "",
      expectedLeadsPerMonth: "",
      profileUrl: "",
      introduction: "",
      understandsCommission: false,
      willNotCollectPayments: false,
      consent: false,
      website: "",
      startedAt: 0,
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      referrerUrl: "",
      landingPageUrl: ""
    }
  });

  useEffect(() => {
    form.setValue("startedAt", currentTimestamp());
    form.setValue("referrerUrl", document.referrer || "");
    form.setValue("landingPageUrl", window.location.href);

    const params = new URLSearchParams(window.location.search);
    form.setValue("utmSource", params.get("utm_source") || "");
    form.setValue("utmMedium", params.get("utm_medium") || "");
    form.setValue("utmCampaign", params.get("utm_campaign") || "");
  }, [form]);

  useEffect(() => {
    if (status.state === "idle") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus({ state: "idle" });
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, [status]);

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus({ state: "idle" });

    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setStatus({ state: "error", message: payload.error || "Something went wrong. Please try again." });
        return;
      }

      const nextStartedAt = currentTimestamp();
      form.reset({
        fullName: "",
        email: "",
        phone: "",
        cityCountry: "",
        profession: "",
        experience: "",
        industries: "",
        leadMethods: "",
        expectedLeadsPerMonth: "",
        profileUrl: "",
        introduction: "",
        understandsCommission: false,
        willNotCollectPayments: false,
        consent: false,
        website: "",
        startedAt: nextStartedAt,
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        referrerUrl: document.referrer || "",
        landingPageUrl: window.location.href
      });
      setStatus({
        state: "success",
        message: payload.message || "Your application has been submitted successfully."
      });
    } catch {
      setStatus({ state: "error", message: "Unable to submit right now. Please try again." });
    }
  });

  const {
    register,
    formState: { errors, isSubmitting }
  } = form;

  return (
    <form onSubmit={onSubmit} className="surface-card space-y-6 p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <InputField label="Full name" id="partnerFullName" error={errors.fullName?.message} {...register("fullName")} />
        <InputField label="Email" id="partnerEmail" type="email" error={errors.email?.message} {...register("email")} />
        <InputField label="Phone number" id="partnerPhone" error={errors.phone?.message} {...register("phone")} />
        <InputField label="City and country" id="cityCountry" error={errors.cityCountry?.message} {...register("cityCountry")} />
        <InputField label="Current profession" id="profession" error={errors.profession?.message} {...register("profession")} />
        <InputField
          label="Expected number of leads per month"
          id="expectedLeadsPerMonth"
          error={errors.expectedLeadsPerMonth?.message}
          {...register("expectedLeadsPerMonth")}
        />
        <InputField label="LinkedIn or professional profile" id="profileUrl" placeholder="https://linkedin.com/in/..." error={errors.profileUrl?.message} {...register("profileUrl")} />
      </div>

      <TextareaField label="Marketing or sales experience" id="experience" error={errors.experience?.message} {...register("experience")} />
      <TextareaField label="Industries or networks available" id="industries" error={errors.industries?.message} {...register("industries")} />
      <TextareaField label="Preferred lead-generation methods" id="leadMethods" error={errors.leadMethods?.message} {...register("leadMethods")} />
      <TextareaField label="Short introduction" id="introduction" error={errors.introduction?.message} {...register("introduction")} />

      <input type="hidden" {...register("website")} tabIndex={-1} autoComplete="off" />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmMedium")} />
      <input type="hidden" {...register("utmCampaign")} />
      <input type="hidden" {...register("referrerUrl")} />
      <input type="hidden" {...register("landingPageUrl")} />

      <div className="space-y-4">
        <CheckboxField
          id="understandsCommission"
          error={errors.understandsCommission?.message}
          label="I understand this is a commission-based independent opportunity, not a fixed-salary employment role."
          {...register("understandsCommission")}
        />
        <CheckboxField
          id="willNotCollectPayments"
          error={errors.willNotCollectPayments?.message}
          label="I understand that I am not authorized to collect money or commit terms on behalf of Yandrixa."
          {...register("willNotCollectPayments")}
        />
        <CheckboxField
          id="partnerConsent"
          error={errors.consent?.message}
          label="I consent to Yandrixa storing and reviewing this application data for partner-program communication."
          {...register("consent")}
        />
      </div>

      <FormStatus state={status.state} message={status.message} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-brand-muted">Applications are reviewed manually. Submission does not mean automatic approval.</p>
        <Button type="submit" variant="accent" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Apply as a Partner"}
        </Button>
      </div>
    </form>
  );
}
