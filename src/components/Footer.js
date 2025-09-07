import logo from "@/styles/driving-school-svgrepo-com.svg";

const navigation = [
    { name: "Inicio", href: "/", _blank: false },
    { name: "Política de Privacidad", href: "/privacidad", _blank: false },
    { name: "Github", href: "https://psegurap.github.io/", _blank: true },
];

export default function Footer() {
    return (
        <footer className="bg-gray-800">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a
                        href="/"
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src={logo.src}
                            className="h-8"
                            alt="Conduce en Estados Unidos Logo"
                        />
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0 dark:text-gray-400">
                        {navigation.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    target={item._blank ? "_blank" : "_self"}
                                    className="hover:underline me-4 md:me-6"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className="my-6 border-gray-500 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm font-medium text-gray-400 sm:text-center dark:text-gray-400">
                    &copy; {new Date().getFullYear()}{" "}
                    <a
                        href="https://psegurap.github.io/"
                        target="_blank"
                        className="font-medium underline"
                    >
                        Pedro Segura
                    </a>
                    . All rights reserved.
                </span>
            </div>
        </footer>
    );
}
