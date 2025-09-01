import "@/styles/global.css";
import PageNavigation from "@/components/PageNavigation";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
    return (
        <html lang="es" className="scroll-smooth h-full">
            <head>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                ></link>
            </head>
            <body className="h-full">
                <div className="flex flex-col h-full">
                    <PageNavigation />
                    <main className="grow">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
