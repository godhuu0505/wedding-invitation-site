'use client';

import React, { useEffect, useState } from 'react';
import { getCoupleNames, getWeddingDate } from '@/lib/env';
import LoadingAnimation from '@/components/ui/LoadingAnimation';

interface SimpleLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function SimpleLoadingScreen({ 
  isVisible, 
  onComplete 
}: SimpleLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // 環境変数から情報を取得
  const coupleNames = getCoupleNames();
  const weddingDate = getWeddingDate();

  useEffect(() => {
    if (!isVisible) return;

    let mounted = true;
    const duration = 5000; // 5秒
    const interval = 50; // 50ms間隔
    const increment = (100 * interval) / duration;

    const progressTimer = setInterval(() => {
      if (!mounted) {
        clearInterval(progressTimer);
        return;
      }

      setProgress(prev => {
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            if (mounted) {
              setIsComplete(true);
              setTimeout(() => {
                if (mounted && onComplete) {
                  onComplete();
                }
              }, 1000);
            }
          }, 500);
        }
        
        return newProgress;
      });
    }, interval);

    return () => {
      mounted = false;
      clearInterval(progressTimer);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-1000 ${
      isComplete ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-20 nav-flower-pattern" />
      
      {/* コンテンツオーバーレイ */}
      <div className="relative z-10 text-center">
        {/* 和風幾何学模様アニメーション */}
        <div className="w-64 h-40 mx-auto mb-8 flex items-center justify-center">
          <div className="relative">
            <LoadingAnimation />
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-64 h-1 bg-akane-100 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-akane-400 to-akane-600 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-sm text-gray-500 font-japanese">
          {progress < 100 ? '招待ページを準備中...' : '準備完了'}
        </p>
      </div>
    </div>
  );
}
