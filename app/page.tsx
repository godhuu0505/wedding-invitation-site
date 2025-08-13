'use client';

import React from 'react';
import LoadingScreen from '@/components/layout/LoadingScreen';
import Navigation from '@/components/layout/Navigation';
import { NavigationItem } from '@/lib/types';

// ナビゲーション項目
const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'ホーム', href: '#home' },
  { id: 'message', label: 'メッセージ', href: '#message' },
  { id: 'countdown', label: 'カウントダウン', href: '#countdown' },
  { id: 'information', label: '式場案内', href: '#information' },
  { id: 'rsvp', label: '出欠確認', href: '#rsvp' },
];

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingProgress, setLoadingProgress] = React.useState(0);

  React.useEffect(() => {
    // ローディングシミュレーション
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* ローディング画面 */}
      <LoadingScreen
        isVisible={isLoading}
        progress={loadingProgress}
        onComplete={handleLoadingComplete}
      />

      {/* メインコンテンツ */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* ナビゲーション */}
        <Navigation items={navigationItems} isFixed={true} />

        {/* ヘッダーセクション */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-akane-50 to-gold-50">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-elegant text-akane-700 mb-6 animate-fade-in">
              Naoto & Yui
            </h1>
            <div className="w-24 h-px bg-akane-400 mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 animate-slide-up">
              2025年11月3日
            </p>
            <p className="text-lg text-gray-600 animate-slide-up">
              私たちの特別な日に、ぜひご参加ください
            </p>
          </div>
        </section>

        {/* メッセージセクション */}
        <section id="message" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-japanese text-akane-700 mb-12">
              ご挨拶
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
              <p className="mb-6">
                この度、私たちは結婚式を挙げることとなりました。
              </p>
              <p className="mb-6">
                皆様には日頃より温かいご支援をいただき、
                心より感謝申し上げます。
              </p>
              <p>
                私たちの新しい門出を、
                ぜひ皆様と一緒にお祝いできればと思います。
                お忙しい中恐縮ですが、ご出席いただけますよう
                お願い申し上げます。
              </p>
            </div>
          </div>
        </section>

        {/* カウントダウンセクション */}
        <section id="countdown" className="py-20 bg-akane-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-japanese text-akane-700 mb-12">
              結婚式まで
            </h2>
            <div className="text-6xl font-bold text-akane-600">
              あと○日
            </div>
            <p className="mt-4 text-gray-600">
              ※カウントダウン機能は後で実装します
            </p>
          </div>
        </section>

        {/* 式場案内セクション */}
        <section id="information" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-japanese text-akane-700 mb-12 text-center">
              式場案内
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-akane-600 mb-4">挙式</h3>
                <p className="text-gray-700">
                  日時・場所の詳細は後で追加します
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-akane-600 mb-4">披露宴</h3>
                <p className="text-gray-700">
                  日時・場所の詳細は後で追加します
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 出欠確認セクション */}
        <section id="rsvp" className="py-20 bg-akane-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-japanese text-akane-700 mb-12">
              出欠確認
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-6">
                RSVPフォームは後で実装します
              </p>
              <button className="bg-akane-500 text-white px-8 py-3 rounded-lg hover:bg-akane-600 transition-colors">
                出欠を回答する
              </button>
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="py-12 bg-gray-900 text-white text-center">
          <p className="mb-4">
            &copy; 2025 Naoto & Yui Wedding
          </p>
          <p className="text-sm text-gray-400">
            ご質問がございましたらお気軽にお声がけください
          </p>
        </footer>
      </div>
    </>
  );
}
