import Estado from "@/components/estado/Estado";
import available_states from "@/jsons/states.json";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    let current_state = await available_states.filter(
        (estado) => estado.slug == slug
    );

    if (current_state.length > 0) {
        return {
            title: `Conduce en EE. UU. | Practica tu examen de manejo en ${current_state[0].name}`,
            description: `Estudia sin complicaciones: practica con preguntas del examen de manejo en ${current_state[0].name} y llega listo a tu prueba.`
        }
    }
}

export default async function Page({ params }) {
    
    let { slug } = await params;

    let current_state = await available_states.filter(
        (estado) => estado.slug == slug
    );

    if (current_state.length !== 1) {
        return notFound();
    }

    return <Estado estado={current_state[0]} />;
}
