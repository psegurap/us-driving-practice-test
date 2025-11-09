import available_states from "@/jsons/states.json";
import { notFound, redirect } from "next/navigation";
import QuestionsLayout from "@/components/prueba/QuestionsLayout";

export async function generateMetadata({ params }) {
    const { estadoSlug, pruebaSlug } = await params;

    let current_state = await available_states.filter(
        (estado) => estado.slug == estadoSlug
    );

    if (current_state.length > 0) {
        return {
            title: `Prueba de manejo en ${current_state[0].name} – ${pruebaSlug} preguntas en español`,
            description: `Responde 20 preguntas del examen de manejo de ${current_state[0].name} en español. Ideal para prepararte para el DMV`,
        };
    }
}

export default async function Page({ params }) {
    let { estadoSlug, pruebaSlug } = await params;

    let current_state = await available_states.filter(
        (estado) => estado.slug == estadoSlug
    );

    if (current_state.length !== 1) {
        return notFound();
    }

    if (
        !pruebaSlug ||
        !parseInt(pruebaSlug) ||
        pruebaSlug < 1 ||
        pruebaSlug > 100
    ) {
        redirect("/estado/" + estadoSlug + "#preparar-examen");
    }

    return (
        <QuestionsLayout
            estado={current_state[0]}
            questionsAmount={pruebaSlug}
        />
    );
}
