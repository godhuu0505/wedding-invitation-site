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

  // Figmaデザインに基づく背景画像とグラデーション
  const backgroundStyles = React.useMemo(() => [
    {
      background: 'url("/images/figma-assets/wedding-bg-figma.svg"), linear-gradient(135deg, #F5F2E4 0%, #E5E3DF 20%, #D5D3CF 40%, #C5C3BF 60%, #B5B3AF 80%, #A5A39F 100%)',
      backgroundSize: 'cover, cover',
      backgroundPosition: 'center, center',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(113,18,7,0.2) 50%, rgba(0,0,0,0.3) 100%)'
    },
    {
      background: 'url("/images/figma-assets/wedding-pattern-1.svg"), linear-gradient(45deg, #F5F5F5 0%, #BDBCDA 30%, #A5A39F 60%, #8B8985 100%)',
      backgroundSize: 'cover, cover',
      backgroundPosition: 'center, center',
      overlay: 'linear-gradient(to bottom, rgba(113,18,7,0.1) 0%, rgba(230,85,85,0.2) 50%, rgba(0,0,0,0.3) 100%)'
    },
    {
      background: 'url("/images/figma-assets/wedding-pattern-2.svg"), linear-gradient(225deg, #E5E3DF 0%, #BDBCDA 30%, #F5F2E4 60%, #F5F5F5 100%)',
      backgroundSize: 'cover, cover',
      backgroundPosition: 'center, center',
      overlay: 'linear-gradient(to bottom, rgba(77,77,77,0.1) 0%, rgba(230,85,85,0.15) 50%, rgba(0,0,0,0.25) 100%)'
    },
    {
      background: 'url("/images/backgrounds/wedding-bg-1.jpg"), linear-gradient(135deg, #F5F2E4 0%, #e65555 20%, #BDBCDA 80%, #333333 100%)',
      backgroundSize: 'cover, cover',
      backgroundPosition: 'center, center',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(230,85,85,0.1) 50%, rgba(0,0,0,0.4) 100%)'
    },
  ], []);

  useEffect(() => {
    // Figmaデザインに基づく7秒間隔でのスライド切り替え
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundStyles.length);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, [backgroundStyles.length]);

  return (
    <>
      {/* Figmaデザインに基づく背景カルーセル */}
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
        {backgroundStyles.map((style, index) => (
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
              background: style.background,
              backgroundSize: style.backgroundSize,
              backgroundPosition: style.backgroundPosition,
              transform: 'scale(1.02)',
              transitionDuration: '3000ms',
              transitionProperty: 'opacity',
            }}
          >
            {/* Figmaデザインのオーバーレイ */}
            <div 
              className="absolute inset-0"
              style={{
                background: style.overlay,
              }}
            />
          </div>
        ))}
      </div>

      {/* Figmaデザインに基づくヘッダーセクション */}
      <header 
        ref={headerRef}
        id="home" 
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Figmaデザインのメインコンテンツエリア */}
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-6xl mx-auto">
            
            {/* Figmaデザインのカップル名セクション */}
            <div className="mb-16 animate-figma-fade-in">
              {/* 英語名 - Figmaデザインのタイポグラフィ */}
              <h1 
                className="figma-heading-large text-mine-shaft mb-8 drop-shadow-lg"
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontWeight: '700',
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  lineHeight: '0.85',
                  letterSpacing: '0.15em',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  color: '#333333',
                  marginBottom: '2rem',
                }}
              >
                {coupleNames.groom.en}
                <span 
                  className="mx-6"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 5rem)',
                    fontWeight: '300',
                    color: '#711207',
                    margin: '0 1.5rem',
                  }}
                >
                  &
                </span>
                {coupleNames.bride.en}
              </h1>
              
              {/* Figmaデザインの装飾線 */}
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-mine-shaft to-transparent opacity-60"></div>
                <div className="w-2 h-2 bg-akane-500 rounded-full mx-6 opacity-80 shadow-sm"></div>
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-mine-shaft to-transparent opacity-60"></div>
              </div>
              
              {/* 日本語名 - Figmaデザインのタイポグラフィ */}
              <p 
                className="figma-body-japanese text-mine-shaft mb-4"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  letterSpacing: '0.25em',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                  color: '#333333',
                  marginBottom: '1rem',
                }}
              >
                {coupleNames.combined.jp}
              </p>
            </div>

            {/* Figmaデザインの結婚式情報セクション */}
            <div className="animate-figma-slide-up mb-16" style={{ animationDelay: '0.6s' }}>
              {/* 日付 - Figmaデザインスタイル */}
              <div className="mb-10">
                <p 
                  className="text-mine-shaft mb-3"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: '600',
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: '1',
                    letterSpacing: '0.1em',
                    textShadow: '0 3px 15px rgba(0, 0, 0, 0.2)',
                    color: '#333333',
                  }}
                >
                  {weddingDate.display}
                </p>
                <p 
                  className="text-dark-burgundy opacity-90"
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '400',
                    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                    letterSpacing: '0.1em',
                    color: '#711207',
                  }}
                >
                  {weddingDate.dayJp}
                </p>
              </div>
              
              {/* Figmaデザインの式場情報カード */}
              <div className="figma-card p-8 md:p-10 max-w-2xl mx-auto">
                <p 
                  className="text-tundora mb-3 opacity-80"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: '300',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                    letterSpacing: '0.2em',
                    color: '#4D4D4D',
                  }}
                >
                  at
                </p>
                <h2 
                  className="text-mine-shaft mb-6"
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '500',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    letterSpacing: '0.1em',
                    color: '#333333',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {weddingEnv.venueName}
                </h2>
                
                {/* Figmaデザインのタイムライン */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="text-center md:text-right">
                    <div className="figma-small-text text-dusty-gray mb-2">
                      結婚式
                    </div>
                    <div 
                      className="text-mine-shaft font-medium"
                      style={{
                        fontFamily: 'Cinzel, serif',
                        fontWeight: '500',
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: '#333333',
                      }}
                    >
                      {weddingEnv.ceremonyTime}
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-dusty-gray to-transparent opacity-30 mx-auto"></div>
                  <div className="block md:hidden h-px bg-gradient-to-r from-transparent via-dusty-gray to-transparent opacity-30 my-2"></div>
                  
                  <div className="text-center md:text-left">
                    <div className="figma-small-text text-dusty-gray mb-2">
                      披露宴
                    </div>
                    <div 
                      className="text-mine-shaft font-medium"
                      style={{
                        fontFamily: 'Cinzel, serif',
                        fontWeight: '500',
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: '#333333',
                      }}
                    >
                      {weddingEnv.receptionTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Figmaデザインのスクロールインジケーター */}
            <div className="animate-figma-fade-in" style={{ animationDelay: '1.2s' }}>
              <div className="flex flex-col items-center text-dusty-gray animate-bounce">
                <span 
                  className="figma-small-text mb-3 tracking-widest"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: '300',
                    fontSize: '0.75rem',
                    letterSpacing: '0.3em',
                    color: '#999999',
                  }}
                >
                  SCROLL DOWN
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-dusty-gray to-transparent opacity-50"></div>
                <div className="w-1.5 h-1.5 bg-akane-500 rounded-full mt-2 opacity-70 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Figmaデザインのスライドインジケーター */}
        <div className="absolute bottom-8 right-8 flex flex-col space-y-3 z-20">
          {backgroundStyles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border ${
                index === currentSlide 
                  ? 'bg-akane-500 border-akane-500 scale-125 shadow-lg' 
                  : 'bg-transparent border-dusty-gray hover:bg-dusty-gray/30 hover:scale-110'
              }`}
              style={{
                borderColor: index === currentSlide ? '#e65555' : '#999999',
                backgroundColor: index === currentSlide ? '#e65555' : 'transparent',
                boxShadow: index === currentSlide ? '0 4px 12px rgba(230, 85, 85, 0.3)' : 'none',
              }}
              aria-label={`背景スライド ${index + 1}`}
            />
          ))}
        </div>
      </header>
    </>
  );
}
