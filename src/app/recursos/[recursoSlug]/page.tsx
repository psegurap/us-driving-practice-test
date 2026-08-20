import { ArticleType, ArticlesType, EstadoSlugType } from "@/types";
import type { Metadata, ResolvingMetadata } from "next";
import states from "@/jsons/states.json";

import all_articles from "@/jsons/articles.json";
const articles = all_articles as ArticlesType;
import { notFound } from "next/navigation";
import IndividualArticle from "@/components/recursos/IndividualArticle";
import EstadoRecursos from "@/components/recursos/EstadoRecursos";

function isEstadoSlug(slug: string): slug is EstadoSlugType {
  return Object.hasOwn(states, slug);
}

export async function generateMetadata(
  { params }: { params: Promise<{ recursoSlug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { recursoSlug } = await params;

  if (isEstadoSlug(recursoSlug)) {
    const estado = states[recursoSlug];

    return {
      title: `Biblioteca de Recursos de ${estado.name}`,
      description: `Explora nuestras guías, consejos y recursos para prepararte para el
            examen escrito del DMV de $x{estado.name}. Aprende sobre las reglas de
            tránsito, señales de tránsito, requisitos para obtener tu licencia y
            todo lo que necesitas saber para aprobar el examen con confianza.`,
    };
  } else {
    const specificArticle: ArticleType = articles[recursoSlug];

    if (!specificArticle) {
      notFound();
    }

    return {
      title: specificArticle.title,
      description: specificArticle.description,
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ recursoSlug: string | EstadoSlugType }>;
}) {
  const { recursoSlug } = await params;

  if (isEstadoSlug(recursoSlug)) {
    return <EstadoRecursos estado={states[recursoSlug]} />;
  } else {
    const specificArticle: ArticleType = articles[recursoSlug];

    if (!specificArticle) {
      notFound();
    }

    return <IndividualArticle articleDetails={specificArticle} />;
  }
}
