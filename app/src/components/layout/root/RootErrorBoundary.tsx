import { isRouteErrorResponse, Links, Meta, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "../../../../+types/root";

export function RootErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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
