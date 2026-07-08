import type { NavItem } from "@/types/content";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Marketing Partners", href: "/partners" },
  { label: "Contact", href: "/contact" }
] satisfies NavItem[];
