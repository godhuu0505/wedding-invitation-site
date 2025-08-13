'use client';

import React from 'react';

export default function MessageSection() {
  return (
    <section id="message" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* セクションタイトル */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-elegant text-akane-600 mb-4">
            Message
          </h2>
          <div className="w-24 h-px bg-akane-300 mx-auto"></div>
        </div>

        {/* 挨拶文 - reference-site.htmlに完全一致 */}
        <div className="mb-20">
          <div className="bg-akane-50 p-8 md:p-12 rounded-lg shadow-sm">
            <p className="text-base md:text-lg text-gray-800 leading-loose font-japanese text-center">
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

        {/* 新郎新婦紹介 */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* 新郎 */}
          <div className="text-center">
            <div className="mb-6">
              <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-akane-100 to-akane-200 rounded-full flex items-center justify-center">
                <span className="text-4xl text-akane-600">👰‍♂️</span>
              </div>
              <h3 className="text-2xl font-elegant text-akane-600 mb-2">Groom</h3>
              <h4 className="text-3xl font-japanese text-gray-800 mb-1">伊藤 尚人</h4>
              <p className="text-lg text-gray-600">Naoto Ito</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-japanese">
                1995年3月1日　東京都生まれ<br />
                A型　会社員<br />
                アウトドアが好きで<br />
                週末は少し遠くまで出かけます<br />
                犬が大好きです<br /><br />
                
                美味しい料理・お酒を用意してお待ちしております<br />
                当日皆様にお会いできることを<br />
                心より楽しみにしております
              </p>
            </div>
          </div>

          {/* 新婦 */}
          <div className="text-center">
            <div className="mb-6">
              <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-akane-100 to-akane-200 rounded-full flex items-center justify-center">
                <span className="text-4xl text-akane-600">👰‍♀️</span>
              </div>
              <h3 className="text-2xl font-elegant text-akane-600 mb-2">Bride</h3>
              <h4 className="text-3xl font-japanese text-gray-800 mb-1">小林 結衣</h4>
              <p className="text-lg text-gray-600">Yui Kobayashi</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-japanese">
                1995年6月5日　東京都生まれ<br />
                B型　保育士<br />
                子どもと猫が大好きです<br />
                週末は美味しいご飯を食べに出かけます<br /><br />
                
                たくさん食べてたくさん飲んで<br />
                楽しい時間にしたいと思っています<br />
                当日皆様にお会いできることを<br />
                心より楽しみにしております
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
