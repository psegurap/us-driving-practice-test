import { AcademicCapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import available_states from "@/jsons/states.json";
import color_combination from "@/jsons/color-combinations.json";

export default function StatesList() {
    return (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16">
            {available_states.map((state, index) => (
                <div
                    key={state.name}
                    className="bg-gradient-to-tr from-slate-50 to-zinc-100 dark:from-gray-700 dark:to-gray-700 border border-gray-200 dark:border-gray-700 rounded-sm group shadow-xs relative p-6 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-cyan-600"
                >
                    <div>
                        <span
                            className={`inline-flex rounded-lg p-3 inset-shadow-sm ${
                                color_combination[index].iconBackground +
                                " " +
                                color_combination[index].iconForeground
                            }`}
                        >
                            <AcademicCapIcon
                                aria-hidden="true"
                                className="size-6"
                            />
                        </span>
                    </div>
                    <div className="mt-8">
                        <p className="text-base font-semibold text-lg text-gray-900 dark:text-white">
                            <Link
                                href={`/estado/${state.slug}`}
                                className="focus:outline-hidden"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                />
                                {state.name}
                            </Link>
                        </p>
                        <h3 className="mt-2 text-gray-500 dark:text-gray-400">
                            {`Estudia sin complicaciones: practica con
                                    preguntas reales del examen de manejo en ${state.name} en español y llega totalmente
                                    preparado para tu prueba del DMV.`}
                        </h3>
                    </div>
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="size-6"
                        >
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                    </span>
                </div>
            ))}
        </div>
    );
}
