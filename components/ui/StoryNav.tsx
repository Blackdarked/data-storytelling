'use client';

import { useEffect, useRef, useState } from 'react';

interface StoryNavProps {
  stories: { title: string; slug: string }[];
}

export function StoryNav({ stories }: StoryNavProps) {
  const [activeSlug, setActiveSlug] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stories.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSlug(slug); },
        { rootMargin: '-20% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [stories]);

  if (stories.length === 0) return null;

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav className="hidden lg:flex flex-col gap-1 sticky top-20 self-start max-h-[80vh] overflow-y-auto py-2 pr-2">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
          Stories
        </p>
        {stories.map(({ title, slug }) => (
          <a
            key={slug}
            href={`#${slug}`}
            className="text-sm py-1.5 px-3 rounded-lg transition-all duration-200 leading-snug border-l-2"
            style={{
              color: activeSlug === slug ? 'var(--green-forest)' : 'var(--text-secondary)',
              borderLeftColor: activeSlug === slug ? 'var(--green-forest)' : 'transparent',
              background: activeSlug === slug ? 'var(--green-mint)' : 'transparent',
              fontWeight: activeSlug === slug ? 600 : 400,
            }}
          >
            {title}
          </a>
        ))}
      </nav>

      {/* Mobile horizontal scroll nav */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {stories.map(({ title, slug }) => (
          <a
            key={slug}
            href={`#${slug}`}
            className="text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
            style={{
              background: activeSlug === slug ? 'var(--green-forest)' : 'var(--green-mint)',
              color: activeSlug === slug ? '#fff' : 'var(--green-forest)',
              fontWeight: activeSlug === slug ? 600 : 400,
            }}
          >
            {title}
          </a>
        ))}
      </div>
    </>
  );
}
