import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

import adminSeed from "@/data/admin-data.json";
import type { AdminDataStore, EnquiryRecord, LandingPageRecord, PartnerApplicationRecord } from "@/types/admin";

const adminDataFilePath = path.join(process.cwd(), "src/data/admin-data.json");

const defaultAdminData = adminSeed as AdminDataStore;

const normalizeEnquiry = (record: EnquiryRecord): EnquiryRecord => ({
  ...record,
  updatedAt: record.updatedAt || record.createdAt,
  deletedAt: record.deletedAt ?? null
});

const normalizePartner = (record: PartnerApplicationRecord): PartnerApplicationRecord => ({
  ...record,
  updatedAt: record.updatedAt || record.createdAt,
  deletedAt: record.deletedAt ?? null
});

const normalizeLandingPage = (record: LandingPageRecord): LandingPageRecord => ({
  ...record,
  deletedAt: record.deletedAt ?? null
});

const normalizeAdminData = (data: AdminDataStore): AdminDataStore => ({
  enquiries: data.enquiries.map(normalizeEnquiry),
  partnerApplications: data.partnerApplications.map(normalizePartner),
  landingPages: data.landingPages.map(normalizeLandingPage)
});

const ensureAdminDataFile = async () => {
  try {
    await fs.access(adminDataFilePath);
  } catch {
    await fs.mkdir(path.dirname(adminDataFilePath), { recursive: true });
    await fs.writeFile(adminDataFilePath, JSON.stringify(defaultAdminData, null, 2) + "\n");
  }
};

export const readAdminData = async () => {
  noStore();
  await ensureAdminDataFile();
  const file = await fs.readFile(adminDataFilePath, "utf8");
  return normalizeAdminData(JSON.parse(file) as AdminDataStore);
};

export const writeAdminData = async (input: AdminDataStore) => {
  const normalized = normalizeAdminData(input);
  await fs.writeFile(adminDataFilePath, JSON.stringify(normalized, null, 2) + "\n");
  return normalized;
};

export const appendEnquiryRecord = async (record: EnquiryRecord) => {
  const data = await readAdminData();
  data.enquiries.unshift(normalizeEnquiry(record));
  await writeAdminData(data);
  return record;
};

export const appendPartnerApplicationRecord = async (record: PartnerApplicationRecord) => {
  const data = await readAdminData();
  data.partnerApplications.unshift(normalizePartner(record));
  await writeAdminData(data);
  return record;
};

export const upsertLandingPageRecord = async (record: LandingPageRecord) => {
  const data = await readAdminData();
  const index = data.landingPages.findIndex((item) => item.id === record.id);

  if (index >= 0) {
    data.landingPages[index] = normalizeLandingPage(record);
  } else {
    data.landingPages.unshift(normalizeLandingPage(record));
  }

  await writeAdminData(data);
  return record;
};

export const getPublishedLandingPageBySlug = async (slug: string) => {
  const data = await readAdminData();
  return data.landingPages.find((item) => item.slug === slug && item.status === "published");
};

export const listPublishedLandingPages = async () => {
  const data = await readAdminData();
  return data.landingPages.filter((item) => item.status === "published" && !item.deletedAt);
};

export const getEnquiryRecordById = async (id: string) => {
  const data = await readAdminData();
  return data.enquiries.find((item) => item.id === id);
};

export const getPartnerApplicationRecordById = async (id: string) => {
  const data = await readAdminData();
  return data.partnerApplications.find((item) => item.id === id);
};

export const getLandingPageRecordById = async (id: string) => {
  const data = await readAdminData();
  return data.landingPages.find((item) => item.id === id);
};

export const updateEnquiryRecord = async (record: EnquiryRecord) => {
  const data = await readAdminData();
  const index = data.enquiries.findIndex((item) => item.id === record.id);

  if (index < 0) {
    return null;
  }

  data.enquiries[index] = normalizeEnquiry(record);
  await writeAdminData(data);
  return data.enquiries[index];
};

export const updatePartnerApplicationRecord = async (record: PartnerApplicationRecord) => {
  const data = await readAdminData();
  const index = data.partnerApplications.findIndex((item) => item.id === record.id);

  if (index < 0) {
    return null;
  }

  data.partnerApplications[index] = normalizePartner(record);
  await writeAdminData(data);
  return data.partnerApplications[index];
};

export const updateLandingPageRecord = async (record: LandingPageRecord) => {
  const data = await readAdminData();
  const index = data.landingPages.findIndex((item) => item.id === record.id);

  if (index < 0) {
    return null;
  }

  data.landingPages[index] = normalizeLandingPage(record);
  await writeAdminData(data);
  return data.landingPages[index];
};

export const setEnquiryDeletedState = async (id: string, deletedAt: null | string) => {
  const record = await getEnquiryRecordById(id);
  if (!record) {
    return null;
  }

  return updateEnquiryRecord({ ...record, deletedAt, updatedAt: new Date().toISOString() });
};

export const setPartnerApplicationDeletedState = async (id: string, deletedAt: null | string) => {
  const record = await getPartnerApplicationRecordById(id);
  if (!record) {
    return null;
  }

  return updatePartnerApplicationRecord({ ...record, deletedAt, updatedAt: new Date().toISOString() });
};

export const setLandingPageDeletedState = async (id: string, deletedAt: null | string) => {
  const record = await getLandingPageRecordById(id);
  if (!record) {
    return null;
  }

  return updateLandingPageRecord({ ...record, deletedAt, updatedAt: new Date().toISOString() });
};

export const permanentlyDeleteEnquiryRecord = async (id: string) => {
  const data = await readAdminData();
  data.enquiries = data.enquiries.filter((item) => item.id !== id);
  await writeAdminData(data);
};

export const permanentlyDeletePartnerApplicationRecord = async (id: string) => {
  const data = await readAdminData();
  data.partnerApplications = data.partnerApplications.filter((item) => item.id !== id);
  await writeAdminData(data);
};

export const permanentlyDeleteLandingPageRecord = async (id: string) => {
  const data = await readAdminData();
  data.landingPages = data.landingPages.filter((item) => item.id !== id);
  await writeAdminData(data);
};
