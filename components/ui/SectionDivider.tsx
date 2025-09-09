'use client';

import { FC } from 'react';

interface SectionDividerProps {
  /** 高さの調整 */
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 追加のCSS クラス */
  className?: string;
}

/**
 * セクション間のスペースコンポーネント
 * 
 * 和風エレガントなデザインに基づいて、セクション間に
 * 美しい装飾要素を含むスペースを提供します。
 * 背景画像はなく、シンプルなデザインです。
 */
const SectionDivider: FC<SectionDividerProps> = ({
  height = 'md',
  className = ''
}) => {
  // 高さのマッピング
  const heightClasses = {
    xs: 'h-12 sm:h-16 md:h-20 lg:h-24',      // 約48-96px (小さめ)
    sm: 'h-24 sm:h-32 md:h-40 lg:h-48',      // 約96-192px (小)
    md: 'h-32 sm:h-40 md:h-56 lg:h-64',      // 約128-256px (中)
    lg: 'h-48 sm:h-56 md:h-72 lg:h-80',      // 約192-320px (大)
    xl: 'h-56 sm:h-64 md:h-80 lg:h-96'       // 約224-384px (特大)
  };

  return (
    <div 
      className={`
        relative w-full 
        ${heightClasses[height]}
        bg-transparent
        ${className}
      `}
    >
      {/* 装飾的なボーダー（上） */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-akane-primary/20 to-transparent" />
      {/* 装飾的なボーダー（下） */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-akane-primary/20 to-transparent" />
    </div>
  );
};

export default SectionDivider;
