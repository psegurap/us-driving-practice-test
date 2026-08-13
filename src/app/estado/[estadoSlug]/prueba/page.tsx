import { redirect } from "next/navigation";
import { Props, EstadoSlugType } from "@/types";

export default async function Page({
    params,
}: {
    params: Promise<{ estadoSlug: string }>;
}) {
    const slug = (await params).estadoSlug;

    redirect("/estado/" + slug + "#preparar-examen");
}
