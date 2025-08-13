'use client';

import { useState, useEffect } from 'react';
import SimpleLoadingScreen from '@/components/layout/SimpleLoadingScreen';
import HeaderSection from '@/components/sections/HeaderSection';
import MessageSection from '@/components/sections/MessageSection';
import CountdownSection from '@/components/sections/CountdownSection';
import InformationSection from '@/components/sections/InformationSection';
import RSVPSection from '@/components/sections/RSVPSection';
import FooterSection from '@/components/sections/FooterSection';
import Navigation from '@/components/layout/Navigation';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

/**
 * メインページコンポーネント - Figmaデザイン完全対応版
 * 
 * 6つのセクション構成（Figmaデザインベース）:
 * 1. ローディング画面（5秒間、SVGアニメーション）
 * 2. ヒーローセクション（背景カルーセル + カップル名）
 * 3. メッセージセクション（挨拶文 + 新郎新婦プロフィール）
 * 4. カウントダウンセクション（結婚式まで残り日数）
 * 5. インフォメーションセクション（式場案内 + Google Maps）
 * 6. RSVPセクション（出欠確認フォーム）
 * 7. フッターセクション（ナビゲーション + クレジット）
 */
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    // Figmaデザイン仕様：5秒間のローディング時間
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
    }, 5000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <ErrorBoundary>
      {/* ローディング画面（Figma仕様: 5秒間SVGアニメーション）*/}
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
        <div className="min-h-screen bg-old-lace">
          {/* 固定ナビゲーション（スムーススクロール対応）*/}
          <Navigation items={[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'message', label: 'Message', href: '#message' },
            { id: 'countdown', label: 'Countdown', href: '#countdown' },
            { id: 'information', label: 'Information', href: '#information' },
            { id: 'rsvp', label: 'RSVP', href: '#rsvp' }
          ]} />
          
          {/* セクション1: ヒーロー（背景カルーセル + カップル名表示）*/}
          <HeaderSection />
          
          {/* セクション2-6: コンテンツセクション */}
          <div className="relative z-10">
            {/* セクション2: メッセージ（挨拶文 + 新郎新婦プロフィール）*/}
            <MessageSection />
            
            {/* セクション3: カウントダウン（結婚式まで残り日数）*/}
            <CountdownSection />
            
            {/* セクション4: インフォメーション（式場案内 + Google Maps）*/}
            <InformationSection />
            
            {/* セクション5: RSVP（出欠確認フォーム - reference-site.html準拠）*/}
            <RSVPSection />
            
            {/* セクション6: フッター（ナビゲーション + クレジット）*/}
            <FooterSection />
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
