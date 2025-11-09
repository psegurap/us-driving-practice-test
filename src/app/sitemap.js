import available_states from "@/jsons/states.json";

let estados = [];

available_states.forEach((state) => {
    estados.push({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/estado/${state.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    });
    estados.push({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/estado/${state.slug}/prueba/20`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
    });
});

export default function sitemap() {
    return [
        {
            url: process.env.NEXT_PUBLIC_BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        ...estados,
        {
            url: process.env.NEXT_PUBLIC_BASE_URL + "/privacidad",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
    ];
}
