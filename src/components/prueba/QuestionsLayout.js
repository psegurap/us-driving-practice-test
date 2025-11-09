"use client";

import getQuestions from "@/components/prueba/getQuestions";
import QuestionsList from "@/components/prueba/QuestionList";
import ResultsBanner from "@/components/prueba/ResultsBanner";
import LoadingScreen from "@/components/prueba/LoadingScreen";
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
            <div className="grow bg-gray-100 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center py-10 sm:py-16">
                        <div className="mb-8">
                            <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
                                Practica tu examen de manejo en {estado.name}
                            </h1>
                            <h2 className="mt-8 text-lg text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                                Contesta las preguntas a continuación para
                                practicar tu examen de manejo en {estado.name} y
                                mejora tus posibilidades de aprobar en el primer
                                intento.
                            </h2>
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
        question.opciones = shuffleArray(question.opciones);
        return question;
    });

    return questions_filtered;
}
