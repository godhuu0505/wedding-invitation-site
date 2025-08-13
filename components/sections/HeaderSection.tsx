'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getCoupleNames, getWeddingDate, getWeddingEnv } from '@/lib/env';

export default function HeaderSection() {
  const headerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 環境変数から情報を取得
  const coupleNames = getCoupleNames();
  const weddingDate = getWeddingDate();
  const weddingEnv = getWeddingEnv();

  // reference-site.htmlに近い美しい背景画像風グラデーション
  const backgroundGradients = React.useMemo(() => [
    // 茜色ベースの和風グラデーション
    'linear-gradient(135deg, #e65555 0%, #d64545 30%, #c73535 60%, #b82828 100%)',
    // 金色とオレンジの暖かいグラデーション
    'linear-gradient(45deg, #f59e0b 0%, #d97706 30%, #b45309 60%, #92400e 100%)',
    // 茜色と金色のミックス
    'linear-gradient(225deg, #e65555 0%, #f59e0b 50%, #d97706 100%)',
  ], []);

  useEffect(() => {
    // 自動スライド切り替え（7秒間隔でよりゆったりと）
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundGradients.length);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, []); // backgroundGradientsの依存を削除

  return (
    <>
      {/* 背景カルーセル - reference-site.html風 */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      >
        {backgroundGradients.map((gradient, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: gradient,
              transform: 'scale(1.05)',
              transitionDuration: '3000ms',
              transitionProperty: 'opacity',
            }}
          />
        ))}
        {/* 全体的なオーバーレイ */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
          }}
        ></div>
      </div>

      {/* ヘッダーセクション */}
      <header 
        ref={headerRef}
        id="home" 
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* メインコンテンツエリア */}
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center text-white max-w-4xl mx-auto">
            {/* カップル名 - reference-site.html風の大きなタイポグラフィ */}
            <div className="mb-12 animate-fade-in">
              <h1 
                className="text-7xl md:text-9xl font-elegant mb-6 tracking-wider drop-shadow-2xl leading-tight"
                style={{
                  fontSize: 'clamp(4rem, 8vw, 8rem)',
                  fontFamily: 'var(--font-elegant), "Playfair Display", serif',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  lineHeight: '0.9',
                  textShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                  color: 'white',
                }}
              >
                {coupleNames.groom.en}<span 
                  className="text-5xl md:text-7xl mx-4"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 6rem)',
                    margin: '0 1rem',
                  }}
                >&</span>{coupleNames.bride.en}
              </h1>
              
              {/* 装飾線 */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-px bg-white opacity-60"></div>
                <div className="w-3 h-3 bg-white rounded-full mx-4 opacity-80"></div>
                <div className="w-16 h-px bg-white opacity-60"></div>
              </div>
              
              {/* 日本語名 */}
              <p 
                className="text-2xl md:text-3xl font-japanese tracking-widest drop-shadow-lg mb-2"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontFamily: 'var(--font-japanese), "Noto Serif JP", serif',
                  letterSpacing: '0.2em',
                  textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  marginBottom: '0.5rem',
                }}
              >
                {coupleNames.combined.jp}
              </p>
            </div>

            {/* 結婚式情報 - reference-site.html風のレイアウト */}
            <div className="animate-fade-in mb-12" style={{ animationDelay: '0.5s' }}>
              {/* 日付 */}
              <div className="mb-8">
                <p className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg tracking-wider">
                  {weddingDate.display}
                </p>
                <p className="text-xl md:text-2xl font-japanese drop-shadow-md opacity-90">
                  {weddingDate.dayJp}
                </p>
              </div>
              
              {/* 式場情報 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/20">
                <p className="text-lg md:text-xl font-japanese mb-2 opacity-90">
                  at
                </p>
                <p className="text-2xl md:text-3xl font-japanese font-semibold mb-4 drop-shadow-md">
                  {weddingEnv.venueName}
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm md:text-base">
                  <div className="text-center">
                    <span className="font-japanese opacity-80">結婚式</span>
                    <span className="mx-2">•</span>
                    <span className="font-semibold">{weddingEnv.ceremonyTime}</span>
                  </div>
                  <div className="hidden md:block w-px h-4 bg-white/40"></div>
                  <div className="text-center">
                    <span className="font-japanese opacity-80">披露宴</span>
                    <span className="mx-2">•</span>
                    <span className="font-semibold">{weddingEnv.receptionTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* スクロールダウンインジケーター */}
            <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex flex-col items-center text-white/70 animate-bounce">
                <span className="text-sm font-japanese mb-2 tracking-widest">SCROLL DOWN</span>
                <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
                <div className="w-2 h-2 bg-white/70 rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* スライドインジケーター - reference-site.html風 */}
        <div className="absolute bottom-8 right-8 flex flex-col space-y-3 z-20">
          {backgroundGradients.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/40 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/20 hover:bg-white/40 hover:scale-110'
              }`}
              aria-label={`背景スライド ${index + 1}`}
            />
          ))}
        </div>
      </header>
    </>
  );
}
