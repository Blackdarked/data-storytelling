import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'DataStories — Interactive Data Storytelling',
    template: '%s | DataStories',
  },
  description: 'Explore data-driven stories with interactive charts, maps, and visualizations.',
  openGraph: {
    type: 'website',
    siteName: 'DataStories',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <footer className="mt-24 border-t border-gray-100 dark:border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400 dark:text-gray-600">
            DataStories — A data storytelling platform
          </div>
        </footer>
      </body>
    </html>
  );
}
