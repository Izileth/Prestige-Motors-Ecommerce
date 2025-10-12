import { Link } from 'react-router';
import type { FooterProps } from './types';
import { defaultSocialLinks } from './data';

export const FooterInfo: React.FC<FooterProps> = ({
    companyName = "PRESTIGE MOTORS",
    companyDescription = "Os catalógos mais diversificados do mundo em um só lugar ",
    customSocialLinks,
    logo,
}) => {
    const socialLinks = customSocialLinks || defaultSocialLinks;

    return (
        <div className="flex flex-col space-y-6 lg:col-span-3">
            {logo ? (
                <div>{logo}</div>
            ) : (
                <Link to="/" className="text-xl font-extralight tracking-widest">
                    {companyName}
                </Link>
            )}
            <p className="text-sm font-light text-muted-foreground max-w-xs">{companyDescription}</p>
            <div className="flex space-x-5">
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                        className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                        <link.icon className="h-5 w-5 stroke-1" />
                    </a>
                ))}
            </div>
        </div>
    );
};
