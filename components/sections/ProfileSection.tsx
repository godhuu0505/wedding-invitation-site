'use client';

import React from 'react';
import { getWeddingEnv } from '@/lib/env';
import AnimatedProfileMessage from '@/components/ui/AnimatedProfileMessage';
import AnimatedProfileImage from '@/components/ui/AnimatedProfileImage';

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
              <AnimatedProfileImage
                src="/images/profiles/groom.png"
                alt={`${weddingEnv.groomNameFullJp}のプロフィール写真`}
              />
              
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
            
            <AnimatedProfileMessage
              birthDate={weddingEnv.groomBirthDate}
              birthPlace={weddingEnv.groomBirthPlace}
              bloodType={weddingEnv.groomBloodType}
              hobby={weddingEnv.groomHobby}
              message={weddingEnv.groomMessage}
            />
          </div>

          {/* 新婦セクション - Figmaデザイン */}
          <div className="text-center group">
            <div className="mb-10">
              <AnimatedProfileImage
                src="/images/profiles/bride.png"
                alt={`${weddingEnv.brideNameFullJp}のプロフィール写真`}
              />
              
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
            
            <AnimatedProfileMessage
              birthDate={weddingEnv.brideBirthDate}
              birthPlace={weddingEnv.brideBirthPlace}
              bloodType={weddingEnv.brideBloodType}
              hobby={weddingEnv.brideHobby}
              message={weddingEnv.brideMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
