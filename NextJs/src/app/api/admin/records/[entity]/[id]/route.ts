import { NextResponse } from "next/server";

import {
  getEnquiryRecordById,
  getLandingPageRecordById,
  getPartnerApplicationRecordById,
  permanentlyDeleteEnquiryRecord,
  permanentlyDeleteLandingPageRecord,
  permanentlyDeletePartnerApplicationRecord,
  setEnquiryDeletedState,
  setLandingPageDeletedState,
  setPartnerApplicationDeletedState,
  updateEnquiryRecord,
  updateLandingPageRecord,
  updatePartnerApplicationRecord
} from "@/lib/admin-data";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { EnquiryRecord, LandingPageRecord, PartnerApplicationRecord } from "@/types/admin";

const unauthorized = () => NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
const notFound = () => NextResponse.json({ success: false, message: "Record not found." }, { status: 404 });

export async function GET(_: Request, context: { params: Promise<{ entity: string; id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const { entity, id } = await context.params;

  if (entity === "enquiries") {
    const record = await getEnquiryRecordById(id);
    return record ? NextResponse.json({ success: true, record }) : notFound();
  }

  if (entity === "partners") {
    const record = await getPartnerApplicationRecordById(id);
    return record ? NextResponse.json({ success: true, record }) : notFound();
  }

  if (entity === "landing-pages") {
    const record = await getLandingPageRecordById(id);
    return record ? NextResponse.json({ success: true, record }) : notFound();
  }

  return notFound();
}

export async function PUT(request: Request, context: { params: Promise<{ entity: string; id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const { entity, id } = await context.params;
  const payload = (await request.json()) as { record?: EnquiryRecord | PartnerApplicationRecord | LandingPageRecord };

  if (!payload.record) {
    return NextResponse.json({ success: false, message: "Invalid record payload." }, { status: 400 });
  }

  if (entity === "enquiries") {
    const updated = await updateEnquiryRecord(payload.record as EnquiryRecord);
    return updated ? NextResponse.json({ success: true, record: updated }) : notFound();
  }

  if (entity === "partners") {
    const updated = await updatePartnerApplicationRecord(payload.record as PartnerApplicationRecord);
    return updated ? NextResponse.json({ success: true, record: updated }) : notFound();
  }

  if (entity === "landing-pages") {
    const updated = await updateLandingPageRecord(payload.record as LandingPageRecord);
    return updated ? NextResponse.json({ success: true, record: updated }) : notFound();
  }

  return notFound();
}

export async function PATCH(request: Request, context: { params: Promise<{ entity: string; id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const { entity, id } = await context.params;
  const payload = (await request.json()) as { action?: "delete" | "restore" };
  const deletedAt = payload.action === "delete" ? new Date().toISOString() : null;

  if (!payload.action) {
    return NextResponse.json({ success: false, message: "Invalid action." }, { status: 400 });
  }

  if (entity === "enquiries") {
    const updated = await setEnquiryDeletedState(id, deletedAt);
    return updated ? NextResponse.json({ success: true, record: updated }) : notFound();
  }

  if (entity === "partners") {
    const updated = await setPartnerApplicationDeletedState(id, deletedAt);
    return updated ? NextResponse.json({ success: true, record: updated }) : notFound();
  }

  if (entity === "landing-pages") {
    const updated = await setLandingPageDeletedState(id, deletedAt);
    return updated ? NextResponse.json({ success: true, record: updated }) : notFound();
  }

  return notFound();
}

export async function DELETE(_: Request, context: { params: Promise<{ entity: string; id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const { entity, id } = await context.params;

  if (entity === "enquiries") {
    await permanentlyDeleteEnquiryRecord(id);
    return NextResponse.json({ success: true });
  }

  if (entity === "partners") {
    await permanentlyDeletePartnerApplicationRecord(id);
    return NextResponse.json({ success: true });
  }

  if (entity === "landing-pages") {
    await permanentlyDeleteLandingPageRecord(id);
    return NextResponse.json({ success: true });
  }

  return notFound();
}
