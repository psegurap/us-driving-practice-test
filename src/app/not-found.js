import Link from "next/link";
import StatesList from "@/components/StatesList";

export const metadata = {
    title: "Página no encontrada",
};

export default function NotFound() {
    return (
        <>
            <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 pb-0 lg:px-8">
                <p className="text-base/8 font-semibold text-cyan-800 dark:text-cyan-400">
                    404
                </p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl dark:text-white">
                    Página no encontrada
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                    Lo sentimos, no pudimos encontrar la página que estás
                    buscando.
                </p>
                <div className="py-10 border-b border-gray-200">
                    <Link
                        href="/"
                        className="text-sm/7 font-semibold text-cyan-800 dark:text-cyan-400"
                    >
                        <span aria-hidden="true">&larr;</span> Volver al inicio
                    </Link>
                </div>
            </div>
            <StatesAvailableList />
        </>
    );
}

function StatesAvailableList() {
    return (
        <div id="seleccionar-estado" className="bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
                        ¿No encontraste la página que buscabas?
                    </h2>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-gray-600 sm:text-xl dark:text-gray-400">
                    ¡No pasa nada! Aún puedes practicar tu examen de manejo en
                    español. Elige el estado donde deseas practicar y accede a
                    simulacros del examen de manejo en español. Cada prueba está
                    adaptada con preguntas reales y reglas del DMV según el
                    estado, para que estudies con confianza y te prepares mejor
                    para tu licencia de conducir.
                </p>
                <StatesList />
            </div>
        </div>
    );
}
