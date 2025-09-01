"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";

export default function ResultsBanner() {
    const [showBanner, setShowBanner] = useState(true);

    return (
        <div>
            <Dialog
                open={showBanner}
                onClose={setShowBanner}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 md:px-8">
                    <div className="flex min-h-full items-end justify-center text-center">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => setShowBanner(false)}
                                    type="button"
                                    className="rounded-sm cursor-pointer bg-cyan-700 px-3 py-1 font-semibold text-white shadow-xs hover:bg-cyan-800/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-500 dark:shadow-none dark:hover:bg-cyan-400 dark:focus-visible:outline-cyan-500"
                                >
                                    Revisa tus respuestas
                                </button>
                            </div>
                            <div className="bg-white rounded-sm">
                                <dl className="w-full rounded-md grid grid-cols-1 divide-gray-200 overflow-hidden bg-white shadow-lg md:grid-cols-3 divide-y md:divide-x md:divide-y-0 dark:divide-white/10 dark:bg-gray-800/75 dark:shadow-none dark:inset-ring dark:inset-ring-white/10">
                                    <div className="px-4 py-5 sm:py-4 sm:px-6">
                                        <dt className="text-base font-medium text-gray-900 dark:text-gray-100">
                                            Número de preguntas
                                        </dt>
                                        <dd className="mt-1 flex items-baseline justify-between">
                                            <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                                                80
                                            </div>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:py-4 sm:px-6">
                                        <dt className="text-base font-medium dark:text-gray-100">
                                            Respuestas correctas
                                        </dt>
                                        <dd className="mt-1 flex items-baseline justify-between">
                                            <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                                                50
                                            </div>

                                            <div className="bg-green-100 text-green-800 dark:bg-green-400/10 dark:text-green-400 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
                                                70%
                                            </div>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:py-4 sm:px-6">
                                        <dt className="text-base font-medium dark:text-gray-100">
                                            Respuestas incorrectas
                                        </dt>
                                        <dd className="mt-1 flex items-baseline justify-between">
                                            <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                                                30
                                            </div>

                                            <div className="bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-400 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
                                                30%
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );

    return (
        <div
            className={`${
                showBanner ? "fixed sm:flex" : "hidden"
            } transition-all transition-discrete inset-x-0 bottom-0 px-3 pb-3 pt-5 sm:p-6  sm:justify-center bg-gray-300 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50`}
        >
            <dl className="w-full grid grid-cols-1 divide-gray-200 overflow-hidden rounded-xs bg-white shadow-lg md:grid-cols-3 divide-y md:divide-x md:divide-y-0 dark:divide-white/10 dark:bg-gray-800/75 dark:shadow-none dark:inset-ring dark:inset-ring-white/10">
                <div className="px-4 py-5 sm:py-4 sm:px-6">
                    <dt className="text-base font-medium text-gray-900 dark:text-gray-100">
                        Número de preguntas
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between">
                        <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                            80
                        </div>
                    </dd>
                </div>
                <div className="px-4 py-5 sm:py-4 sm:px-6">
                    <dt className="text-base font-medium dark:text-gray-100">
                        Respuestas correctas
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between">
                        <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                            50
                        </div>

                        <div className="bg-green-100 text-green-800 dark:bg-green-400/10 dark:text-green-400 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
                            70%
                        </div>
                    </dd>
                </div>
                <div className="px-4 py-5 sm:py-4 sm:px-6">
                    <dt className="text-base font-medium dark:text-gray-100">
                        Respuestas incorrectas
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between">
                        <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                            30
                        </div>

                        <div className="bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-400 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
                            30%
                        </div>
                    </dd>
                </div>
            </dl>

            <span
                onClick={() => setShowBanner(false)}
                className="absolute -top-3 end-2 hover:brightness-98 cursor-pointer border border-gray-300 inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-400/10 dark:text-gray-400"
            >
                Cerrar
                <button
                    type="button"
                    className="group relative -mr-1 size-3.5 rounded-xs cursor-pointer dark:hover:bg-gray-400/20"
                >
                    <span className="sr-only">Remove</span>
                    <svg
                        viewBox="0 0 14 14"
                        className="size-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75 dark:stroke-gray-400 dark:group-hover:stroke-gray-300"
                    >
                        <path d="M4 4l6 6m0-6l-6 6" />
                    </svg>
                    <span className="absolute -inset-1" />
                </button>
            </span>
        </div>
    );
}
