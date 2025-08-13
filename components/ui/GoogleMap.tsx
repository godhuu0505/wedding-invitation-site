'use client';

import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps, getVenueInfo } from '@/lib/utils/maps';

interface GoogleMapProps {
  className?: string;
  height?: string;
  onMapLoad?: (map: google.maps.Map) => void;
  onError?: (error: string) => void;
}

export default function GoogleMap({ 
  className = '',
  height = '400px',
  onMapLoad,
  onError 
}: GoogleMapProps) {
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

        // Google Maps API キーの確認
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        console.log('Google Maps API Key:', apiKey ? '設定済み' : '未設定');
        if (!apiKey) {
          throw new Error('Google Maps API キーが設定されていません');
        }

        // Google Maps API の読み込み
        console.log('Google Maps API を読み込み中...');
        const google = await loadGoogleMaps();
        console.log('Google Maps API 読み込み完了:', google);
        
        if (!isMounted || !mapRef.current) return;

        // 式場情報を取得
        const venueInfo = getVenueInfo();
        console.log('式場情報:', venueInfo);

        // 和風に合わせたマップスタイル
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
              { color: '#e1f5fe' },
              { lightness: 10 }
            ]
          },
          {
            featureType: 'landscape',
            stylers: [
              { color: '#f8f4f0' },
              { lightness: 20 }
            ]
          },
          {
            featureType: 'road',
            stylers: [
              { color: '#ffffff' },
              { lightness: 0 }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
              { visibility: 'simplified' },
              { color: '#8d6e63' }
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

        // カスタムマーカーアイコン
        const markerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#e65555', // 茜色
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 12
        };

        // マーカーの追加
        const marker = new google.maps.Marker({
          position: venueInfo.coordinates,
          map: map,
          title: venueInfo.name,
          icon: markerIcon,
          animation: google.maps.Animation.DROP
        });

        // 情報ウィンドウ
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: 'Noto Sans JP', sans-serif; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #e65555; font-size: 16px; font-weight: bold;">
                ${venueInfo.name}
              </h3>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.4;">
                ${venueInfo.address}
              </p>
              <div style="margin-top: 8px;">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueInfo.address)}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style="color: #e65555; text-decoration: none; font-size: 13px;"
                >
                  📍 ルートを検索
                </a>
              </div>
            </div>
          `
        });

        // マーカークリックで情報ウィンドウを表示
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        mapInstanceRef.current = map;
        console.log('Google Map初期化完了:', map);

        if (onMapLoad) {
          onMapLoad(map);
        }

        setIsLoading(false);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'マップの読み込みに失敗しました';
        console.error('Google Map initialization error:', err);
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
        className="w-full h-full rounded-lg"
        style={{ 
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
        }}
      />

      {/* ローディング表示 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-akane-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">地図を読み込み中...</p>
          </div>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
          <div className="text-center text-gray-500 p-6">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-sm font-medium mb-2">地図を表示できません</p>
            <p className="text-xs text-gray-400 mb-4">{error}</p>
            <div className="text-xs text-gray-400">
              <p>住所: {getVenueInfo().address}</p>
            </div>
          </div>
        </div>
      )}

      {/* 外部リンクボタン */}
      {!isLoading && !error && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => {
              const venueInfo = getVenueInfo();
              const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueInfo.address)}`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="bg-white/90 hover:bg-white text-gray-700 px-3 py-2 rounded-lg shadow-lg text-xs font-medium transition-all duration-200 hover:shadow-xl"
          >
            📍 Google Maps で開く
          </button>
        </div>
      )}
    </div>
  );
}
