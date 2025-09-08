'use client';

import React, { useEffect, useState } from 'react';
import { getWeddingDate, getWeddingEnv } from '@/lib/env';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isClient, setIsClient] = useState(false);

  // 環境変数から情報を取得
  const weddingDate = getWeddingDate();
  const weddingEnv = getWeddingEnv();

  useEffect(() => {
    setIsClient(true);
    
    // Figmaデザインに合わせた結婚式の日時
    const weddingDateObj = weddingDate.date;
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = weddingDateObj.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        // 結婚式当日または過ぎた場合
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // 初回計算
    calculateTimeRemaining();

    // 1秒ごとに更新
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return (
      <section id="countdown" className="py-24 bg-ecru-white">
        <div className="container mx-auto px-4 text-center">
          <div className="figma-heading-medium text-mine-shaft">
            Countdown
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="countdown" className="py-24 bg-ecru-white relative overflow-hidden">
      {/* Figmaデザインの背景装飾 */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
          style={{ background: 'radial-gradient(circle, #e65555 0%, transparent 70%)' }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, #BDBCDA 0%, transparent 70%)' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10 max-w-7xl">
        {/* 和風セクションタイトル */}
        <div className="mb-20">
          <h2 
            className="text-mine-shaft mb-8"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '700',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            Countdown
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
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              letterSpacing: '0.1em',
              color: '#4D4D4D',
            }}
          >
            結婚式まで
          </p>
        </div>

        {/* 日数のみ表示 */}
        <div className="mb-20">
          <div 
            className="text-center"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '700',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: '#e65555',
              lineHeight: '1.2',
              letterSpacing: '0.05em',
              textShadow: '0 4px 20px rgba(230, 85, 85, 0.3)',
            }}
          >
            あと{timeRemaining.days}日
          </div>
        </div>

        {/* Figmaデザインの結婚式情報カード */}
        <div className="max-w-5xl mx-auto">
          <div 
            className="figma-card p-10 md:p-16"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(230, 85, 85, 0.15)',
            }}
          >
            <h3 
              className="text-akane-500 mb-10"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '700',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '0.1em',
                color: '#e65555',
              }}
            >
              結婚式当日
            </h3>
            
            {/* レスポンシブ対応の日付情報 */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                <span 
                  className="text-mine-shaft"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontWeight: '700',
                    fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                    color: '#333333',
                    textAlign: 'center',
                    lineHeight: '1.2',
                  }}
                >
                  {weddingDate.jp}
                </span>
              </div>
              <div 
                className="text-mine-shaft mb-3 mt-4"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '600',
                  fontSize: 'clamp(1.125rem, 2.5vw, 2.25rem)',
                  color: '#333333',
                }}
              >
                {weddingEnv.receptionTimeDisplay}より
              </div>
            </div>
            
            {/* Figmaデザインの会場情報 */}
            <div 
              className="pt-8"
              style={{
                borderTop: '1px solid rgba(153, 153, 153, 0.3)',
              }}
            >
              <div className="mb-4">
                <div 
                  className="mb-4"
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '500',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    color: '#e65555',
                  }}
                >
                  会場
                </div>
                <div 
                  className="text-mine-shaft mb-3"
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '600',
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    color: '#333333',
                  }}
                >
                  {weddingEnv.venueName}
                </div>
                <div 
                  className="text-dusty-gray"
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '400',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    color: '#999999',
                    letterSpacing: '0.02em',
                  }}
                >
                  {weddingEnv.venueAddress}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 結婚式当日の特別メッセージ */}
        {timeRemaining.days === 0 && (
          <div 
            className="mt-20 p-10 text-white rounded-xl shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #e65555 0%, #BDBCDA 100%)',
            }}
          >
            <h3 
              className="mb-6"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '700',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '0.1em',
                color: 'white',
              }}
            >
              🎉 結婚式当日です！ 🎉
            </h3>
            <p 
              className="text-white"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '400',
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                letterSpacing: '0.05em',
                lineHeight: '1.8',
              }}
            >
              本日は私たちの結婚式にお越しいただき、ありがとうございます。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
