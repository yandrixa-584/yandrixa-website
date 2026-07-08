import {
  Activity,
  BarChart3,
  Bot,
  Boxes,
  BriefcaseBusiness,
  Database,
  Globe,
  ShoppingCart,
  Wrench
} from "lucide-react";

import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "website-development",
    name: "Website Development",
    shortName: "Website Development",
    category: "Website Development",
    description:
      "Professional, responsive, and conversion-focused websites designed to strengthen your online presence and generate meaningful business enquiries.",
    heroDescription:
      "Professional websites built to represent your business clearly, perform well across devices, and support real enquiries.",
    intro:
      "From business websites to landing pages and redesigns, Yandrixa creates modern web experiences that balance credibility, clarity, and performance.",
    icon: Globe,
    deliverables: [
      "Business and corporate websites",
      "Landing pages and conversion flows",
      "Responsive redesigns",
      "Maintenance and enhancement support"
    ],
    problems: [
      "Outdated websites that do not reflect the business properly",
      "Poor mobile experience and slow performance",
      "Low enquiry conversion from existing pages",
      "Difficulty updating content or expanding the website later"
    ],
    audiences: [
      "Startups launching a new brand presence",
      "Businesses replacing an outdated website",
      "Teams needing campaign landing pages",
      "Companies that need long-term website support"
    ],
    technologies: ["Next.js", "Responsive UI systems", "CMS-ready architecture", "SEO foundations"],
    faqs: [
      {
        question: "Can Yandrixa redesign an existing website?",
        answer: "Yes. Existing websites can be improved through structural redesign, UX cleanup, better messaging, and modern frontend implementation."
      },
      {
        question: "Do you also maintain websites after launch?",
        answer: "Yes. Ongoing maintenance can include updates, fixes, content support, and improvement work."
      }
    ],
    relatedSlugs: ["digital-marketing", "maintenance-optimization", "lead-generation"]
  },
  {
    slug: "web-application-development",
    name: "Web Application Development",
    shortName: "Web Applications",
    category: "Web Applications and APIs",
    description:
      "Secure and scalable web applications, backend systems, and APIs built around your operational and business requirements.",
    heroDescription:
      "Custom web applications designed around your workflows, users, permissions, and long-term product goals.",
    intro:
      "Yandrixa builds web applications for businesses that need more than a brochure website, from portals and SaaS products to internal tools.",
    icon: Boxes,
    deliverables: [
      "Custom web applications",
      "Customer and vendor portals",
      "SaaS platforms",
      "Authentication and role-based access"
    ],
    problems: [
      "Manual processes spread across multiple tools",
      "No central system for customers, staff, or operations",
      "Difficult-to-maintain legacy backend flows",
      "Need for secure permissions and scalable architecture"
    ],
    audiences: [
      "Businesses digitizing internal workflows",
      "Founders launching SaaS products",
      "Teams needing role-based portals",
      "Operations teams that need centralized dashboards"
    ],
    technologies: ["Next.js", "Laravel", "Python", "PostgreSQL", "Role-based access"],
    faqs: [
      {
        question: "Can you build SaaS-style platforms?",
        answer: "Yes. Yandrixa can structure multi-user and multi-role applications with scalable backend architecture."
      },
      {
        question: "Do you help define the scope before development?",
        answer: "Yes. Discovery and planning are part of shaping a practical build path before major development starts."
      }
    ],
    relatedSlugs: ["api-development", "business-dashboards", "maintenance-optimization"]
  },
  {
    slug: "api-development",
    name: "API Development",
    shortName: "API Development",
    category: "Web Applications and APIs",
    description:
      "Reliable API development and integration work for platforms that need secure data exchange, automation, and backend coordination.",
    heroDescription:
      "Custom API layers that connect systems, support business workflows, and keep data moving cleanly between tools.",
    intro:
      "API work includes backend modernization, third-party integrations, service orchestration, and custom endpoints for internal or public use.",
    icon: Database,
    deliverables: [
      "REST API development",
      "Third-party integrations",
      "Backend modernization",
      "Authentication and permission layers"
    ],
    problems: [
      "Disconnected systems with manual data transfer",
      "Legacy backends that are hard to extend",
      "Missing integration layers between products",
      "Need for reliable authentication and role control"
    ],
    audiences: [
      "Teams extending an existing product",
      "Businesses integrating ERP, CRM, or e-commerce tools",
      "Founders building API-first products",
      "Organizations modernizing backend systems"
    ],
    technologies: ["Laravel", "Python", "REST APIs", "OAuth", "Webhook systems"],
    faqs: [
      {
        question: "Can you integrate third-party services?",
        answer: "Yes. Integrations can include CRMs, payment gateways, internal systems, and automation tools."
      },
      {
        question: "Do you support API upgrades on existing applications?",
        answer: "Yes. Yandrixa can extend, refactor, or re-architect API layers based on current system needs."
      }
    ],
    relatedSlugs: ["web-application-development", "ai-chatbots-automation", "maintenance-optimization"]
  },
  {
    slug: "ecommerce-solutions",
    name: "E-commerce Solutions",
    shortName: "E-commerce",
    category: "E-commerce Solutions",
    description:
      "Flexible e-commerce solutions that help businesses sell products online, manage orders, and provide a smooth customer experience.",
    heroDescription:
      "Storefronts and commerce workflows built to support product visibility, customer confidence, and operational clarity.",
    intro:
      "From Shopify customization to custom commerce systems, Yandrixa helps businesses create buying experiences that are easier to manage and grow.",
    icon: ShoppingCart,
    deliverables: [
      "Online store development",
      "Shopify setup and customization",
      "Payment gateway integrations",
      "Order and customer account systems"
    ],
    problems: [
      "Stores that are hard to manage or expand",
      "Weak product presentation and checkout flows",
      "Manual order handling and inventory confusion",
      "Need for tailored e-commerce workflows"
    ],
    audiences: [
      "Businesses launching their first online store",
      "Brands improving an existing e-commerce setup",
      "Teams needing custom order workflows",
      "Catalog-driven businesses expanding online"
    ],
    technologies: ["Shopify", "Custom storefronts", "Payment integrations", "Inventory syncs"],
    faqs: [
      {
        question: "Can Yandrixa work with Shopify?",
        answer: "Yes. Shopify setup, customization, and extension work can be included when it matches the business requirement."
      },
      {
        question: "Do you build custom commerce features too?",
        answer: "Yes. When standard store tooling is not enough, custom features and backend workflows can be added."
      }
    ],
    relatedSlugs: ["website-development", "digital-marketing", "lead-generation"]
  },
  {
    slug: "ai-chatbots-automation",
    name: "AI Chatbots and Automation",
    shortName: "AI and Automation",
    category: "AI Chatbots and Automation",
    description:
      "Practical AI and automation solutions that reduce manual work, improve response times, and help teams operate more efficiently.",
    heroDescription:
      "Automation systems that help businesses respond faster, reduce repetitive work, and improve team efficiency.",
    intro:
      "Yandrixa focuses on practical AI use cases such as chatbot flows, lead qualification, workflow automation, and document-driven processes.",
    icon: Bot,
    deliverables: [
      "Customer-support chatbots",
      "Lead qualification flows",
      "Workflow automation",
      "WhatsApp and CRM automation"
    ],
    problems: [
      "Teams spending time on repetitive manual tasks",
      "Slow enquiry handling and missed follow-up",
      "Disconnected workflows between communication and operations",
      "Need to automate routine document or appointment tasks"
    ],
    audiences: [
      "Support and sales teams with repetitive inbound work",
      "Businesses that need process automation",
      "Founders exploring practical AI workflows",
      "Teams that want better lead response systems"
    ],
    technologies: ["AI workflow tools", "Webhook automation", "CRM integrations", "Document processing"],
    faqs: [
      {
        question: "Do chatbots replace the whole support team?",
        answer: "The goal is usually to handle routine conversations better and faster, while keeping human escalation where needed."
      },
      {
        question: "Can automation connect with existing tools?",
        answer: "Yes. Automation can be shaped around CRMs, communication tools, websites, and custom backends."
      }
    ],
    relatedSlugs: ["api-development", "lead-generation", "business-dashboards"]
  },
  {
    slug: "business-dashboards",
    name: "Business Systems and Dashboards",
    shortName: "Business Dashboards",
    category: "Business Systems and Dashboards",
    description:
      "Custom dashboards and management systems that bring your operations, data, users, and reports into one organized platform.",
    heroDescription:
      "Operational dashboards that help teams see what is happening, coordinate work clearly, and make better decisions.",
    intro:
      "These systems can support appointments, inventory, ERP-style workflows, internal reporting, and business-specific management modules.",
    icon: BarChart3,
    deliverables: [
      "Admin dashboards",
      "CRM and ERP modules",
      "Inventory and booking systems",
      "Reporting interfaces"
    ],
    problems: [
      "Operational data scattered across tools",
      "No clear reporting or team visibility",
      "Manual status tracking and missed updates",
      "Need for business-specific system logic"
    ],
    audiences: [
      "Operations teams needing central control",
      "Service businesses coordinating multiple staff roles",
      "Businesses with repeated reporting workflows",
      "Teams replacing spreadsheets with a real system"
    ],
    technologies: ["Dashboards", "Role-based portals", "Database architecture", "Workflow tools"],
    faqs: [
      {
        question: "Can the dashboard match our internal workflow?",
        answer: "Yes. Custom systems are built around the business process rather than forcing a generic template."
      },
      {
        question: "Do these systems support multiple user roles?",
        answer: "Yes. Permissions and workflows can be configured around the responsibilities of each role."
      }
    ],
    relatedSlugs: ["web-application-development", "api-development", "maintenance-optimization"]
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortName: "Digital Marketing",
    category: "Digital Marketing and Lead Generation",
    description:
      "Digital growth services focused on increasing visibility, attracting relevant audiences, and generating qualified business enquiries.",
    heroDescription:
      "Marketing support shaped around visibility, campaign readiness, and better enquiry quality.",
    intro:
      "Yandrixa combines marketing support with the technical side of landing pages, conversion tracking, and growth systems.",
    icon: BriefcaseBusiness,
    deliverables: [
      "Social media marketing support",
      "SEO support and content planning",
      "Campaign landing pages",
      "Conversion tracking setup"
    ],
    problems: [
      "Low visibility despite having a website",
      "Campaign traffic that does not convert well",
      "No clear tracking for enquiries or sources",
      "Need for aligned technical and marketing execution"
    ],
    audiences: [
      "Businesses improving lead flow",
      "Founders running campaigns around a product launch",
      "Teams needing better landing pages",
      "Companies that want technical and marketing alignment"
    ],
    technologies: ["SEO foundations", "Landing pages", "Tracking setup", "Campaign support"],
    faqs: [
      {
        question: "Do you guarantee rankings or lead volume?",
        answer: "No. Yandrixa focuses on practical strategy, execution quality, and better systems without making unsupported guarantees."
      },
      {
        question: "Can this be combined with website or funnel work?",
        answer: "Yes. Marketing support often works best when paired with landing page and technical improvements."
      }
    ],
    relatedSlugs: ["lead-generation", "website-development", "ecommerce-solutions"]
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    shortName: "Lead Generation",
    category: "Digital Marketing and Lead Generation",
    description:
      "Lead-generation support designed to improve how businesses capture, qualify, and follow up with relevant enquiries.",
    heroDescription:
      "Lead systems that help businesses move from scattered enquiries to a more structured, trackable pipeline.",
    intro:
      "This includes landing pages, workflows, automation, follow-up alignment, and practical improvements to the enquiry journey.",
    icon: Activity,
    deliverables: [
      "Lead-generation campaigns",
      "Funnel setup",
      "Landing pages and forms",
      "Enquiry routing and automation"
    ],
    problems: [
      "Leads coming in without structure or qualification",
      "Poor follow-up consistency",
      "Low visibility into where enquiries come from",
      "Need to connect forms, CRM, and communication"
    ],
    audiences: [
      "Businesses improving sales intake",
      "Campaign-driven companies",
      "Service providers that need better enquiry handling",
      "Teams connecting forms with automation or CRM"
    ],
    technologies: ["Funnels", "Forms", "Automation", "CRM routing", "Tracking events"],
    faqs: [
      {
        question: "Is lead generation only paid advertising?",
        answer: "No. It can include landing pages, inbound improvements, organic support, tracking setup, and automation."
      },
      {
        question: "Can you improve our current enquiry process?",
        answer: "Yes. Existing landing pages, forms, and follow-up flows can be reviewed and improved."
      }
    ],
    relatedSlugs: ["digital-marketing", "ai-chatbots-automation", "website-development"]
  },
  {
    slug: "maintenance-optimization",
    name: "Maintenance and Optimization",
    shortName: "Maintenance",
    category: "Maintenance and Optimization",
    description:
      "Ongoing technical support to keep websites and applications stable, secure, updated, and ready to scale.",
    heroDescription:
      "Support for teams that need bug fixing, performance improvements, deployment help, and practical technical continuity.",
    intro:
      "Maintenance can include troubleshooting, optimization, upgrades, integrations, and ongoing technical support across live systems.",
    icon: Wrench,
    deliverables: [
      "Bug fixing and troubleshooting",
      "Performance and database optimization",
      "Security and stability improvements",
      "Deployment and server support"
    ],
    problems: [
      "Recurring technical issues slowing down operations",
      "Existing systems that feel fragile or outdated",
      "Performance bottlenecks in live products",
      "Need for a reliable technical partner after launch"
    ],
    audiences: [
      "Businesses with an existing website or application",
      "Teams needing urgent fixes or stability work",
      "Companies without in-house technical capacity",
      "Product owners planning phased improvements"
    ],
    technologies: ["Performance profiling", "Deployment support", "Monitoring-ready workflows", "Security improvements"],
    faqs: [
      {
        question: "Can Yandrixa support a project built by another team?",
        answer: "Yes. Existing codebases can be reviewed and supported where the scope is clear and technically practical."
      },
      {
        question: "Is this only for emergency fixes?",
        answer: "No. Maintenance can also cover planned improvements, upgrades, refactoring, and ongoing support."
      }
    ],
    relatedSlugs: ["web-application-development", "api-development", "website-development"]
  }
];

export const serviceCategories = [
  {
    title: "Website Development",
    description: services[0].description,
    serviceSlugs: ["website-development"]
  },
  {
    title: "Web Applications and APIs",
    description: "Secure and scalable web applications, backend systems, and APIs built around your operational and business requirements.",
    serviceSlugs: ["web-application-development", "api-development"]
  },
  {
    title: "E-commerce Solutions",
    description: services[3].description,
    serviceSlugs: ["ecommerce-solutions"]
  },
  {
    title: "AI Chatbots and Automation",
    description: services[4].description,
    serviceSlugs: ["ai-chatbots-automation"]
  },
  {
    title: "Business Systems and Dashboards",
    description: services[5].description,
    serviceSlugs: ["business-dashboards"]
  },
  {
    title: "Digital Marketing and Lead Generation",
    description: "Digital growth services focused on increasing visibility, attracting relevant audiences, and generating qualified business enquiries.",
    serviceSlugs: ["digital-marketing", "lead-generation"]
  },
  {
    title: "Maintenance and Optimization",
    description: services[8].description,
    serviceSlugs: ["maintenance-optimization"]
  }
];

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug);
