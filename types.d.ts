import type states from "@/jsons/states.json";

type StatesMap = typeof states;
type SlugType = keyof StatesMap;
type EstadoType = StatesMap[SlugType];

type Props = {
  params: { estadoSlug: SlugType; pruebaSlug?: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

type QuestionType = {
  id: number;
  pregunta: string;
  opciones: string[];
  respuesta_correcta: string;
  respuesta_usuario: string | null;
};

type Article = {
  title: string;
  description: string;
  datePublished: string;
};

type Articles = Record<string, Article>;

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
