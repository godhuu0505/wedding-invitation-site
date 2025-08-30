'use client';

import React from 'react';
import { getWeddingEnv } from '@/lib/env';
import SimpleGoogleMap from '@/components/ui/SimpleGoogleMap';

export default function InformationSection() {
  const weddingEnv = getWeddingEnv();
  const [mapError, setMapError] = React.useState<string | null>(null);
  
  const handleMapError = React.useCallback((error: string) => {
    console.error('InformationSection - Map Error:', error);
    setMapError(error);
  }, []);

  const handleMapLoad = React.useCallback((map: google.maps.Map) => {
    setMapError(null);
  }, []);
  
  return (
    <section id="information" className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-akane-50/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* セクションタイトル */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-japanese font-bold text-gray-800 mb-6">
            式場案内
            <span className="block text-lg md:text-xl font-normal text-gray-600 mt-2">
              Venue Information
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-akane-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 会場情報・地図エリア */}
          <div className="space-y-6">
            {/* 会場情報と地図統合カード */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-akane-100/50">
              {/* 会場基本情報 */}
              <div className="p-8 pb-0 bg-gray-50">
                <h3 className="text-2xl font-japanese font-bold text-gray-600 mb-6 flex items-center">
                  <img 
                    src="/images/crane_icon.png" 
                    alt="鶴アイコン" 
                    className="h-6"
                  />
                  会場情報
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <span className="font-medium text-gray-500 w-16 flex-shrink-0">会場名</span>
                    <span className="text-lg font-semibold text-akane-700">{weddingEnv.venueName}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium text-gray-500 w-16 flex-shrink-0">住所</span>
                    <span>{weddingEnv.venueAddress}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium text-gray-500 w-16 flex-shrink-0">URL</span>
                    <a 
                      href={weddingEnv.venueWebSite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                    >
                      会場の公式サイトはこちら
                    </a>
                  </div>
                </div>
              </div>
              
              {/* 地図セクション */}
              <div>
                <div className="p-6 pb-0">
                  <h4 className="text-xl font-japanese font-bold text-akane-700 mb-4">会場までの地図</h4>
                </div>
                
                {/* Google Maps */}
                <div className="relative">
                  <SimpleGoogleMap
                    className="w-full"
                    height="384px"
                    onMapLoad={handleMapLoad}
                    onError={handleMapError}
                  />
                </div>
                
                <div className="p-6 bg-gray-50">
                  <p className="text-sm text-gray-600">
                    地図上のマーカーをクリックすると詳細情報を確認できます
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 式場情報 */}
          <div className="space-y-8">
            {/* アクセス情報 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-akane-100/50">
              <h3 className="text-2xl font-japanese font-bold text-gray-600 mb-6 flex items-center">
                <img 
                  src="/images/crane_icon.png" 
                  alt="鶴アイコン" 
                  className="h-6"
                />
                アクセス
              </h3>
              <div className="space-y-6 text-gray-700">
                {/* 電車の場合 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    電車の場合
                  </h4>
                  <p className="mb-3 text-sm">最寄り駅は下記3駅になります。</p>
                  <ul className="space-y-2 text-sm leading-relaxed">
                    <li>・JR中央・総武線　【信濃町駅】下車、徒歩3分</li>
                    <li>・地下鉄 銀座線・半蔵門線・大江戸線<br />
                        　【青山一丁目駅】下車（2番出口）、徒歩6分</li>
                    <li>・地下鉄 大江戸線<br />
                        　【国立競技場駅】下車（A1出口）、徒歩6分</li>
                  </ul>
                </div>

                {/* お車の場合 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    お車の場合
                  </h4>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>首都高速4号線　外苑出口をご利用ください。<br />
                       上り線、下り線で出口が異なりますのでご注意ください。</p>
                    <p>館内施設ご利用者用無料駐車場（97台）がございます。その他、一部エリアは事前予約制有料駐車場としております。</p>
                    <p className="text-akane-600 font-medium">※土日祝日は大変混雑いたしますので、できるだけ公共交通機関をご利用くださいませ。</p>
                  </div>
                </div>

                {/* バスの場合 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    バスの場合
                  </h4>
                  <p className="text-sm leading-relaxed">
                    都バス　品川車庫前〜新宿駅西口（品97）<br />
                    【権田原】下車徒歩1分
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
