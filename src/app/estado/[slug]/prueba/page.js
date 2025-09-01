import available_states from "@/jsons/states.json";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import QuestionsLayout from "@/components/estado/QuestionsLayout";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    let current_state = await available_states.filter(
        (estado) => estado.slug == slug
    );

    if (current_state.length > 0) {
        return {
            title: `Conduce en EE. UU. | Practica tu examen de manejo en ${current_state[0].name}`,
        };
    }
}

export default async function Page({ params, searchParams }) {
    let cantidad_preguntas = (await searchParams).preguntas;
    let { slug } = await params;

    let current_state = await available_states.filter(
        (estado) => estado.slug == slug
    );

    if (current_state.length !== 1) {
        return notFound();
    }

    if (
        !cantidad_preguntas ||
        !parseInt(cantidad_preguntas) ||
        cantidad_preguntas < 1 ||
        cantidad_preguntas > 100
    ) {
        redirect("/estado/" + slug);
    }

    return (
        <QuestionsLayout
            estado={current_state[0]}
            questionsAmount={cantidad_preguntas}
        />
    );
}
