import type { ProjectEntry } from "@/types/content";

export const projects: ProjectEntry[] = [
  {
    slug: "saas-management-platform",
    title: "SaaS Management Platform",
    category: "Business Platform",
    summary: "A multi-role SaaS workspace for handling operations, customers, and reporting in one system.",
    challenge: "Growing teams often work across disconnected spreadsheets, chat threads, and manual approvals.",
    solution: "A centralized web platform with user roles, workflows, reporting, and scalable backend architecture.",
    technologies: ["Next.js", "Laravel", "REST APIs", "Role-based access"],
    features: ["Role dashboards", "Workflow approvals", "Activity logs", "Reporting modules"],
    status: "Capability example"
  },
  {
    slug: "clinic-management-system",
    title: "Clinic Management System",
    category: "Healthcare Operations",
    summary: "A practical workflow system for appointments, patient records, billing visibility, and staff coordination.",
    challenge: "Manual appointment handling and fragmented records slow down service teams.",
    solution: "A secure dashboard-driven system that organizes appointments, patient touchpoints, and reporting.",
    technologies: ["React", "Node.js", "PostgreSQL", "Analytics dashboards"],
    features: ["Appointment scheduling", "Role permissions", "Billing workflows", "Operational insights"],
    status: "Capability example"
  },
  {
    slug: "logistics-operations-portal",
    title: "Logistics Operations Portal",
    category: "Operations Portal",
    summary: "A portal for order flow, status visibility, dispatch coordination, and internal reporting.",
    challenge: "Operations teams need live visibility without depending on scattered updates.",
    solution: "A custom portal that connects orders, tracking states, assignments, and workflow updates.",
    technologies: ["Next.js", "Python APIs", "Automation", "Cloud deployment"],
    features: ["Status boards", "Dispatch coordination", "Alerts", "Audit trail"],
    status: "Concept demonstration"
  },
  {
    slug: "ai-lead-automation-solution",
    title: "AI Lead Automation Solution",
    category: "Automation",
    summary: "An automation stack that qualifies leads, routes conversations, and improves enquiry handling.",
    challenge: "Sales teams lose time on repetitive lead sorting and slow follow-up.",
    solution: "AI-assisted lead intake with workflow rules, CRM handoff, and operational alerts.",
    technologies: ["AI workflows", "APIs", "WhatsApp integration", "CRM automation"],
    features: ["Lead qualification", "Routing rules", "Workflow triggers", "Conversation insights"],
    status: "Capability example"
  }
];
