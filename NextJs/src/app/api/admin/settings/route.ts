import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getBusinessSettingsSchema, readBusinessSettings, writeBusinessSettings } from "@/lib/site-settings";

const unauthorized = () => NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const settings = await readBusinessSettings();
  return NextResponse.json({ success: true, settings });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    const payload = getBusinessSettingsSchema().parse(body);
    const settings = await writeBusinessSettings(payload);

    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ success: false, message: "Settings could not be saved." }, { status: 400 });
  }
}
