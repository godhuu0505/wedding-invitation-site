'use client';

import React, { useEffect, useState } from 'react';
import { getCoupleNames, getWeddingDate } from '@/lib/env';

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
      {/* 背景画像 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/images/bowing.jpg)' }}
      />
      
      {/* コンテンツオーバーレイ */}
      <div className="relative z-10 text-center">
        {/* シンプルなアニメーションロゴ */}
        <div className="w-64 h-40 mx-auto mb-8 flex items-center justify-center">
          <div className="relative">
            {/* 回転するリング */}
            <div className="w-20 h-20 border-4 border-akane-200 rounded-full animate-spin border-t-akane-500"></div>
            
            {/* 中央のハート */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-akane-500 text-2xl animate-pulse">♡</div>
            </div>
          </div>
        </div>
        
        {/* カップル名表示 */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-elegant text-akane-600 mb-2 tracking-wider">
            {coupleNames.combined.en}
          </h1>
          <p className="text-lg text-akane-400 font-japanese tracking-widest">
            {coupleNames.combined.jp}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {weddingDate.display}
          </p>
        </div>

        {/* プログレスバー */}
        <div className="w-64 h-1 bg-akane-100 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-akane-400 to-akane-600 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="mt-4 text-sm text-gray-500 font-japanese">
          {progress < 100 ? 'お招きページを準備中...' : '準備完了'}
        </p>
      </div>
    </div>
  );
}
