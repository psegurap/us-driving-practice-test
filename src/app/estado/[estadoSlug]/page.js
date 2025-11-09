import Estado from "@/components/estado/Estado";
import available_states from "@/jsons/states.json";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { estadoSlug } = await params;

    let current_state = await available_states.filter(
        (estado) => estado.slug == estadoSlug
    );

    if (current_state.length > 0) {
        return {
            title: `Practica tu examen de manejo en ${current_state[0].name}`,
            description: `Practica el examen de manejo de ${current_state[0].name} en español con preguntas reales del DMV. Simulador gratuito para hispanohablantes.`
        }
    }
}

export default async function Page({ params }) {
    
    let { estadoSlug } = await params;

    let current_state = await available_states.filter(
        (estado) => estado.slug == estadoSlug
    );

    if (current_state.length !== 1) {
        return notFound();
    }

    return <Estado estado={current_state[0]} />;
}
