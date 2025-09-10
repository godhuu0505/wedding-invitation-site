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
  const [isScrolled, setIsScrolled] = useState(false);

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

    // スクロール検出でビューポート状態を監視
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // CSS変数で背景とコンテンツの同期を保つ
      document.documentElement.style.setProperty(
        '--scroll-offset', 
        `${Math.min(scrollY / 100, 1)}`
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(overlayTimer);
      clearInterval(slideInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [backgroundStyles.length]);

  return (
    <>
      {/* Figmaデザインに基づく背景カルーセル */}
      <div 
        className="fixed inset-0 z-0 stable-background"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          height: '100vh', // フォールバック
          minHeight: '100svh', // 前景と同じ基準
        }}
      >
        {backgroundStyles.map((style, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity stable-background-layer ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '100vh', // フォールバック
              minHeight: '100svh', // 前景と同じ基準
              background: style.background,
              backgroundSize: style.backgroundSize,
              backgroundPosition: style.backgroundPosition,
              backgroundRepeat: style.backgroundRepeat || 'no-repeat',
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
        className="relative z-10 flex flex-col mobile-safe-header"
        style={{
          minHeight: '100vh', // フォールバック for older browsers
        }}
      >
        {/* 縦書き「ご招待状」文字 - 画面中央 */}
        <VerticalInvitationText showBlackOverlay={showBlackOverlay} />

        {/* 結婚式日程 - 左下（スマホでは安全領域を考慮）*/}
        <div className="absolute left-8 z-30">
          <WeddingDate
            showBlackOverlay={showBlackOverlay}
            weddingDate={weddingDate.date}
            venueName={weddingEnv.venueName}
          />
        </div>

        {/* Figmaデザインのスライドインジケーター */}
        <SlideIndicator
          showBlackOverlay={showBlackOverlay}
          backgroundStyles={backgroundStyles}
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
        />
      </header>
    </>
  );
}
