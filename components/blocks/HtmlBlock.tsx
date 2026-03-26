'use client';

import { useEffect, useRef } from 'react';

interface HtmlBlockProps {
  html: string;
}

export function HtmlBlock({ html }: HtmlBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous content
    containerRef.current.innerHTML = '';
    
    // Create a DocumentFragment from the raw HTML string
    // This allows scripts to be safely appended to the DOM and executed
    const fragment = document.createRange().createContextualFragment(html);
    containerRef.current.appendChild(fragment);
  }, [html]);

  return (
    <div className="my-12 w-full html-embed-container overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white p-4 sm:p-6" ref={containerRef} />
  );
}
