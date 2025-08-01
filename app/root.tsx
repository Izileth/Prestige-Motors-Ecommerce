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

import { Provider } from "react-redux";
import { createStore } from "~/src/store/global";

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
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Descubra a essência da exclusividade automotiva com a Prestige Motors. Veículos de luxo, performance e design sofisticado que redefinem sua experiência ao volante."/>

        <link rel="icon" href="https://i.pinimg.com/736x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://i.pinimg.com/736x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://i.pinimg.com/736x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://i.pinimg.com/736x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" />
     

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Prestige Motors | A Elite Implora Por Velocidade" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Prestige Motors" />
        <meta property="og:description"  content="Explore a linha exclusiva de veículos de alto padrão da Prestige Motors. Conquiste seu próximo carro com performance e estilo incomparáveis." />
        <meta property="og:url" content="https://www.exemplo.com/" />
        <meta property="og:image" content="https://www.exemplo.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pretige Motors - Luxo & Velocidade" />
        <meta name="twitter:description" content="Descubra a paixão pela excelência automotiva com a Prestige  Motors. Uma experiência única para amantes de carros de alto padrão."/>
        <meta name="twitter:image" content="https://www.exemplo.com/twitter-image.png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  
  const store = createStore();
  
  return (
    <Provider store={store}>
      <Banner/>
      <Navigation />
      <Outlet />
      <Baseboard/>
      <Footer />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-thin text-gray-800 dark:text-gray-200 mb-4">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">Not Found!</p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Esta página não está disponível.
        </p>
        <a
          href="/"
          className="text-gray-800 dark:text-gray-200 underline hover:no-underline"
        >
          Retornar 
        </a>
      </div>
    </main>
  );
}