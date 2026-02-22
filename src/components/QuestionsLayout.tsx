"use client";
import getQuestions from "@/components/getQuestions";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useTransition, ChangeEvent } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { QuestionType, EstadoType } from "@/types";

export default function QuestionsLayout({
    estado,
    questionsAmount,
}: {
    estado: EstadoType;
    questionsAmount: number;
}) {
    const [isPending, startTransition] = useTransition();
    const [questions, setQuestions] = useState<Array<QuestionType>>([]);
    const [donePlaying, setDonePlaying] = useState<boolean>(false);
    const [areResultsPending, setAreResultsPending] = useState<boolean>(false);

    useEffect(() => {
        startTransition(async () => {
            const incoming_questions = await getQuestions(estado.file);
            const filtered_questions = getFilteredQuestions(
                JSON.parse(incoming_questions),
                questionsAmount,
            );
            setQuestions(filtered_questions);
        });
    }, []);

    function handleFinalizarPrueba(inputs_answered: NodeListOf<Element>) {
        let preguntas = questions;

        if (inputs_answered.length > 0) {
            inputs_answered.forEach((input) => {
                let index_found = preguntas.findIndex(
                    (pregunta: QuestionType) =>
                        pregunta.id.toString() == input.getAttribute("data-id"),
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

function getFilteredQuestions(questions: QuestionType[], amount: number) {
    // Get a set of questions based on the amount requested.
    const questions_filtered: QuestionType[] = shuffleArray(questions).slice(
        0,
        amount,
    );

    const ids: number[] = Array.from(
        { length: questions_filtered.length },
        (_, i) => i + 1,
    );

    questions_filtered.map((question: QuestionType, index: number) => {
        question.id = ids[index];
        question.respuesta_usuario = "";
        question.opciones = shuffleArray(question.opciones);
        return question;
    });

    return questions_filtered;
}

function QuestionsList({
    questions,
    handleFinalizarPrueba,
    donePlaying,
    setAreResultsPending,
}: {
    questions: QuestionType[];
    handleFinalizarPrueba: (inputs_answered: NodeListOf<Element>) => void;
    donePlaying: boolean;
    setAreResultsPending: (value: boolean) => void;
}) {
    function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
        setAreResultsPending(true);
        event.preventDefault();
        handleFinalizarPrueba(event.target.querySelectorAll("input:checked"));
    }

    return questions.length == 0 ? (
        <QuestionsListSkeleton />
    ) : (
        <>
            <form onSubmit={handleFormSubmit}>
                <ul role="list" className="space-y-4">
                    {questions.map((question, index) => (
                        <EachQuestion
                            key={question.id}
                            index={index}
                            question={question}
                            questions_length={questions.length}
                            donePlaying={donePlaying}
                        />
                    ))}
                </ul>
                <button
                    type="submit"
                    disabled={donePlaying}
                    className="w-full mt-5 disabled:cursor-default disabled:bg-cyan-800 disabled:opacity-75 cursor-pointer rounded-sm bg-cyan-700 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 dark:bg-cyan-700 dark:shadow-none dark:focus-visible:outline-cyan-600"
                >
                    Comprobar Respuestas
                </button>
            </form>
        </>
    );
}

function EachQuestion({
    question,
    index,
    questions_length,
    donePlaying,
}: {
    question: QuestionType;
    index: number;
    questions_length: number;
    donePlaying: boolean;
}) {
    return (
        <li className="divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-white/10">
                <div className="-mt-2 -ml-4 flex flex-col-reverse items-start sm:flex-row flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="mt-2 ml-4">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            {question.pregunta}
                        </h3>
                    </div>
                    <div className="mt-2 ml-4 shrink-0">
                        <span className="inline-flex tracking-tighter items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:inset-ring-gray-400/20">
                            {index + 1} / {questions_length}
                        </span>
                    </div>
                </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <ul
                    role="list"
                    className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 content-stretch"
                >
                    {question.opciones.map((option) => (
                        <QuestionOption
                            key={question.id + option}
                            question={question}
                            option={option}
                            donePlaying={donePlaying}
                        />
                    ))}
                </ul>
            </div>
        </li>
    );
}

function QuestionOption({
    option,
    question,
    donePlaying,
}: {
    option: string;
    question: QuestionType;
    donePlaying: boolean;
}) {
    let classes = "";
    let initial_color =
        "bg-white text-gray-900 dark:bg-gray-700 dark:text-white";
    let good_answer_style = "bg-green-100 dark:text-gray-800";
    let bad_answer_style = "bg-red-100 dark:text-gray-800";

    // play with green and red in done playing
    if (donePlaying) {
        classes = initial_color;

        // if no answer provided, highlight the correct answer
        if (question.respuesta_usuario == "") {
            if (question.respuesta_correcta == option) {
                classes = good_answer_style;
            }
            // if answer provided, play with the green and red
        } else {
            // play with the selected option to confirm if the answer was correct or not
            if (question.respuesta_usuario == option) {
                classes =
                    question.respuesta_correcta == option
                        ? good_answer_style
                        : bad_answer_style;
            } else {
                classes =
                    question.respuesta_correcta == option
                        ? good_answer_style
                        : initial_color;
            }
        }
        // add white bg white if not done
    } else {
        classes = initial_color;
    }

    return (
        <li className="h-full">
            <label
                aria-label={option}
                className={`${classes} group relative h-full flex hover:brightness-98 rounded-lg border border-gray-300 p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-cyan-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 dark:border-white/10 `}
            >
                <input
                    name={question.pregunta}
                    data-answer={option}
                    data-id={question.id}
                    disabled={donePlaying}
                    type="radio"
                    className="absolute inset-0 appearance-none focus:outline-none"
                />
                <div className="flex-1">
                    <span className="block text-sm text-base font-medium">
                        {option}
                    </span>
                </div>
                <CheckCircleIcon
                    aria-hidden="true"
                    className="invisible size-5 text-cyan-600 group-has-checked:visible dark:text-cyan-500"
                />
            </label>
        </li>
    );
}

function QuestionsListSkeleton() {
    const items = [
        { id: 1, classes: ["w-1/2", "w-2/5", "w-3/4", "w-1/2"] },
        { id: 2, classes: ["w-3/5", "w-4/5", "w-1/4", "w-1/2"] },
        { id: 3, classes: ["w-1/5", "w-2/5", "w-3/4", "w-3/5"] },
    ];

    return (
        <div>
            <ul role="list" className="space-y-4">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="overflow-hidden flex animate-pulse space-x-4 bg-gray-50 px-6 py-4 shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10"
                    >
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-5 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                {item.classes.map((singleClass, index) => (
                                    <div key={index} className="gap-4 flex">
                                        <div className="size-5 rounded-full bg-gray-200"></div>
                                        <div
                                            className={`h-5 rounded bg-gray-200 ${singleClass}`}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ResultsBanner({ questions }: { questions: QuestionType[] }) {
    const [showBanner, setShowBanner] = useState(true);
    let good_answers = questions.filter(
        (question) => question.respuesta_correcta == question.respuesta_usuario,
    ).length;
    let wrong_answers = questions.filter(
        (question) => question.respuesta_correcta != question.respuesta_usuario,
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

function LoadingScreen({
    areResultsPending,
    setAreResultsPending,
}: {
    areResultsPending: boolean;
    setAreResultsPending: (value: boolean) => void;
}) {
    return (
        <div>
            <Dialog
                open={areResultsPending}
                onClose={setAreResultsPending}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/50 transition-opacity data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-100 data-leave:ease-in dark:bg-gray-500/80"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden px-4 pt-5 pb-4 text-center transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-100 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

/**
 * Shuffles an array using the Fisher–Yates algorithm.
 *
 * Generic <T> means:
 * - It works with ANY array type (string[], number[], QuestionType[], etc.)
 * - It preserves the original element type
 *
 * The function returns a NEW shuffled array
 * (it does not mutate the original array).
 */
function shuffleArray<T>(array: readonly T[]): T[] {
    // Create a shallow copy so we don't modify the original array
    const newArray = [...array];

    // Start from the last element and move backwards
    for (let i = newArray.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at positions i and j
        // Using array destructuring for a clean swap
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    // Return the shuffled copy
    return newArray;
}
