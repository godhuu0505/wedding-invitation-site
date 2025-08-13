'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getCoupleNames, getWeddingDate } from '@/lib/env';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ 
  isVisible, 
  onComplete 
}: LoadingScreenProps) {
  const svgRef = useRef<HTMLDivElement>(null);
  const vivusRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);
  
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // 環境変数から情報を取得
  const coupleNames = getCoupleNames();
  const weddingDate = getWeddingDate();

  // 安全なクリーンアップ関数
  const cleanupVivus = useCallback(() => {
    // プログレス監視の停止
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // Vivusインスタンスの安全なクリーンアップ
    if (vivusRef.current) {
      try {
        if (typeof vivusRef.current.stop === 'function') {
          vivusRef.current.stop();
        }
        if (typeof vivusRef.current.reset === 'function') {
          vivusRef.current.reset();
        }
        if (typeof vivusRef.current.destroy === 'function') {
          vivusRef.current.destroy();
        }
      } catch (error) {
        // クリーンアップエラーは無視
        console.warn('Vivus cleanup warning:', error);
      }
      vivusRef.current = null;
    }

    // SVG要素の安全なクリーンアップ
    if (svgRef.current) {
      try {
        // 子要素を一つずつ安全に削除
        while (svgRef.current.firstChild) {
          if (svgRef.current.contains(svgRef.current.firstChild)) {
            svgRef.current.removeChild(svgRef.current.firstChild);
          } else {
            // 万一firstChildが子でなければbreak
            break;
          }
        }
      } catch (error) {
        // DOM操作エラーの場合は innerHTML で強制クリア
        try {
          svgRef.current.innerHTML = '';
        } catch (e) {
          console.warn('SVG cleanup warning:', e);
        }
      }
    }
  }, []);

  // アニメーション完了ハンドラー
  const handleAnimationComplete = useCallback(() => {
    if (!mountedRef.current) return;
    
    setIsAnimationComplete(true);
    setTimeout(() => {
      if (mountedRef.current && onComplete) {
        onComplete();
      }
    }, 1000);
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) return;

    mountedRef.current = true;

    const initializeVivus = async () => {
      try {
        // 既存のクリーンアップ
        cleanupVivus();

        // Vivus.jsを動的インポート
        const Vivus = (await import('vivus')).default;
        
        if (!svgRef.current || !mountedRef.current) return;

        // SVGを安全に挿入
        const svgHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 150" id="loading-svg-${Date.now()}" style="width: 200px; height: 120px;">
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

        svgRef.current.innerHTML = svgHTML;
        
        // SVG要素の取得
        const svgElement = svgRef.current.querySelector('svg');
        if (!svgElement || !mountedRef.current) return;

        const svgId = svgElement.id;

        // Vivusアニメーション実行
        vivusRef.current = new Vivus(svgId, {
          type: 'delayed',
          duration: 120,
          animTimingFunction: 'EASE' as const,
          pathTimingFunction: 'EASE_OUT' as const,
          start: 'autostart'
        }, handleAnimationComplete);

        // プログレス監視
        progressIntervalRef.current = setInterval(() => {
          if (vivusRef.current && mountedRef.current) {
            try {
              const progress = Math.round(vivusRef.current.getStatus() * 100);
              setAnimationProgress(progress);
              
              if (progress >= 100) {
                if (progressIntervalRef.current) {
                  clearInterval(progressIntervalRef.current);
                  progressIntervalRef.current = null;
                }
              }
            } catch (error) {
              // プログレス取得エラーは無視
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
            }
          }
        }, 50);

      } catch (error) {
        console.error('Vivus initialization error:', error);
        // フォールバック: アニメーションなしで完了
        if (mountedRef.current) {
          setTimeout(() => {
            if (mountedRef.current) {
              handleAnimationComplete();
            }
          }, 3000);
        }
      }
    };

    initializeVivus();

    return () => {
      mountedRef.current = false;
      cleanupVivus();
    };
  }, [isVisible, cleanupVivus, handleAnimationComplete]);

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      cleanupVivus();
    };
  }, [cleanupVivus]);

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
