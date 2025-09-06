'use client';

import React from 'react';
import { getWeddingEnv } from '@/lib/env';

export default function MessageSection() {
  // 環境変数から情報を取得
  const weddingEnv = getWeddingEnv();
  
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
        <div className="mb-24">
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
              皆様にはご健勝のことと<br />
              お慶び申し上げます<br />
              このたび　私たちは<br />
              結婚式を挙げることになりました<br />
              つきましては　親しい皆様の末永い<br />
              お力添えをいただきたく<br />
              心ばかりの小宴をもうけたいと存じます<br />
              おいそがしい中と存じますが<br />
              ご列席くださいますよう<br />
              お願い申し上げます
            </p>
          </div>
        </div>

        {/* Figmaデザインの新郎新婦紹介 */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* 新郎セクション - Figmaデザイン */}
          <div className="text-center group">
            <div className="mb-10">
              {/* Figmaデザインのプロフィール写真エリア */}
              <div className="relative w-72 h-72 mx-auto mb-8">
                <div 
                  className="w-full h-full rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #F5F2E4 0%, #E5E3DF 50%, #BDBCDA 100%)',
                    border: '3px solid #e65555',
                  }}
                >
                  <img 
                    src="/images/profiles/groom-placeholder.jpg"
                    alt={`${weddingEnv.groomNameFullJp}のプロフィール写真`}
                    className="w-full h-full object-cover"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
                
                {/* Figmaデザインの装飾リング */}
                <div 
                  className="absolute inset-0 rounded-full transform scale-110 opacity-30"
                  style={{
                    border: '2px solid #e65555',
                  }}
                ></div>
                <div 
                  className="absolute inset-0 rounded-full transform scale-125 opacity-15"
                  style={{
                    border: '1px solid #e65555',
                  }}
                ></div>
              </div>
              
              {/* Figmaデザインのタイトルと名前 */}
              <div className="mb-8">
                <h3 
                  className="text-akane-500 mb-4"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: '500',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    letterSpacing: '0.15em',
                    color: '#e65555',
                  }}
                >
                  Groom
                </h3>
                <h4 
                  className="text-mine-shaft mb-3"
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '500',
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    letterSpacing: '0.1em',
                    color: '#333333',
                  }}
                >
                  {weddingEnv.groomNameFullJp}
                </h4>
                <p 
                  className="text-dusty-gray"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: '400',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    letterSpacing: '0.05em',
                    color: '#999999',
                  }}
                >
                  {weddingEnv.groomNameEn}
                </p>
              </div>
            </div>
            
            {/* Figmaデザインのプロフィールカード */}
            <div 
              className="figma-card p-8 md:p-10"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(230, 85, 85, 0.1)',
              }}
            >
              <p 
                className="text-mine-shaft leading-relaxed"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  lineHeight: '1.8',
                  letterSpacing: '0.02em',
                  color: '#333333',
                  whiteSpace: 'pre-line',
                }}
              >
                {weddingEnv.groomBirthDate}　{weddingEnv.groomBirthPlace}生まれ{'\n'}
                {weddingEnv.groomBloodType}　{weddingEnv.groomOccupation}{'\n'}
                {weddingEnv.groomHobby}{'\n\n'}
                
                {weddingEnv.groomMessage}
              </p>
            </div>
          </div>

          {/* 新婦セクション - Figmaデザイン */}
          <div className="text-center group">
            <div className="mb-10">
              {/* Figmaデザインのプロフィール写真エリア */}
              <div className="relative w-72 h-72 mx-auto mb-8">
                <div 
                  className="w-full h-full rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #F5F2E4 0%, #E5E3DF 50%, #BDBCDA 100%)',
                    border: '3px solid #e65555',
                  }}
                >
                  <img 
                    src="/images/profiles/bride-placeholder.jpg"
                    alt={`${weddingEnv.brideNameFullJp}のプロフィール写真`}
                    className="w-full h-full object-cover"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
                
                {/* Figmaデザインの装飾リング */}
                <div 
                  className="absolute inset-0 rounded-full transform scale-110 opacity-30"
                  style={{
                    border: '2px solid #e65555',
                  }}
                ></div>
                <div 
                  className="absolute inset-0 rounded-full transform scale-125 opacity-15"
                  style={{
                    border: '1px solid #e65555',
                  }}
                ></div>
              </div>
              
              {/* Figmaデザインのタイトルと名前 */}
              <div className="mb-8">
                <h3 
                  className="text-akane-500 mb-4"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: '500',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    letterSpacing: '0.15em',
                    color: '#e65555',
                  }}
                >
                  Bride
                </h3>
                <h4 
                  className="text-mine-shaft mb-3"
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '500',
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    letterSpacing: '0.1em',
                    color: '#333333',
                  }}
                >
                  {weddingEnv.brideNameFullJp}
                </h4>
                <p 
                  className="text-dusty-gray"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: '400',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    letterSpacing: '0.05em',
                    color: '#999999',
                  }}
                >
                  {weddingEnv.brideNameEn}
                </p>
              </div>
            </div>
            
            {/* Figmaデザインのプロフィールカード */}
            <div 
              className="figma-card p-8 md:p-10"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(230, 85, 85, 0.1)',
              }}
            >
              <p 
                className="text-mine-shaft leading-relaxed"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  lineHeight: '1.8',
                  letterSpacing: '0.02em',
                  color: '#333333',
                  whiteSpace: 'pre-line',
                }}
              >
                {weddingEnv.brideBirthDate}　{weddingEnv.brideBirthPlace}生まれ{'\n'}
                {weddingEnv.brideBloodType}　{weddingEnv.brideOccupation}{'\n'}
                {weddingEnv.brideHobby}{'\n\n'}
                
                {weddingEnv.brideMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
