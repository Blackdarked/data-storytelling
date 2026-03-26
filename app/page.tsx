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
  backgroundVideoUrl?: string;
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

      {/* ── Immersive Hero with Background Video ── */}
      <div className="relative rounded-3xl overflow-hidden mb-20 py-24 px-6 text-center shadow-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90"
          style={{ filter: 'brightness(0.6)' }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
            🌱 Urbanization &amp; Greening · Data Storytelling
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight text-white drop-shadow-lg"
            style={{ fontFamily: 'var(--font-lora, Lora, serif)' }}>
            Cities in Bloom
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed text-gray-100 drop-shadow-md font-medium">
            How urban greening is reshaping the future of cities — one data story at a time.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <a href="#stories"
              className="px-6 py-3 rounded-full text-white font-semibold transition-all hover:scale-105 shadow-xl bg-green-600/90 hover:bg-green-500 backdrop-blur-sm border border-green-400">
              Read the Stories ↓
            </a>
          </div>
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
          <p className="text-sm">Publish your first story to see it appear here.</p>
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

                  {/* Cover image or Video */}
                  {story.backgroundVideoUrl ? (
                    <div className="mb-10 rounded-2xl overflow-hidden aspect-[21/9] relative shadow-lg">
                      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src={story.backgroundVideoUrl} type="video/mp4" />
                      </video>
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 text-xs rounded-full backdrop-blur-sm">Video</div>
                    </div>
                  ) : story.coverImage?.asset?.url ? (
                    <div className="mb-10 rounded-2xl overflow-hidden aspect-[21/9] shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={story.coverImage.asset.url}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}

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
