'use client';

import React from 'react';

interface BackToTopButtonProps {
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  isHovered?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function BackToTopButton({ 
  variant = 1, 
  isHovered = false,
  onClick,
  className = ''
}: BackToTopButtonProps) {
  const [hover, setHover] = React.useState(false);
  const isActive = isHovered || hover;

  // Figmaデザインに基づいたスタイリング
  const getButtonStyle = () => {
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      // borderRadius: '9999px',
      transition: 'all 0.3s ease',
      fontFamily: 'Noto Serif JP, serif',
      fontWeight: '500',
      letterSpacing: '0.05em',
      cursor: 'pointer',
      // border: '1px solid',
    };

    // バリエーションに応じたサイズとスタイル
    switch (variant) {
      case 1:
        return {
          ...baseStyle,
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: isActive ? '#0A58CA' : 'transparent',
          color: isActive ? '#FFFFFF' : '#333333',
          borderColor: isActive ? '#0A58CA' : '#333333',
        };
      case 2:
        return {
          ...baseStyle,
          padding: '14px 20px',
          fontSize: '0.875rem',
          backgroundColor: isActive ? '#0A58CA' : 'transparent',
          color: isActive ? '#FFFFFF' : '#333333',
          borderColor: isActive ? '#0A58CA' : '#333333',
        };
      case 3:
        return {
          ...baseStyle,
          // padding: '14px 18px',
          fontSize: '0.875rem',
          // backgroundColor: isActive ? '#0A58CA' : 'transparent',
          color: isActive ? '#FFFFFF' : '#FFFFFF',
          // borderColor: isActive ? '#0A58CA' : '#333333',
        };
      case 4:
        return {
          ...baseStyle,
          padding: '16px 16px',
          fontSize: '0.75rem',
          backgroundColor: isActive ? '#0A58CA' : 'transparent',
          color: isActive ? '#FFFFFF' : '#333333',
          borderColor: isActive ? '#0A58CA' : '#333333',
        };
      case 5:
        return {
          ...baseStyle,
          padding: '16px 14px',
          fontSize: '0.75rem',
          backgroundColor: isActive ? '#0A58CA' : 'transparent',
          color: isActive ? '#FFFFFF' : '#333333',
          borderColor: isActive ? '#0A58CA' : '#333333',
        };
      case 6:
        return {
          ...baseStyle,
          padding: '18px 12px',
          fontSize: '0.625rem',
          backgroundColor: isActive ? '#0A58CA' : 'transparent',
          color: isActive ? '#FFFFFF' : '#333333',
          borderColor: isActive ? '#0A58CA' : '#333333',
        };
      case 7:
      case 9:
      case 11:
        return {
          ...baseStyle,
          padding: '6px 12px',
          fontSize: '0.75rem',
          backgroundColor: isActive ? '#0A58CA' : 'transparent',
          color: isActive ? '#FFFFFF' : '#333333',
          borderColor: isActive ? '#0A58CA' : '#333333',
        };
      case 8:
      case 10:
      case 12:
        return {
          ...baseStyle,
          padding: '8px 10px',
          fontSize: '0.625rem',
          backgroundColor: isActive ? '#0A58CA' : 'transparent',
          color: isActive ? '#FFFFFF' : '#333333',
          borderColor: isActive ? '#0A58CA' : '#333333',
        };
      default:
        return baseStyle;
    }
  };

  const getTextContent = () => {
    // より小さなバリエーションではシンプルなテキスト
    if (variant >= 7) {
      return 'BACK TO TOP ↑';
    }
    
    // 大きなバリエーションでは詳細なテキスト
    return (
      <span className="flex items-center space-x-2">
        <span>BACK TO TOP</span>
        <span>↑</span>
      </span>
    );
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={getButtonStyle()}
      className={`transform hover:scale-105 ${className}`}
    >
      {getTextContent()}
    </button>
  );
}
