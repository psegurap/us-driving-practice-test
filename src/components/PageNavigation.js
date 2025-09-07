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
    ];

    return (
        <Disclosure as="nav" className="relative bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <Link href="/">
                                <img
                                    alt="Logo - Conduce en EE. UU."
                                    className="size-7"
                                    src={logo.src}
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" */}

                                {navigation.map((item) => {
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                                                item.current
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
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
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" */}

                    {navigation.map((item) => {
                        return (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${
                                    item.current
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                {item.name}
                            </DisclosureButton>
                        );
                    })}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
