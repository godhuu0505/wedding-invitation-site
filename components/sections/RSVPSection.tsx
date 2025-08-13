'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getWeddingEnv } from '@/lib/env';

interface RSVPFormData {
  attendance: string;
  guestName: string;
  guestNameKana: string;
  guestSide: string;
  guestNumber: number;
  allergyFlag: boolean;
  allergy: string;
  message: string;
  email: string;
  phone: string;
}

export default function RSVPSection() {
  const weddingEnv = getWeddingEnv();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RSVPFormData>({
    defaultValues: {
      attendance: '',
      guestName: '',
      guestNameKana: '',
      guestSide: '',
      guestNumber: 1,
      allergyFlag: false,
      allergy: '',
      message: '',
      email: '',
      phone: '',
    },
  });

  const attendance = watch('attendance');
  const allergyFlag = watch('allergyFlag');

  const onSubmit: SubmitHandler<RSVPFormData> = async (data) => {
    // 基本的なバリデーション
    if (!data.attendance) {
      alert('出欠をお選びください');
      return;
    }
    if (!data.guestName.trim()) {
      alert('お名前をご入力ください');
      return;
    }
    if (!data.guestNameKana.trim()) {
      alert('お名前（ふりがな）をご入力ください');
      return;
    }
    if (!data.guestSide) {
      alert('お立場をお選びください');
      return;
    }
    if (data.allergyFlag && !data.allergy.trim()) {
      alert('アレルギー内容をご入力ください');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Firebase Firestoreへのデータ保存を実装
      console.log('RSVP Data:', data);
      
      // 模擬的な送信処理
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('RSVP送信エラー:', error);
      alert('送信に失敗しました。恐れ入りますが、再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="min-h-screen py-20 bg-gradient-to-br from-akane-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-4xl">✓</span>
            </div>
            <h2 className="text-4xl font-japanese font-bold text-gray-800 mb-6">
              ありがとうございました
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              出欠のご連絡をいただき、誠にありがとうございます。<br />
              当日、皆様にお会いできることを心より楽しみにしております。
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-akane-500 to-pink-500 text-white px-8 py-3 rounded-full hover:from-akane-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              フォームに戻る
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="min-h-screen py-20 bg-gradient-to-br from-akane-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* セクションタイトル */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-japanese font-bold text-gray-800 mb-6">
            出欠確認
            <span className="block text-lg md:text-xl font-normal text-gray-600 mt-2">
              RSVP
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-akane-400 to-pink-400 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {weddingEnv.weddingDateJp}の結婚式につきまして、<br />
            ご出席の可否をお聞かせください。
          </p>
        </div>

        {/* RSVPフォーム */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-akane-100/50">
            {/* 出欠選択 */}
            <div className="mb-8">
              <label className="block text-lg font-japanese font-bold text-gray-800 mb-4">
                出欠 <span className="text-akane-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    value="attend"
                    {...register('attendance')}
                    className="sr-only"
                  />
                  <div className={`
                    p-4 border-2 rounded-xl text-center cursor-pointer transition-all duration-300
                    ${attendance === 'attend' 
                      ? 'border-green-400 bg-green-50 text-green-700' 
                      : 'border-gray-200 hover:border-green-300'
                    }
                  `}>
                    <div className="text-2xl mb-2">🎉</div>
                    <div className="font-bold">出席</div>
                  </div>
                </label>
                <label className="relative">
                  <input
                    type="radio"
                    value="absent"
                    {...register('attendance')}
                    className="sr-only"
                  />
                  <div className={`
                    p-4 border-2 rounded-xl text-center cursor-pointer transition-all duration-300
                    ${attendance === 'absent' 
                      ? 'border-orange-400 bg-orange-50 text-orange-700' 
                      : 'border-gray-200 hover:border-orange-300'
                    }
                  `}>
                    <div className="text-2xl mb-2">😢</div>
                    <div className="font-bold">欠席</div>
                  </div>
                </label>
              </div>
              {errors.attendance && (
                <p className="text-red-500 text-sm mt-2">{errors.attendance.message}</p>
              )}
            </div>

            {/* 基本情報 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お名前 <span className="text-akane-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('guestName', { required: 'お名前をご入力ください' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-akane-400 focus:border-akane-400"
                  placeholder="田中太郎"
                />
                {errors.guestName && (
                  <p className="text-red-500 text-sm mt-1">{errors.guestName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お名前（ふりがな） <span className="text-akane-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('guestNameKana', { required: 'お名前（ふりがな）をご入力ください' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-akane-400 focus:border-akane-400"
                  placeholder="たなかたろう"
                />
                {errors.guestNameKana && (
                  <p className="text-red-500 text-sm mt-1">{errors.guestNameKana.message}</p>
                )}
              </div>
            </div>

            {/* お立場・参加人数 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お立場 <span className="text-akane-500">*</span>
                </label>
                <select
                  {...register('guestSide', { required: 'お立場をお選びください' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-akane-400 focus:border-akane-400"
                >
                  <option value="">お選びください</option>
                  <option value="groom-family">新郎 家族・親族</option>
                  <option value="groom-friend">新郎 友人</option>
                  <option value="groom-colleague">新郎 職場関係</option>
                  <option value="bride-family">新婦 家族・親族</option>
                  <option value="bride-friend">新婦 友人</option>
                  <option value="bride-colleague">新婦 職場関係</option>
                  <option value="other">その他</option>
                </select>
                {errors.guestSide && (
                  <p className="text-red-500 text-sm mt-1">{errors.guestSide.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  参加人数 <span className="text-akane-500">*</span>
                </label>
                <select
                  {...register('guestNumber', { valueAsNumber: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-akane-400 focus:border-akane-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}名</option>
                  ))}
                </select>
                {errors.guestNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.guestNumber.message}</p>
                )}
              </div>
            </div>

            {/* アレルギー */}
            <div className="mb-8">
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  {...register('allergyFlag')}
                  className="w-4 h-4 text-akane-500 border-gray-300 rounded focus:ring-akane-400"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  食物アレルギーがあります
                </span>
              </label>
              {allergyFlag && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    アレルギー内容をお聞かせください <span className="text-akane-500">*</span>
                  </label>
                  <textarea
                    {...register('allergy')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-akane-400 focus:border-akane-400"
                    rows={3}
                    placeholder="例：エビ、カニ、小麦など"
                  />
                  {errors.allergy && (
                    <p className="text-red-500 text-sm mt-1">{errors.allergy.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* 連絡先 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-akane-400 focus:border-akane-400"
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話番号
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-akane-400 focus:border-akane-400"
                  placeholder="090-1234-5678"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* メッセージ */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メッセージ（任意）
              </label>
              <textarea
                {...register('message')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-akane-400 focus:border-akane-400"
                rows={4}
                placeholder="お二人へのメッセージをお聞かせください"
              />
            </div>

            {/* 送信ボタン */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-12 py-4 rounded-full font-bold text-lg
                  transition-all duration-300 transform hover:scale-105
                  ${isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-akane-500 to-pink-500 text-white hover:from-akane-600 hover:to-pink-600 shadow-lg'
                  }
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full mr-3"></div>
                    送信中...
                  </span>
                ) : (
                  '送信する'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
