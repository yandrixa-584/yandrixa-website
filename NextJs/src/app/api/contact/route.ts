import { NextResponse } from "next/server";

import { appendEnquiryRecord } from "@/lib/admin-data";
import { buildSubmissionEmail, sendMail } from "@/lib/mail";
import { limitRequest } from "@/lib/rate-limit";
import { contactSchema, validateSubmissionTiming } from "@/lib/validation";
import { currentTimestamp } from "@/lib/utils";

const recipient = process.env.CONTACT_RECIPIENT_EMAIL;

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const key = forwardedFor || "contact-anonymous";
    const rate = limitRequest(`contact:${key}`);

    if (!rate.allowed) {
      return NextResponse.json({ error: "Too many submissions. Please wait a little and try again." }, { status: 429 });
    }

    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please review the form and correct the highlighted fields." }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ message: "Thanks. Your submission has been received." });
    }

    if (!validateSubmissionTiming(parsed.data.startedAt)) {
      return NextResponse.json({ error: "Form submitted too quickly. Please try again." }, { status: 400 });
    }

    await appendEnquiryRecord({
      id: `enquiry-${currentTimestamp()}`,
      createdAt: new Date().toISOString(),
      type: "project-enquiry",
      fullName: parsed.data.fullName,
      businessName: parsed.data.businessName,
      email: parsed.data.email,
      phoneOrWhatsApp: parsed.data.phoneOrWhatsApp,
      country: parsed.data.country,
      serviceRequired: parsed.data.serviceRequired,
      projectStage: parsed.data.projectStage,
      budgetRange: parsed.data.budgetRange,
      expectedTimeline: parsed.data.expectedTimeline,
      preferredContactMethod: parsed.data.preferredContactMethod,
      existingWebsiteUrl: parsed.data.existingWebsiteUrl || "",
      projectDescription: parsed.data.projectDescription,
      utmSource: parsed.data.utmSource,
      utmMedium: parsed.data.utmMedium,
      utmCampaign: parsed.data.utmCampaign,
      referrerUrl: parsed.data.referrerUrl,
      landingPageUrl: parsed.data.landingPageUrl
    });

    if (recipient) {
      try {
        const email = buildSubmissionEmail("New Project Enquiry", [
          ["Full name", parsed.data.fullName],
          ["Business name", parsed.data.businessName],
          ["Email", parsed.data.email],
          ["Phone or WhatsApp", parsed.data.phoneOrWhatsApp],
          ["Country", parsed.data.country],
          ["Service required", parsed.data.serviceRequired],
          ["Project stage", parsed.data.projectStage],
          ["Budget range", parsed.data.budgetRange],
          ["Expected timeline", parsed.data.expectedTimeline],
          ["Preferred contact method", parsed.data.preferredContactMethod],
          ["Existing website URL", parsed.data.existingWebsiteUrl || ""],
          ["Project description", parsed.data.projectDescription],
          ["UTM source", parsed.data.utmSource ?? ""],
          ["UTM medium", parsed.data.utmMedium ?? ""],
          ["UTM campaign", parsed.data.utmCampaign ?? ""],
          ["Referrer URL", parsed.data.referrerUrl ?? ""],
          ["Landing page URL", parsed.data.landingPageUrl ?? ""]
        ]);

        await sendMail({
          to: recipient,
          subject: `New Project Enquiry – ${parsed.data.serviceRequired} – ${parsed.data.fullName}`,
          html: email,
          replyTo: parsed.data.email
        });
      } catch {
        // The enquiry is already stored, so email delivery should not block a successful response.
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for your enquiry. Your details have been submitted successfully."
    });
  } catch {
    return NextResponse.json({ error: "Unexpected error while sending the enquiry." }, { status: 500 });
  }
}
