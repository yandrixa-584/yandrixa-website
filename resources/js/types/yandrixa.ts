export type NavItem = {
    label: string;
    href: string;
};

export type SiteProps = {
    branding: {
        name: string;
        brand: string;
        subBrand: string;
        tagline: string;
        domain: string;
    };
    seo: {
        siteUrl: string;
        defaultTitle: string;
        siteDescription: string;
    };
    navigation: NavItem[];
    content: {
        footerDescription: string;
        trustPoints: string[];
    };
    contact: {
        email: string;
        phone: string;
        whatsapp: string;
        location: string;
    };
    social: Record<string, string>;
    partnerProgram: {
        headline: string;
        disclosure: string;
        commissionPercentage: string;
    };
    services: Array<{
        name: string;
        description: string;
    }>;
    projects: Array<{
        title: string;
        summary: string;
    }>;
    testimonials: Array<{
        name: string;
        role: string;
        company: string;
        feedback: string;
    }>;
    stats: {
        enquiries: number;
        partnerApplications: number;
        landingPages: number;
    };
};

export type FlashProps = {
    success?: string | null;
    error?: string | null;
};
