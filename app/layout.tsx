import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

export const metadata: Metadata = {
  title: {
    default: 'Urban Greening — Data Stories',
    template: '%s | Urban Greening',
  },
  description: 'Data-driven stories about urbanization, greening, and the future of cities.',
  openGraph: {
    type: 'website',
    siteName: 'Urban Greening Data Stories',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen antialiased" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
        <Header />
        <main id="main-content">{children}</main>
        <footer className="mt-24 py-10 border-t" style={{ borderColor: 'var(--green-mint)' }}>
          <div className="max-w-7xl mx-auto px-4 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            🌿 Urban Greening — Data Storytelling Platform
          </div>
        </footer>
      </body>
    </html>
  );
}

