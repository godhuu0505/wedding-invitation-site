'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ 
  isVisible, 
  onComplete 
}: LoadingScreenProps) {
  const svgRef = useRef<HTMLDivElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let vivusInstance: any;

    const loadVivus = async () => {
      try {
        // Vivus.jsを動的インポート
        const Vivus = (await import('vivus')).default;
        
        if (svgRef.current) {
          // SVGを動的に挿入
          svgRef.current.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 150" id="loading-svg" style="width: 200px; height: 120px;">
              <defs>
                <style type="text/css">
                  .st0{fill:none;stroke:#e65555;stroke-width:2;stroke-miterlimit:10;}
                </style>
              </defs>
              <g transform="translate(-80, -20) scale(0.8)">
                <path class="st0" d="M189.7,75l-62.3-36l0.1-0.1L189.8,3l0,0.1L189.7,75 M142.8,48l0-18 M174.4,11.8l15.6,9 M189.9,57.2l-15.6,9"></path>
                <path class="st0" d="M169,39l13.1,22.7L169,39 M169,39h-26.2H169 M169,39l13.1-22.6L169,39"></path>
                <path class="st0" d="M127.5,39l35.9,62.3l0.1,0.1l36-62.3l0-0.1L127.5,39 M175.3,39l-11.9,62.3 M127.5,39l59.9,20.9"></path>
                <path class="st0" d="M63.6,75l35.9-62.3l-0.1,0l-71.9,0l0,0.1L63.6,75 M90.8,28.1l-9-15.6 M136.3,12.5l-9,15.6 M127,60.6l18,0"></path>
                <path class="st0" d="M63.6,36.4l0,26.2L63.6,36.4 M63.6,36.4l-22.7-13.1L63.6,36.4 M63.6,36.4l22.7-13L63.6,36.4"></path>
                <path class="st0" d="M127.6,39l-71.9,0l0-0.1l36-62.3l0.1,0.1L127.6,39 M163.4,-23.3l-11.9,62.3 M187.4,18.1l-59.9,20.9"></path>
                <path class="st0" d="M63.6,75.2l36-62.3l0.1,0.1l35.9,62.3l-0.1,0L63.6,75.2 M90.5,28.9l18,0 M126.7,60.5l-9,15.6 M81.3,75.1l-9-15.6"></path>
                <path class="st0" d="M99.5,55.2l-22.7,13.1L99.5,55.2 M99.5,55.2v-26.2V55.2 M99.5,55.2l22.6,13.1L99.5,55.2"></path>
              </g>
            </svg>
          `;

          // Vivusアニメーション実行
          vivusInstance = new Vivus('loading-svg', {
            type: 'delayed',
            duration: 120, // 5秒のアニメーション (120フレーム = 約5秒)
            animTimingFunction: Vivus.EASE,
            pathTimingFunction: Vivus.EASE_OUT,
            start: 'autostart'
          }, () => {
            // アニメーション完了時
            setIsAnimationComplete(true);
            setTimeout(() => {
              onComplete?.();
            }, 1000);
          });

          // プログレス監視
          const progressInterval = setInterval(() => {
            if (vivusInstance) {
              const progress = Math.round(vivusInstance.getStatus() * 100);
              setAnimationProgress(progress);
              
              if (progress >= 100) {
                clearInterval(progressInterval);
              }
            }
          }, 50);

          return () => {
            clearInterval(progressInterval);
          };
        }
      } catch (error) {
        console.error('Vivus loading error:', error);
        // フォールバック: アニメーションなしで完了
        setTimeout(() => {
          setIsAnimationComplete(true);
          onComplete?.();
        }, 3000);
      }
    };

    loadVivus();

    return () => {
      if (vivusInstance) {
        vivusInstance.stop();
        vivusInstance.reset();
      }
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-1000 ${
      isAnimationComplete ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        {/* SVGアニメーション領域 */}
        <div 
          ref={svgRef}
          className="w-64 h-40 mx-auto mb-8 flex items-center justify-center"
          style={{ minHeight: '120px' }}
        />
        
        {/* カップル名表示 */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-elegant text-akane-600 mb-2 tracking-wider">
            Naoto & Yui
          </h1>
          <p className="text-lg text-akane-400 font-japanese tracking-widest">
            伊藤尚人 ♡ 小林結衣
          </p>
          <p className="text-sm text-gray-600 mt-2">
            2025.11.03
          </p>
        </div>

        {/* プログレスバー */}
        <div className="w-64 h-1 bg-akane-100 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-akane-400 to-akane-600 transition-all duration-300 ease-out"
            style={{ width: `${animationProgress}%` }}
          />
        </div>
        
        <p className="mt-4 text-sm text-gray-500 font-japanese">
          {animationProgress < 100 ? 'お招きページを準備中...' : '準備完了'}
        </p>
      </div>
    </div>
  );
}
