import type { Metadata } from "next";

import "./globals.css";
import PageNavigation from "@/components/PageNavigation";
import logo from "./favicon.ico";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: {
        default:
            "Practica para el examen de manejo en español en Estados Unidos | Conduce en Estados Unidos",
        template: "%s | Conduce en Estados Unidos",
    },
    description:
        "Practica gratis para el examen de manejo DMV en español. Elige tu estado, responde preguntas reales y prepárate para obtener tu licencia en Estados Unidos.",
    twitter: {
        card: "summary_large_image",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth h-full">
            <head>
                <link
                    rel="icon"
                    type="favicon"
                    sizes="any"
                    href={logo.src}
                ></link>
            </head>
            <body className="h-full">
                <div className="flex flex-col h-full">
                    <PageNavigation />
                    <main className="grow bg-white dark:bg-gray-900">
                        {children}
                    </main>
                    <Footer />
                </div>
                <Analytics />
            </body>
        </html>
    );
}
