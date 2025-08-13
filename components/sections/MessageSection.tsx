'use client';

import React from 'react';
import { getWeddingEnv } from '@/lib/env';

export default function MessageSection() {
  // 環境変数から情報を取得
  const weddingEnv = getWeddingEnv();
  return (
    <section id="message" className="py-20 bg-white relative">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-gradient-to-b from-akane-50/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* セクションタイトル - reference-site.html風 */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-elegant text-akane-600 mb-6">
            Message
          </h2>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-px bg-akane-300"></div>
            <div className="w-2 h-2 bg-akane-400 rounded-full mx-4"></div>
            <div className="w-16 h-px bg-akane-300"></div>
          </div>
          <p className="text-lg text-gray-600 font-japanese">メッセージ</p>
        </div>

        {/* 挨拶文 - reference-site.htmlと完全一致 */}
        <div className="mb-24">
          <div className="max-w-3xl mx-auto bg-white p-12 md:p-16 rounded-2xl shadow-lg border border-akane-100">
            <p className="text-lg md:text-xl text-gray-800 leading-loose font-japanese text-center">
              皆様にはご健勝のことと<br />
              お慶び申し上げます<br />
              このたび　私たちは<br />
              結婚式を挙げることになりました<br />
              つきましては　親しい皆様の末永い<br />
              お力添えをいただきたく<br />
              心ばかりの小宴をもうけたいと存じます<br />
              おいそがしい中と存じますが<br />
              ご列席くださいますよう<br />
              お願い申し上げます
            </p>
          </div>
        </div>

        {/* 新郎新婦紹介 - より洗練されたデザイン */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* 新郎 */}
          <div className="text-center group">
            <div className="mb-8">
              {/* プロフィール写真エリア */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-akane-100 via-akane-200 to-akane-300 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <span className="text-6xl text-akane-600">👰‍♂️</span>
                </div>
                {/* 装飾リング */}
                <div className="absolute inset-0 rounded-full border-4 border-akane-200 transform scale-110 opacity-50"></div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-3xl font-elegant text-akane-600 mb-3">Groom</h3>
                <h4 className="text-4xl font-japanese text-gray-800 mb-2">{weddingEnv.groomNameFullJp}</h4>
                <p className="text-xl text-gray-600 font-elegant">{weddingEnv.groomNameEn}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-md">
              <p 
                className="text-base md:text-lg text-gray-700 leading-relaxed font-japanese"
                style={{ whiteSpace: 'pre-line' }}
              >
                {weddingEnv.groomBirthDate}　{weddingEnv.groomBirthPlace}生まれ{'\n'}
                {weddingEnv.groomBloodType}　{weddingEnv.groomOccupation}{'\n'}
                {weddingEnv.groomHobby}{'\n\n'}
                
                {weddingEnv.groomMessage}
              </p>
            </div>
          </div>

          {/* 新婦 */}
          <div className="text-center group">
            <div className="mb-8">
              {/* プロフィール写真エリア */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-akane-100 via-akane-200 to-akane-300 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <span className="text-6xl text-akane-600">👰‍♀️</span>
                </div>
                {/* 装飾リング */}
                <div className="absolute inset-0 rounded-full border-4 border-akane-200 transform scale-110 opacity-50"></div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-3xl font-elegant text-akane-600 mb-3">Bride</h3>
                <h4 className="text-4xl font-japanese text-gray-800 mb-2">{weddingEnv.brideNameFullJp}</h4>
                <p className="text-xl text-gray-600 font-elegant">{weddingEnv.brideNameEn}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-md">
              <p 
                className="text-base md:text-lg text-gray-700 leading-relaxed font-japanese"
                style={{ whiteSpace: 'pre-line' }}
              >
                {weddingEnv.brideBirthDate}　{weddingEnv.brideBirthPlace}生まれ{'\n'}
                {weddingEnv.brideBloodType}　{weddingEnv.brideOccupation}{'\n'}
                {weddingEnv.brideHobby}{'\n\n'}
                
                {weddingEnv.brideMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
