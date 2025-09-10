import available_states from "@/jsons/states.json";

const states = available_states.map((state) => {
    return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/estado/${state.slug}`,
    };
});

export default function sitemap() {
    return [
        {
            url: process.env.NEXT_PUBLIC_BASE_URL,
        },
        {
            url: process.env.NEXT_PUBLIC_BASE_URL + "/privacidad",
        },
        ...states,
    ];
}
