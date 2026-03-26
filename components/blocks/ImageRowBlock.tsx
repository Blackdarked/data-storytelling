import { urlFor } from '@/sanity/lib/image';

interface ImageRowBlockProps {
  images: Array<{
    asset: any;
    alt?: string;
    caption?: string;
  }>;
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
}

export function ImageRowBlock({ images, columns = 2, gap = 'md' }: ImageRowBlockProps) {
  const gapClass = {
    sm: 'gap-2',
    md: 'gap-6',
    lg: 'gap-12',
  }[gap];

  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns] || 'md:grid-cols-2';

  return (
    <div className={`my-12 grid grid-cols-1 ${gridCols} ${gapClass}`}>
      {images.map((img, i) => (
        <figure key={i} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition-all hover:border-chlorophyll/50 hover:shadow-[0_0_20px_rgba(0,163,42,0.15)]">
          <div className="aspect-[4/3] overflow-hidden">
            {img.asset?._ref?.startsWith('image-') ? (
              <img
                src={urlFor(img).width(800).auto('format').url()}
                alt={img.alt || ''}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                <span className="text-[10px] uppercase tracking-widest">Ảnh mô phỏng</span>
              </div>
            )}
          </div>
          {img.caption && (
            <figcaption className="p-4 text-center text-xs italic text-gray-500 border-t border-gray-100 bg-gray-50">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
