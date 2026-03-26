'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

interface TextBlockProps {
  content: PortableTextBlock[];
}

export function TextBlock({ content }: TextBlockProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
      <PortableText value={content} />
    </div>
  );
}
