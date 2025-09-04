import "@/styles/global.css";
import PageNavigation from "@/components/PageNavigation";
import logo from "@/styles/driving-school-svgrepo-com.svg"

import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
    return (
        <html lang="es" className="scroll-smooth h-full">
            <head>
                <link
                    rel="icon"
                    type="favicon"
                    sizes="32x32"
                    href={logo.src}
                ></link>
            </head>
            <body className="h-full">
                <div className="flex flex-col h-full">
                    <PageNavigation />
                    <main className="grow dark:bg-gray-900">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
