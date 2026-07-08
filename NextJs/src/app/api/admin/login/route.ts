import { NextResponse } from "next/server";
import { z } from "zod";

import { createAdminSessionToken, getAdminCredentials, setAdminSessionCookie } from "@/lib/admin-auth";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1)
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const isForm = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  try {
    const rawBody = isForm
      ? await request.formData().then((formData) => ({
          email: formData.get("email"),
          password: formData.get("password")
        }))
      : await request.json();
    const body = loginSchema.parse(rawBody);
    const credentials = getAdminCredentials();
    const secure = new URL(request.url).protocol === "https:";

    if (body.email !== credentials.email || body.password !== credentials.password) {
      if (isForm) {
        return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), { status: 303 });
      }

      return NextResponse.json({ success: false, message: "Invalid admin credentials." }, { status: 401 });
    }

    const token = createAdminSessionToken(body.email);
    await setAdminSessionCookie(token, secure);

    if (isForm) {
      return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
    }

    return NextResponse.json({ success: true });
  } catch {
    if (isForm) {
      return NextResponse.redirect(new URL("/admin/login?error=signin", request.url), { status: 303 });
    }

    return NextResponse.json({ success: false, message: "Unable to sign in." }, { status: 400 });
  }
}
