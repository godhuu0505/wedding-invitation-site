'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/layout/LoadingScreen';
import HeaderSection from '@/components/sections/HeaderSection';
import MessageSection from '@/components/sections/MessageSection';
import CountdownSection from '@/components/sections/CountdownSection';
import Navigation from '@/components/layout/Navigation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5秒間のローディング

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ローディング画面 */}
      {isLoading && <LoadingScreen isVisible={isLoading} />}
      
      {/* メインコンテンツ */}
      {!isLoading && (
        <div className="relative">
          {/* 固定ナビゲーション */}
          <Navigation items={[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'message', label: 'Message', href: '#message' },
            { id: 'countdown', label: 'Countdown', href: '#countdown' },
            { id: 'information', label: 'Information', href: '#information' },
            { id: 'rsvp', label: 'RSVP', href: '#rsvp' }
          ]} />
          
          {/* ヘッダー（背景込み） */}
          <HeaderSection />
          
          {/* コンテンツセクション */}
          <div className="relative z-10 bg-white">
            <MessageSection />
            <CountdownSection />
            {/* Phase 3で実装予定 */}
            {/* <InformationSection /> */}
            {/* <RSVPSection /> */}
            {/* <FooterSection /> */}
          </div>
        </div>
      )}
    </>
  );
}
