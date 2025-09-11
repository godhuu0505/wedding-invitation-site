'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getWeddingEnv } from '@/lib/env';

/**
 * RSVP送信完了ページ
 * 
 * RSVP送信が正常に完了した際に表示されるページです。
 * reference-site.htmlのデザインに準拠したレイアウトで、
 * 送信完了のメッセージと必要に応じてゲスト情報を表示します。
 */

// SearchParamsを使用する内部コンポーネント
function RSVPThankYouContent() {
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
              <div>
                <p 
                  className="text-dusty-gray leading-relaxed max-w-3xl mx-auto mb-12"
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

                {/* 公式LINE案内（出席の場合のみ） */}
                {weddingEnv.lineOfficialUrl && (
                  <div className="max-w-3xl mx-auto">
                    {/* 区切り線 */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"></div>
                      <div className="w-3 h-3 bg-akane-500 rounded-full mx-6 shadow-sm"></div>
                      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"></div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg border border-green-200">
                      <div className="text-center mb-6">
                        <div className="mb-4 flex justify-center">
                          <img 
                            src="/images/line.png" 
                            alt="LINE" 
                            style={{ width: '48px', height: '48px' }}
                          />
                        </div>
                        <h3 
                          className="text-green-700 mb-4"
                          style={{
                            fontFamily: 'Noto Serif JP, serif',
                            fontWeight: '600',
                            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                            letterSpacing: '0.1em',
                          }}
                        >
                          田中家・與口家WEDDING
                        </h3>
                        <p 
                          className="text-green-600 leading-relaxed"
                          style={{
                            fontFamily: 'Noto Serif JP, serif',
                            fontWeight: '400',
                            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                            lineHeight: '1.8',
                            letterSpacing: '0.02em',
                          }}
                        >
                          結婚式に向けて<br />
                          専用LINEを用意しました<br />
                          最新情報や当日座席など<br />
                          今後も配信予定です<br />
                          <br />
                          ぜひ友だち追加して<br />
                          ご案内メッセージをお待ちください！
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <a
                          href={weddingEnv.lineOfficialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          style={{
                            background: 'linear-gradient(135deg, #00B900 0%, #00C300 100%)',
                            color: 'white',
                            fontFamily: 'Noto Serif JP, serif',
                            fontWeight: '500',
                            fontSize: '1.125rem',
                            letterSpacing: '0.05em',
                            boxShadow: '0 8px 25px rgba(0, 185, 0, 0.3)',
                          }}
                        >
                          <img 
                            src="/images/add-friend.png" 
                            alt="LINE友だち追加"
                            className="mr-3"
                            style={{ width: '40px', height: '40px', opacity: 0.8 }}
                          />
                          友だち追加する
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

// ローディング用のフォールバックコンポーネント
function LoadingFallback() {
  return (
    <div className="min-h-screen py-24 bg-old-lace relative flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-akane-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-tundora" style={{ fontFamily: 'Noto Serif JP, serif' }}>
          読み込み中...
        </p>
      </div>
    </div>
  );
}

// メインのページコンポーネント
export default function RSVPThankYouPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RSVPThankYouContent />
    </Suspense>
  );
}
