import { EstadoSlugType, EstadoType, ArticlesType } from "@/types";
import Link from "next/link";
import all_articles from "@/jsons/articles.json";
const articles = all_articles as ArticlesType;
import ArticlesGrid from "./ArticlesGrid";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default async function EstadoRecursos({
  estado,
}: {
  estado: EstadoType;
}) {
  return (
    <>
      <Hero estado={estado} />
      <LatestArticles estado={estado} />
    </>
  );
}

function Hero({ estado }: { estado: EstadoType }) {
  return (
    <div className="bg-gradient-to-tr from-slate-100 to-gray-100 dark:from-gray-700 dark:to-gray-700 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
            Biblioteca de Recursos de {estado.name}
          </h1>
          <h2 className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
            Explora nuestras guías, consejos y recursos para prepararte para el
            examen escrito del DMV de {estado.name}. Aprende sobre las reglas de
            tránsito, señales de tránsito, requisitos para obtener tu licencia y
            todo lo que necesitas saber para aprobar el examen con confianza.
          </h2>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/estado/${estado.slug}#preparar-examen`}
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
  );
}

function LatestArticles({ estado }: { estado: EstadoType }) {
  const estadoArticles = Object.fromEntries(
    Object.entries(articles).filter(([slug, article]) =>
      article.tags.includes(estado.slug),
    ),
  );

  return (
    <div
      id="articulos-recientes"
      className="bg-white py-24 sm:py-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
            Artículos Recientes de {estado.name}
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
            Recursos en español para estudiar y aprobar el examen de manejo.
          </p>
        </div>
        {Object.keys(estadoArticles).length > 0 ? (
          <ArticlesGrid articles={estadoArticles} />
        ) : (
          <div className="flex flex-col items-center">
            <div className="rounded w-auto border-l-4 -mb-5 mt-3 border-gray-400 bg-gray-50 px-4 py-3 dark:border-gray-500 dark:bg-gray-500/10">
              <div className="flex">
                <div className="shrink-0">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-5 text-gray-400 dark:text-gray-500"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Pronto tendremos contenido para {estado.name}. Mientras
                    tanto, descubre nuestros artículos más recientes.
                  </p>
                </div>
              </div>
            </div>
            <ArticlesGrid
              articles={Object.fromEntries(
                Object.entries(articles).slice(0, 3),
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
