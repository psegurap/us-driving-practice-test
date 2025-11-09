"use client";
import QuestionsListSkeleton from "@/components/prueba/QuestionsListSkeleton";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
export default function QuestionsList({
    questions,
    handleFinalizarPrueba,
    donePlaying,
    setAreResultsPending,
}) {
    function handleFormSubmit(event) {
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
    let classes = "";
    let initial_color =
        "bg-white text-gray-900 dark:bg-gray-800/50 dark:text-white";
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
                classes = question.respuesta_correcta == option ? good_answer_style : bad_answer_style;
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
