'use client';

import React from 'react';
import { NavigationItem } from '@/lib/types';
import { smoothScrollTo } from '@/lib/utils';
import { getCoupleNames } from '@/lib/env';

interface NavigationProps {
  items: NavigationItem[];
  isFixed?: boolean;
  className?: string;
}

export default function Navigation({ 
  items, 
  isFixed = false, 
  className = '' 
}: NavigationProps) {
  const [activeSection, setActiveSection] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // 環境変数から情報を取得
  const coupleNames = getCoupleNames();

  // スクロールスパイ機能の実装
  React.useEffect(() => {
    let mounted = true;
    const observers = new Map();
    let scrollTimer: NodeJS.Timeout;
    
    // スクロール検出（デバウンス機能付き）
    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (mounted) {
          setIsScrolled(window.scrollY > 50);
        }
      }, 10);
    };

    // セクション監視
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (!mounted) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 各セクションを監視対象に追加
    items.forEach((item) => {
      const sectionId = item.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element && mounted) {
        observer.observe(element);
        observers.set(sectionId, element);
      }
    });

    // スクロールイベントリスナー追加
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初期化時のアクティブセクション設定
    if (mounted) {
      handleScroll();
    }

    return () => {
      mounted = false;
      
      // スクロールタイマーのクリーンアップ
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      // スクロールイベントリスナーの削除
      window.removeEventListener('scroll', handleScroll);
      
      // Intersection Observer のクリーンアップ
      if (observer) {
        observer.disconnect();
      }
      
      // 個別のオブザーバーもクリーンアップ
      observers.clear();
    };
  }, [items]);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    smoothScrollTo(sectionId, 80);
    setIsMenuOpen(false);
  };

  const navClasses = `
    fixed top-0 left-0 right-0 z-50 backdrop-blur-lg shadow-lg nav-flower-pattern
    transition-all duration-500 border-b border-akane-100/50
    ${isScrolled 
      ? 'py-2' 
      : 'py-4'
    }
    ${className}
  `;

  return (
    <nav className={navClasses}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-14' : 'h-16'
        }`}>
          {/* ロゴ */}
          <div className={`font-japanese font-bold nav-logo-white tracking-wider transition-all duration-500 ${
            isScrolled ? 'text-xl' : 'text-2xl'
          }`}>
            <span className="nav-text-white">
              {coupleNames.combined.jp}
            </span>
          </div>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex space-x-8">
            {items.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full
                    transform hover:scale-105
                    ${isActive
                      ? 'nav-button-active-white shadow-lg scale-105' 
                      : 'nav-button-white hover:nav-button-white'
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* モバイルハンバーガーメニュー */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 nav-text-white hover:nav-button-white transition-colors duration-300"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`} />
            </div>
          </button>
        </div>

        {/* モバイルメニュー */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 space-y-2 nav-flower-pattern-mobile backdrop-blur-lg border-t border-akane-100/50 rounded-b-lg">
            {items.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    block w-full text-left px-4 py-3 mx-2 rounded-lg
                    transition-all duration-300 transform hover:scale-[1.02]
                    ${isActive
                      ? 'nav-button-active-white shadow-lg'
                      : 'nav-button-white hover:nav-button-white'
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
