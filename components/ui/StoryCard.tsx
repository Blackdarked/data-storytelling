import Link from 'next/link';
import Image from 'next/image';

interface StoryCardProps {
  title: string;
  slug: string;
  publishedAt?: string;
  summary?: string;
  tags?: string[];
  coverImage?: { asset?: { url?: string } };
}

export function StoryCard({ title, slug, publishedAt, summary, tags, coverImage }: StoryCardProps) {
  const imageUrl = coverImage?.asset?.url;
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : null;

  return (
    <Link href={`/stories/${slug}`} className="group block">
      <article className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {imageUrl ? (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white/60 text-4xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
        <div className="p-6">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {title}
          </h2>
          {summary && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
              {summary}
            </p>
          )}
          {date && (
            <time className="text-xs text-gray-400 dark:text-gray-500 font-medium">{date}</time>
          )}
        </div>
      </article>
    </Link>
  );
}
