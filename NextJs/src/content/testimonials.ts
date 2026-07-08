export type Testimonial = {
  name: string;
  role: string;
  company: string;
  feedback: string;
  initials: string;
  accent: "purple" | "green" | "blue" | "amber";
};

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "Founder",
    company: "Growing Startup",
    initials: "AM",
    accent: "purple",
    feedback:
      "The communication felt clear from the start, and the solution direction matched what a growing business would actually need."
  },
  {
    name: "Nisha Rao",
    role: "Operations Lead",
    company: "Operations Team",
    initials: "NR",
    accent: "green",
    feedback:
      "The platform concept feels organized and practical. It gives a strong sense of how workflows, reporting, and support can come together."
  },
  {
    name: "Daniel Joseph",
    role: "Independent Consultant",
    company: "Advisory Practice",
    initials: "DJ",
    accent: "blue",
    feedback:
      "The positioning is professional and easy to explain. It creates confidence without sounding inflated or unrealistic."
  },
  {
    name: "Priya Shah",
    role: "Business Owner",
    company: "Service Brand",
    initials: "PS",
    accent: "amber",
    feedback:
      "The layout feels modern, premium, and business-focused. The structure makes it easy to understand the services and next steps."
  },
  {
    name: "Rahul Verma",
    role: "Growth Manager",
    company: "Growth Team",
    initials: "RV",
    accent: "purple",
    feedback:
      "The enquiry journey looks clean and conversion-friendly. It feels like a solid foundation for client trust and better lead capture."
  }
];
