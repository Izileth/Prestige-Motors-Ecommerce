import { Meta, Links } from "react-router";

export const Head = () => {
    return (
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Meta tags padrão - podem ser sobrescritas pelo Helmet */}
        
            <title>{`Prestige Motors - ${document.title}`}</title>

            <meta name="description" content="Prestige Motors - Concessionária de veículos de luxo e alto padrão. Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz e mais." />
            <meta name="keywords" content="carros de luxo, veículos premium, concessionária, Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz" />
            <meta name="author" content="Prestige Motors" />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Geographic and Business Info */}
            <meta name="geo.region" content="BR" />
            <meta name="geo.country" content="Brazil" />
            <meta name="language" content="Portuguese" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.svg" sizes="48x48" />
            <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon.svg" />
            <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon.svg" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
            <link rel="manifest" href="/manifest.json" />

            {/* Theme */}
            <meta name="theme-color" content="#1a1a1a" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />

            {/* Open Graph padrão - podem ser sobrescritas */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Prestige Motors" />
            <meta property="og:title" content="Prestige Motors - Veículos de Luxo e Alto Padrão" />
            <meta property="og:description" content="Descubra a exclusiva coleção de veículos de luxo da Prestige Motors." />
            <meta property="og:url" content="https://prestigemotors.online/" />
            <meta property="og:image" content="https://prestigemotors.online/images/og-prestige-motors.jpg" />
            <meta property="og:locale" content="pt_BR" />

            {/* Twitter Cards padrão */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@PrestigeMotorsBR" />
            <meta name="twitter:title" content="Prestige Motors - Veículos de Luxo Premium" />
            <meta name="twitter:description" content="A elite dos automóveis te espera." />
            <meta name="twitter:image" content="https://prestigemotors.online/images/twitter-prestige-motors.jpg" />

            {/* Schema.org */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AutoDealer",
                        "name": "Prestige Motors",
                        "description": "Concessionária especializada em veículos de luxo e alto padrão",
                        "url": "https://prestigemotors.online/",
                        "logo": "https://prestigemotors.online/images/logo-prestige-motors.png",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Av. Paulista, 1000",
                            "addressLocality": "São Paulo",
                            "addressRegion": "SP",
                            "postalCode": "01310-100",
                            "addressCountry": "BR"
                        }
                    })
                }}
            />

            <link rel="canonical" href="https://prestigemotors.online/" />

            <Meta />
            <Links />
        </head>
    );
};
