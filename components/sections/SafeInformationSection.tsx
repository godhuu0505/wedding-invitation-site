'use client';

import React from 'react';
import { getWeddingEnv } from '@/lib/env';

export default function SafeInformationSection() {
  const weddingEnv = getWeddingEnv();
  
  return (
    <section id="information" className="min-h-screen py-24 bg-ecru-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Figmaデザインのセクションタイトル */}
        <div className="text-center mb-20">
          <h2 
            className="text-mine-shaft mb-8"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            Venue Information
          </h2>
          
          {/* Figmaデザインの装飾線 */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"></div>
            <div className="w-3 h-3 bg-akane-500 rounded-full mx-6 shadow-sm"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"></div>
          </div>
          
          <p 
            className="text-tundora mb-4"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              letterSpacing: '0.1em',
              color: '#4D4D4D',
            }}
          >
            式場案内
          </p>
          
          <p 
            className="text-dusty-gray max-w-3xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              color: '#999999',
            }}
          >
            挙式・披露宴会場のご案内です。<br />
            皆様のお越しを心よりお待ちしております。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Figmaデザインの式場情報 */}
          <div className="space-y-8">
            {/* 挙式 */}
            <div 
              className="figma-card p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(230, 85, 85, 0.1)',
              }}
            >
              <h3 
                className="text-akane-600 mb-6 flex items-center"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '600',
                  fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                  letterSpacing: '0.1em',
                }}
              >
                <span className="w-3 h-3 bg-gradient-to-r from-akane-400 to-pink-400 rounded-full mr-4 shadow-sm"></span>
                挙式
              </h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <span 
                    className="text-westar w-20 flex-shrink-0"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '11.7px',
                      lineHeight: '17.49px',
                      color: '#9E9E9E',
                    }}
                  >
                    日時
                  </span>
                  <span 
                    className="text-tundora"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '1rem',
                      letterSpacing: '0.02em',
                      color: '#4D4D4D',
                    }}
                  >
                    {weddingEnv.weddingDateJp}（{weddingEnv.weddingDayJp}）
                  </span>
                </div>
                <div className="flex items-start">
                  <span 
                    className="text-westar w-20 flex-shrink-0"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '11.7px',
                      lineHeight: '17.49px',
                      color: '#9E9E9E',
                    }}
                  >
                    時間
                  </span>
                  <span 
                    className="text-tundora"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '1rem',
                      letterSpacing: '0.02em',
                      color: '#4D4D4D',
                    }}
                  >
                    {weddingEnv.ceremonyTimeDisplay}より
                  </span>
                </div>
                <div className="flex items-start">
                  <span 
                    className="text-westar w-20 flex-shrink-0"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '11.7px',
                      lineHeight: '17.49px',
                      color: '#9E9E9E',
                    }}
                  >
                    会場
                  </span>
                  <div>
                    <div 
                      className="text-akane-600 mb-1"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '500',
                        fontSize: '1rem',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {weddingEnv.venueName}
                    </div>
                    <div 
                      className="text-dusty-gray"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        color: '#999999',
                      }}
                    >
                      {weddingEnv.venueAddress}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 披露宴 */}
            <div 
              className="figma-card p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(230, 85, 85, 0.1)',
              }}
            >
              <h3 
                className="text-akane-600 mb-6 flex items-center"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '600',
                  fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                  letterSpacing: '0.1em',
                }}
              >
                <span className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mr-4 shadow-sm"></span>
                披露宴
              </h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <span 
                    className="text-westar w-20 flex-shrink-0"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '11.7px',
                      lineHeight: '17.49px',
                      color: '#9E9E9E',
                    }}
                  >
                    時間
                  </span>
                  <span 
                    className="text-tundora"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '1rem',
                      letterSpacing: '0.02em',
                      color: '#4D4D4D',
                    }}
                  >
                    {weddingEnv.receptionTimeDisplay}より
                  </span>
                </div>
                <div className="flex items-start">
                  <span 
                    className="text-westar w-20 flex-shrink-0"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '11.7px',
                      lineHeight: '17.49px',
                      color: '#9E9E9E',
                    }}
                  >
                    会場
                  </span>
                  <div>
                    <div 
                      className="text-akane-600 mb-1"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '500',
                        fontSize: '1rem',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {weddingEnv.venueName}
                    </div>
                    <div 
                      className="text-dusty-gray"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        color: '#999999',
                      }}
                    >
                      同会場内
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* アクセス情報 */}
            <div 
              className="figma-card p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(230, 85, 85, 0.1)',
              }}
            >
              <h3 
                className="text-akane-600 mb-6 flex items-center"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '600',
                  fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                  letterSpacing: '0.1em',
                }}
              >
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mr-4 shadow-sm"></span>
                アクセス
              </h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <span 
                    className="text-westar w-20 flex-shrink-0"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '11.7px',
                      lineHeight: '17.49px',
                      color: '#9E9E9E',
                    }}
                  >
                    住所
                  </span>
                  <span 
                    className="text-tundora"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '1rem',
                      letterSpacing: '0.02em',
                      color: '#4D4D4D',
                    }}
                  >
                    {weddingEnv.venueAddress}
                  </span>
                </div>
                <div className="flex items-start">
                  <span 
                    className="text-westar w-20 flex-shrink-0"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '11.7px',
                      lineHeight: '17.49px',
                      color: '#9E9E9E',
                    }}
                  >
                    最寄駅
                  </span>
                  <div>
                    <div 
                      className="text-tundora"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '400',
                        fontSize: '1rem',
                        letterSpacing: '0.02em',
                        color: '#4D4D4D',
                      }}
                    >
                      JR線・地下鉄各線「表参道駅」徒歩5分
                    </div>
                    <div 
                      className="text-dusty-gray mt-1"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        color: '#999999',
                      }}
                    >
                      ※詳細なアクセス方法は地図をご確認ください
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span 
                    className="text-westar w-20 flex-shrink-0"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '11.7px',
                      lineHeight: '17.49px',
                      color: '#9E9E9E',
                    }}
                  >
                    駐車場
                  </span>
                  <span 
                    className="text-tundora"
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontWeight: '400',
                      fontSize: '1rem',
                      letterSpacing: '0.02em',
                      color: '#4D4D4D',
                    }}
                  >
                    あり（台数限定）
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 地図エリア（Google Mapsなし） */}
          <div className="space-y-6">
            <div 
              className="figma-card overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(230, 85, 85, 0.1)',
              }}
            >
              <div className="p-6 border-b border-gray-100">
                <h3 
                  className="text-akane-600"
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: '600',
                    fontSize: '1.25rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  会場までの地図
                </h3>
              </div>
              
              {/* 静的マップ表示 */}
              <div className="relative">
                <div 
                  className="w-full h-96 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #F0F0F0 0%, #E8E8E8 100%)',
                  }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6 opacity-60">🗺️</div>
                    <div 
                      className="text-tundora mb-2"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '500',
                        fontSize: '1.125rem',
                        color: '#4D4D4D',
                      }}
                    >
                      会場位置情報
                    </div>
                    <p 
                      className="text-dusty-gray mb-4"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        color: '#999999',
                      }}
                    >
                      Google Maps 統合は準備中です
                    </p>
                    <div 
                      className="figma-card p-4 max-w-sm mx-auto"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(230, 85, 85, 0.1)',
                      }}
                    >
                      <div className="text-left">
                        <div 
                          className="text-akane-600 mb-1"
                          style={{
                            fontFamily: 'Noto Serif JP, serif',
                            fontWeight: '500',
                            fontSize: '1rem',
                          }}
                        >
                          {weddingEnv.venueName}
                        </div>
                        <div 
                          className="text-dusty-gray"
                          style={{
                            fontFamily: 'Noto Serif JP, serif',
                            fontWeight: '400',
                            fontSize: '0.875rem',
                            color: '#999999',
                          }}
                        >
                          {weddingEnv.venueAddress}
                        </div>
                        <div 
                          className="text-westar mt-2"
                          style={{
                            fontFamily: 'Noto Serif JP, serif',
                            fontWeight: '400',
                            fontSize: '0.75rem',
                            color: '#9E9E9E',
                          }}
                        >
                          表参道駅より徒歩5分
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                className="p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 245, 255, 0.8) 100%)',
                }}
              >
                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 bg-akane-400 rounded-full flex-shrink-0 mt-0.5 shadow-sm"></span>
                  <div>
                    <div 
                      className="text-tundora"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '500',
                        fontSize: '1rem',
                        color: '#4D4D4D',
                      }}
                    >
                      {weddingEnv.venueName}
                    </div>
                    <div 
                      className="text-dusty-gray"
                      style={{
                        fontFamily: 'Noto Serif JP, serif',
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        color: '#999999',
                      }}
                    >
                      {weddingEnv.venueAddress}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* お車でお越しの方 */}
            <div 
              className="figma-card p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.9) 0%, rgba(219, 234, 254, 0.9) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <h4 
                className="text-blue-800 mb-3 flex items-center"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '600',
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                }}
              >
                <span className="mr-2">🚗</span>
                お車でお越しの方へ
              </h4>
              <div 
                className="text-blue-700 space-y-2"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                }}
              >
                <p>• 駐車場の台数に限りがございます</p>
                <p>• 公共交通機関のご利用をお勧めいたします</p>
                <p>• 周辺にコインパーキングもございます</p>
              </div>
            </div>

            {/* 公共交通機関 */}
            <div 
              className="figma-card p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.9) 0%, rgba(209, 250, 229, 0.9) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
              }}
            >
              <h4 
                className="text-green-800 mb-3 flex items-center"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '600',
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                }}
              >
                <span className="mr-2">🚇</span>
                公共交通機関でお越しの方へ
              </h4>
              <div 
                className="text-green-700 space-y-2"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  fontWeight: '400',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                }}
              >
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
