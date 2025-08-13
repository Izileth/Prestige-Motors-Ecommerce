import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

import Navigation from "./src/components/layout/NavigationBar";
import { Baseboard } from "~/src/components/layout/BottonBanner";
import { Banner } from "~/src/components/layout/TopBanner";
import Footer from "./src/components/layout/FooterBar";

import { Toaster } from "sonner";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Preload critical resources
  { rel: "preload", href: "/images/hero-bg.webp", as: "image", type: "image/webp" },
  { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
  { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="description" content="Prestige Motors - Concessionária de veículos de luxo e alto padrão. Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz e mais. Performance, exclusividade e sofisticação em cada detalhe." />
        <meta name="keywords" content="carros de luxo, veículos premium, concessionária, Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz, carros esportivos, automóveis exclusivos, Brasil" />
        <meta name="author" content="Prestige Motors" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Geographic and Business Info */}
        <meta name="geo.region" content="BR" />
        <meta name="geo.country" content="Brazil" />
        <meta name="language" content="Portuguese" />
        <meta name="distribution" content="global" />
        
        {/* Favicon - Optimized */}
        <link rel="icon"  href="https://i.pinimg.com/1200x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" sizes="48x48" />
        <link rel="icon" href="https://i.pinimg.com/1200x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="https://i.pinimg.com/1200x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme and Mobile Optimization */}
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Prestige Motors" />
        
        {/* Open Graph - Enhanced */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Prestige Motors" />
        <meta property="og:title" content="Prestige Motors - Veículos de Luxo e Alto Padrão | Concessionária Premium" />
        <meta property="og:description" content="Descubra a exclusiva coleção de veículos de luxo da Prestige Motors. Ferrari, Lamborghini, Porsche e mais. Performance excepcional e design sofisticado." />
        <meta property="og:url" content="https://prestigemotors.online/" />
        <meta property="og:image" content="https://prestigemotors.online/images/og-prestige-motors.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Prestige Motors - Concessionária de Veículos de Luxo" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter Cards - Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PrestigeMotorsBR" />
        <meta name="twitter:creator" content="@PrestigeMotorsBR" />
        <meta name="twitter:title" content="Prestige Motors - Veículos de Luxo Premium" />
        <meta name="twitter:description" content="A elite dos automóveis te espera. Descubra veículos únicos com performance excepcional e design incomparável." />
        <meta name="twitter:image" content="https://prestigemotors.online/images/twitter-prestige-motors.jpg" />
        <meta name="twitter:image:alt" content="Showroom Prestige Motors com carros de luxo" />
        
        {/* Business/Organization Schema */}
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
              "image": "https://prestigemotors.online/images/showroom-prestige.jpg",
              "telephone": "+55-11-9999-9999",
              "email": "noreply@prestigemotors.online",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Paulista, 1000",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "postalCode": "01310-100",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-23.561684",
                "longitude": "-46.655981"
              },
              "openingHours": [
                "Mo-Fr 08:00-18:00",
                "Sa 08:00-16:00"
              ],
              "priceRange": "$$$",
              "paymentAccepted": ["Cash", "Credit Card", "Financing"],
              "currenciesAccepted": "BRL",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "-23.561684",
                  "longitude": "-46.655981"
                },
                "geoRadius": "50000"
              }
            })
          }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Prestige Motors",
              "url": "https://prestigemotors.online",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://prestigemotors.online/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Breadcrumb Schema (will be populated by individual pages) */}
        <script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Início",
                  "item": "https://prestigemotors.online"
                }
              ]
            })
          }}
        />
        
        {/* Canonical URL - será definida por cada página */}
        <link rel="canonical" href="https://prestigemotors.online/" />
        
        {/* Hreflang for internationalization (se aplicável) */}
        <link rel="alternate" hrefLang="pt-BR" href="https://prestigemotors.online/" />
        <link rel="alternate" hrefLang="x-default" href="https://prestigemotors.online/" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        <Meta />
        <Links />
      </head>
      <body>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50">
          Pular para o conteúdo principal
        </a>
        
        <Banner />
        <Navigation />
        <main id="main-content">
          {children}
        </main>
        <Baseboard />
        <Footer />
        
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Ocorreu um erro inesperado.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erro";
    details =
      error.status === 404
        ? "A página solicitada não foi encontrada."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{message === "404" ? "Página Não Encontrada" : "Erro"} - Prestige Motors</title>
        <meta name="description" content="Página não encontrada ou erro no site da Prestige Motors." />
        <meta name="robots" content="noindex, nofollow" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900">
          <div className="text-center max-w-md">
            <h1 className="text-9xl font-thin text-gray-800 dark:text-gray-200 mb-4">
              {message === "404" ? "404" : "Erro"}
            </h1>
            <h2 className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
              {message === "404" ? "Página Não Encontrada" : "Algo deu errado"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {message === "404" 
                ? "A página que você está procurando não existe ou foi movida."
                : "Ocorreu um erro inesperado. Nossa equipe foi notificada."
              }
            </p>
            <div className="space-y-4">
              <a
                href="/"
                className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Voltar ao Início
              </a>
              <div className="text-sm text-gray-500">
                <a href="/contato" className="underline hover:no-underline">
                  Entre em contato conosco
                </a>
              </div>
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}