import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 grup">
            <div className="w-10 h-10 rounded-xl bg-chlorophyll/20 flex items-center justify-center text-chlorophyll border border-chlorophyll/30 glow-chlorophyll">
              <Leaf size={24} className="animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-lg leading-tight block text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Urban Greening
              </span>
              <span className="data-label text-[10px] text-chlorophyll">
                Data Storyteller
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-8">
            <Link href="/" className="data-label text-xs hover:text-chlorophyll transition-colors">
              Chronicle
            </Link>
            <Link href="/about" className="data-label text-xs hover:text-chlorophyll transition-colors">
              Impact
            </Link>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <button className="hidden sm:block glass px-4 py-2 rounded-lg text-xs font-bold text-gold border-gold/30 hover:bg-gold/10 transition-all">
              Join Growth
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
