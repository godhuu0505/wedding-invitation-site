'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeaderSection() {
  const headerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 背景画像配列（開発用グラデーション）
  const backgroundGradients = [
    'linear-gradient(135deg, #e65555 0%, #d64545 50%, #c73535 100%)',
    'linear-gradient(45deg, #d4a574 0%, #c49464 50%, #b48454 100%)',
    'linear-gradient(225deg, #e65555 0%, #d4a574 50%, #c49464 100%)'
  ];

  useEffect(() => {
    // 自動スライド切り替え
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundGradients.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [backgroundGradients.length]);

  return (
    <header 
      ref={headerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 背景カルーセル */}
      <div className="absolute inset-0">
        {backgroundGradients.map((gradient, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: gradient,
              transform: 'scale(1.1)', // Ken Burns効果のための拡大
              animation: index === currentSlide ? 'kenburns 20s ease-out infinite' : 'none'
            }}
          />
        ))}
      </div>

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40"></div>
      
      {/* メインコンテンツ */}
      <div className="relative z-10 text-center text-white px-4">
        {/* カップル名 */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-elegant mb-4 tracking-wider drop-shadow-lg">
            Naoto & Yui
          </h1>
          <div className="w-32 h-px bg-white mx-auto mb-4 opacity-80"></div>
          <p className="text-xl md:text-2xl font-japanese tracking-widest drop-shadow-md">
            伊藤尚人 ♡ 小林結衣
          </p>
        </div>

        {/* 結婚式日程 - reference-site.htmlに合わせて */}
        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-lg md:text-xl mb-2 font-japanese drop-shadow-md">
            私たちの結婚式
          </p>
          <p className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            2100.12.31
          </p>
          <p className="text-base md:text-lg font-japanese drop-shadow-md">
            金曜日 午前10時より
          </p>
        </div>

        {/* スクロールダウン */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-white opacity-80">
            <span className="text-sm font-japanese mb-2">SCROLL</span>
            <div className="w-px h-8 bg-white"></div>
          </div>
        </div>
      </div>

      {/* スライドインジケーター */}
      <div className="absolute bottom-6 right-6 flex space-x-2 z-10">
        {backgroundGradients.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </header>
  );
}
