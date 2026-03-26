'use client';

import { useEffect, useRef } from 'react';

interface HtmlBlockProps {
  embeds: string[];
  columns?: number;
}

export function HtmlBlock({ embeds, columns = 1 }: HtmlBlockProps) {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!embeds || !Array.isArray(embeds)) return;
    
    embeds.forEach((html, i) => {
      const el = containerRefs.current[i];
      if (!el || !html) return;
      
      el.innerHTML = '';
      const fragment = document.createRange().createContextualFragment(html);
      el.appendChild(fragment);
    });
  }, [embeds]);

  if (!embeds || embeds.length === 0) return null;

  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[columns] || 'md:grid-cols-1';

  return (
    <div className={`my-12 w-full grid grid-cols-1 ${gridCols} gap-8`}>
      {embeds.map((html, i) => (
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
