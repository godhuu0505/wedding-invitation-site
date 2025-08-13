'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

/**
 * Comprehensive RSVP Form - reference-site.html完全対応版
 * 
 * このフォームはreference-site.htmlのフォーム仕様を100%再現しています。
 * すべてのフィールドとバリデーションが含まれています。
 */

// reference-site.html準拠のフォームスキーマ
const rsvpSchema = yup.object({
  // 出欠情報
  status: yup.number().oneOf([1, 2], '出欠をお選びください').required('出欠をお選びください'),
  guest_side: yup.number().oneOf([0, 1], 'どちら側のゲストかお選びください').required('どちら側のゲストかお選びください'),
  
  // 名前情報（すべて必須）
  jpn_family_name: yup.string().required('姓（漢字）をご入力ください').max(50, '姓は50文字以内でご入力ください'),
  jpn_first_name: yup.string().required('名（漢字）をご入力ください').max(50, '名は50文字以内でご入力ください'),
  kana_family_name: yup.string().max(50, 'せい（ひらがな）は50文字以内でご入力ください').optional(),
  kana_first_name: yup.string().max(50, 'めい（ひらがな）は50文字以内でご入力ください').optional(),
  rom_family_name: yup.string().required('Family Name（ローマ字）をご入力ください').max(50, 'Family Nameは50文字以内でご入力ください'),
  rom_first_name: yup.string().required('First Name（ローマ字）をご入力ください').max(50, 'First Nameは50文字以内でご入力ください'),
  
  // 連絡先
  email: yup.string().email('正しいメールアドレスを入力してください').required('メールアドレスをご入力ください').max(100, 'メールアドレスは100文字以内でご入力ください'),
  phone_number: yup.string().max(15, '電話番号は15文字以内でご入力ください').optional(),
  
  // 住所情報
  zipcode: yup.string().matches(/^\d{7}$/, '郵便番号は7桁の数字で入力してください（例：1234567）').optional(),
  address: yup.string().max(200, '住所は200文字以内でご入力ください').optional(),
  address2: yup.string().max(100, '住所2は100文字以内でご入力ください').optional(),
  
  // その他
  age_category: yup.number().oneOf([0, 1, 2], '年齢区分をお選びください').optional(),
  allergy_flag: yup.number().oneOf([0, 1], 'アレルギーの有無をお選びください').required('アレルギーの有無をお選びください'),
  allergy: yup.string().when('allergy_flag', {
    is: 1,
    then: (schema) => schema.required('アレルギー内容をご入力ください').max(500, 'アレルギー内容は500文字以内でご入力ください'),
    otherwise: (schema) => schema.max(500, 'アレルギー内容は500文字以内でご入力ください').optional(),
  }),
  guest_message: yup.string().max(500, 'メッセージは500文字以内でご入力ください').optional(),
});

// TypeScript型定義（reference-site.html準拠）
interface ComprehensiveRSVPFormData {
  status: 1 | 2; // 1: 出席, 2: 欠席
  guest_side: 0 | 1; // 0: 新郎側, 1: 新婦側
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
  age_category?: 0 | 1 | 2; // 0: 大人, 1: 子供, 2: 幼児
  allergy_flag: 0 | 1; // 0: なし, 1: あり
  allergy?: string;
  guest_message?: string;
}

interface ComprehensiveRSVPFormProps {
  onSubmit?: (data: ComprehensiveRSVPFormData) => Promise<void>;
  onSuccess?: () => void;
}

