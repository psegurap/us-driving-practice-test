import type states from "@/jsons/states.json";

type StatesMap = typeof states;
type EstadoSlugType = keyof StatesMap;
type EstadoType = StatesMap[EstadoSlugType];

type Props = {
  params: { estadoSlug: EstadoSlugType; pruebaSlug?: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

type QuestionType = {
  id: number;
  pregunta: string;
  opciones: string[];
  respuesta_correcta: string;
  respuesta_usuario: string | null;
};

type ArticleType = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  tags: string[];
};

type ArticlesType = Record<string, ArticleType>;

type ContactInfoType = {
  nombre: string;
  correo: string;
  mensaje: string;
  pagina: string;
};

type ToastType = {
  message: string;
  type: "success" | "warning" | "error";
  active: boolean;
};
