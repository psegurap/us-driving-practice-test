import {
    SparklesIcon,
    LockOpenIcon,
    AdjustmentsHorizontalIcon,
    LanguageIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import InstruccionesDialog from "@/components/homepage/InstruccionesDialog";
import available_states from "@/jsons/states.json";
import color_combination from "@/jsons/color-combinations.json";

const features = [
    {
        name: "Preguntas inteligentes",
        description:
            "Todas las preguntas son generadas con inteligencia artificial, lo que garantiza variedad, realismo y una experiencia muy similar al examen teórico.",
        icon: SparklesIcon,
    },
    {
        name: "Práctica ilimitada",
        description:
            "Realiza la prueba tantas veces como quieras, sin límites de intentos, para reforzar tu conocimiento y aumentar tu confianza antes del examen.",
        icon: LockOpenIcon,
    },
    {
        name: "Preguntas flexibles",
        description:
            "Configura el número de preguntas para adaptar la dificultad de la prueba a tu nivel y progresar a tu propio ritmo.",
        icon: AdjustmentsHorizontalIcon,
    },
    {
        name: "100% en español",
        description:
            "Todo el contenido está redactado íntegramente en español claro y preciso, para que comprendas cada pregunta y explicación sin barreras de idioma.",
        icon: LanguageIcon,
    },
];

export const metadata = {
    title: "2 Praticar Examen de Conducir en Estados Unidos",
    description: "",
};

export default function Homepage() {
    return (
        <>
            <div className="py-12 sm:py-24 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base/7 font-semibold text-gray-500 dark:text-gray-400">
                            Examen Teórico
                        </h2>
                        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
                            Practica para tu examen de manejo en español
                        </p>
                        <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
                            Accede a simulacros de examen, preguntas reales y
                            material de estudio 100% en español, diseñados para
                            ayudarte a comprender las reglas de tráfico, señales
                            y situaciones de conducción en Estados Unidos.
                            Practica a tu ritmo, desde cualquier dispositivo, y
                            llega al día del examen listo para aprobar a la
                            primera.
                        </p>
                        <InstruccionesDialog />
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div
                                    key={feature.name}
                                    className="relative pl-16"
                                >
                                    <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                                        <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-cyan-700 dark:bg-cyan-500">
                                            <feature.icon
                                                aria-hidden="true"
                                                className="size-6 text-white"
                                            />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <StatesAvailableList />
        </>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function StatesAvailableList() {
    return (
        <div id="seleccionar-estado" className="bg-gray-100 ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-24">
                <div className="gap-5 grid md:grid-cols-3 ">
                    {available_states.map((state, index) => (
                        <div
                            key={state.name}
                            className="rounded group shadow-sm relative border-gray-200 bg-white p-6 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-cyan-600"
                        >
                            <div>
                                <span
                                    className={classNames(
                                        color_combination[index].iconBackground,
                                        color_combination[index].iconForeground,
                                        "inline-flex rounded-lg p-3"
                                    )}
                                >
                                    <AcademicCapIcon
                                        aria-hidden="true"
                                        className="size-6"
                                    />
                                </span>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-base font-semibold text-gray-900">
                                    <Link
                                        href={`/estado/${state.slug}`}
                                        className="focus:outline-hidden"
                                    >
                                        {/* Extend touch target to entire panel */}
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                        />
                                        {state.name}
                                    </Link>
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Estudia sin complicaciones: practica con
                                    preguntas del examen de manejo en{" "}
                                    {state.name} y llega listo a tu prueba.
                                </p>
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
            </div>
        </div>
    );
}
