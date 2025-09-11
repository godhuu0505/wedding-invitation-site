'use client';

import React from 'react';
import AnimatedProfileImage from '@/components/ui/AnimatedProfileImage';
import { AnimatedProfileCard } from '@/components/ui/AnimatedProfileCard';

export default function ProfileSection() {
  // 新郎のプロフィール情報を行ごとに細かく定義
  const groomProfile = {
    nameFullJp: '田中 瑚大',
    nameFullEn: 'Tanaka Godai',
    birthDate: '1993年5月5日',
    birthPlace: '埼玉県',
    bloodType: 'B型のINFP(仲介者)',
    hobbyLines: [
      '',
      '週末は外に出かけることが多く',
      'サッカー・キャンプ・ゴルフなど',
      'にハマっています！',
      '',
      '犬が好きな犬顔ですが',
      '犬アレルギー持ちで困ってます'
    ],
    messageLines: [
      '',
      '美味しい料理・お酒を用意して',
      'お待ちしております',
      '',
      '当日皆様にお会いできることを',
      '楽しみにしております'
    ]
  };

  // 新婦のプロフィール情報を行ごとに細かく定義
  const brideProfile = {
    nameFullJp: '與口 花菜',
    nameFullEn: 'Yoguchi Kana',
    birthDate: '1994年11月5日',
    birthPlace: '東京都',
    bloodType: 'O型のISTJ(管理者)',
    hobbyLines: [
      '',
      'キャリアアドバイザーから',
      '人事労務に職種チェンジしました',
      '',
      'プライベートでは超多趣味なので',
      '3人分くらいの人生を',
      '謳歌するつもりで生きています'
    ],
    messageLines: [
      '',
      '皆さんが',
      '存分に楽しめる宴になるよう',
      '鋭意準備中です',
      'ご列席 心よりお待ちしております'
    ]
  };
  
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
                src="/images/profiles/groom.jpg"
                alt={`${groomProfile.nameFullJp}のプロフィール写真`}
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
                  {groomProfile.nameFullJp}
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
                  {groomProfile.nameFullEn}
                </p>
              </div>
            </div>
            
            <AnimatedProfileCard
              birthDate={groomProfile.birthDate}
              birthPlace={groomProfile.birthPlace}
              bloodType={groomProfile.bloodType}
              hobbyLines={groomProfile.hobbyLines}
              messageLines={groomProfile.messageLines}
            />
          </div>

          {/* 新婦セクション - Figmaデザイン */}
          <div className="text-center group">
            <div className="mb-10">
                            <AnimatedProfileImage
                src="/images/profiles/bride.jpg"
                alt={`${brideProfile.nameFullJp}のプロフィール写真`}
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
                  {brideProfile.nameFullJp}
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
                  {brideProfile.nameFullEn}
                </p>
              </div>
            </div>
            
            <AnimatedProfileCard
              birthDate={brideProfile.birthDate}
              birthPlace={brideProfile.birthPlace}
              bloodType={brideProfile.bloodType}
              hobbyLines={brideProfile.hobbyLines}
              messageLines={brideProfile.messageLines}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
