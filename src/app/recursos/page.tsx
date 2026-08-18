import type { Metadata } from "next";
import Link from "next/link";
import EstadosGrid from "@/components/EstadosGrid";
import articles from "@/jsons/articles.json";
import ArticlesGrid from "@/components/recursos/ArticlesGrid";

export const metadata: Metadata = {
  title: "Recursos para el Examen de Manejo en Español",
  description:
    "Explora guías, consejos y recursos en español para prepararte para el examen de manejo del DMV. Aprende las reglas de tránsito, estudia las señales y descubre cómo obtener tu licencia de conducir.",
};

export default function Page() {
  return (
    <>
      <div className="bg-gradient-to-tr from-slate-100 to-gray-100 dark:from-gray-700 dark:to-gray-700 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
              Biblioteca de Recursos
            </h1>
            <h2 className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
              Explora nuestras guías, consejos y recursos para prepararte para
              el examen escrito del DMV. Encuentra información clara sobre
              reglas de tránsito, señales, requisitos por estado y estrategias
              para aprobar tu examen con confianza.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#seleccionar-estado"
                className="rounded-md bg-cyan-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-600 dark:focus-visible:outline-cyan-500"
              >
                Comienza a practicar hoy mismo
              </Link>
              <a
                href="#articulos-recientes"
                className="text-sm/6 font-semibold text-gray-900 dark:text-white"
              >
                Explora nuestros artículos <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <LatestArticles />
      <StatesAvailableList />
    </>
  );
}

function LatestArticles() {
  return (
    <div
      id="articulos-recientes"
      className="bg-white py-24 sm:py-32 dark:bg-gray-800"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
            Artículos Recientes
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
            Recursos en español para estudiar y aprobar el examen de manejo.
          </p>
        </div>
        <ArticlesGrid articles={articles} />
      </div>
    </div>
  );
}

function StatesAvailableList() {
  return (
    <div
      id="seleccionar-estado"
      className="bg-gradient-to-tr from-slate-100 to-gray-100 dark:from-gray-700 dark:to-gray-700"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
            Elige tu estado y practica el examen de manejo en español
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl mb-18 text-center text-lg/8 text-pretty text-gray-600 sm:text-xl dark:text-gray-400">
          Selecciona el estado donde quieres obtener tu licencia de conducir y
          accede a pruebas del DMV en español. Cada simulacro está adaptado con
          preguntas reales y reglas específicas de cada estado para que
          practiques con total confianza.
        </p>
        <EstadosGrid />
      </div>
    </div>
  );
}
