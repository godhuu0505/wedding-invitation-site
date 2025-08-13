import type { Metadata } from 'next';
import { Noto_Serif_JP, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

// 日本語フォント設定
const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-japanese',
  display: 'swap',
});

// エレガントフォント設定
const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-elegant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Naoto & Yui Wedding Invitation - 2025.11.03',
  description: '伊藤尚人・小林結衣の結婚式招待サイトです。2025年11月3日、皆様のご出席をお待ちしております。',
  keywords: ['結婚式', '招待状', 'ウェディング', '2025年11月3日', 'Naoto', 'Yui'],
  authors: [{ name: 'Naoto & Yui' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Naoto & Yui Wedding Invitation',
    description: '2025年11月3日の結婚式にご招待いたします',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naoto & Yui Wedding Invitation',
    description: '2025年11月3日の結婚式にご招待いたします',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-japanese antialiased bg-white text-gray-900 overflow-x-hidden">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
