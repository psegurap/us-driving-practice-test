import { ArticleType, ArticlesType } from "@/types";
import articleThumnail from "@/media/article-thumbnail.png";


export default function ArticlesGrid({ articles }: { articles: ArticlesType }) {
  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {Object.entries(articles).map(([slug, article]) => (
        <Article key={slug} articleSlug={slug} articleDetails={article} />
      ))}
    </div>
  );
}

function Article({
  articleSlug,
  articleDetails,
}: {
  articleSlug: string;
  articleDetails: ArticleType;
}) {
  return (
    <article className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          alt="Ilustración generada con inteligencia artificial que representa la preparación para aprobar el examen de manejo."
          src={articleThumnail.src}
          className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 dark:bg-gray-800"
        />
        <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10 dark:inset-ring-white/10" />
      </div>
      <div className="flex max-w-xl grow flex-col justify-between">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time
            dateTime={articleDetails.datePublished}
            className="text-gray-500 dark:text-gray-400"
          >
            {articleDetails.datePublished}
          </time>
          {articleDetails.tags.map((tag) => (
            <span
              key={articleSlug + "-" + tag}
              className="relative z-10 capitalize rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 dark:bg-gray-800/60 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="group relative grow">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
            <a href={`/recursos/${articleSlug}`}>
              <span className="absolute inset-0" />
              {articleDetails.title}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">
            {articleDetails.description}
          </p>
        </div>
      </div>
    </article>
  );
}
