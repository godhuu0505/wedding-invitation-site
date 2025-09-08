'use client';

import React from 'react';

export default function MessageSection() {
  return (
    <section id="message" className="py-24 bg-old-lace relative">
      {/* Figmaデザインの背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-ecru-white/50 to-old-lace"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Figmaデザインのセクションタイトル */}
        <div className="text-center mb-20">
          <h2 
            className="text-mine-shaft mb-8"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            Message
          </h2>
          
          {/* Figmaデザインの装飾線 */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"></div>
            <div className="w-3 h-3 bg-akane-500 rounded-full mx-6 shadow-sm"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"></div>
          </div>
          
          <p 
            className="text-tundora"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: '1.125rem',
              letterSpacing: '0.1em',
              color: '#4D4D4D',
            }}
          >
            メッセージ
          </p>
        </div>

        {/* Figmaデザインの挨拶文カード */}
        <div className="max-w-4xl mx-auto figma-card p-12 md:p-16">
          <p 
            className="text-mine-shaft leading-loose text-center"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
              lineHeight: '2',
              letterSpacing: '0.05em',
              color: '#333333',
            }}
          >
            皆様にはご健勝のことと お慶び申し上げます<br />
            このたび 私たちは 結婚式を挙げることになりました<br />
            <br />
            つきましては 親しい皆様の末永い<br />
            お力添えをいただきたく心ばかりの小宴をもうけたいと存じます<br />
            <br />
            おいそがしい中と存じますがご列席くださいますようお願い申し上げます
          </p>
        </div>
      </div>
    </section>
  );
}
