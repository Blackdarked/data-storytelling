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
      </body>
    </html>
  );
}

