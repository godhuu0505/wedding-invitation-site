'use client';

import React from 'react';
import { getWeddingEnv } from '@/lib/env';

export default function ProfileSection() {
  // 環境変数から情報を取得
  const weddingEnv = getWeddingEnv();
  
  return (
    <section id="profile" className="py-24 bg-old-lace relative">
      <div className="absolute inset-0 bg-gradient-to-b from-ecru-white/50 to-old-lace"></div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
            Profile
          </h2>
          
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
            新郎新婦のご紹介
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* 新郎セクション - Figmaデザイン */}
          <div className="text-center group">
            <div className="mb-10">
              <div className="relative w-72 h-72 mx-auto mb-8">
                <div 
                  className="w-full h-full rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #F5F2E4 0%, #E5E3DF 50%, #BDBCDA 100%)',
                    border: '3px solid #e65555',
                  }}
                >
                  <img 
                    src="/images/profiles/groom.png"
                    alt={`${weddingEnv.groomNameFullJp}のプロフィール写真`}
                    className="w-full h-full object-cover"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
                
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
              
              <div className="mb-8">
                <h3
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
                </h3>
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
                  {weddingEnv.groomNameFullEn}
                </p>
              </div>
            </div>
            
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
                {weddingEnv.groomBloodType}{'\n\n'}

                {weddingEnv.groomHobby}{'\n\n'}

                {weddingEnv.groomMessage}
              </p>
            </div>
          </div>

          {/* 新婦セクション - Figmaデザイン */}
          <div className="text-center group">
            <div className="mb-10">
              <div className="relative w-72 h-72 mx-auto mb-8">
                <div 
                  className="w-full h-full rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #F5F2E4 0%, #E5E3DF 50%, #BDBCDA 100%)',
                    border: '3px solid #e65555',
                  }}
                >
                  <img 
                    src="/images/profiles/bride.png"
                    alt={`${weddingEnv.brideNameFullJp}のプロフィール写真`}
                    className="w-full h-full object-cover"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
                
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
              
              <div className="mb-8">
                <h3 
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
                </h3>
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
                  {weddingEnv.brideNameFullEn}
                </p>
              </div>
            </div>
            
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
                {weddingEnv.brideBloodType}{'\n\n'}
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
