import available_states from "@/jsons/states.json";

const states = available_states.map((state) => {
    return `/estado/${state.slug}/prueba`;
});

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: states,
        },
        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    };
}
