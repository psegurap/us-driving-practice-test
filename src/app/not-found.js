import Link from "next/link";

export const metadata = {
    title: "Conduce en EE. UU. | Página no encontrada",
    description: "",
};

export default function NotFound() {
    return (
        <>
            <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
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
                <div className="mt-10">
                    <a
                        href="/"
                        className="text-sm/7 font-semibold text-cyan-800 dark:text-cyan-400"
                    >
                        <span aria-hidden="true">&larr;</span> Volver al inicio
                    </a>
                </div>
            </div>
        </>
    );

    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    );
}
