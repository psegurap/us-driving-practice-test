"use client";

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/styles/driving-school-svgrepo-com.svg";

export default function PageNavigation({ params }) {
    const navigation = [
        { name: "Inicio", href: "/", current: usePathname() == "/" },
        {
            name: "Privacidad",
            href: "/privacidad",
            current: usePathname() == "/privacidad",
        },
    ];

    return (
        <Disclosure
            as="nav"
            className="relative bg-gray-800 shadow-sm dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-cyan-600 focus:outline-hidden focus:ring-inset dark:hover:bg-white/5 dark:hover:text-white dark:focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block size-6 group-data-open:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden size-6 group-data-open:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <img
                                    alt="Conduce en Estados Unidos logo"
                                    src={logo.src}
                                    className="size-7 w-auto"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navigation.map((link) => (
                                <Link
                                    href={link.href}
                                    key={link.name}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                                        link.current
                                            ? "border-cyan-600 dark:border-cyan-500 text-white dark:text-white"
                                            : "border-transparent text-gray-400 hover:border-cyan-600 hover:text-gray-300 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-4">
                    {navigation.map((link) => (
                        <Link
                            href={link.href}
                            key={link.name}
                            className={`block border-l-4 border-cyan-600 py-2 pr-4 pl-3 font-medium ${
                                link.current
                                    ? "border-cyan-600 text-white dark:border-cyan-500"
                                    : "border-transparent text-gray-400 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
