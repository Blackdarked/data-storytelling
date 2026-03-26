import { client } from '@/lib/sanity';
import { allStoriesFullQuery } from '@/lib/queries';
import { TextBlock } from '@/components/blocks/TextBlock';
import { ChartBlock } from '@/components/blocks/ChartBlock';
import { CalloutBlock } from '@/components/blocks/CalloutBlock';
import { TableBlock } from '@/components/blocks/TableBlock';
import { StoryNav } from '@/components/ui/StoryNav';
import { HorizontalJourney } from '@/components/ui/HorizontalJourney';
import { BreathingCard } from '@/components/ui/BreathingCard';
import { ParallaxNarrative } from '@/components/ui/ParallaxNarrative';
import { ImageRowBlock } from '@/components/blocks/ImageRowBlock';
import { HtmlBlock } from '@/components/blocks/HtmlBlock';
import { Leaf, Eye, BarChart3, Info } from 'lucide-react';

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
    case 'imageRowBlock':
      return (
        <ImageRowBlock
          key={section._key}
          images={section.images as any[]}
          columns={section.columns as number}
          gap={section.gap as 'sm' | 'md' | 'lg'}
        />
      );
    case 'htmlBlock':
      return <HtmlBlock key={section._key} html={section.html as string} />;
    default:
      return null;
  }
}

export default async function HomePage() {
  const stories: Story[] = await client.fetch(allStoriesFullQuery);

  const navItems = stories.map((s) => ({ title: s.title, slug: s.slug.current }));

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* ── [Pro Max] Immersive Hero ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden snap-start">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-overlay"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chlorophyll/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-biolume/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold mb-8 glass text-chlorophyll border-chlorophyll/30 glow-chlorophyll uppercase tracking-[0.2em] data-label">
            <Leaf size={14} className="animate-bounce" />
            Sự tiến hóa của Đô thị
          </div>
          <h1 className="text-6xl sm:text-8xl font-black mb-8 leading-tight tracking-tighter"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Thành phố <span className="text-chlorophyll">Xanh</span>
          </h1>
          <p className="text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed text-gray-700 font-light italic">
            "Một câu chuyện về việc phủ xanh đô thị đang tái định hình hệ sinh thái của chúng ta."
          </p>
          <div className="flex justify-center gap-6 mt-12">
            <a href="#stories"
              className="px-8 py-4 rounded-full text-black font-bold transition-all hover:scale-105 shadow-2xl bg-chlorophyll hover:bg-white glow-chlorophyll flex items-center gap-2">
              <Eye size={18} />
              Khám phá câu chuyện
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="data-label text-[10px]">Cuộn để bắt đầu</span>
          <div className="w-px h-12 bg-gradient-to-b from-chlorophyll to-transparent" />
        </div>
      </section>

      <HorizontalJourney>
        {stories.length === 0 ? (
          <div className="story-chapter flex items-center justify-center">
            <BreathingCard className="text-center max-w-lg">
              <div className="text-5xl mb-6">🌱</div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Chưa có câu chuyện dữ liệu nào.</h2>
              <p className="text-muted">Hệ sinh thái đang yên tĩnh. Vui lòng xuất bản một câu chuyện trong Sanity để làm phong phú biên niên sử này.</p>
            </BreathingCard>
          </div>
        ) : (
          stories.map((story) => (
            <div key={story._id} id={story.slug.current} className="story-chapter flex items-center justify-center px-6 md:px-24">
              <ParallaxNarrative baseVelocity={-0.1}>
                <BreathingCard className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    {story.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {story.tags.map((tag) => (
                          <span key={tag} className="data-label bg-white/5 px-2 py-1 rounded text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
                      {story.title}
                    </h2>
                    <div className="prose max-w-none mb-8 opacity-80 line-clamp-4 text-foreground">
                      {story.summary}
                    </div>

                    <div className="mt-10">
                      <a href={`/stories/${story.slug.current}`} className="text-chlorophyll font-bold flex items-center gap-2 hover:gap-4 transition-all">
                        Phân tích Chuyên sâu →
                      </a>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-chlorophyll/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                    {story.backgroundVideoUrl ? (
                      <div className="rounded-2xl overflow-hidden aspect-square relative shadow-2xl border border-black/10">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                          <source src={story.backgroundVideoUrl} type="video/mp4" />
                        </video>
                      </div>
                    ) : story.coverImage?.asset?.url ? (
                      <div className="rounded-2xl overflow-hidden aspect-square shadow-2xl border border-black/10">
                        <img
                          src={story.coverImage.asset.url}
                          alt={story.title}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl aspect-square bg-black/5 flex items-center justify-center border border-black/10">
                        <Leaf size={64} className="text-chlorophyll/20" />
                      </div>
                    )}
                  </div>
                </BreathingCard>
              </ParallaxNarrative>
            </div>
          ))
        )}
      </HorizontalJourney>
    </main>
  );
}
