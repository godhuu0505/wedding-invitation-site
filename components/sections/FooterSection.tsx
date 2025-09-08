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
    <footer 
      className="text-white py-20"
      style={{
        background: 'linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Figmaデザインの結婚式情報 */}
          <div>
            <h3 
              className="mb-8"
              style={{
                fontFamily: 'Cinzel, serif',
                fontWeight: '600',
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, #e65555 0%, #BDBCDA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              結婚式
            </h3>
            <div className="space-y-4">
              <p 
                className="flex items-center text-dusty-gray"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: '1rem',
                  color: '#B8B8B8',
                }}
              >
                <span className="mr-3">📅</span>
                {weddingEnv.weddingDateJp}（{weddingEnv.weddingDayJp}）
              </p>
              <p 
                className="flex items-center text-dusty-gray"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: '1rem',
                  color: '#B8B8B8',
                }}
              >
                <span className="mr-3">⏰</span>
                披露宴 {weddingEnv.receptionTimeDisplay}
              </p>
              <p 
                className="flex items-center text-dusty-gray"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: '1rem',
                  color: '#B8B8B8',
                }}
              >
                <span className="mr-3">📍</span>
                {weddingEnv.venueName}
              </p>
            </div>
          </div>

          {/* Figmaデザインのサイトナビゲーション */}
          <div>
            <h3 
              className="mb-8"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '600',
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                letterSpacing: '0.1em',
                color: '#E0E0E0',
              }}
            >
              サイトナビゲーション
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Message', href: '#message' },
                { label: 'Profile', href: '#profile' },
                { label: 'Countdown', href: '#countdown' },
                { label: 'Venue Information', href: '#information' },
                { label: 'RSVP', href: '#rsvp' },
              ].map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(item.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-westar hover:text-akane-300 transition-all duration-300 transform hover:translate-x-1"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '1rem',
                      color: '#9E9E9E',
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Figmaデザインのお問い合わせ */}
          <div>
            <h3 
              className="mb-8"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '600',
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                letterSpacing: '0.1em',
                color: '#E0E0E0',
              }}
            >
              お問い合わせ
            </h3>
            <div className="space-y-6">
              <p 
                className="leading-relaxed"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: '#B8B8B8',
                }}
              >
                ご不明な点やご質問がございましたら、<br />
                お気軽にお声かけください。
              </p>

              {/* LINE公式アカウントリンク */}
              {weddingEnv.lineOfficialUrl && (
                <div className="flex items-center justify-left">
                  <a
                    href={weddingEnv.lineOfficialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #00B900 0%, #00C300 100%)',
                      color: 'white',
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      letterSpacing: '0.05em',
                      boxShadow: '0 4px 15px rgba(0, 185, 0, 0.3)',
                    }}
                  >
                    <span className="mr-2" style={{ fontSize: '1.125rem' }}>📱</span>
                    LINE公式アカウント
                  </a>
                </div>
              )}

              <div className="flex space-x-6">
                <div className="text-center">
                  <div 
                    className="mb-2"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '500',
                      fontSize: '1rem',
                      color: '#e65555',
                    }}
                  >
                    新郎
                  </div>
                  <div 
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '0.875rem',
                      color: '#B8B8B8',
                    }}
                  >
                    {coupleNames.groom.jp}
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="mb-2"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '500',
                      fontSize: '1rem',
                      color: '#BDBCDA',
                    }}
                  >
                    新婦
                  </div>
                  <div 
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '0.875rem',
                      color: '#B8B8B8',
                    }}
                  >
                    {coupleNames.bride.jp}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Figmaデザインの区切り線 */}
        <div 
          className="mt-16 pt-10"
          style={{
            borderTop: '1px solid rgba(158, 158, 158, 0.3)',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Figmaデザインのトップに戻るボタン */}
            <button
              onClick={scrollToTop}
              className="figma-button mb-6 md:mb-0 px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #e65555 0%, #BDBCDA 100%)',
                color: 'white',
                fontFamily: 'Hiragino Kaku Gothic ProN, sans-serif',
                fontWeight: '300',
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                boxShadow: '0 6px 20px rgba(230, 85, 85, 0.3)',
              }}
            >
              ↑ トップに戻る
            </button>

            {/* Figmaデザインのコピーライト */}
            <div 
              className="text-center md:text-right text-westar"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '400',
                fontSize: '0.75rem',
                color: '#9E9E9E',
              }}
            >
              <p>© 2025 {coupleNames.groom.en} & {coupleNames.bride.en} Wedding</p>
              <p className="mt-1">All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Figmaデザインの感謝のメッセージ */}
        <div 
          className="text-center mt-12 pt-10"
          style={{
            borderTop: '1px solid rgba(158, 158, 158, 0.2)',
          }}
        >
          <p 
            className="leading-relaxed mb-6"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              lineHeight: '1.8',
              color: '#B8B8B8',
              fontStyle: 'italic',
            }}
          >
            この度は、私たちの大切な日にお忙しい中<br />
            お時間をいただき、心より感謝申し上げます。
          </p>
          <div className="flex justify-center items-center space-x-3">
            <span 
              style={{
                color: '#e65555',
                fontSize: '1.125rem',
              }}
            >
              ♡
            </span>
            <span 
              style={{
                fontFamily: 'Cinzel, serif',
                fontWeight: '400',
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                color: '#9E9E9E',
              }}
            >
              {coupleNames.groom.en} & {coupleNames.bride.en}
            </span>
            <span 
              style={{
                color: '#BDBCDA',
                fontSize: '1.125rem',
              }}
            >
              ♡
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
