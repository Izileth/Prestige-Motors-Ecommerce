import { Link } from 'react-router-dom';
import { FooterProps } from './types';
import { defaultLinkGroups } from './data';

export const FooterLinks: React.FC<FooterProps> = ({ customLinkGroups }) => {
    const linkGroups = customLinkGroups || defaultLinkGroups;

    return (
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {linkGroups.map((group) => (
                <div key={group.title} className="space-y-5">
                    <h3 className="text-xs font-medium uppercase tracking-wider">{group.title}</h3>
                    <ul className="space-y-3">
                        {group.links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.href}
                                    className="text-sm font-extralight text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
