"use client";
import { useState } from "react";
import { CogIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";
import Form from 'next/form'

export default function QuestionsSetup({ estado }) {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="px-6 py-12 sm:py-20 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl dark:text-white">
                        Practica para tu examen de manejo en {estado.name}
                    </h1>
                    <h2 className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600 dark:text-gray-300">
                        Simulacros y preguntas en español para que apruebes tu
                        examen teórico en {estado.name} a la primera.
                    </h2>
                    <div className="overflow-hidden mt-10 rounded-lg bg-gray-100 shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                        <div className="px-4 py-5 sm:p-6">
                            <div>
                                <div className="text-center">
                                    <CogIcon className="mx-auto size-9 text-gray-400 dark:text-gray-500" />
                                    <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
                                        Elige la cantidad de preguntas
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Decide cuántas preguntas quieres
                                        responder, entre 1 y 100, y practica con
                                        un simulacro realista del examen de
                                        manejo que te ayudará a ganar confianza
                                        y seguridad.
                                    </p>
                                </div>

                                <FormSection estado={estado}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormSection({estado}) {
    const [questionsValue, setQuestionsValue] = useState("");
    const [errors, setErrors] = useState([]);

    function handleInputChange(event) {
        setQuestionsValue(event.target.value);
    }

    function handleSubmit() {
        let errors = [];
        if (questionsValue.trim() == "") {
            errors.push(
                'El campo "cantidad de preguntas" no puede estar vacío.'
            );
        } else {
            if (!parseInt(questionsValue)) {
                errors.push("El valor introducido debe ser un número válido.");
            } else {
                if (questionsValue < 0 || questionsValue > 100) {
                    errors.push("El número debe estar entre 1 y 100.");
                }
            }
        }

        if (errors.length > 0) {
            setErrors(errors);
        } else {
            setErrors([]);
            redirect(`/estado/${estado.slug}/prueba?preguntas=${questionsValue}`)
        }
    }

    return (
        <>
            <Form action={handleSubmit} className="mt-6 flex">
                <input
                    name="cantidad-preguntas"
                    value={questionsValue}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Introduce la cantidad..."
                    aria-label="Colocar cantidad de preguntas"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500 ${
                        errors.length > 0
                            ? "outline-red-300"
                            : "outline-gray-300"
                    }`}
                />
                <button
                    type="submit"
                    className="inline-flex items-center gap-x-1.5 ml-4 cursor-pointer shrink-0 rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 dark:bg-cyan-600 dark:shadow-none dark:hover:bg-cyan-500 dark:focus-visible:outline-cyan-600"
                >
                    Comenzar Examen
                    <ArrowRightCircleIcon
                        aria-hidden="true"
                        className="size-5 font-bold text-white"
                    />
                </button>
            </Form>
            {errors.length > 0 ? (
                <DisplayValidationError errors={errors} />
            ) : (
                ""
            )}
        </>
    );
}

function DisplayValidationError({ errors }) {
    return (
        <div className="rounded-md bg-red-50 mt-4 text-left p-4 dark:bg-red-500/15 dark:outline dark:outline-red-500/25">
            <div className="flex">
                <div className="shrink-0">
                    <XCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-400"
                    />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Corrige los siguientes errores antes de continuar:
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-200/80">
                        <ul role="list" className="list-disc space-y-1 pl-5">
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
