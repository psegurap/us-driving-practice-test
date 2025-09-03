"use client";

import getQuestions from "@/components/estado/getQuestions";
import QuestionsList from "@/components/estado/QuestionList";
import ResultsBanner from "@/components/estado/ResultsBanner";
import LoadingScreen from "@/components/estado/LoadingScreen";
import { useState, useEffect, useTransition } from "react";

export default function QuestionsLayout({ estado, questionsAmount }) {
    const [isPending, startTransition] = useTransition();
    const [questions, setQuestions] = useState([]);
    const [donePlaying, setDonePlaying] = useState(false);
    const [areResultsPending, setAreResultsPending] = useState(false);

    useEffect(() => {
        startTransition(async () => {
            const incoming_questions = await getQuestions(estado.file);
            const filtered_questions = getFilteredQuestions(
                JSON.parse(incoming_questions),
                questionsAmount
            );
            setQuestions(filtered_questions);
        });
    }, []);

    function handleFinalizarPrueba(inputs_answered) {
        let preguntas = questions;
        if (inputs_answered.length > 0) {
            inputs_answered.forEach((input) => {
                let index_found = preguntas.findIndex(
                    (pregunta) => pregunta.id == input.getAttribute("data-id")
                );
                if (index_found > -1) {
                    preguntas[index_found].respuesta_usuario =
                        input.getAttribute("data-answer");
                }
            });
        }

        setQuestions(preguntas);

        setInterval(() => {
            setDonePlaying(true);
            setAreResultsPending(false);
        }, 1000);
    }

    return (
        <div className="flex flex-col h-full">
            <div className="grow bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="mx-auto py-12 hidden sm:block">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-base/7 font-semibold text-cyan-800 dark:text-cyan-400">
                                    Examen Teórico
                                </h2>
                                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance dark:text-white">
                                    Practica tu examen de manejo en{" "}
                                    {estado.name}
                                </p>
                                <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                                    Contesta las preguntas a continuación para
                                    practicar tu examen de conducción teórico en{" "}
                                    {estado.name} y mejorar tus posibilidades de
                                    aprobar en el primer intento.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto sm:hidden">
                            <div className="mx-auto px-2">
                                <h2 className="text-base/7 font-semibold text-cyan-800 dark:text-cyan-400">
                                    Examen Teórico
                                </h2>
                                <p className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance dark:text-white">
                                    Practica para tu examen en {estado.name}
                                </p>
                                <p className="mt-4  text-gray-600 dark:text-gray-300">
                                    Contesta las preguntas y refuerza tus
                                    conocimientos.
                                </p>
                            </div>
                        </div>
                    </div>
                    <QuestionsList
                        questions={questions}
                        donePlaying={donePlaying}
                        handleFinalizarPrueba={handleFinalizarPrueba}
                        setAreResultsPending={setAreResultsPending}
                    />
                    <LoadingScreen
                        areResultsPending={areResultsPending}
                        setAreResultsPending={setAreResultsPending}
                    />
                    {donePlaying ? <ResultsBanner questions={questions} /> : ""}
                </div>
            </div>
        </div>
    );
}

function getFilteredQuestions(questions, amount) {
    const shuffleArray = (array) => {
        const newArray = [...array]; // Create a shallow copy
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const questions_filtered = shuffleArray(questions).slice(0, amount);

    // Generate unique ids for each question.
    let questions_ids = [];
    while (questions_ids.length < questions_filtered.length) {
        let id = Math.floor(Math.random() * questions_filtered.length) + 1;
        if (questions_ids.indexOf(id) === -1) questions_ids.push(id);
    }

    // Add additional values to incoming questions.
    questions_filtered.map((question) => {
        question["id"] = questions_ids.pop();
        question["respuesta_usuario"] = "";
        question.opciones = shuffleArray(question.opciones)
        return question;
    });

    return questions_filtered;
}
