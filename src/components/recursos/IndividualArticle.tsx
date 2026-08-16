import { ArticleType } from "@/types";
import Link from "next/link";
import {
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import articleThumnail from "@/media/article-thumbnail.png";
import MdxLayout from "@/app/mdx-layout";
import articles from "@/jsons/articles.json";
import ArticlesGrid from "@/components/recursos/ArticlesGrid";

export default async function IndividualArticle({
  articleDetails,
}: {
  articleDetails: ArticleType;
}) {
  const { default: Post } = await import(
    `@/recursos-markdown/${articleDetails.slug}.mdx`
  );

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="bg-white flex px-6 pt-10 lg:px-8 dark:bg-gray-800"
      >
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <Link
                href="/"
                className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                Inicio
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
              />
              <Link
                href="/recursos"
                className="ml-4 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                Recursos
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
              />
              <span className="ml-4 font-medium text-gray-800 dark:text-gray-400">
                {articleDetails.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="bg-white px-6 py-15 sm:pb-30 lg:px-8 dark:bg-gray-800">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300">
          <p className="text-base/7 text-gray-500 font-light dark:text-cyan-400">
            {articleDetails.datePublished}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            {articleDetails.title}
          </h1>
          <figure className="my-10">
            <img
              alt="Ilustración generada con inteligencia artificial que representa la preparación para aprobar el examen de manejo."
              src={articleThumnail.src}
              className="aspect-video border-1 border-gray-200 bg-gray-50 object-cover dark:bg-gray-800"
            />
            <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500 dark:text-gray-400">
              <InformationCircleIcon
                aria-hidden="true"
                className="mt-0.5 size-5 flex-none text-gray-300 dark:text-gray-600"
              />
              Ilustración generada con inteligencia artificial que representa la
              preparación para aprobar el examen de manejo.
            </figcaption>
          </figure>
          <MdxLayout>
            <Post />
          </MdxLayout>
        </div>
      </div>
      <LatestArticles />
    </>
  );
}

function LatestArticles() {
  return (
    <div
      id="articulos-recientes"
      className="bg-gray-100 py-15 sm:py-24 dark:bg-gray-700"
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
        <ArticlesGrid
          articles={Object.fromEntries(Object.entries(articles).slice(0, 3))}
        />
      </div>
    </div>
  );
}
