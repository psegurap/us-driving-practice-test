import type { Metadata } from "next";
import StatesList from "@/components/StatesList";
import {
  MapIcon,
  ClipboardDocumentListIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import PedroQuote from "@/components/PedroQuote";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Explora guías, consejos y recursos en español para prepararte para el examen de manejo del DMV. Aprende las reglas de tránsito, estudia las señales y descubre cómo obtener tu licencia de conducir.",
};

export default function Page() {
  return (
    <>
      <div className="py-15 sm:py-32 bg-gradient-to-tr from-slate-100 to-gray-100 dark:from-gray-700 dark:to-gray-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="">
            <div className="mx-auto max-w-4xl lg:mx-0">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                Sobre Nosotros
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                En <span className="font-medium">Conduce en Estados Unidos</span>, creemos que el
                idioma no debe ser una barrera para obtener una licencia de
                conducir. Nuestra misión es ayudar a la comunidad
                hispanohablante a prepararse para el examen escrito de manejo
                con recursos gratuitos, claros y fáciles de usar.
              </p>
            </div>
            <hr className="my-10 text-gray-300" />
            <h3 className="text-3xl font-medium tracking-tight text-gray-800 text-pretty dark:text-gray-300">
              ¿Qué encontrarás en nuestro sitio?
            </h3>
          </div>
          <Featured />
          <p className="mt-16 text-xs text-gray-600 text-pretty dark:text-gray-300 italic">
            * Conduce en Estados Unidos es un proyecto educativo independiente.
            No estamos afiliados, respaldados ni representamos a ningún
            Departamento de Vehículos Motorizados (DMV) de los Estados Unidos.
            Todo el contenido publicado tiene fines exclusivamente educativos y
            de preparación para el examen escrito de manejo.
          </p>
        </div>
      </div>
      <PedroQuote />

      <StatesAvailableList />
    </>
  );
}

function Featured() {
  const features: {
    title: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[] = [
    {
      title: "Exámenes por Estado",
      description:
        "Practica con cuestionarios específicos de tu estado y familiarízate con el tipo de preguntas que puedes encontrar en el examen escrito.",
      icon: MapIcon,
    },
    {
      title: "Preguntas de Práctica",
      description:
        "Refuerza tus conocimientos con preguntas basadas en los temas que normalmente se evalúan en la prueba de manejo.",
      icon: ClipboardDocumentListIcon,
    },
    {
      title: "Respuestas Explicadas",
      description:
        "Aprende el motivo detrás de cada respuesta correcta y comprende mejor las reglas de tránsito.",
      icon: LightBulbIcon,
    },
    {
      title: "Señales de Tránsito",
      description:
        "Aprende a identificar y entender las señales más importantes que necesitas conocer para conducir de manera segura y aprobar el examen.",
      icon: ExclamationTriangleIcon,
    },
    {
      title: "Guías de Licencia",
      description:
        "Encuentra información útil sobre requisitos, documentos, procesos y otros temas relacionados con la obtención de tu licencia.",
      icon: DocumentTextIcon,
    },
    {
      title: "Consejos de Estudio",
      description:
        "Utiliza recomendaciones y herramientas de estudio que te ayudarán a prepararte mejor y presentar el examen con mayor confianza.",
      icon: AcademicCapIcon,
    },
  ];

  return (
    <div className="mx-auto mt-16 max-w-2xl  lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
              <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-cyan-700 dark:bg-cyan-500">
                <feature.icon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              {feature.title}
            </dt>
            <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
              <p className="flex-auto">{feature.description}</p>
            </dd>
          </div>
        ))}
      </dl>
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
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
            ¿Listo para comenzar a practicar?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-gray-600 sm:text-xl dark:text-gray-400">
          Selecciona el estado donde quieres obtener tu licencia de conducir y
          accede a pruebas del DMV en español. Cada simulacro está adaptado con
          preguntas reales y reglas específicas de cada estado para que
          practiques con total confianza.
        </p>
        <StatesList />
      </div>
    </div>
  );
}