export default function ComprehensiveRSVPForm({ onSubmit, onSuccess }: ComprehensiveRSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ComprehensiveRSVPFormData>({
    resolver: yupResolver(rsvpSchema),
    defaultValues: {
      status: undefined,
      guest_side: undefined,
      jpn_family_name: '',
      jpn_first_name: '',
      kana_family_name: '',
      kana_first_name: '',
      rom_family_name: '',
      rom_first_name: '',
      email: '',
      phone_number: '',
      zipcode: '',
      address: '',
      address2: '',
      age_category: undefined,
      allergy_flag: 0,
      allergy: '',
      guest_message: '',
    },
  });

  const status = watch('status');
  const allergyFlag = watch('allergy_flag');

  const handleFormSubmit: SubmitHandler<ComprehensiveRSVPFormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // デフォルトの送信処理
        
        // Firebase Firestoreへの保存を模擬
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      if (onSuccess) {
        onSuccess();
      }
      
      reset();
    } catch (error) {
      console.error('RSVP送信エラー:', error);
      alert('送信に失敗しました。恐れ入りますが、再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div 
        className="figma-card p-8 md:p-12"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(230, 85, 85, 0.1)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* セクション1: 出欠・関係性 */}
        <div className="mb-12">
          <h3 
            className="text-mine-shaft mb-8 pb-4 border-b border-mercury"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '500',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            出席・関係性情報
          </h3>
          
          {/* 出欠選択 */}
          <div className="mb-8">
            <label 
              className="semantic-label block mb-4"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '400',
                fontSize: '11.7px',
                lineHeight: '17.49px',
                color: '#333333',
              }}
            >
              出欠 <span className="text-akane-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative">
                <input
                  type="radio"
                  value={1}
                  {...register('status', { valueAsNumber: true })}
                  className="sr-only"
                />
                <div className={`
                  p-6 border-2 rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:scale-102
                  ${status === 1 
                    ? 'border-chateau-green bg-chateau-green/10 text-chateau-green shadow-lg' 
                    : 'border-mercury hover:border-chateau-green hover:bg-chateau-green/5'
                  }
                `}>
                  <div className="text-2xl mb-2">🎉</div>
                  <div className="semantic-button">出席</div>
                </div>
              </label>
              <label className="relative">
                <input
                  type="radio"
                  value={2}
                  {...register('status', { valueAsNumber: true })}
                  className="sr-only"
                />
                <div className={`
                  p-6 border-2 rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:scale-102
                  ${status === 2 
                    ? 'border-cinnabar bg-cinnabar/10 text-cinnabar shadow-lg' 
                    : 'border-mercury hover:border-cinnabar hover:bg-cinnabar/5'
                  }
                `}>
                  <div className="text-2xl mb-2">😢</div>
                  <div className="semantic-button">欠席</div>
                </div>
              </label>
            </div>
            {errors.status && (
              <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.status.message}</p>
            )}
          </div>

          {/* 関係性選択 */}
          <div className="mb-8">
            <label 
              className="semantic-label block mb-4"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '400',
                fontSize: '11.7px',
                lineHeight: '17.49px',
                color: '#333333',
              }}
            >
              どちら側のゲストですか？ <span className="text-akane-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative">
                <input
                  type="radio"
                  value={0}
                  {...register('guest_side', { valueAsNumber: true })}
                  className="sr-only"
                />
                <div className={`
                  p-4 border-2 rounded-lg text-center cursor-pointer transition-all duration-300
                  ${watch('guest_side') === 0 
                    ? 'border-akane-500 bg-akane-50 text-akane-500' 
                    : 'border-mercury hover:border-akane-300'
                  }
                `}>
                  <div className="semantic-button">新郎側</div>
                </div>
              </label>
              <label className="relative">
                <input
                  type="radio"
                  value={1}
                  {...register('guest_side', { valueAsNumber: true })}
                  className="sr-only"
                />
                <div className={`
                  p-4 border-2 rounded-lg text-center cursor-pointer transition-all duration-300
                  ${watch('guest_side') === 1 
                    ? 'border-akane-500 bg-akane-50 text-akane-500' 
                    : 'border-mercury hover:border-akane-300'
                  }
                `}>
                  <div className="semantic-button">新婦側</div>
                </div>
              </label>
            </div>
            {errors.guest_side && (
              <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.guest_side.message}</p>
            )}
          </div>
        </div>

        {/* セクション2: 個人情報 */}
        <div className="mb-12">
          <h3 
            className="text-mine-shaft mb-8 pb-4 border-b border-mercury"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '500',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            お名前情報
          </h3>
          
          {/* 漢字名前 */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="semantic-label block mb-3">
                姓（漢字） <span className="text-akane-500">*</span>
              </label>
              <input
                type="text"
                {...register('jpn_family_name')}
                className="figma-input w-full"
                placeholder="田中"
              />
              {errors.jpn_family_name && (
                <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.jpn_family_name.message}</p>
              )}
            </div>
            <div>
              <label className="semantic-label block mb-3">
                名（漢字） <span className="text-akane-500">*</span>
              </label>
              <input
                type="text"
                {...register('jpn_first_name')}
                className="figma-input w-full"
                placeholder="太郎"
              />
              {errors.jpn_first_name && (
                <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.jpn_first_name.message}</p>
              )}
            </div>
          </div>

          {/* ひらがな名前 */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="semantic-label block mb-3">
                せい（ひらがな）
              </label>
              <input
                type="text"
                {...register('kana_family_name')}
                className="figma-input w-full"
                placeholder="たなか"
              />
              {errors.kana_family_name && (
                <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.kana_family_name.message}</p>
              )}
            </div>
            <div>
              <label className="semantic-label block mb-3">
                めい（ひらがな）
              </label>
              <input
                type="text"
                {...register('kana_first_name')}
                className="figma-input w-full"
                placeholder="たろう"
              />
              {errors.kana_first_name && (
                <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.kana_first_name.message}</p>
              )}
            </div>
          </div>

          {/* ローマ字名前 */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="semantic-label block mb-3">
                Family Name（ローマ字） <span className="text-akane-500">*</span>
              </label>
              <input
                type="text"
                {...register('rom_family_name')}
                className="figma-input w-full"
                placeholder="Tanaka"
              />
              {errors.rom_family_name && (
                <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.rom_family_name.message}</p>
              )}
            </div>
            <div>
              <label className="semantic-label block mb-3">
                First Name（ローマ字） <span className="text-akane-500">*</span>
              </label>
              <input
                type="text"
                {...register('rom_first_name')}
                className="figma-input w-full"
                placeholder="Taro"
              />
              {errors.rom_first_name && (
                <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.rom_first_name.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* セクション3: 連絡先情報 */}
        <div className="mb-12">
          <h3 
            className="text-mine-shaft mb-8 pb-4 border-b border-mercury"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '500',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            連絡先情報
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="semantic-label block mb-3">
                メールアドレス <span className="text-akane-500">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className="figma-input w-full"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="semantic-label block mb-3">
                電話番号
              </label>
              <input
                type="tel"
                {...register('phone_number')}
                className="figma-input w-full"
                placeholder="090-1234-5678"
              />
              {errors.phone_number && (
                <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.phone_number.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* セクション4: 住所情報 */}
        <div className="mb-12">
          <h3 
            className="text-mine-shaft mb-8 pb-4 border-b border-mercury"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '500',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            住所情報（任意）
          </h3>
          
          <div className="mb-6">
            <label className="semantic-label block mb-3">
              郵便番号
            </label>
            <input
              type="text"
              {...register('zipcode')}
              className="figma-input w-full md:w-1/2"
              placeholder="1234567"
              maxLength={7}
            />
            <p className="text-dusty-gray text-xs mt-1 semantic-label">7桁の数字で入力してください（例：1234567）</p>
            {errors.zipcode && (
              <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.zipcode.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="semantic-label block mb-3">
              住所
            </label>
            <input
              type="text"
              {...register('address')}
              className="figma-input w-full"
              placeholder="東京都港区青山1-2-3"
            />
            {errors.address && (
              <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="semantic-label block mb-3">
              建物名・部屋番号
            </label>
            <input
              type="text"
              {...register('address2')}
              className="figma-input w-full"
              placeholder="青山マンション 101号"
            />
            {errors.address2 && (
              <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.address2.message}</p>
            )}
          </div>
        </div>

        {/* セクション5: その他情報 */}
        <div className="mb-12">
          <h3 
            className="text-mine-shaft mb-8 pb-4 border-b border-mercury"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '500',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            その他情報
          </h3>
          
          {/* 年齢区分 */}
          <div className="mb-8">
            <label className="semantic-label block mb-4">
              年齢区分
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 0, label: '大人' },
                { value: 1, label: '子供' },
                { value: 2, label: '幼児' }
              ].map((option) => (
                <label key={option.value} className="relative">
                  <input
                    type="radio"
                    value={option.value}
                    {...register('age_category', { valueAsNumber: true })}
                    className="sr-only"
                  />
                  <div className={`
                    p-3 border-2 rounded-lg text-center cursor-pointer transition-all duration-300
                    ${watch('age_category') === option.value 
                      ? 'border-akane-500 bg-akane-50 text-akane-500' 
                      : 'border-mercury hover:border-akane-300'
                    }
                  `}>
                    <div className="semantic-button">{option.label}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.age_category && (
              <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.age_category.message}</p>
            )}
          </div>

          {/* アレルギー */}
          <div className="mb-8">
            <label className="semantic-label block mb-4">
              食物アレルギー <span className="text-akane-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="relative">
                <input
                  type="radio"
                  value={0}
                  {...register('allergy_flag', { valueAsNumber: true })}
                  className="sr-only"
                />
                <div className={`
                  p-4 border-2 rounded-lg text-center cursor-pointer transition-all duration-300
                  ${allergyFlag === 0 
                    ? 'border-chateau-green bg-chateau-green/10 text-chateau-green' 
                    : 'border-mercury hover:border-chateau-green'
                  }
                `}>
                  <div className="semantic-button">なし</div>
                </div>
              </label>
              <label className="relative">
                <input
                  type="radio"
                  value={1}
                  {...register('allergy_flag', { valueAsNumber: true })}
                  className="sr-only"
                />
                <div className={`
                  p-4 border-2 rounded-lg text-center cursor-pointer transition-all duration-300
                  ${allergyFlag === 1 
                    ? 'border-selective-yellow bg-selective-yellow/10 text-selective-yellow' 
                    : 'border-mercury hover:border-selective-yellow'
                  }
                `}>
                  <div className="semantic-button">あり</div>
                </div>
              </label>
            </div>
            {errors.allergy_flag && (
              <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.allergy_flag.message}</p>
            )}

            {allergyFlag === 1 && (
              <div className="mt-4">
                <label className="semantic-label block mb-3">
                  アレルギー内容をお聞かせください <span className="text-akane-500">*</span>
                </label>
                <textarea
                  {...register('allergy')}
                  className="figma-textarea w-full"
                  rows={3}
                  placeholder="例：エビ、カニ、小麦、そば、乳製品など"
                />
                {errors.allergy && (
                  <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.allergy.message}</p>
                )}
              </div>
            )}
          </div>

          {/* メッセージ */}
          <div className="mb-8">
            <label className="semantic-label block mb-3">
              お二人へのメッセージ（任意）
            </label>
            <textarea
              {...register('guest_message')}
              className="figma-textarea w-full"
              rows={4}
              placeholder="お二人へのメッセージをお聞かせください"
            />
            {errors.guest_message && (
              <p className="text-cinnabar text-sm mt-2 semantic-label">{errors.guest_message.message}</p>
            )}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              figma-button px-16 py-4 rounded-full transform hover:scale-105 transition-all duration-300
              ${isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'shadow-lg hover:shadow-xl'
              }
            `}
            style={{
              background: isSubmitting 
                ? '#999999' 
                : 'linear-gradient(135deg, #e65555 0%, #BDBCDA 100%)',
              color: 'white',
              fontFamily: 'Hiragino Kaku Gothic ProN, sans-serif',
              fontWeight: '300',
              fontSize: '1.125rem',
              letterSpacing: '0.1em',
              boxShadow: isSubmitting 
                ? 'none' 
                : '0 8px 25px rgba(230, 85, 85, 0.3)',
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                送信中...
              </span>
            ) : (
              '送信する'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
