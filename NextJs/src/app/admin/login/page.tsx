import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildMetadata({
    title: "Admin Login",
    description: "Secure superadmin login for Yandrixa Smart Solutions.",
    path: "/admin/login"
  });
}

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = searchParams ? await searchParams : undefined;
  const error = params?.error === "invalid" ? "Invalid admin credentials." : params?.error === "signin" ? "Unable to sign in." : "";

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="mx-auto mb-8 max-w-lg text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-brand-green">Yandrixa admin</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Login to the superadmin panel</h1>
          <p className="mt-4 text-base leading-7">
            Use the configured admin email and password to manage global business settings and shared site content.
          </p>
        </div>
        <AdminLoginForm error={error} />
      </div>
    </section>
  );
}
