import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readAdminData, upsertLandingPageRecord } from "@/lib/admin-data";
import { currentTimestamp } from "@/lib/utils";

const landingPageSchema = z.object({
  slug: z.string().trim().min(2),
  status: z.enum(["draft", "published"]),
  title: z.string().trim().min(2),
  eyebrow: z.string().trim().min(2),
  summary: z.string().trim().min(10),
  primaryCtaLabel: z.string().trim().min(1),
  primaryCtaHref: z.string().trim().min(1),
  secondaryCtaLabel: z.string().trim().min(1),
  secondaryCtaHref: z.string().trim().min(1),
  heroPoints: z.array(z.string().trim().min(1)).min(1),
  bodyTitle: z.string().trim().min(2),
  bodyContent: z.string().trim().min(20)
});

const unauthorized = () => NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const data = await readAdminData();
  return NextResponse.json({ success: true, landingPages: data.landingPages });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const body = landingPageSchema.parse(await request.json());
    const now = new Date().toISOString();
    const id = `landing-${body.slug}-${currentTimestamp()}`;

    await upsertLandingPageRecord({
      id,
      slug: body.slug,
      status: body.status,
      title: body.title,
      eyebrow: body.eyebrow,
      summary: body.summary,
      primaryCtaLabel: body.primaryCtaLabel,
      primaryCtaHref: body.primaryCtaHref,
      secondaryCtaLabel: body.secondaryCtaLabel,
      secondaryCtaHref: body.secondaryCtaHref,
      heroPoints: body.heroPoints,
      bodyTitle: body.bodyTitle,
      bodyContent: body.bodyContent,
      createdAt: now,
      updatedAt: now
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Landing page could not be saved." }, { status: 400 });
  }
}
