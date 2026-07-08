import type { LucideIcon } from "lucide-react";
import type { Route } from "next";

export type NavItem = {
  label: string;
  href: Route;
};

export type ContactMethod = {
  label: string;
  value: string;
  href?: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  heroDescription: string;
  intro: string;
  icon: LucideIcon;
  deliverables: string[];
  problems: string[];
  audiences: string[];
  technologies: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
};

export type ProjectEntry = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  technologies: string[];
  features: string[];
  status: "Real client project" | "Internal product" | "Concept demonstration" | "Capability example";
  externalUrl?: string;
};
