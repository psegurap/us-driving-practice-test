import type { MetadataRoute } from "next";
import states from "@/jsons/states.json";
import articles from "@/jsons/articles.json";

type URLType = {
  url: string;
  lastModified?: string | Date | undefined;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never"
    | undefined;
  priority?: number | undefined;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL != undefined
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000";

let estados: URLType[] = [];

Object.entries(states).map(([slug, state]) => {
  estados.push({
    url: `${BASE_URL}/estado/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });
  estados.push({
    url: `${BASE_URL}/estado/${slug}/prueba/20`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  });
});

const articles_urls: URLType[] = Object.entries(articles).map(([slug]) => ({
  url: `${BASE_URL}/blog/${slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.5,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: BASE_URL + "/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...articles_urls,
    ...estados,
    {
      url: BASE_URL + "/privacidad",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
