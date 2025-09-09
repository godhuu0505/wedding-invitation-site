'use client';

import { useState, useEffect } from 'react';
import SimpleLoadingScreen from '@/components/layout/SimpleLoadingScreen';
import HeaderSection from '@/components/sections/HeaderSection';
import MessageSection from '@/components/sections/MessageSection';
import ProfileSection from '@/components/sections/ProfileSection';
import CountdownSection from '@/components/sections/CountdownSection';
import InformationSection from '@/components/sections/InformationSection';
import RSVPSection from '@/components/sections/RSVPSection';
import FooterSection from '@/components/sections/FooterSection';
import Navigation from '@/components/layout/Navigation';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import SectionDivider from '@/components/ui/SectionDivider';

/**
 * メインページコンポーネント - Figmaデザイン完全対応版
 * 
 * 7つのセクション構成（Figmaデザインベース）:
 * 1. ローディング画面（5秒間、SVGアニメーション）
 * 2. ヒーローセクション（背景カルーセル + カップル名）
 * 3. メッセージセクション（挨拶文）
 * 4. プロフィールセクション（新郎新婦プロフィール）
 * 5. カウントダウンセクション（結婚式まで残り日数）
 * 6. インフォメーションセクション（式場案内 + Google Maps）
 * 7. RSVPセクション（出欠確認フォーム）
 * 8. フッターセクション（ナビゲーション + クレジット）
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
            { id: 'profile', label: 'Profile', href: '#profile' },
            { id: 'countdown', label: 'Countdown', href: '#countdown' },
            { id: 'information', label: 'Information', href: '#information' },
            { id: 'rsvp', label: 'RSVP', href: '#rsvp' }
          ]} />
          
          {/* セクション1: ヒーロー（背景カルーセル）*/}
          <HeaderSection />
          
          {/* セクション2-7: コンテンツセクション */}
          <div className="relative z-10">
            {/* セクション2: メッセージ（挨拶文）*/}
            <MessageSection />
            
            {/* セクション間スペース 1 */}
            <SectionDivider height="xl" />
            
            {/* セクション3: プロフィール（新郎新婦紹介）*/}
            <ProfileSection />
            
            {/* セクション間スペース 2 */}
            <SectionDivider height="xl" />
            
            {/* セクション4: カウントダウン（結婚式まで残り日数）*/}
            <CountdownSection />
            
            {/* セクション間スペース 3 */}
            <SectionDivider height="xl" />
            
            {/* セクション5: インフォメーション（式場案内 + Google Maps）*/}
            <InformationSection />
            
            {/* セクション間スペース 4 */}
            <SectionDivider height="xl" />
            
            {/* セクション6: RSVP（出欠確認フォーム）*/}
            <RSVPSection />
            
            {/* セクション7: フッター（ナビゲーション + クレジット）*/}
            <FooterSection />
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
