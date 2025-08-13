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
    
    // reference-site.htmlの設定に合わせた結婚式の日時
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
  }, []); // 依存配列を空にして無限ループを防止

  if (!isClient) {
    return (
      <section id="countdown" className="py-20 bg-gradient-to-br from-akane-50 to-gold-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl md:text-5xl font-elegant text-akane-600 mb-4">
            Countdown
          </div>
        </div>
      </section>
    );
  }

  const CountdownItem = ({ value, label }: { value: number; label: string }) => (
    <div className="group">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 mx-2 transform hover:scale-105 transition-all duration-300 border border-akane-100 group-hover:border-akane-300 group-hover:shadow-xl">
        <div className="text-5xl md:text-7xl font-bold text-akane-600 mb-3 font-mono animate-count-change leading-none">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-sm md:text-base text-gray-600 font-japanese uppercase tracking-widest">
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <section id="countdown" className="py-20 bg-gradient-to-br from-akane-50 via-white to-gold-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-akane-100 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-100 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* セクションタイトル */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-elegant text-akane-600 mb-6">
            Countdown
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-akane-300"></div>
            <div className="w-2 h-2 bg-akane-400 rounded-full mx-4"></div>
            <div className="w-16 h-px bg-akane-300"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 font-japanese">
            結婚式まで
          </p>
        </div>

        {/* カウントダウン表示 - より美しいデザイン */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-16">
          <CountdownItem value={timeRemaining.days} label="DAYS" />
          <div className="text-3xl md:text-4xl text-akane-400 hidden md:block font-light">:</div>
          
          <CountdownItem value={timeRemaining.hours} label="HOURS" />
          <div className="text-3xl md:text-4xl text-akane-400 hidden md:block font-light">:</div>
          
          <CountdownItem value={timeRemaining.minutes} label="MINUTES" />
          <div className="text-3xl md:text-4xl text-akane-400 hidden md:block font-light">:</div>
          
          <CountdownItem value={timeRemaining.seconds} label="SECONDS" />
        </div>

        {/* 結婚式情報 - より洗練されたカード */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-akane-100">
            <h3 className="text-3xl md:text-4xl font-elegant text-akane-600 mb-8">
              Wedding Day
            </h3>
            
            {/* 日付情報 */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
                <span className="text-4xl md:text-5xl font-bold text-akane-600 font-elegant">
                  {weddingDate.jp}
                </span>
                <span className="text-xl md:text-2xl text-gray-600 font-japanese">（{weddingDate.dayJp}）</span>
              </div>
            </div>
            
            {/* スケジュール */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-akane-50 to-akane-100 p-6 rounded-xl">
                <div className="text-2xl font-semibold text-akane-600 mb-2 font-japanese">結婚式</div>
                <div className="text-xl text-gray-700">{weddingEnv.ceremonyTimeDisplay}より</div>
              </div>
              <div className="bg-gradient-to-br from-gold-50 to-gold-100 p-6 rounded-xl">
                <div className="text-2xl font-semibold text-gold-600 mb-2 font-japanese">披露宴</div>
                <div className="text-xl text-gray-700">{weddingEnv.receptionTimeDisplay}より</div>
              </div>
            </div>
            
            {/* 会場情報 */}
            <div className="pt-8 border-t border-gray-200">
              <div className="mb-4">
                <div className="text-2xl font-semibold text-akane-600 mb-3 font-japanese">会場</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{weddingEnv.venueName}</div>
                <div className="text-lg text-gray-600">
                  {weddingEnv.venueAddress}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 特別メッセージ */}
        {timeRemaining.days === 0 && timeRemaining.hours === 0 && 
         timeRemaining.minutes === 0 && timeRemaining.seconds === 0 && (
          <div className="mt-16 p-8 bg-gradient-to-r from-akane-500 to-gold-500 text-white rounded-2xl shadow-xl">
            <h3 className="text-3xl md:text-4xl font-elegant mb-4">
              🎉 結婚式当日です！ 🎉
            </h3>
            <p className="text-xl font-japanese">
              本日は私たちの結婚式にお越しいただき、ありがとうございます。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
