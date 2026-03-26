'use client';

import { useEffect, useRef } from 'react';

interface HtmlBlockProps {
  embeds?: string[];   // new format: array of HTML strings
  html?: string;       // legacy format: single HTML string
  columns?: number;
}

export function HtmlBlock({ embeds, html, columns = 1 }: HtmlBlockProps) {
  // Normalize: support both old `html` (string) and new `embeds` (array)
  const allEmbeds: string[] = [
    ...(embeds ?? []),
    ...(html ? [html] : []),
  ].filter(Boolean);

  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!allEmbeds || allEmbeds.length === 0) return;
    
    allEmbeds.forEach((htmlStr, i) => {
      const el = containerRefs.current[i];
      if (!el || !htmlStr) return;
      
      el.innerHTML = '';
      const fragment = document.createRange().createContextualFragment(htmlStr);
      el.appendChild(fragment);
    });
  }, [allEmbeds]);

  if (!allEmbeds || allEmbeds.length === 0) return null;

  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[columns] || 'md:grid-cols-1';

  return (
    <div className={`my-12 w-full grid grid-cols-1 ${gridCols} gap-8`}>
      {allEmbeds.map((htmlStr, i) => (
        <div 
          key={i}
          className="html-embed-container overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white p-4 sm:p-6 h-full" 
          ref={(el) => {
            containerRefs.current[i] = el;
          }} 
        />
      ))}
    </div>
  );
}
