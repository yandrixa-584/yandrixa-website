import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "yandrixa_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

const defaultAdminEmail = "superadmin@yandrixa.local";
const defaultAdminPassword = "Yandrixa@123";
const defaultSessionSecret = "change-this-session-secret-before-production";

const getSessionSecret = () => process.env.ADMIN_SESSION_SECRET?.trim() || defaultSessionSecret;

const getSignature = (payload: string) =>
  crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("hex");

export const getAdminCredentials = () => ({
  email: process.env.ADMIN_EMAIL?.trim() || defaultAdminEmail,
  password: process.env.ADMIN_PASSWORD?.trim() || defaultAdminPassword
});

export const getAdminDefaults = () => ({
  email: defaultAdminEmail,
  password: defaultAdminPassword
});

export const createAdminSessionToken = (email: string) => {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const encodedEmail = Buffer.from(email, "utf8").toString("base64url");
  const payload = `${encodedEmail}.${expiresAt}`;
  const signature = getSignature(payload);
  return `${payload}.${signature}`;
};

export const verifyAdminSessionToken = (token?: string | null) => {
  if (!token) {
    return false;
  }

  const [encodedEmail, expiresAt, signature] = token.split(".");
  if (!encodedEmail || !expiresAt || !signature) {
    return false;
  }

  const email = Buffer.from(encodedEmail, "base64url").toString("utf8");
  const payload = `${encodedEmail}.${expiresAt}`;
  const expectedSignature = getSignature(payload);
  if (signature.length !== expectedSignature.length) {
    return false;
  }

  const signatureMatches = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

  if (!signatureMatches) {
    return false;
  }

  const expiry = Number(expiresAt);
  if (!Number.isFinite(expiry) || Date.now() > expiry) {
    return false;
  }

  return email === getAdminCredentials().email;
};

export const setAdminSessionCookie = async (token: string, secure: boolean) => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000
  });
};

export const clearAdminSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
};

export const isAdminAuthenticated = async () => {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
};

export const requireAdminSession = async () => {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
};
