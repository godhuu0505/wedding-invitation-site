'use client';

import React from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
  progress?: number;
  onComplete?: () => void;
}

export default function LoadingScreen({ 
  isVisible, 
  progress = 0, 
  onComplete 
}: LoadingScreenProps) {
  React.useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="text-center">
        {/* SVGアニメーション領域（後でVivus.jsで実装） */}
        <div className="w-32 h-32 mx-auto mb-8">
          <div className="w-full h-full border-4 border-akane-200 border-t-akane-500 rounded-full animate-loading"></div>
        </div>
        
        {/* カップル名表示 */}
        <div className="mb-6">
          <h1 className="text-2xl font-japanese text-akane-700 mb-2">
            Naoto & Yui
          </h1>
          <p className="text-sm text-gray-600">
            2025.11.03
          </p>
        </div>

        {/* プログレスバー */}
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-akane-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="mt-4 text-sm text-gray-500">
          {progress < 100 ? 'Loading...' : 'Complete!'}
        </p>
      </div>
    </div>
  );
}
