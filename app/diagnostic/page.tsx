// Google Maps API 設定診断ページ
'use client';

import React, { useEffect, useState } from 'react';

export default function DiagnosticPage() {
  const [diagnostics, setDiagnostics] = useState({
    apiKey: '',
    venueInfo: {
      name: '',
      address: '',
      lat: '',
      lng: ''
    },
    tests: {
      apiKeyExists: false,
      scriptsLoaded: false,
      googleMapsAvailable: false,
      venueDataComplete: false
    }
  });

  useEffect(() => {
    // 環境変数の確認
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const venueName = process.env.NEXT_PUBLIC_VENUE_NAME || '';
    const venueAddress = process.env.NEXT_PUBLIC_VENUE_ADDRESS || '';
    const venueLat = process.env.NEXT_PUBLIC_VENUE_LAT || '';
    const venueLng = process.env.NEXT_PUBLIC_VENUE_LNG || '';

    setDiagnostics({
      apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : '未設定',
      venueInfo: {
        name: venueName,
        address: venueAddress,
        lat: venueLat,
        lng: venueLng
      },
      tests: {
        apiKeyExists: !!apiKey,
        scriptsLoaded: !!document.querySelector('script[src*="maps.googleapis.com"]'),
        googleMapsAvailable: !!(window as any).google?.maps,
        venueDataComplete: !!(venueName && venueAddress && venueLat && venueLng)
      }
    });
  }, []);

  const getStatusIcon = (status: boolean) => status ? '✅' : '❌';
  const getStatusColor = (status: boolean) => status ? 'text-green-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🔍 Google Maps API 診断
        </h1>
        
        {/* API キー情報 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            🔑 API キー情報
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">API キー設定</span>
              <span className={`flex items-center ${getStatusColor(diagnostics.tests.apiKeyExists)}`}>
                {getStatusIcon(diagnostics.tests.apiKeyExists)}
                <span className="ml-2">{diagnostics.apiKey}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 式場情報 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            📍 式場情報
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium text-gray-600">式場名</div>
                <div className="text-sm">{diagnostics.venueInfo.name || '未設定'}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium text-gray-600">住所</div>
                <div className="text-sm">{diagnostics.venueInfo.address || '未設定'}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium text-gray-600">緯度</div>
                <div className="text-sm">{diagnostics.venueInfo.lat || '未設定'}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium text-gray-600">経度</div>
                <div className="text-sm">{diagnostics.venueInfo.lng || '未設定'}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">式場データ完整性</span>
              <span className={`flex items-center ${getStatusColor(diagnostics.tests.venueDataComplete)}`}>
                {getStatusIcon(diagnostics.tests.venueDataComplete)}
                <span className="ml-2">{diagnostics.tests.venueDataComplete ? '完了' : '不完全'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* システムテスト */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            🧪 システムテスト
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Google Maps スクリプト読み込み</span>
              <span className={`flex items-center ${getStatusColor(diagnostics.tests.scriptsLoaded)}`}>
                {getStatusIcon(diagnostics.tests.scriptsLoaded)}
                <span className="ml-2">{diagnostics.tests.scriptsLoaded ? '読み込み済み' : '未読み込み'}</span>
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">Google Maps API 利用可能</span>
              <span className={`flex items-center ${getStatusColor(diagnostics.tests.googleMapsAvailable)}`}>
                {getStatusIcon(diagnostics.tests.googleMapsAvailable)}
                <span className="ml-2">{diagnostics.tests.googleMapsAvailable ? '利用可能' : '利用不可'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Google Cloud Console 設定ガイド */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            🔧 Google Cloud Console 設定確認
          </h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p><strong>1. Google Cloud Console にアクセス:</strong></p>
            <p className="ml-4">
              <a 
                href="https://console.cloud.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                https://console.cloud.google.com/
              </a>
            </p>
            
            <p><strong>2. Maps JavaScript API の有効化:</strong></p>
            <p className="ml-4">APIとサービス → ライブラリ → "Maps JavaScript API" を検索して有効化</p>
            
            <p><strong>3. APIキーの作成・設定:</strong></p>
            <p className="ml-4">APIとサービス → 認証情報 → 認証情報を作成 → APIキー</p>
            
            <p><strong>4. APIキーの制限設定:</strong></p>
            <div className="ml-4 space-y-1">
              <p>• API制限: Maps JavaScript API のみ選択</p>
              <p>• ウェブサイトの制限: 以下を追加</p>
              <div className="ml-4 bg-white p-2 rounded font-mono text-xs">
                <p>localhost:*</p>
                <p>127.0.0.1:*</p>
                <p>*.vercel.app/*</p>
                <p>*.netlify.app/*</p>
              </div>
            </div>
            
            <p><strong>5. 請求先アカウントの設定:</strong></p>
            <p className="ml-4">請求 → 請求先アカウント → クレジットカード情報を登録</p>
          </div>
        </div>

        {/* テストボタン */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            🧪 手動テスト
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-3"
            >
              🔄 ページ再読み込み
            </button>
            <button
              onClick={() => {
                if (diagnostics.venueInfo.address) {
                  const url = `https://www.google.com/maps/search/${encodeURIComponent(diagnostics.venueInfo.address)}`;
                  window.open(url, '_blank');
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mr-3"
            >
              🗺️ Google Maps で式場を確認
            </button>
            <a
              href="/test-maps"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors inline-block"
            >
              📊 Google Maps テストページ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
