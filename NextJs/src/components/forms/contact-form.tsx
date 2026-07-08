"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CheckboxField, InputField, SelectField, TextareaField } from "@/components/forms/fields";
import { FormStatus } from "@/components/forms/form-status";
import { currentTimestamp } from "@/lib/utils";
import { contactSchema, type ContactFormValues } from "@/lib/validation";

const services = [
  "Website Development",
  "Web Application",
  "API Development",
  "E-commerce",
  "AI Chatbot or Automation",
  "Business Dashboard",
  "Digital Marketing",
  "Lead Generation",
  "Maintenance or Bug Fixing",
  "Other"
];

const projectStages = [
  "Exploring an idea",
  "Requirements are ready",
  "Existing system needs improvement",
  "Need urgent technical support",
  "Looking for a long-term partner"
];

const budgetRanges = [
  "Need guidance",
  "Below INR 50,000",
  "INR 50,000 to 2,00,000",
  "INR 2,00,000 to 5,00,000",
  "Above INR 5,00,000"
];

const timelines = ["As soon as possible", "Within 1 month", "Within 2 to 3 months", "Flexible timeline"];

const contactMethods = ["Email", "Phone", "WhatsApp", "Video call"];

export function ContactForm() {
  const [status, setStatus] = useState<{ state: "idle" | "success" | "error"; message?: string }>({ state: "idle" });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      businessName: "",
      email: "",
      phoneOrWhatsApp: "",
      country: "",
      serviceRequired: "",
      projectStage: "",
      budgetRange: "",
      expectedTimeline: "",
      projectDescription: "",
      existingWebsiteUrl: "",
      preferredContactMethod: "",
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
      const response = await fetch("/api/contact", {
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
        businessName: "",
        email: "",
        phoneOrWhatsApp: "",
        country: "",
        serviceRequired: "",
        projectStage: "",
        budgetRange: "",
        expectedTimeline: "",
        projectDescription: "",
        existingWebsiteUrl: "",
        preferredContactMethod: "",
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
        message: payload.message || "Your enquiry has been submitted successfully."
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
        <InputField label="Full name" id="fullName" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
        <InputField label="Business or company name" id="businessName" error={errors.businessName?.message} {...register("businessName")} />
        <InputField label="Email" id="email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <InputField label="Phone or WhatsApp" id="phoneOrWhatsApp" error={errors.phoneOrWhatsApp?.message} {...register("phoneOrWhatsApp")} />
        <InputField label="Country" id="country" error={errors.country?.message} {...register("country")} />
        <SelectField label="Service required" id="serviceRequired" error={errors.serviceRequired?.message} defaultValue="" {...register("serviceRequired")}>
          <option value="" disabled>Select a service</option>
          {services.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </SelectField>
        <SelectField label="Project stage" id="projectStage" error={errors.projectStage?.message} defaultValue="" {...register("projectStage")}>
          <option value="" disabled>Select the current stage</option>
          {projectStages.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </SelectField>
        <SelectField label="Estimated budget range" id="budgetRange" error={errors.budgetRange?.message} defaultValue="" {...register("budgetRange")}>
          <option value="" disabled>Select a budget range</option>
          {budgetRanges.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </SelectField>
        <SelectField label="Expected timeline" id="expectedTimeline" error={errors.expectedTimeline?.message} defaultValue="" {...register("expectedTimeline")}>
          <option value="" disabled>Select a timeline</option>
          {timelines.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </SelectField>
        <InputField label="Existing website URL" id="existingWebsiteUrl" placeholder="https://example.com" error={errors.existingWebsiteUrl?.message} {...register("existingWebsiteUrl")} />
        <SelectField label="Preferred contact method" id="preferredContactMethod" error={errors.preferredContactMethod?.message} defaultValue="" {...register("preferredContactMethod")}>
          <option value="" disabled>Select a contact method</option>
          {contactMethods.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </SelectField>
      </div>

      <TextareaField
        label="Project description"
        id="projectDescription"
        hint="Share the business goal, users, required features, or current problem."
        error={errors.projectDescription?.message}
        {...register("projectDescription")}
      />

      <input type="hidden" {...register("website")} tabIndex={-1} autoComplete="off" />
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmMedium")} />
      <input type="hidden" {...register("utmCampaign")} />
      <input type="hidden" {...register("referrerUrl")} />
      <input type="hidden" {...register("landingPageUrl")} />

      <CheckboxField
        id="consent"
        error={errors.consent?.message}
        label="I consent to Yandrixa storing and using this information to respond to my enquiry."
        {...register("consent")}
      />

      <FormStatus state={status.state} message={status.message} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-brand-muted">Yandrixa reviews each enquiry and responds with the most practical next step.</p>
        <Button type="submit" variant="accent" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Project Enquiry"}
        </Button>
      </div>
    </form>
  );
}
