import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              DataStories
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Stories
            </Link>
            <Link href="/studio" className="text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
              Studio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
