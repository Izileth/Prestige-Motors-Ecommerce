import { Link } from 'react-router-dom';
import { FooterProps } from './types';
import { defaultLegalLinks } from './data';

export const FooterLegal: React.FC<FooterProps> = ({ companyName = "PRESTIGE MOTORS", customLegalLinks }) => {
    const currentYear = new Date().getFullYear();
    const legalLinks = customLegalLinks || defaultLegalLinks;

    return (
        <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-xs font-extralight text-muted-foreground">
                    © {currentYear} {companyName}.Todos os Direitos Reservados.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                    {legalLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
