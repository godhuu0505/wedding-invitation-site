'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getWeddingDate, getWeddingEnv } from '@/lib/env';
import {
  BlackOverlay,
  VerticalInvitationText,
  WeddingDate,
  SlideIndicator
} from '@/components/ui/HeaderAnimations';

export default function HeaderSection() {
  const headerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBlackOverlay, setShowBlackOverlay] = useState(true);

  // 環境変数から情報を取得
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
      background: 'url("/images/header/header_1_moon.jpg"), linear-gradient(45deg, #D2B48C 0%, #DEB887 30%, #F5DEB3 60%, #FDF5E6 100%)',
      backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(139,69,19,0.3) 50%, rgba(0,0,0,0.4) 100%)'
    },
    {
      background: 'url("/images/header/header_2_gate.jpg"), linear-gradient(45deg, #D2B48C 0%, #DEB887 30%, #F5DEB3 60%, #FDF5E6 100%)',
      backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(139,69,19,0.3) 50%, rgba(0,0,0,0.4) 100%)'
    },
    {
      background: 'url("/images/header/header_3_bowing.jpg"), linear-gradient(45deg, #D2B48C 0%, #DEB887 30%, #F5DEB3 60%, #FDF5E6 100%)',
      backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(139,69,19,0.3) 50%, rgba(0,0,0,0.4) 100%)'
    },
  ], []);

  useEffect(() => {
    // 黒いオーバーレイを3秒後に非表示にする
    const overlayTimer = setTimeout(() => {
      setShowBlackOverlay(false);
    }, 3000);

    // Figmaデザインに基づく7秒間隔でのスライド切り替え
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundStyles.length);
    }, 7000);

    return () => {
      clearTimeout(overlayTimer);
      clearInterval(slideInterval);
    };
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
            <div 
              className="absolute inset-0"
              style={{
                background: style.overlay,
              }}
            />
          </div>
        ))}
        
        <BlackOverlay showBlackOverlay={showBlackOverlay} />
      </div>

      {/* Figmaデザインに基づくヘッダーセクション */}
      <header 
        ref={headerRef}
        id="home" 
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* 縦書き「ご招待状」文字 - 画面中央 */}
        <VerticalInvitationText showBlackOverlay={showBlackOverlay} />

        {/* 結婚式日程 - 左下 */}
        <div className="absolute bottom-20 left-8 z-30">
          <WeddingDate
            showBlackOverlay={showBlackOverlay}
            weddingDate={weddingDate.date}
            venueName={weddingEnv.venueName}
          />
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
