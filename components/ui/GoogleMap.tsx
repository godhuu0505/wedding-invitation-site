'use client';

import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps, getVenueInfo } from '@/lib/utils/maps';

// Window インターフェースを拡張してGoogle Maps API関数を追加
declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

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

    // Google Maps API エラーの全体リスナーを設定
    const originalGoogleError = window.gm_authFailure;
    window.gm_authFailure = () => {
      console.error('Google Maps API authentication failed');
      setError('Google Maps API の認証に失敗しました。API キーとドメイン設定を確認してください。');
      setIsLoading(false);
      if (originalGoogleError) originalGoogleError();
    };

    const initializeMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Google Maps API キーの確認
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          throw new Error('Google Maps API キーが設定されていません。.env.local ファイルに NEXT_PUBLIC_GOOGLE_MAPS_API_KEY を設定してください。');
        }

        // Google Maps API の読み込み
        const google = await loadGoogleMaps();
        
        if (!isMounted || !mapRef.current) return;

        // 式場情報を取得
        const venueInfo = getVenueInfo();

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

        if (onMapLoad) {
          onMapLoad(map);
        }

        setIsLoading(false);

      } catch (err) {
        let errorMessage = 'マップの読み込みに失敗しました';
        let detailedSteps: string[] = [];
        
        // Google Maps API エラーの詳細判定
        if (err instanceof Error) {
          if (err.message.includes('RefererNotAllowedMapError') || 
              window.location.href.includes('RefererNotAllowedMapError')) {
            errorMessage = 'Google Maps API のドメイン設定が必要です';
            detailedSteps = [
              '1. Google Cloud Console (console.cloud.google.com) にアクセス',
              '2. 「APIとサービス」→ 「認証情報」を選択',
              '3. Maps JavaScript API キーを選択',
              '4. 「HTTPリファラー（ウェブサイト）」制限を選択',
              '5. 「項目を追加」で "http://localhost:3001/*" を追加',
              '6. 保存後、ページを再読み込み'
            ];
          } else if (err.message.includes('ApiNotActivatedMapError')) {
            errorMessage = 'Google Maps API が有効化されていません';
            detailedSteps = [
              '1. Google Cloud Console にアクセス',
              '2. 「APIとサービス」→ 「ライブラリ」を選択',
              '3. "Maps JavaScript API" を検索',
              '4. 「有効にする」をクリック'
            ];
          } else if (err.message.includes('InvalidKeyMapError')) {
            errorMessage = 'Google Maps API キーが無効です';
            detailedSteps = [
              '1. .env.local ファイルを確認',
              '2. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY の値を確認',
              '3. Google Cloud Console で正しいAPIキーを取得',
              '4. アプリケーションを再起動'
            ];
          } else {
            errorMessage = err.message;
          }
        }
        
        console.error('Google Map initialization error:', err);
        console.error('Current URL:', window.location.href);
        console.error('Error details:', {
          message: errorMessage,
          steps: detailedSteps,
          timestamp: new Date().toISOString()
        });
        
        // エラー情報をローカルストレージに保存（デバッグ用）
        try {
          localStorage.setItem('googleMapsError', JSON.stringify({
            error: errorMessage,
            details: err instanceof Error ? err.message : 'Unknown error',
            steps: detailedSteps,
            url: window.location.href,
            timestamp: new Date().toISOString()
          }));
        } catch (storageError) {
          console.warn('Could not save error to localStorage:', storageError);
        }
        
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
        className="w-full h-full rounded-lg gradient-background"
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
          <div className="text-center text-gray-600 p-6 max-w-md">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-sm font-medium mb-3 text-gray-800">地図を表示できません</p>
            <div className="bg-white/70 rounded-lg p-4 mb-4 text-xs text-left">
              <p className="font-medium text-gray-700 mb-2">エラー詳細:</p>
              <p className="text-gray-600 mb-3">{error}</p>
              
              {error.includes('ドメイン設定') && (
                <div className="text-gray-500 space-y-1">
                  <p className="font-medium text-gray-700">📋 解決手順:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Google Cloud Console にアクセス</li>
                    <li>「APIとサービス」→「認証情報」を選択</li>
                    <li>Maps JavaScript API キーを選択</li>
                    <li>「HTTPリファラー制限」を設定</li>
                    <li>以下を追加:</li>
                  </ol>
                  <code className="block bg-gray-100 px-2 py-1 rounded text-xs mt-1">
                    http://localhost:3001/*
                  </code>
                  <p className="text-xs text-gray-400 mt-2">💡 設定後、ページを再読み込みしてください</p>
                </div>
              )}
              
              {error.includes('API が有効化') && (
                <div className="text-gray-500 space-y-1">
                  <p className="font-medium text-gray-700">📋 解決手順:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Google Cloud Console にアクセス</li>
                    <li>「APIとサービス」→「ライブラリ」</li>
                    <li>"Maps JavaScript API" を検索</li>
                    <li>「有効にする」をクリック</li>
                  </ol>
                </div>
              )}
              
              {error.includes('キーが無効') && (
                <div className="text-gray-500 space-y-1">
                  <p className="font-medium text-gray-700">📋 解決手順:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>.env.local ファイルを確認</li>
                    <li>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY を確認</li>
                    <li>Google Cloud Console で新しいキーを生成</li>
                    <li>アプリケーションを再起動</li>
                  </ol>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium">式場情報:</p>
              <p>{getVenueInfo().name}</p>
              <p>{getVenueInfo().address}</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getVenueInfo().address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-akane-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-akane-600 transition-colors"
              >
                📍 Google Maps で検索
              </a>
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
