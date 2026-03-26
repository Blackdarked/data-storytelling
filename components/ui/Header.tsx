import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-chlorophyll/10 flex items-center justify-center text-chlorophyll border border-chlorophyll/30 glow-chlorophyll">
              <Leaf size={24} className="animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-lg leading-tight block text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                Đồ án môn học
              </span>
              <span className="data-label text-[10px] text-chlorophyll">
                Kể chuyện bằng dữ liệu
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-8">
            <Link href="/about" className="data-label text-xs hover:text-chlorophyll transition-colors">
              Giới thiệu
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
