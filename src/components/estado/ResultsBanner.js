"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function ResultsBanner({ questions }) {
    const [showBanner, setShowBanner] = useState(true);
    let good_answers = questions.filter(
        (question) => question.respuesta_correcta == question.respuesta_usuario
    ).length;
    let wrong_answers = questions.filter(
        (question) => question.respuesta_correcta != question.respuesta_usuario
    ).length;

    let good_percentage = Math.round((good_answers / questions.length) * 100);
    let wrong_percentage = Math.round((wrong_answers / questions.length) * 100);

    return (
        <div>
            <Dialog
                open={showBanner}
                onClose={setShowBanner}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-500/80"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 md:px-8">
                    <div className="flex min-h-full items-end justify-center text-center">
                        <DialogPanel
                            transition
                            className="relative w-full max-w-5xl transform overflow-hidden text-left shadow-xl dark:shadow-none transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95 "
                        >
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => setShowBanner(false)}
                                    type="button"
                                    className="rounded-sm cursor-pointer bg-cyan-700 px-3 py-1 font-semibold text-white shadow-xs hover:bg-cyan-800/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-800 dark:shadow-none dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-500"
                                >
                                    Revisa tus respuestas
                                </button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-sm">
                                <dl className="rounded-md grid grid-cols-1 divide-gray-200 overflow-hidden bg-white shadow-lg md:grid-cols-3 divide-y md:divide-x md:divide-y-0 dark:divide-white/10 dark:bg-gray-800 dark:shadow-none">
                                    <div className="px-4 py-5 sm:py-4 sm:px-6">
                                        <dt className="text-base font-medium text-gray-900 dark:text-gray-100">
                                            Número de preguntas
                                        </dt>
                                        <dd className="mt-1 flex items-baseline justify-between">
                                            <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                                                {questions.length}
                                            </div>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:py-4 sm:px-6">
                                        <dt className="text-base font-medium dark:text-gray-100">
                                            Respuestas correctas
                                        </dt>
                                        <dd className="mt-1 flex items-baseline justify-between">
                                            <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                                                {good_answers}
                                            </div>

                                            <div className="bg-green-100 text-green-800 dark:bg-green-400/10 dark:text-green-400 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
                                                {good_percentage}%
                                            </div>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:py-4 sm:px-6">
                                        <dt className="text-base font-medium dark:text-gray-100">
                                            Respuestas incorrectas
                                        </dt>
                                        <dd className="mt-1 flex items-baseline justify-between">
                                            <div className="flex items-baseline text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                                                {wrong_answers}
                                            </div>

                                            <div className="bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-400 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
                                                {wrong_percentage}%
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
}
