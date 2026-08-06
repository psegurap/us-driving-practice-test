"use client";

import pedro_illustrated_image from "@/media/animated-picture-of-pedro-small.png";
import { SendContactForm } from "@/app/api/send";
import { useState } from "react";
import NotificationToast from "./NotificationToast";
import { ToastType } from "@/types";

type FormValuesType = {
  nombre: string;
  correo: string;
  mensaje: string;
};

export default function ContactPage() {
  const [formValues, setFormValues] = useState<FormValuesType>({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [showToast, setShowToast] = useState<ToastType>({
    message: "message",
    type: "warning",
    active: false,
  });

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [status, setStatus] = useState<"active" | "sending">("active");

  function handleFormChange(
    current_value: string,
    field: "nombre" | "correo" | "mensaje",
  ) {
    switch (field) {
      case "nombre":
        setFormValues({ ...formValues, nombre: current_value });
        break;
      case "correo":
        setFormValues({ ...formValues, correo: current_value });
        break;
      case "mensaje":
        setFormValues({ ...formValues, mensaje: current_value });
        break;

      default:
        break;
    }
  }

  async function handleFormSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    let errors = [];

    if (formValues.nombre.trim() === "") {
      errors.push("El nombre es obligatorio.");
    }

    if (formValues.correo.trim() === "") {
      errors.push("Ingresa un correo electrónico válido.");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.correo)) {
        errors.push("Ingresa un correo electrónico válido.");
      }
    }

    if (formValues.mensaje.trim() === "") {
      errors.push("El mensaje es obligatorio.");
    }

    if (errors.length == 0) {
      setStatus("sending");
      const result: "error" | "success" = await SendContactForm({
        ...formValues,
        pagina: window.location.href,
      });

      if (result == "success") {
        setShowToast({
          message:
            "¡Mensaje enviado con éxito! Te responderemos lo antes posible.",
          type: "success",
          active: true,
        });
        setFormValues({ nombre: "", correo: "", mensaje: "" });
        setStatus("active");
        setTimeout(() => setShowToast({ ...showToast, active: false }), 10000);
      } else {
        setShowToast({
          message:
            "No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos.",
          type: "error",
          active: true,
        });
        setStatus("active");
        setTimeout(() => setShowToast({ ...showToast, active: false }), 10000);
      }
    }

    setErrorMessage(errors);
  }

  return (
    <>
      <div className="relative isolate bg-white px-6 py-15 sm:py-32 lg:px-8 dark:bg-gray-900">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-white/10"
        >
          <defs>
            <pattern
              x="50%"
              y={-64}
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg
            x="50%"
            y={-64}
            className="overflow-visible fill-gray-50 dark:fill-gray-800/40"
          >
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div className="mx-auto max-w-xl lg:max-w-5xl">
          <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
            Comparte tus dudas, comentarios o sugerencias con nosotros.
          </p>
          <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
            <form
              onSubmit={(event) => handleFormSubmit(event)}
              className="lg:flex-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={formValues.nombre}
                      readOnly={status == "sending"}
                      onChange={(event) =>
                        handleFormChange(event.target.value, "nombre")
                      }
                      autoComplete="name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 dark:bg-white/10 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="correo"
                    className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    Correo electrónico
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="correo"
                      name="correo"
                      type="text"
                      readOnly={status == "sending"}
                      value={formValues.correo}
                      onChange={(event) =>
                        handleFormChange(event.target.value, "correo")
                      }
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 dark:bg-white/10 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="mensaje"
                    className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                  >
                    Mensaje
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      readOnly={status == "sending"}
                      value={formValues.mensaje}
                      onChange={(event) =>
                        handleFormChange(event.target.value, "mensaje")
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 dark:bg-white/10 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-cyan-500"
                    />
                  </div>
                </div>
              </div>
              {errorMessage.length > 0 && (
                <ul className="list-disc list-inside mb-2 text-red-500 mt-2 ml-2">
                  {errorMessage.map((message, msgInd) => (
                    <li key={msgInd} className="text-sm">
                      {message}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={status == "sending"}
                  className="block w-full rounded-md bg-cyan-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus-visible:outline-cyan-500"
                >
                  {status == "active" ? "Enviar Mensaje" : "Sending..."}
                </button>
              </div>
              <p className="mt-4 text-sm/6 text-gray-500 dark:text-gray-400">
                Al enviar este formulario, acepto la{" "}
                <a
                  href="/privacidad"
                  target="_blank"
                  className="font-semibold whitespace-nowrap text-cyan-700 dark:text-cyan-400"
                >
                  política de privacidad
                </a>
                .
              </p>
              <NotificationToast setShow={setShowToast} show={showToast} />
            </form>
            <div className="lg:mt-6 lg:w-90 lg:flex-none">
              <figure className="mt-10">
                <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
                  <svg
                    fill="none"
                    viewBox="0 0 162 128"
                    aria-hidden="true"
                    className="absolute -top-8 left-0 -z-10 h-20 stroke-cyan-900/30 dark:stroke-white/50"
                  >
                    <path
                      d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                      id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                    />
                    <use x={86} href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" />
                  </svg>
                  <blockquote className="text-lg/8 font-semibold text-gray-900 dark:text-white">
                    <p>
                      "Un lugar para practicar, aprender, creer en ti y
                      conquistar tus metas: así nace esta plataforma, diseñada
                      con pasión para toda la comunidad hispanohablante."
                    </p>
                  </blockquote>
                </div>
                <figcaption className="mt-10 flex gap-x-6">
                  <img
                    alt=""
                    src={pedro_illustrated_image.src}
                    className="size-12 flex-none rounded-full bg-gray-50 dark:bg-gray-800"
                  />
                  <div>
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      Pedro Segura
                    </div>
                    <div className="text-sm/6 text-gray-600 dark:text-gray-400">
                      Creador de Conduce en Estados Unidos
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatusAlert() {}
