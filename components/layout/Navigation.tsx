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

  // 環境変数から情報を取得
  const coupleNames = getCoupleNames();

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    smoothScrollTo(sectionId, 80);
    setIsMenuOpen(false);
  };

  const navClasses = `
    fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 to-akane-50/95 backdrop-blur-lg shadow-lg
    transition-all duration-300 border-b border-akane-100/50
    ${className}
  `;

  return (
    <nav className={navClasses}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="font-japanese text-2xl font-bold text-akane-700 tracking-wider">
            <span className="bg-gradient-to-r from-akane-600 to-pink-600 bg-clip-text text-transparent">
              {coupleNames.combined.shortEn}
            </span>
          </div>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex space-x-8">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`
                  text-sm font-medium transition-all duration-300 px-3 py-2 rounded-full
                  ${activeSection === item.id 
                    ? 'text-white bg-gradient-to-r from-akane-500 to-pink-500 shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:text-akane-500 hover:bg-akane-50/50'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* モバイルハンバーガーメニュー */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-akane-500"
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
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-white/95 to-akane-50/95 backdrop-blur-lg border-t border-akane-100/50">
            <div className="py-4 space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-akane-500 hover:bg-gradient-to-r hover:from-akane-50/50 hover:to-pink-50/50 transition-all duration-300 rounded-lg mx-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
