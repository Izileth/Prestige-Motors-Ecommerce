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

import { ReduxProviders } from "./store/providers";

import Navigation from "./components/layout/navigation/navgation";
import Footer from "./components/layout/footer/footer";
import { Banner } from "./components/layout/banner/banner";
import { Baseboard } from "./components/layout/baseboard/baseboard";
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
            <meta
          name="description"
          content="Descubra a essência da exclusividade automotiva com a Vortex Motors. Veículos de luxo, performance e design sofisticado que redefinem sua experiência ao volante."
        />
        <meta
          name="keywords"
          content="Vortex Motors, carros de luxo, veículos exclusivos, performance automotiva, carros premium, experiência personalizada, sofisticação automotiva"
        />
        <meta
          property="og:title"
          content="Vortex Motors - Exclusividade e Sofisticação Automotiva"
        />
        <meta
          property="og:description"
          content="Explore a linha exclusiva de veículos de alto padrão da Vortex Motors. Conquiste seu próximo carro com performance e estilo incomparáveis."
        />
        <meta
          property="og:image"
          content="https://www.prestigemotors.com/og-image.jpg"
        />
        <meta property="og:url" content="https://www.prestigemotors.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Vortex Motors - Veículos de Luxo e Exclusividade"
        />
        <meta
          name="twitter:description"
          content="Descubra a paixão pela excelência automotiva com a Vortex Motors. Uma experiência única para amantes de carros de alto padrão."
        />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link
          rel="icon"
          href="https://i.pinimg.com/736x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg"
        />
        <link
          rel="icon"
          href="https://i.pinimg.com/736x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          href="https://i.pinimg.com/736x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <ReduxProviders>
          <Banner/>
          <Navigation/>
          {children}
          <Baseboard/>
          <Footer/>
        </ReduxProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />
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
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
