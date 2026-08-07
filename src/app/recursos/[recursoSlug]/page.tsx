import { Article, Articles } from "@/types";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import articleThumnail from "@/media/article-thumbnail.png";
import MdxLayout from "@/app/mdx-layout";

import all_articles from "@/jsons/articles.json";
import { notFound } from "next/navigation";
const articles = all_articles as Articles;
console.log(articles);


export async function generateMetadata(
  { params }: { params: Promise<{ recursoSlug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { recursoSlug } = await params;
  const specificArticle: Article = articles[recursoSlug];
  console.log(specificArticle);
  

  if (!specificArticle) {
    notFound();
  }

  return {
    title: specificArticle.title,
    description: specificArticle.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ recursoSlug: string }>;
}) {
  const { recursoSlug } = await params;
  const specificArticle: Article = articles[recursoSlug];
  console.log(specificArticle);


  if (specificArticle == undefined) {
    return notFound();
  }

  const { default: Post } = await import(
    `@/recursos-markdown/${recursoSlug}.mdx`
  );

  return (
    <>
      <nav aria-label="Breadcrumb" className="flex px-6 pt-10 lg:px-8">
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
                {specificArticle.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="bg-white px-6 py-15 lg:px-8 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300">
          <p className="text-base/7 text-gray-500 font-light dark:text-cyan-400">
            {specificArticle.datePublished}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            {specificArticle.title}
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
    </>
  );

  return;
}

export function generateStaticParams() {
  return Object.entries(all_articles).map(([slug, articleInfo]) => ({
    recursoSlug: slug,
  }));
}

export const dynamicParams = false;
