"use client";
import QuestionsListSkeleton from "@/components/estado/QuestionsListSkeleton";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
export default function QuestionsList({
    questions,
    handleFinalizarPrueba,
    donePlaying,
    setAreResultsPending
}) {
    function handleFormSubmit(event) {
        setAreResultsPending(true)
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
                    className="w-full mt-5 disabled:cursor-default disabled:bg-cyan-800 disabled:opacity-75 cursor-pointer rounded-sm bg-cyan-700 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 dark:bg-cyan-600 dark:shadow-none dark:hover:bg-cyan-500 dark:focus-visible:outline-cyan-600"
                >
                    Comprobar Respuestas
                </button>
            </form>
        </>
    );
}

function EachQuestion({ question, index, questions_length, donePlaying }) {
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

function QuestionOption({ option, question, donePlaying }) {
    let classes;

    // play with green and red in done playing
    if (donePlaying) {
        // if no answer provided, highlight the correct answer
        if (question.respuesta_usuario == "") {
            if (question.respuesta_correcta == option) {
                classes = "bg-green-100";
            }
            // if answer provided, play with the green and red
        } else {
            // play with the selected option to confirm if the answer was correct or not
            if (question.respuesta_usuario == option) {
                classes =
                    question.respuesta_correcta == option
                        ? "bg-green-100"
                        : "bg-red-100";
            } else {
                classes =
                    question.respuesta_correcta == option
                        ? "bg-green-100"
                        : "white";
            }
        }
        // add white bg white if not done
    } else {
        classes = "bg-white";
    }

    return (
        <li className="h-full">
            <label
                aria-label={option}
                className={`${classes} group relative h-full flex hover:brightness-98 rounded-lg border border-gray-300 p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-cyan-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 dark:border-white/10 dark:bg-gray-800/50 dark:has-checked:bg-cyan-500/10 dark:has-checked:outline-cyan-500 dark:has-disabled:border-white/10 dark:has-disabled:bg-gray-800`}
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
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">
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
