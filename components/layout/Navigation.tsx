'use client';

import React from 'react';
import { NavigationItem } from '@/lib/types';
import { smoothScrollTo } from '@/lib/utils';

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

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    smoothScrollTo(sectionId, 80);
    setIsMenuOpen(false);
  };

  const navClasses = `
    ${isFixed ? 'fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm shadow-sm' : ''}
    transition-all duration-300
    ${className}
  `;

  return (
    <nav className={navClasses}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="font-japanese text-xl text-akane-700">
            N & Y
          </div>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex space-x-8">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`
                  text-sm font-medium transition-colors duration-200
                  ${activeSection === item.id 
                    ? 'text-akane-600 border-b-2 border-akane-600' 
                    : 'text-gray-700 hover:text-akane-500'
                  }
                  pb-1
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
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="py-4 space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-akane-500 hover:bg-gray-50"
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
