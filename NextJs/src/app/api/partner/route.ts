import { NextResponse } from "next/server";

import { appendPartnerApplicationRecord } from "@/lib/admin-data";
import { buildSubmissionEmail, sendMail } from "@/lib/mail";
import { limitRequest } from "@/lib/rate-limit";
import { currentTimestamp } from "@/lib/utils";
import { partnerSchema, validateSubmissionTiming } from "@/lib/validation";

const recipient = process.env.PARTNER_RECIPIENT_EMAIL;

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const key = forwardedFor || "partner-anonymous";
    const rate = limitRequest(`partner:${key}`);

    if (!rate.allowed) {
      return NextResponse.json({ error: "Too many submissions. Please wait a little and try again." }, { status: 429 });
    }

    const payload = await request.json();
    const parsed = partnerSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please review the application form and correct the required fields." }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ message: "Thanks. Your application has been received." });
    }

    if (!validateSubmissionTiming(parsed.data.startedAt)) {
      return NextResponse.json({ error: "Form submitted too quickly. Please try again." }, { status: 400 });
    }

    await appendPartnerApplicationRecord({
      id: `partner-${currentTimestamp()}`,
      createdAt: new Date().toISOString(),
      type: "marketing-partner",
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      cityCountry: parsed.data.cityCountry,
      profession: parsed.data.profession,
      experience: parsed.data.experience,
      industries: parsed.data.industries,
      leadMethods: parsed.data.leadMethods,
      expectedLeadsPerMonth: parsed.data.expectedLeadsPerMonth,
      profileUrl: parsed.data.profileUrl || "",
      introduction: parsed.data.introduction,
      utmSource: parsed.data.utmSource,
      utmMedium: parsed.data.utmMedium,
      utmCampaign: parsed.data.utmCampaign,
      referrerUrl: parsed.data.referrerUrl,
      landingPageUrl: parsed.data.landingPageUrl
    });

    if (recipient) {
      try {
        const email = buildSubmissionEmail("New Marketing Partner Application", [
          ["Full name", parsed.data.fullName],
          ["Email", parsed.data.email],
          ["Phone", parsed.data.phone],
          ["City and country", parsed.data.cityCountry],
          ["Profession", parsed.data.profession],
          ["Experience", parsed.data.experience],
          ["Industries or networks", parsed.data.industries],
          ["Lead-generation methods", parsed.data.leadMethods],
          ["Expected leads per month", parsed.data.expectedLeadsPerMonth],
          ["Profile URL", parsed.data.profileUrl || ""],
          ["Short introduction", parsed.data.introduction],
          ["UTM source", parsed.data.utmSource ?? ""],
          ["UTM medium", parsed.data.utmMedium ?? ""],
          ["UTM campaign", parsed.data.utmCampaign ?? ""],
          ["Referrer URL", parsed.data.referrerUrl ?? ""],
          ["Landing page URL", parsed.data.landingPageUrl ?? ""]
        ]);

        await sendMail({
          to: recipient,
          subject: `New Marketing Partner Application – ${parsed.data.fullName}`,
          html: email,
          replyTo: parsed.data.email
        });
      } catch {
        // The application is already stored, so email delivery should not block a successful response.
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for applying. Your details have been submitted successfully."
    });
  } catch {
    return NextResponse.json({ error: "Unexpected error while sending the application." }, { status: 500 });
  }
}
