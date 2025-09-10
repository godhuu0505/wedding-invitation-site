'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getWeddingEnv } from '@/lib/env';

/**
 * RSVP送信完了ページ
 * 
 * RSVP送信が正常に完了した際に表示されるページです。
 * reference-site.htmlのデザインに準拠したレイアウトで、
 * 送信完了のメッセージと必要に応じてゲスト情報を表示します。
 */

export default function RSVPThankYouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const weddingEnv = getWeddingEnv();

  // URLパラメータからゲスト情報を取得（オプション）
  const guestName = searchParams.get('name');
  const status = searchParams.get('status'); // "1" (出席) or "2" (欠席)

  const handleBackToForm = () => {
    // セッションストレージにローディングスキップフラグを設定（フォームに戻る場合も）
    sessionStorage.setItem('wedding-skip-loading', 'true');
    router.push('/#rsvp');
  };

  const handleBackToTop = () => {
    // セッションストレージにローディングスキップフラグを設定
    sessionStorage.setItem('wedding-skip-loading', 'true');
    router.push('/');
  };

  return (
    <div className="min-h-screen py-24 bg-old-lace relative">
      {/* Figmaデザインの背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-ecru-white/30 to-old-lace"></div>
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* 成功アイコン */}
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #34A853 0%, #4285F4 100%)',
            }}
          >
            <span className="text-white text-6xl">✓</span>
          </div>
          
          {/* 成功メッセージ */}
          <h1 
            className="text-mine-shaft mb-10"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            Thank You
          </h1>
          
          <h2 
            className="text-akane-500 mb-8"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '500',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              letterSpacing: '0.1em',
              color: '#e65555',
            }}
          >
            ありがとうございました
          </h2>

          {/* ゲスト名表示（パラメータがある場合） */}
          {guestName && (
            <p 
              className="text-tundora mb-6"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '500',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                letterSpacing: '0.05em',
                color: '#4D4D4D',
              }}
            >
              {guestName} 様
            </p>
          )}

          {/* 出欠状況に応じたメッセージ */}
          <div className="mb-12">
            {status === '1' ? (
              <p 
                className="text-dusty-gray leading-relaxed max-w-3xl mx-auto"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  lineHeight: '2',
                  letterSpacing: '0.02em',
                  color: '#999999',
                }}
              >
                ご出席のお返事をいただき<br />
                誠にありがとうございます<br />
                <br />
                結婚式でお会いできることを<br />
                心より楽しみにしております<br />
                <br />
                当日はどうぞ<br />
                よろしくお願いいたします
              </p>
            ) : status === '2' ? (
              <p 
                className="text-dusty-gray leading-relaxed max-w-3xl mx-auto"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  lineHeight: '2',
                  letterSpacing: '0.02em',
                  color: '#999999',
                }}
              >
                ご連絡をいただき<br />
                誠にありがとうございます<br />
                <br />
                お忙しい中でお時間を割いて<br />
                お返事をいただき<br />
                ありがとうございました<br />
                <br />
                またの機会に<br />
                お会いできることを<br />
                楽しみにしております
              </p>
            ) : (
              <p 
                className="text-dusty-gray leading-relaxed max-w-3xl mx-auto"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  lineHeight: '2',
                  letterSpacing: '0.02em',
                  color: '#999999',
                }}
              >
                出欠のご連絡をいただき<br />
                誠にありがとうございます<br />
                <br />
                皆様からのお返事を<br />
                心よりお待ちしております<br />
                <br />
                当日にお会いできることを<br />
                楽しみにしております
              </p>
            )}
          </div>
          
          {/* 追加メッセージ */}
          <p 
            className="text-tundora mb-12 leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              color: '#4D4D4D',
            }}
          >
            ご不明な点やご質問がございましたら<br />
            お気軽にお声がけください
          </p>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleBackToTop}
              className="inline-flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900"
              style={{
                backgroundColor: '#711207',
                borderRadius: '3.04px',
                padding: '7px 13px',
                minHeight: '90px',
                minWidth: '236px',
                opacity: 0.65,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.65';
              }}
            >
              <div className="flex flex-col items-center justify-center text-white">
                <span 
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '500',
                    fontSize: '1.125rem',
                    color: '#FFFFFF',
                    marginBottom: '4px',
                    letterSpacing: '0.1em',
                  }}
                >
                  トップページへ
                </span>
              </div>
            </button>
          </div>

          {/* 装飾要素 */}
          <div className="mt-16">
            <div className="flex items-center justify-center">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"></div>
              <div className="w-3 h-3 bg-akane-500 rounded-full mx-6 shadow-sm"></div>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
