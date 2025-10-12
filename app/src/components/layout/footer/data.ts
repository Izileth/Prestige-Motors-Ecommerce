import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import type { FooterLinkGroup, SocialLink } from './types';

export const defaultLinkGroups: FooterLinkGroup[] = [
    {
        title: "Garagem",
        links: [
            { name: "Anunciar", href: "/vehicles/create" },
            { name: "Vendas", href: "/sale/dashboard" },
            { name: "Veículos", href: "/vehicles/user" },
            { name: "Destaques", href: "/destacts" },
        ],
    },
    {
        title: "Detalhes",
        links: [
            { name: "Conta", href: "/dashboard" },
            { name: "Catálogo", href: "/vehicles" },
            { name: "Anúncios", href: "/vehicles/negociations" },
            { name: "Dúvidas & Repostas", href: "/support" },
        ],
    },
    {
        title: "Nos Conheça",
        links: [
            { name: "Nossa História", href: "/about" },
            { name: "Nossa Missão", href: "/history" },
        ],
    },
];

export const defaultSocialLinks: SocialLink[] = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Youtube", icon: Youtube, href: "https://youtube.com" },
];

export const defaultLegalLinks = [
    { name: "Terms & Conditions", href: "/polities/conditions" },
    { name: "Privacy Policy", href: "/polities/privacy" },
    { name: "Cookie Policy", href: "/polities/cookies" },
];
