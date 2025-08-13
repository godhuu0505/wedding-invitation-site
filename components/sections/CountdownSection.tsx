'use client';

import React, { useEffect, useState } from 'react';

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

  // reference-site.htmlの設定に合わせた結婚式の日時（2100年12月31日）
  const weddingDate = new Date('2100-12-31T10:00:00+09:00');

  useEffect(() => {
    setIsClient(true);
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

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
  }, [weddingDate]);

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
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mx-2 transform hover:scale-105 transition-transform duration-300">
      <div className="text-4xl md:text-6xl font-bold text-akane-600 mb-2 font-mono animate-count-change">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-japanese uppercase tracking-wide">
        {label}
      </div>
    </div>
  );

  return (
    <section id="countdown" className="py-20 bg-gradient-to-br from-akane-50 to-gold-50">
      <div className="container mx-auto px-4 text-center">
        {/* セクションタイトル */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-elegant text-akane-600 mb-4">
            Countdown
          </h2>
          <div className="w-24 h-px bg-akane-300 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-700 font-japanese">
            結婚式まで
          </p>
        </div>

        {/* カウントダウン表示 */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-12">
          <CountdownItem value={timeRemaining.days} label="DAYS" />
          <div className="text-2xl md:text-3xl text-akane-400 hidden md:block">:</div>
          
          <CountdownItem value={timeRemaining.hours} label="HOURS" />
          <div className="text-2xl md:text-3xl text-akane-400 hidden md:block">:</div>
          
          <CountdownItem value={timeRemaining.minutes} label="MINUTES" />
          <div className="text-2xl md:text-3xl text-akane-400 hidden md:block">:</div>
          
          <CountdownItem value={timeRemaining.seconds} label="SECONDS" />
        </div>

        {/* 結婚式情報 */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-elegant text-akane-600 mb-6">
            Wedding Day
          </h3>
          <div className="space-y-4 text-gray-700 font-japanese">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
              <span className="text-3xl md:text-4xl font-bold text-akane-600">
                2100年12月31日
              </span>
              <span className="text-lg text-gray-600">（金曜日）</span>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 mt-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-akane-600 mb-1">結婚式</div>
                <div className="text-base">午前10時より</div>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-lg font-semibold text-akane-600 mb-1">披露宴</div>
                <div className="text-base">午前11時より</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-lg font-semibold text-akane-600 mb-2">会場</div>
              <div className="text-base">サンプルホテル</div>
              <div className="text-sm text-gray-600 mt-1">
                東京都港区北青山３丁目５－１５
              </div>
            </div>
          </div>
        </div>

        {/* 特別メッセージ */}
        {timeRemaining.days === 0 && timeRemaining.hours === 0 && 
         timeRemaining.minutes === 0 && timeRemaining.seconds === 0 && (
          <div className="mt-12 p-8 bg-gradient-to-r from-akane-500 to-gold-500 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl md:text-3xl font-elegant mb-4">
              🎉 結婚式当日です！ 🎉
            </h3>
            <p className="text-lg font-japanese">
              本日は私たちの結婚式にお越しいただき、ありがとうございます。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
