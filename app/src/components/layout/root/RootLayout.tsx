import { Scripts, ScrollRestoration } from "react-router-dom";
import { Head } from "./Head";
import Navigation from "../navigation";
import { Baseboard } from "../BottonBanner";
import { Banner } from "../TopBanner";
import Footer from "../FooterBar";
import { Toaster } from "sonner";

export function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <Head />
            <body>
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
