'use client';

import { FC } from 'react';

interface SectionDividerProps {
  /** 高さの調整 */
  height?: 'sm' | 'md' | 'lg';
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
    sm: 'h-24 sm:h-32 md:h-40 lg:h-48',
    md: 'h-32 sm:h-40 md:h-56 lg:h-64',
    lg: 'h-48 sm:h-56 md:h-72 lg:h-80'
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
