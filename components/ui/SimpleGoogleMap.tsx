'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getVenueInfo } from '@/lib/utils/maps';

interface SimpleGoogleMapProps {
  className?: string;
  height?: string;
  onMapLoad?: (map: google.maps.Map) => void;
  onError?: (error: string) => void;
}

// スクリプトタグで直接Google Maps APIを読み込む方法
const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 既に読み込み済みの場合
    if (window.google?.maps) {
      resolve();
      return;
    }

    // 既にスクリプトタグが存在する場合
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Google Maps script load failed')));
      return;
    }

    // 新しいスクリプトタグを作成
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&language=ja&region=JP`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      console.error('❌ Google Maps script load failed');
      reject(new Error('Google Maps スクリプトの読み込みに失敗しました'));
    };

    document.head.appendChild(script);
  });
};

export default function SimpleGoogleMap({ 
  className = '',
  height = '400px',
  onMapLoad,
  onError 
}: SimpleGoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // API キーの確認
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
          throw new Error('Google Maps API キーが設定されていません');
        }

        // Google Maps スクリプトの読み込み
        await loadGoogleMapsScript(apiKey);

        if (!isMounted || !mapRef.current) return;

        // 式場情報を取得
        const venueInfo = getVenueInfo();

        // 和風スタイル
        const mapStyles = [
          {
            featureType: 'all',
            stylers: [
              { saturation: -20 },
              { lightness: 10 }
            ]
          },
          {
            featureType: 'water',
            stylers: [
              { color: '#e1f5fe' }
            ]
          },
          {
            featureType: 'landscape',
            stylers: [
              { color: '#f8f4f0' }
            ]
          }
        ];

        // マップの初期化
        const map = new google.maps.Map(mapRef.current, {
          center: venueInfo.coordinates,
          zoom: 16,
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: 'cooperative'
        });

        // カスタムマーカー
        const marker = new google.maps.Marker({
          position: venueInfo.coordinates,
          map: map,
          title: venueInfo.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#e65555',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
            scale: 12
          },
          animation: google.maps.Animation.DROP
        });

        // 情報ウィンドウ
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; font-family: 'Noto Sans JP', sans-serif; max-width: 280px;">
              <h3 style="margin: 0 0 8px 0; color: #e65555; font-size: 16px; font-weight: bold;">
                ${venueInfo.name}
              </h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; line-height: 1.4;">
                ${venueInfo.address}
              </p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueInfo.address)}" 
                target="_blank" 
                rel="noopener noreferrer"
                style="color: #e65555; text-decoration: none; font-size: 13px; display: inline-block; margin-top: 4px;"
              >
                📍 ルートを検索 →
              </a>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        mapInstanceRef.current = map;

        if (onMapLoad) {
          onMapLoad(map);
        }

        setIsLoading(false);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'マップの読み込みに失敗しました';
        console.error('❌ Simple Google Map エラー:', err);
        setError(errorMessage);
        setIsLoading(false);
        
        if (onError) {
          onError(errorMessage);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
    };
  }, [onMapLoad, onError]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* マップコンテナ */}
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg bg-gray-100"
      />

      {/* ローディング表示 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-akane-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">Google Maps を読み込み中...</p>
            <p className="text-xs text-gray-400 mt-1">初回読み込みには少し時間がかかります</p>
          </div>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
          <div className="text-center text-gray-500 p-6">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-sm font-medium mb-2 text-red-600">地図を表示できません</p>
            <p className="text-xs text-gray-400 mb-4">{error}</p>
            <div className="text-xs text-gray-400">
              <p className="mb-2">住所: {getVenueInfo().address}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-akane-500 text-white px-3 py-1 rounded text-xs hover:bg-akane-600 transition-colors"
              >
                ページを再読み込み
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Maps で開くボタン */}
      {!isLoading && !error && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => {
              const venueInfo = getVenueInfo();
              const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueInfo.address)}`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="bg-white/90 hover:bg-white text-gray-700 px-3 py-2 rounded-lg shadow-lg text-xs font-medium transition-all duration-200 hover:shadow-xl backdrop-blur-sm"
          >
            📍 Google Maps で開く
          </button>
        </div>
      )}
    </div>
  );
}
