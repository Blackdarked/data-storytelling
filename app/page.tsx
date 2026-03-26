import { client } from '@/lib/sanity';
import { allStoriesQuery, allTagsQuery } from '@/lib/queries';
import { StoryCard } from '@/components/ui/StoryCard';

export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [stories, tags] = await Promise.all([
    client.fetch(allStoriesQuery),
    client.fetch(allTagsQuery),
  ]);

  const filtered = tag ? stories.filter((s: { tags?: string[] }) => s.tags?.includes(tag)) : stories;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
          Data{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Stories
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive narratives powered by real data. Charts, maps, and insights — all in one place.
        </p>
      </div>

      {/* Tag filter */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <a
            href="/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !tag ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            All
          </a>
          {tags.map((t: string) => (
            <a
              key={t}
              href={`/?tag=${encodeURIComponent(t)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tag === t ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {t}
            </a>
          ))}
        </div>
      )}

      {/* Stories grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-xl mb-2">No stories yet.</p>
          <p className="text-sm">Publish one in <a href="/studio" className="text-indigo-500 hover:underline">Sanity Studio</a>.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((story: { _id: string; slug: { current: string }; title: string; publishedAt: string; summary: string; tags: string[]; coverImage: unknown }) => (
            <StoryCard
              key={story._id}
              slug={story.slug.current}
              title={story.title}
              publishedAt={story.publishedAt}
              summary={story.summary}
              tags={story.tags}
              coverImage={story.coverImage as { asset?: { url?: string } }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
