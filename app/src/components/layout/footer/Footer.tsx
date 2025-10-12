import React from 'react';
import { FooterProps } from './types';
import { FooterInfo } from './FooterInfo';
import { FooterLinks } from './FooterLinks';
import { NewsletterForm } from './NewsletterForm';
import { FooterLegal } from './FooterLegal';

const Footer: React.FC<FooterProps> = ({
    showNewsletter = true,
    className = "",
    ...props
}) => {
    return (
        <footer className={`bg-background border-t border-border w-full ${className}`}>
            <div className="container px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    <FooterInfo {...props} />
                    <FooterLinks {...props} />
                    {showNewsletter && <NewsletterForm {...props} />}
                </div>
                <FooterLegal {...props} />
            </div>
        </footer>
    );
};

export default Footer;
