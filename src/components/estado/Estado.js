"use client";
import {
    SparklesIcon,
    LockOpenIcon,
    AdjustmentsHorizontalIcon,
    LanguageIcon,
} from "@heroicons/react/24/outline";
import { permanentRedirect } from "next/navigation";

import StatesList from "@/components/StatesList";

export default function Estado({ estado }) {
    return (
        <>
            <HeroSection estado={estado} />
            <QuestionSetup estado={estado} />
            <FeatureSection estado={estado} />
            <StatesAvailableList />
        </>
    );
}

function HeroSection({ estado }) {
    return (
        <div className="bg-gradient-to-tr from-slate-100 to-gray-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
                        Practica el examen de manejo en {estado.name} en español
                    </h1>
                    <h2 className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                        Estudia sin complicaciones con preguntas reales del
                        examen de manejo en {estado.name}. Nuestros simulacros
                        en español te ayudan a practicar a tu ritmo, reforzar
                        tus conocimientos y llegar completamente preparado a tu
                        prueba del DMV.
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#preparar-examen"
                            className="rounded-md bg-cyan-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus-visible:outline-cyan-500"
                        >
                            Empieza a practicar hoy mismo
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
            </div>
        </div>
    );
}

function QuestionSetup({ estado }) {
    function handleInputChange(event) {
        permanentRedirect(
            `/estado/${estado.slug}/prueba/${event.target.value}`,
            "push"
        );
    }

    return (
        <div
            id="preparar-examen"
            className="bg-white py-24 sm:py-32 dark:bg-gray-900"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 gap-y-10 lg:gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <div className="col-span-3 lg:pr-16 pb-10 lg:pb-0">
                        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
                            Elige cuántas preguntas quieres practicar
                        </h2>
                        <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
                            Configura tu simulacro del examen de manejo en{" "}
                            {estado.name} en español y practica con preguntas
                            reales del DMV. Elige la cantidad de preguntas que
                            quieres responder y refuerza tus conocimientos con
                            una prueba interactiva diseñada para aumentar tu
                            confianza antes del examen oficial.
                        </p>
                    </div>
                    <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                        {[
                            { id: "20q", quantity: 20 },
                            { id: "40q", quantity: 40 },
                            { id: "60q", quantity: 60 },
                            { id: "80q", quantity: 80 },
                        ].map((option) => (
                            <label
                                key={option.id}
                                aria-label={option.quantity}
                                className="group relative flex items-center justify-center rounded-md inset-shadow-xs border border-gray-300 bg-white p-3 has-checked:border-cyan-600 has-checked:bg-cyan-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-cyan-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25 dark:border-white/10 dark:bg-gray-800/50 dark:has-checked:border-cyan-500 dark:has-checked:bg-cyan-500 dark:has-focus-visible:outline-cyan-500 dark:has-disabled:border-white/10 dark:has-disabled:bg-gray-800"
                            >
                                <input
                                    defaultValue={option.quantity}
                                    onChange={handleInputChange}
                                    name="option"
                                    type="radio"
                                    className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                                />
                                <span className="text-xl font-medium text-gray-900 uppercase group-has-checked:text-white dark:text-white">
                                    {option.quantity}
                                </span>
                            </label>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}

function FeatureSection({ estado }) {
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
        <div className="bg-gradient-to-tr from-slate-100 to-gray-100">
            <div className="mx-auto max-w-7xl py-16 md:py-24 lg:py-30 px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
                        Simulador inteligente del examen de manejo en{" "}
                        {estado.name} en español
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
        <div id="seleccionar-estado" className="bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
                        ¿Quieres practicar el examen de manejo en otro estado?
                    </h2>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-gray-600 sm:text-xl dark:text-gray-400">
                    Elige el estado donde deseas practicar y accede a simulacros
                    del examen de manejo en español. Cada prueba está adaptada
                    con preguntas reales y reglas del DMV según el estado, para
                    que estudies con confianza y te prepares mejor para tu
                    licencia de conducir.
                </p>
                <StatesList />
            </div>
        </div>
    );
}
