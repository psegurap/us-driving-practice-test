import type { Metadata, ResolvingMetadata } from "next";
import Estado from "@/components/Estado";
import states from "@/jsons/states.json";
import { notFound } from "next/navigation";
import { SlugType, Props } from "@/types";

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const slug = (await params).estadoSlug;
    return {
        title: `Practica tu examen de manejo en ${slug}`,
        description: `Practica el examen de manejo de ${slug} en español con preguntas reales del DMV. Simulador gratuito para hispanohablantes.`,
    };
}

export default async function Page({ params }: Props) {
    const slug: SlugType = (await params).estadoSlug;

    if (states[slug] == undefined) {
        return notFound();
    }

    return <Estado estado={states[slug]} />;
}
