import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ background: 'color-mix(in srgb, var(--bg-page) 85%, transparent)', borderColor: 'var(--green-mint)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm text-lg" style={{ background: 'var(--green-forest)' }}>
              🌿
            </div>
            <div>
              <span className="font-bold text-base leading-tight block" style={{ color: 'var(--green-deep)', fontFamily: 'var(--font-lora, Lora, serif)' }}>
                Urban Greening
              </span>
              <span className="text-xs leading-tight block" style={{ color: 'var(--text-muted)' }}>
                Data Stories
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <a href="#stories" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
              Stories
            </a>
            <a href="#about" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
              About
            </a>
            <Link href="/studio" className="text-sm font-medium px-4 py-1.5 rounded-full transition-colors text-white" style={{ background: 'var(--green-forest)' }}>
              Studio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
