import { client } from '@/lib/sanity';
import { allStoriesFullQuery } from '@/lib/queries';
import { TextBlock } from '@/components/blocks/TextBlock';
import { ChartBlock } from '@/components/blocks/ChartBlock';
import { CalloutBlock } from '@/components/blocks/CalloutBlock';
import { TableBlock } from '@/components/blocks/TableBlock';
import { StoryNav } from '@/components/ui/StoryNav';

export const revalidate = 60;

interface Section {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

interface Story {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  summary?: string;
  tags?: string[];
  coverImage?: { asset?: { url?: string } };
  sections?: Section[];
}

function renderSection(section: Section) {
  switch (section._type) {
    case 'textBlock':
      return <TextBlock key={section._key} content={section.content as import('@portabletext/types').PortableTextBlock[]} />;
    case 'chartBlock':
      return (
        <ChartBlock
          key={section._key}
          chartType={section.chartType as 'bar' | 'line' | 'area' | 'scatter' | 'pie'}
          title={section.title as string}
          caption={section.caption as string}
          dataSource={section.dataSource as { inline?: string; url?: string }}
          xField={section.xField as string}
          yField={section.yField as string}
          colorField={section.colorField as string | undefined}
        />
      );
    case 'calloutBlock':
      return (
        <CalloutBlock
          key={section._key}
          value={section.value as string}
          label={section.label as string}
          description={section.description as string}
          variant={section.variant as 'stat' | 'quote' | 'highlight'}
        />
      );
    case 'tableBlock':
      return (
        <TableBlock
          key={section._key}
          title={section.title as string}
          caption={section.caption as string}
          headers={section.headers as string[]}
          tableData={section.tableData as string}
        />
      );
    default:
      return null;
  }
}

export default async function HomePage() {
  const stories: Story[] = await client.fetch(allStoriesFullQuery);

  const navItems = stories.map((s) => ({ title: s.title, slug: s.slug.current }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Hero ── */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          style={{ background: 'var(--green-mint)', color: 'var(--green-forest)' }}>
          🌱 Urbanization &amp; Greening · Data Storytelling
        </div>
        <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-lora, Lora, serif)', color: 'var(--green-deep)' }}>
          Cities in Bloom
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          How urban greening is reshaping the future of cities — one data story at a time.
        </p>
        <div className="flex justify-center gap-4 mt-10">
          <a href="#stories"
            className="px-6 py-3 rounded-full text-white font-semibold transition-all hover:opacity-90 shadow-lg"
            style={{ background: 'var(--green-forest)' }}>
            Read the Stories ↓
          </a>
          <a href="/studio"
            className="px-6 py-3 rounded-full font-semibold transition-all border"
            style={{ color: 'var(--green-forest)', borderColor: 'var(--green-sage)' }}>
            Open Studio
          </a>
        </div>
      </div>

      {/* ── Decorative divider ── */}
      <div className="story-divider" style={{ color: 'var(--green-sage)' }}>
        <span className="text-lg">🌿</span>
      </div>

      {stories.length === 0 ? (
        /* ── Empty state ── */
        <div id="stories" className="text-center py-24 rounded-3xl border-2 border-dashed"
          style={{ borderColor: 'var(--green-mint)', color: 'var(--text-muted)' }}>
          <div className="text-5xl mb-4">🌱</div>
          <p className="text-xl font-semibold mb-2" style={{ color: 'var(--green-forest)' }}>No stories yet.</p>
          <p className="text-sm">Publish your first story in{' '}
            <a href="/studio" className="underline" style={{ color: 'var(--green-leaf)' }}>Sanity Studio</a>.
          </p>
        </div>
      ) : (
        /* ── Single-page stories layout ── */
        <div id="stories" className="flex gap-12 items-start">

          {/* Sticky sidebar nav */}
          <aside className="w-52 shrink-0">
            <StoryNav stories={navItems} />
          </aside>

          {/* Story sections stacked vertically */}
          <div className="flex-1 min-w-0 space-y-0">
            {stories.map((story, idx) => {
              const date = story.publishedAt
                ? new Date(story.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : null;

              return (
                <section
                  key={story._id}
                  id={story.slug.current}
                  className="scroll-mt-24"
                >
                  {/* Story header */}
                  <div className="mb-10">
                    {story.tags && story.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.map((tag) => (
                          <span key={tag}
                            className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{ background: 'var(--green-mint)', color: 'var(--green-forest)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight"
                      style={{ fontFamily: 'var(--font-lora, Lora, serif)', color: 'var(--green-deep)' }}>
                      {story.title}
                    </h2>

                    {story.summary && (
                      <p className="text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
                        {story.summary}
                      </p>
                    )}

                    {date && (
                      <time className="text-xs mt-3 block" style={{ color: 'var(--text-muted)' }}>{date}</time>
                    )}
                  </div>

                  {/* Cover image */}
                  {story.coverImage?.asset?.url && (
                    <div className="mb-10 rounded-2xl overflow-hidden aspect-[21/9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={story.coverImage.asset.url}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Story content blocks */}
                  <div className="space-y-8">
                    {story.sections?.map((section) => renderSection(section))}
                  </div>

                  {/* Divider between stories (not after the last) */}
                  {idx < stories.length - 1 && (
                    <div className="story-divider mt-16">
                      <span className="text-base">🌿</span>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
