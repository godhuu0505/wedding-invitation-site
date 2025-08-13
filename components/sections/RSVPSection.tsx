'use client';

import React, { useState } from 'react';
import { getWeddingEnv } from '@/lib/env';
import ComprehensiveRSVPForm from '@/components/forms/ComprehensiveRSVPForm';

/**
 * RSVPSection - Figmaデザイン + reference-site.html完全対応版
 * 
 * このセクションはFigmaデザインのスタイリングと
 * reference-site.htmlの包括的なフォーム機能を組み合わせています。
 */

interface RSVPFormData {
  status: 1 | 2;
  guest_side: 0 | 1;
  jpn_family_name: string;
  jpn_first_name: string;
  kana_family_name?: string;
  kana_first_name?: string;
  rom_family_name: string;
  rom_first_name: string;
  email: string;
  phone_number?: string;
  zipcode?: string;
  address?: string;
  address2?: string;
  age_category?: 0 | 1 | 2;
  allergy_flag: 0 | 1;
  allergy?: string;
  guest_message?: string;
}

export default function RSVPSection() {
  const weddingEnv = getWeddingEnv();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRSVPSubmit = async (data: RSVPFormData) => {
    try {
      // TODO: Firebase Firestoreへのデータ保存を実装
      
      // 模擬的な送信処理
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 成功時の処理
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('RSVP送信エラー:', error);
      throw error; // ComprehensiveRSVPFormでエラーハンドリング
    }
  };

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  // 送信完了画面
  if (isSubmitted) {
    return (
      <section id="rsvp" className="min-h-screen py-24 bg-old-lace relative">
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
            <h2 
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
            </h2>
            
            <h3 
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
            </h3>
            
            <p 
              className="text-dusty-gray mb-12 leading-relaxed max-w-3xl mx-auto"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '400',
                fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                lineHeight: '2',
                letterSpacing: '0.02em',
                color: '#999999',
              }}
            >
              出欠のご連絡をいただき、誠にありがとうございます。<br />
              皆様からのお返事を心よりお待ちしております。<br />
              当日、お会いできることを楽しみにしております。
            </p>
            
            {/* 戻るボタン */}
            <button
              onClick={() => setIsSubmitted(false)}
              className="figma-button px-12 py-4 rounded-full transform hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #e65555 0%, #BDBCDA 100%)',
                color: 'white',
                fontFamily: 'Hiragino Kaku Gothic ProN, sans-serif',
                fontWeight: '300',
                fontSize: '1.125rem',
                letterSpacing: '0.1em',
                boxShadow: '0 8px 25px rgba(230, 85, 85, 0.3)',
              }}
            >
              フォームに戻る
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="min-h-screen py-24 bg-old-lace relative">
      {/* Figmaデザインの背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-ecru-white/30 to-old-lace"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
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
            RSVP
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
            出欠確認
          </p>
          
          <p 
            className="text-dusty-gray max-w-4xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              lineHeight: '1.8',
              letterSpacing: '0.02em',
              color: '#999999',
            }}
          >
            {weddingEnv.weddingDateJp}の結婚式につきまして、<br />
            ご出席の可否をお聞かせください。<br />
            お忙しい中恐れ入りますが、下記フォームよりご連絡をお願いいたします。
          </p>
        </div>

        {/* Figmaデザイン + reference-site.html対応の包括的なRSVPフォーム */}
        <ComprehensiveRSVPForm 
          onSubmit={handleRSVPSubmit}
          onSuccess={handleSubmitSuccess}
        />
      </div>
    </section>
  );
}
