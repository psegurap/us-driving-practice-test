import { redirect } from "next/navigation";
export default async function Page({
    params,
}: {
    params: Promise<{ estadoSlug: string }>;
}) {
    const slug = (await params).estadoSlug;

    redirect("/estado/" + slug + "#preparar-examen");
}
