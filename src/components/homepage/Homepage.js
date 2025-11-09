"use client";
import {
    SparklesIcon,
    LockOpenIcon,
    AdjustmentsHorizontalIcon,
    LanguageIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import StatesList from "@/components/StatesList";

import test_screenshot_light from "@/assets/test-screenshot-light.png";
import test_screenshot_dark from "@/assets/test-screenshot-dark.png";

export default function Homepage() {
    return (
        <>
            <HeroSection />
            <FeatureSection />
            <StatesAvailableList />
        </>
    );
}

function HeroSection() {
    return (
        <div className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
                    <div className="flex">
                        <div className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:bg-gray-700/80 dark:text-gray-300 dark:ring-white/10 dark:hover:ring-white/20">
                            <span className="font-semibold text-cyan-700 dark:text-cyan-400">
                                ¡Escríbenos!
                            </span>
                            <span
                                aria-hidden="true"
                                className="h-4 w-px bg-gray-900/10 dark:bg-white/10"
                            />
                            <a
                                href="mailto:psegurap01@gmail.com"
                                className="flex items-center gap-x-1"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                />
                                Nos interesa tu opinión.
                                <ChevronRightIcon
                                    aria-hidden="true"
                                    className="-mr-2 size-5 text-gray-400"
                                />
                            </a>
                        </div>
                    </div>
                    <h1 className="mt-5 sm:mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                        Practica para el examen de manejo en español en Estados
                        Unidos
                    </h1>
                    <h3 className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                        Accede a simulacros de examen, preguntas reales y
                        material de estudio 100% en español, diseñados para
                        ayudarte a comprender las reglas de tráfico, señales y
                        situaciones de conducción en Estados Unidos. Practica a
                        tu ritmo, desde cualquier dispositivo, y llega al día
                        del examen listo para aprobar a la primera.
                    </h3>
                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href="#seleccionar-estado"
                            type="button"
                            className="rounded-md bg-cyan-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-600 dark:focus-visible:outline-cyan-500"
                        >
                            Comienza tu prueba de manejo ahora
                        </a>
                        <a
                            href="#seleccionar-estado"
                            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
                        >
                            Descubre cómo funciona{" "}
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-gray-700 dark:ring-white/10">
                            <img
                                alt="App screenshot"
                                src={test_screenshot_light.src}
                                width={2432}
                                height={1442}
                                className="w-304 rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-900/10 dark:hidden"
                            />
                            <img
                                alt="App screenshot"
                                src={test_screenshot_dark.src}
                                width={2432}
                                height={1442}
                                className="w-304 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 not-dark:hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureSection() {
    const features = [
        {
            name: "Preguntas inteligentes",
            description:
                "Las preguntas del simulador del examen de manejo en español se crean con inteligencia artificial, lo que garantiza variedad, realismo y una práctica muy similar al examen teórico oficial del DMV en Estados Unidos.",
            icon: SparklesIcon,
        },
        {
            name: "Práctica ilimitada",
            description:
                "Practica todas las veces que necesites, sin límites de intentos. Refuerza tu conocimiento de las reglas de tráfico y señales de tránsito con cada simulacro, y aumenta tu confianza antes de presentar el examen de manejo real.",
            icon: LockOpenIcon,
        },
        {
            name: "Preguntas flexibles",
            description:
                "Elige la cantidad de preguntas y ajusta la dificultad del examen para practicar según tu nivel. Este sistema flexible te permite avanzar paso a paso y mejorar tu desempeño hasta dominar el examen de conducir en español.",
            icon: AdjustmentsHorizontalIcon,
        },
        {
            name: "100% en español",
            description:
                "Todo el material está disponible completamente en español, con explicaciones claras y vocabulario adaptado para hispanohablantes. Aprende sin barreras de idioma y comprende cada pregunta del examen de manejo en Estados Unidos.",
            icon: LanguageIcon,
        },
    ];

    return (
        <div className="bg-gradient-to-tr from-slate-100 to-gray-100 dark:from-gray-700 dark:to-gray-700">
            <div className="mx-auto max-w-7xl py-16 md:py-24 lg:py-30 px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
                        Simulador inteligente del examen de manejo en español
                    </h2>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-gray-600 sm:text-xl dark:text-gray-400">
                    Preguntas generadas con inteligencia artificial, práctica
                    ilimitada y contenido 100% en español para que te prepares
                    con realismo y confianza.
                </p>
                <div className="mx-auto max-w-2xl lg:max-w-4xl mt-16 md:mt-24">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
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
    );
}

function StatesAvailableList() {
    return (
        <div id="seleccionar-estado" className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
                        Elige tu estado y practica el examen de manejo en
                        español
                    </h2>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-gray-600 sm:text-xl dark:text-gray-400">
                    Selecciona el estado donde quieres obtener tu licencia de
                    conducir y accede a pruebas del DMV en español. Cada
                    simulacro está adaptado con preguntas reales y reglas
                    específicas de cada estado para que practiques con total
                    confianza.
                </p>
                <StatesList />
            </div>
        </div>
    );
}
