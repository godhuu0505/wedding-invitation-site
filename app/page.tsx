'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/layout/LoadingScreen';
import SimpleLoadingScreen from '@/components/layout/SimpleLoadingScreen';
import HeaderSection from '@/components/sections/HeaderSection';
import MessageSection from '@/components/sections/MessageSection';
import CountdownSection from '@/components/sections/CountdownSection';
import InformationSection from '@/components/sections/InformationSection';
import SafeInformationSection from '@/components/sections/SafeInformationSection';
import RSVPSection from '@/components/sections/RSVPSection';
import FooterSection from '@/components/sections/FooterSection';
import Navigation from '@/components/layout/Navigation';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const timer = setTimeout(() => {
      if (mounted) {
        setIsLoading(false);
        // ローディング完了後少し待ってからコンテンツを表示
        setTimeout(() => {
          if (mounted) {
            setShowContent(true);
          }
        }, 500);
      }
    }, 5000); // 5秒間のローディング

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <ErrorBoundary>
      {/* ローディング画面 - 安全なバージョンを使用 */}
      {isLoading && (
        <SimpleLoadingScreen 
          isVisible={isLoading} 
          onComplete={() => {
            setIsLoading(false);
            setShowContent(true);
          }} 
        />
      )}
      
      {/* メインコンテンツ */}
      {!isLoading && showContent && (
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
            {/* 安全なInformationSectionを使用 */}
            <SafeInformationSection />
            <RSVPSection />
            <FooterSection />
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
