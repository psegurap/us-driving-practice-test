import type { MetadataRoute } from 'next'
import states from "@/jsons/states.json";

let estados: {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" | undefined;
    priority?: number | undefined;

}[] = [];

Object.entries(states).map(
    ([slug, state]) => {

        estados.push({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/estado/${slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        });
        estados.push({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/estado/${slug}/prueba/20`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        });
    })

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: (process.env.NEXT_PUBLIC_BASE_URL != undefined) ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        ...estados,
        {
            url: ((process.env.NEXT_PUBLIC_BASE_URL != undefined) ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000") + "/privacidad",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
    ];
}
