// Google Maps APIのテスト用ページ
'use client';

import React from 'react';
import SimpleGoogleMap from '@/components/ui/SimpleGoogleMap';
import { getWeddingEnv } from '@/lib/env';

export default function TestPage() {
  const weddingEnv = getWeddingEnv();
  
  const handleMapLoad = (map: google.maps.Map) => {
    console.log('✅ Google Map loaded successfully!', map);
    alert('Google Maps正常に読み込まれました！');
  };

  const handleMapError = (error: string) => {
    console.error('❌ Google Map error:', error);
    alert(`Google Mapsエラー: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Google Maps API テスト
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            📍 式場情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>式場名:</strong> {weddingEnv.venueName}
            </div>
            <div>
              <strong>住所:</strong> {weddingEnv.venueAddress}
            </div>
            <div>
              <strong>緯度:</strong> {process.env.NEXT_PUBLIC_VENUE_LAT}
            </div>
            <div>
              <strong>経度:</strong> {process.env.NEXT_PUBLIC_VENUE_LNG}
            </div>
            <div>
              <strong>API Key:</strong> {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? '設定済み' : '未設定'}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              Google Maps テスト
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              下記にGoogle Mapsが表示されれば、実装は正常です。
            </p>
          </div>
          
          <div className="p-6">
            <SimpleGoogleMap
              className="w-full border border-gray-200"
              height="400px"
              onMapLoad={handleMapLoad}
              onError={handleMapError}
            />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            🔧 トラブルシューティング
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• ブラウザのコンソール（F12）でエラーログを確認</li>
            <li>• Google Cloud Console で Maps JavaScript API が有効になっているか確認</li>
            <li>• APIキーの制限設定で localhost が許可されているか確認</li>
            <li>• 請求先アカウントが設定されているか確認</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
