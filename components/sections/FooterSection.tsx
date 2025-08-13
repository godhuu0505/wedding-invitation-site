'use client';

import React from 'react';
import { getCoupleNames, getWeddingEnv } from '@/lib/env';

export default function FooterSection() {
  const coupleNames = getCoupleNames();
  const weddingEnv = getWeddingEnv();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* 結婚式情報 */}
          <div>
            <h3 className="text-2xl font-japanese font-bold mb-6 bg-gradient-to-r from-akane-300 to-pink-300 bg-clip-text text-transparent">
              {coupleNames.combined.shortEn}
            </h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center">
                <span className="mr-3">📅</span>
                {weddingEnv.weddingDateJp}（{weddingEnv.weddingDayJp}）
              </p>
              <p className="flex items-center">
                <span className="mr-3">⏰</span>
                挙式 {weddingEnv.ceremonyTimeDisplay} / 披露宴 {weddingEnv.receptionTimeDisplay}
              </p>
              <p className="flex items-center">
                <span className="mr-3">📍</span>
                {weddingEnv.venueName}
              </p>
            </div>
          </div>

          {/* サイトナビゲーション */}
          <div>
            <h3 className="text-xl font-japanese font-bold mb-6 text-gray-200">
              サイトナビゲーション
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'ホーム', href: '#home' },
                { label: 'メッセージ', href: '#message' },
                { label: 'カウントダウン', href: '#countdown' },
                { label: '式場案内', href: '#information' },
                { label: '出欠確認', href: '#rsvp' },
              ].map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(item.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-akane-300 transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="text-xl font-japanese font-bold mb-6 text-gray-200">
              お問い合わせ
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                ご不明な点やご質問がございましたら、<br />
                お気軽にお声かけください。
              </p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="font-medium text-akane-300">新郎</div>
                  <div className="text-sm">{coupleNames.groom.jp}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-pink-300">新婦</div>
                  <div className="text-sm">{coupleNames.bride.jp}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* トップに戻るボタン */}
            <button
              onClick={scrollToTop}
              className="mb-4 md:mb-0 bg-gradient-to-r from-akane-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-akane-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              ↑ トップに戻る
            </button>

            {/* コピーライト */}
            <div className="text-center md:text-right text-gray-400 text-sm">
              <p>© 2025 {coupleNames.groom.fullJp} & {coupleNames.bride.fullJp} Wedding</p>
              <p className="mt-1">All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* 感謝のメッセージ */}
        <div className="text-center mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-300 italic">
            この度は、私たちの大切な日にお忙しい中<br />
            お時間をいただき、心より感謝申し上げます。
          </p>
          <div className="flex justify-center items-center mt-4 space-x-2">
            <span className="text-akane-300">♡</span>
            <span className="text-gray-400 text-sm">
              {coupleNames.groom.en} & {coupleNames.bride.en}
            </span>
            <span className="text-pink-300">♡</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
