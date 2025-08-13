'use client';

import React from 'react';
import { getWeddingEnv } from '@/lib/env';

export default function SafeInformationSection() {
  const weddingEnv = getWeddingEnv();
  
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
          {/* 式場情報 */}
          <div className="space-y-8">
            {/* 挙式 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-akane-100/50">
              <h3 className="text-2xl font-japanese font-bold text-akane-700 mb-6 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-akane-400 to-pink-400 rounded-full mr-3"></span>
                挙式
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <span className="font-medium text-gray-500 w-16 flex-shrink-0">日時</span>
                  <span>{weddingEnv.weddingDateJp}（{weddingEnv.weddingDayJp}）</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-500 w-16 flex-shrink-0">時間</span>
                  <span>{weddingEnv.ceremonyTimeDisplay}より</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-500 w-16 flex-shrink-0">会場</span>
                  <div>
                    <div className="font-medium text-akane-700">{weddingEnv.venueName}</div>
                    <div className="text-sm text-gray-600 mt-1">{weddingEnv.venueAddress}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 披露宴 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-akane-100/50">
              <h3 className="text-2xl font-japanese font-bold text-akane-700 mb-6 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mr-3"></span>
                披露宴
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <span className="font-medium text-gray-500 w-16 flex-shrink-0">時間</span>
                  <span>{weddingEnv.receptionTimeDisplay}より</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-500 w-16 flex-shrink-0">会場</span>
                  <div>
                    <div className="font-medium text-akane-700">{weddingEnv.venueName}</div>
                    <div className="text-sm text-gray-600 mt-1">同会場内</div>
                  </div>
                </div>
              </div>
            </div>

            {/* アクセス情報 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-akane-100/50">
              <h3 className="text-2xl font-japanese font-bold text-akane-700 mb-6 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mr-3"></span>
                アクセス
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <span className="font-medium text-gray-500 w-16 flex-shrink-0">住所</span>
                  <span>{weddingEnv.venueAddress}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-500 w-16 flex-shrink-0">最寄駅</span>
                  <div>
                    <div>JR線・地下鉄各線「表参道駅」徒歩5分</div>
                    <div className="text-sm text-gray-600 mt-1">※詳細なアクセス方法は地図をご確認ください</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-500 w-16 flex-shrink-0">駐車場</span>
                  <span>あり（台数限定）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 地図エリア（Google Mapsなし） */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-akane-100/50">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-japanese font-bold text-akane-700">会場までの地図</h3>
              </div>
              
              {/* 静的マップ表示 */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-6">🗺️</div>
                    <div className="text-lg font-medium text-gray-700 mb-2">会場位置情報</div>
                    <p className="text-sm mb-4">Google Maps 統合は準備中です</p>
                    <div className="bg-white rounded-lg p-4 shadow-sm border max-w-sm mx-auto">
                      <div className="text-left">
                        <div className="font-medium text-akane-700 mb-1">{weddingEnv.venueName}</div>
                        <div className="text-sm text-gray-600">{weddingEnv.venueAddress}</div>
                        <div className="text-xs text-gray-500 mt-2">表参道駅より徒歩5分</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50">
                <div className="flex items-start space-x-3 text-sm text-gray-600">
                  <span className="w-5 h-5 bg-akane-400 rounded-full flex-shrink-0 mt-0.5"></span>
                  <div>
                    <div className="font-medium text-gray-800">{weddingEnv.venueName}</div>
                    <div>{weddingEnv.venueAddress}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* お車でお越しの方 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-japanese font-bold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">🚗</span>
                お車でお越しの方へ
              </h4>
              <div className="text-sm text-blue-700 space-y-2">
                <p>• 駐車場の台数に限りがございます</p>
                <p>• 公共交通機関のご利用をお勧めいたします</p>
                <p>• 周辺にコインパーキングもございます</p>
              </div>
            </div>

            {/* 公共交通機関 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h4 className="font-japanese font-bold text-green-800 mb-3 flex items-center">
                <span className="mr-2">🚇</span>
                公共交通機関でお越しの方へ
              </h4>
              <div className="text-sm text-green-700 space-y-2">
                <p>• 表参道駅A4出口より徒歩5分</p>
                <p>• 青山一丁目駅より徒歩8分</p>
                <p>• 当日は案内スタッフが駅にてご案内いたします</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
