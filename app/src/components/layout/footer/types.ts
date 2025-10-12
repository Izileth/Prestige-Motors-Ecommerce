import React from 'react';

export interface FooterLinkGroup {
    title: string;
    links: {
        name: string;
        href: string;
    }[];
}

export interface SocialLink {
    name: string;
    icon: React.ElementType;
    href: string;
}

export interface FooterProps {
    companyName?: string;
    companyDescription?: string;
    showNewsletter?: boolean;
    customLinkGroups?: FooterLinkGroup[];
    customSocialLinks?: SocialLink[];
    customLegalLinks?: { name: string; href: string }[];
    newsletterTitle?: string;
    newsletterDescription?: string;
    newsletterButtonText?: string;
    newsletterPlaceholder?: string;
    onNewsletterSubmit?: (email: string) => void;
    className?: string;
    logo?: React.ReactNode;
}
