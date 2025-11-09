import { redirect } from "next/navigation";

export default async function Page({ params }) {
    let { estadoSlug } = await params;

    redirect("/estado/" + estadoSlug + "#preparar-examen");
}
