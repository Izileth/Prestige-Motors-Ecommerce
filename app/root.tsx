
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


import { HelmetProvider } from "react-helmet-async";

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
        
        {/* Meta tags padrão - podem ser sobrescritas pelo Helmet */}
        <title>Prestige Motors - Veículos de Luxo e Alto Padrão</title>
        <meta name="description" content="Prestige Motors - Concessionária de veículos de luxo e alto padrão. Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz e mais." />
        <meta name="keywords" content="carros de luxo, veículos premium, concessionária, Ferrari, Lamborghini, Porsche, BMW, Mercedes-Benz" />
        <meta name="author" content="Prestige Motors" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Geographic and Business Info */}
        <meta name="geo.region" content="BR" />
        <meta name="geo.country" content="Brazil" />
        <meta name="language" content="Portuguese" />
        
        {/* Favicon */}
        <link rel="icon" href="https://i.pinimg.com/1200x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" sizes="48x48" />
        <link rel="apple-touch-icon" href="https://i.pinimg.com/1200x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" />
        
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
      <body>
        <HelmetProvider>
       
          
          <Banner />
          <Navigation />
          <main id="main-content">
            {children}
          </main>
          <Baseboard />
          <Footer />
          
          <Toaster />
        </HelmetProvider>
        
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