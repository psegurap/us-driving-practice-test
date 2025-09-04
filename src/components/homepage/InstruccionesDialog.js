"use client";

import { useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import Link from "next/link";

export default function InstruccionesDialog() {
    const [open, setOpen] = useState(false);

    const steps = [
        {
            name: "Seleccionar Estado",
            description:
                "Escoge el estado donde presentarás tu examen teórico.",
        },
        {
            name: "Definir Preguntas",
            description:
                "Elige cuántas preguntas quieres responder en tu práctica.",
        },
        {
            name: "Responder Preguntas",
            description: "Contesta cada pregunta simulando el examen real.",
        },
        {
            name: "Revisar Resultados",
            description: "Analiza tus aciertos y errores para mejorar.",
        },
    ];

    return (
        <div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="rounded-md bg-cyan-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 dark:bg-cyan-600 dark:shadow-none dark:hover:bg-cyan-500 dark:focus-visible:outline-cyan-600"
                >
                    Instrucciones
                </button>
                <Link
                    href="#seleccionar-estado"
                    className="text-sm/6 font-semibold text-gray-900 dark:text-white"
                >
                    Comenzar <span aria-hidden="true">→</span>
                </Link>
            </div>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-500/80"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-base text-lg/8 font-semibold text-gray-900 dark:text-white mb-4"
                            >
                                Pasos:
                            </DialogTitle>

                            <Steps steps={steps} />
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <Link
                                    href="#seleccionar-estado"
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 sm:col-start-2 dark:bg-cyan-500 dark:shadow-none dark:hover:bg-cyan-400 dark:focus-visible:outline-cyan-500"
                                >
                                    Seleccionar Estado
                                </Link>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                                >
                                    Salir
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

function Steps({ steps }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <nav aria-label="Progress">
            <ol role="list" className="overflow-hidden">
                {steps.map((step, stepIdx) => (
                    <li
                        key={step.name}
                        className={classNames(
                            stepIdx !== steps.length - 1 ? "pb-10" : "",
                            "relative"
                        )}
                    >
                        <>
                            {stepIdx !== steps.length - 1 ? (
                                <div
                                    aria-hidden="true"
                                    className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-cyan-600 dark:bg-cyan-700"
                                />
                            ) : null}
                            <div
                                aria-current="step"
                                className="group relative flex items-start"
                            >
                                <span
                                    aria-hidden="true"
                                    className="flex h-9 items-center"
                                >
                                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-cyan-700 bg-white dark:border-cyan-500 dark:bg-gray-800">
                                        <span className="text-cyan-700 dark:text-cyan-300 font-semibold">
                                            {" "}
                                            {stepIdx + 1}{" "}
                                        </span>
                                    </span>
                                </span>
                                <span className="ml-4 flex min-w-0 flex-col">
                                    <span className="font-medium dark:text-white">
                                        {step.name}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-300">
                                        {step.description}
                                    </span>
                                </span>
                            </div>
                        </>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
