import "@/styles/global.css";
import PageNavigation from "@/components/client/PageNavigation";
import Footer from "@/components/client/Footer";

export default function RootLayout({ children }) {
    return (
        <html lang="es" className="scroll-smooth">
            <head>
                <title>Driving Exam Practice</title>
                <link rel="icon" type="image/png" sizes="32x32" href="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"></link>
            </head>
            <body className="bg-gray-100 ">
                <div className="flex flex-col h-screen">
                    <PageNavigation />
                    <main className="mb-auto">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
