import type { Metadata, ResolvingMetadata } from "next";

import states from "@/jsons/states.json";
import { notFound, redirect } from "next/navigation";
import QuestionsLayout from "@/components/QuestionsLayout";
import { SlugType, Props } from "@/types";

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const { estadoSlug, pruebaSlug } = await params;

    return {
        title: `Prueba de manejo en ${estadoSlug} – ${pruebaSlug} preguntas en español`,
        description: `Responde 20 preguntas del examen de manejo de ${pruebaSlug} en español. Ideal para prepararte para el DMV`,
    };
}

export default async function Page({ params }: Props) {
    const { estadoSlug, pruebaSlug } = await params;

    if (states[estadoSlug] == undefined) {
        return notFound();
    }

    if (!pruebaSlug || !pruebaSlug || pruebaSlug < 1 || pruebaSlug > 100) {
        redirect("/estado/" + estadoSlug + "#preparar-examen");
    }

    return (
        <QuestionsLayout
            estado={states[estadoSlug]}
            questionsAmount={pruebaSlug}
        />
    );
}
