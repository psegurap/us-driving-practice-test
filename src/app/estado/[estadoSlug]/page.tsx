import type { Metadata, ResolvingMetadata } from "next";
import Estado from "@/components/Estado";
import states from "@/jsons/states.json";
import { notFound } from "next/navigation";
import { EstadoSlugType, Props } from "@/types";

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const slug = (await params).estadoSlug;
    if (states[slug] == undefined) {
        return notFound();
    }
    return {
        title: `Practica tu examen de manejo en ${states[slug].name}`,
        description: `Practica el examen de manejo de ${states[slug].name} en español con preguntas reales del DMV. Simulador gratuito para hispanohablantes.`,
    };
}

export default async function Page({ params }: Props) {
    const slug: EstadoSlugType = (await params).estadoSlug;

    if (states[slug] == undefined) {
        return notFound();
    }

    return <Estado estado={states[slug]} />;
}
