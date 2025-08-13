import type { Metadata } from 'next';
import { Noto_Serif_JP, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { getWeddingEnv } from '@/lib/env';

// 環境変数から情報を取得
const weddingEnv = getWeddingEnv();

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
  title: weddingEnv.siteTitle,
  description: weddingEnv.siteDescription,
  keywords: ['結婚式', '招待状', 'ウェディング', weddingEnv.weddingDateJp, weddingEnv.groomNameEn, weddingEnv.brideNameEn],
  authors: [{ name: `${weddingEnv.groomNameEn} & ${weddingEnv.brideNameEn}` }],
  robots: 'index, follow',
  metadataBase: new URL('http://localhost:3003'),
  openGraph: {
    title: weddingEnv.siteTitle,
    description: `${weddingEnv.weddingDateJp}の結婚式にご招待いたします`,
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: weddingEnv.siteTitle,
    description: `${weddingEnv.weddingDateJp}の結婚式にご招待いたします`,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
