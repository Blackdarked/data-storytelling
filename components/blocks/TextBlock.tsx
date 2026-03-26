'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { urlFor } from '@/sanity/lib/image';

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={value.alt || ' '}
            loading="lazy"
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            className="rounded-xl w-full shadow-lg object-cover"
          />
          {value.caption && (
            <figcaption className="text-center text-sm mt-3 italic" style={{ color: 'var(--text-muted)' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface TextBlockProps {
  content: PortableTextBlock[];
}

export function TextBlock({ content }: TextBlockProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-img:rounded-xl prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
      <PortableText value={content} components={components} />
    </div>
  );
}
