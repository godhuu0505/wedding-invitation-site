'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getWeddingEnv } from '@/lib/env';
import { createRSVP } from '@/lib/firebase-operations';
import { RSVPFormData } from '@/lib/types';
import ComprehensiveRSVPForm from '@/components/forms/ComprehensiveRSVPForm';

export default function RSVPSection() {
  const router = useRouter();
  const weddingEnv = getWeddingEnv();

  const handleRSVPSubmit = async (data: RSVPFormData) => {
    try {
      // Firebase Firestoreへのデータ保存
      const savedData = await createRSVP(data);
      
      // 開発用ログ出力
      if (process.env.NODE_ENV === 'development') {
        console.log('RSVP送信データ:', {
          ...data,
          allergy_items: data.allergy_flag === 1 ? data.allergy : []
        });
        console.log('Firestore保存結果:', savedData);
      }
      
      // 成功時は送信完了ページにリダイレクト
      const guestName = `${data.jpn_family_name} ${data.jpn_first_name}`;
      const statusParam = data.status?.toString() || '';
      const queryParams = new URLSearchParams({
        name: guestName,
        status: statusParam
      });
      
      router.push(`/rsvp/thank-you?${queryParams.toString()}`);
      
    } catch (error) {
      console.error('RSVP送信エラー:', error);
      
      // エラーメッセージを具体的に設定
      let errorMessage = 'エラーが発生しました。再度お試しください。';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      // ComprehensiveRSVPFormでエラーハンドリングされるようにエラーを再投出
      throw new Error(errorMessage);
    }
  };

  const handleSubmitSuccess = () => {
    // この関数は使用されなくなったが、ComprehensiveRSVPFormとの互換性のため残す
    // 実際のリダイレクトはhandleRSVPSubmit内で行われる
  };

  // 送信完了画面は /rsvp/thank-you ページで表示されるため、
  // ここでは直接フォームをレンダリングします

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
