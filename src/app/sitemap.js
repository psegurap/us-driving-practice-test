import available_states from "@/jsons/states.json";

const states = available_states.map((state) => {
    return { 
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/estado/${state.slug}`,
        lastModified: new Date(),
    };
});

export default function sitemap() {
    return [
        {
            url: process.env.NEXT_PUBLIC_BASE_URL,
            lastModified: new Date(),
        },
        ...states
    ];
}
