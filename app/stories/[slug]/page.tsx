import { client } from '@/lib/sanity';
import { storyBySlugQuery, allStoriesQuery } from '@/lib/queries';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TextBlock } from '@/components/blocks/TextBlock';
import { ChartBlock } from '@/components/blocks/ChartBlock';
import { CalloutBlock } from '@/components/blocks/CalloutBlock';
import { TableBlock } from '@/components/blocks/TableBlock';
import { ImageRowBlock } from '@/components/blocks/ImageRowBlock';
import { HtmlBlock } from '@/components/blocks/HtmlBlock';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface Section {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

interface Story {
  title: string;
  slug: { current: string };
  publishedAt?: string;
  summary?: string;
  tags?: string[];
  coverImage?: { asset?: { url?: string } };
  backgroundVideoUrl?: string;
  sections?: Section[];
}

export async function generateStaticParams() {
  const stories = await client.fetch(allStoriesQuery);
  return stories.map((s: { slug: { current: string } }) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story: Story = await client.fetch(storyBySlugQuery, { slug });
  if (!story) return {};
  return {
    title: story.title,
    description: story.summary,
    openGraph: {
      title: story.title,
      description: story.summary,
      images: story.coverImage?.asset?.url ? [story.coverImage.asset.url] : [],
    },
  };
}

function renderSection(section: Section) {
  switch (section._type) {
    case 'textBlock':
      return <TextBlock key={section._key} content={section.content as any} />;
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
      return <HtmlBlock key={section._key} embeds={section.embeds as string[]} columns={section.columns as number} />;
    default:
      return null;
  }
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story: Story = await client.fetch(storyBySlugQuery, { slug });
  if (!story) notFound();

  const date = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-black min-h-screen">
      {/* Story header */}
      <header className="mb-12 text-center pt-24">
        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {story.tags.map((tag) => (
              <span key={tag} className="data-label bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-chlorophyll transition-all hover:bg-gray-200 hover:text-green-700">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-4xl sm:text-6xl font-black text-black mb-6 leading-tight tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>
          {story.title}
        </h1>
        {story.summary && (
          <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto">{story.summary}</p>
        )}
        {date && <time className="text-sm text-gray-500 font-medium">{date}</time>}
      </header>

      {/* Cover image or Background Video */}
      {story.backgroundVideoUrl ? (
        <div className="mb-12 rounded-3xl overflow-hidden aspect-[16/9] relative shadow-2xl border border-gray-200">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={story.backgroundVideoUrl} type="video/mp4" />
          </video>
        </div>
      ) : story.coverImage?.asset?.url ? (
        <div className="mb-12 rounded-3xl overflow-hidden aspect-[16/9] relative shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.coverImage.asset.url}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      {/* Sections */}
      <div className="space-y-8">
        {story.sections?.map((section) => renderSection(section))}
      </div>
    </article>
  );
}
