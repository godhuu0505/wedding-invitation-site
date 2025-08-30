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

  // 背景スタイルの型定義
  interface BackgroundStyle {
    background: string;
    backgroundSize: string;
    backgroundPosition: string;
    backgroundRepeat?: string;
    overlay: string;
  }

  // Figmaデザインに基づく背景画像とグラデーション
  const backgroundStyles: BackgroundStyle[] = React.useMemo(() => [
    {
      background: 'url("/images/header-pattern1.png"), linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(160, 82, 45, 0.2) 30%, rgba(205, 133, 63, 0.1) 60%, rgba(222, 184, 135, 0.05) 100%)',
      backgroundSize: 'cover, cover',
      backgroundPosition: 'center, center',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(139,69,19,0.3) 50%, rgba(0,0,0,0.4) 100%)'
    },
    {
      background: 'url("/images/header-pattern2.png"), linear-gradient(45deg, #D2B48C 0%, #DEB887 30%, #F5DEB3 60%, #FDF5E6 100%)',
      backgroundSize: '125px 71px, cover',
      backgroundPosition: 'top left, center',
      backgroundRepeat: 'repeat, no-repeat',
      overlay: 'linear-gradient(to bottom, rgba(139,69,19,0.1) 0%, rgba(160,82,45,0.15) 50%, rgba(0,0,0,0.25) 100%)'
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
              backgroundRepeat: style.backgroundRepeat || 'no-repeat',
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
