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

import ContactPage from "@/components/Contacto";

export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "¿Tienes preguntas, sugerencias o encontraste un error? Ponte en contacto con nosotros y ayúdanos a mejorar nuestros recursos para el examen de manejo en español.",
};



export default function Page() {
  return <ContactPage />
}
