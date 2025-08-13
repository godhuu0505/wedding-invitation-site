---
applyTo: "components/**/*.{tsx,ts}"
---

# アーキテクチャ設計指示書 - Figmaデザイン完全対応版

## 🏗️ システムアーキテクチャ概要

### プロジェクト概要
**結婚式招待サイト** - 和風エレガントテーマ（Figmaデザイン & reference-site.html完全再現）
- **新郎新婦**: Naoto（伊藤尚人）& Yui（小林結衣）
- **結婚式日程**: 2025年11月3日（日）
- **デザインコンセプト**: 和風モダン × エレガント × 茜色テーマ

### 技術スタック
- **フロントエンド**: Next.js 14 (App Router) + TypeScript
- **スタイリング**: Tailwind CSS + 茜色カスタムテーマ + 和風フォント
- **アニメーション**: Framer Motion + Vegas.js + Vivus.js + ScrollTrigger
- **バックエンド**: Firebase Firestore + Cloud Functions
- **認証**: Firebase Authentication（管理画面用）
- **地図**: Google Maps Embed API
- **デプロイ**: Vercel（フロントエンド）+ Firebase（バックエンド）

### プロジェクト構造（Figmaデザイン対応）
```
app/                        # Next.js 14 App Router
├── page.tsx               # メインページ（全セクション統合）
├── layout.tsx             # 共通レイアウト + フォント読み込み
├── loading.tsx            # SVGローディングアニメーション
├── error.tsx              # エラーページ
├── not-found.tsx          # 404ページ
└── admin/                 # 管理画面
    ├── page.tsx
    ├── layout.tsx         # 管理画面専用レイアウト
    ├── dashboard/
    │   └── page.tsx       # ダッシュボード
    ├── rsvp-list/
    │   └── page.tsx       # RSVP一覧管理
    └── settings/
        └── page.tsx       # 設定画面

components/                 # 再利用可能コンポーネント
├── ui/                    # 基本UIコンポーネント
│   ├── Button.tsx         # 茜色テーマボタン
│   ├── Input.tsx          # フォーム入力コンポーネント
│   ├── Select.tsx         # セレクトボックス
│   ├── Modal.tsx          # モーダルダイアログ
│   ├── Loading.tsx        # ローディングスピナー
│   └── ErrorBoundary.tsx  # エラー境界
├── layout/                # レイアウトコンポーネント
│   ├── Header.tsx         # サイトヘッダー
│   ├── Navigation.tsx     # ナビゲーション
│   ├── Footer.tsx         # フッター
│   ├── LoadingScreen.tsx  # 5秒間ローディング画面
│   └── ScrollProgress.tsx # スクロール進捗バー
├── sections/              # メインセクションコンポーネント
│   ├── HeroSection.tsx    # ヘッダー + カルーセル背景
│   ├── MessageSection.tsx # 挨拶 + プロフィール
│   ├── CountdownSection.tsx # 結婚式までのカウントダウン
│   ├── InformationSection.tsx # 式場案内 + Google Maps
│   ├── RSVPSection.tsx    # 出欠確認フォーム
│   └── FooterSection.tsx  # フッター + ナビゲーション
├── forms/                 # フォーム関連コンポーネント
│   ├── RSVPForm.tsx      # 包括的RSVPフォーム
│   ├── ContactForm.tsx   # お問い合わせフォーム
│   ├── FormField.tsx     # フォームフィールド共通
│   └── ValidationMessage.tsx # バリデーションメッセージ
└── animations/            # アニメーション専用コンポーネント
    ├── CarouselBackground.tsx # Vegas.js背景カルーセル
    ├── SVGAnimation.tsx   # Vivus.js SVGアニメーション
    ├── ScrollReveal.tsx   # スクロール連動アニメーション
    └── CountdownTimer.tsx # カウントダウンアニメーション

lib/                       # ユーティリティ・設定
├── firebase.ts           # Firebase設定
├── firebase-operations.ts # Firestore操作関数
├── validation.ts         # フォームバリデーション
├── utils.ts             # 共通ユーティリティ
├── constants.ts         # 定数定義
├── animations.ts        # アニメーション設定
├── date-utils.ts        # 日付計算ユーティリティ
└── types/               # TypeScript型定義
    ├── index.ts         # 基本型定義
    ├── rsvp.ts          # RSVP関連型
    ├── admin.ts         # 管理画面関連型
    └── animations.ts    # アニメーション関連型

styles/                   # スタイル定義
├── globals.css          # グローバルスタイル + 茜色テーマ
├── components.css       # コンポーネント専用CSS
├── animations.css       # アニメーションCSS
└── fonts.css           # 和風フォント定義

public/                   # 静的アセット（Figmaから生成）
├── images/              # 画像ファイル
│   ├── backgrounds/     # 背景画像（カルーセル用）
│   │   ├── hero-bg-1.webp
│   │   ├── hero-bg-2.webp
│   │   └── hero-bg-3.webp
│   ├── profiles/        # プロフィール写真
│   │   ├── groom-photo.webp
│   │   └── bride-photo.webp
│   ├── ceremony/        # 式場写真
│   │   ├── venue-exterior.webp
│   │   └── venue-interior.webp
│   ├── decorations/     # 装飾要素
│   │   ├── floral-accent.svg
│   │   ├── divider-line.svg
│   │   └── border-pattern.svg
│   └── icons/           # アイコン
│       ├── calendar.svg
│       ├── location.svg
│       └── heart.svg
├── fonts/               # カスタムフォント
│   ├── NotoSerifJP/     # Noto Serif JP（和風）
│   └── PlayfairDisplay/ # Playfair Display（エレガント）
└── animations/          # アニメーション用ファイル
    ├── loading-animation.svg # ローディングSVG
    └── heart-animation.json  # Lottieアニメーション
```

## 📱 レスポンシブデザイン仕様（Figmaベース）

### ブレークポイント設計
```css
/* Tailwind CSS カスタムブレークポイント */
sm: 640px    /* モバイル横向き */
md: 768px    /* タブレット縦向き */
lg: 1024px   /* タブレット横向き・小型ノートPC */
xl: 1280px   /* デスクトップ */
2xl: 1536px  /* 大型デスクトップ */
```

### デバイス別レイアウト調整
```typescript
// components/sections/HeroSection.tsx - レスポンシブ対応例
export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* 背景カルーセル */}
      <div className="absolute inset-0">
        <CarouselBackground />
      </div>
      
      {/* コンテンツオーバーレイ */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          {/* タイトル - レスポンシブ */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                         font-playfair font-bold text-white mb-4 sm:mb-6 lg:mb-8
                         drop-shadow-2xl">
            <span className="block">Naoto</span>
            <span className="text-akane-400 block">&</span>
            <span className="block">Yui</span>
          </h1>
          
          {/* 日本語名 - レスポンシブ */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl 
                         text-white/90 mb-6 sm:mb-8 lg:mb-12
                         font-noto-serif tracking-wider">
            <p>伊藤 尚人 & 小林 結衣</p>
          </div>
          
          {/* 日付 - レスポンシブ */}
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl 
                         text-akane-200 font-playfair">
            <time dateTime="2025-11-03">2025.11.03</time>
          </div>
        </div>
      </div>
      
      {/* スクロールダウンインジケーター */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                     animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <div className="w-1 h-3 bg-white/70 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
```

## 🎨 デザインシステム（Figmaベース茜色テーマ）

### カラーパレット
```typescript
// tailwind.config.js - 茜色テーマ
const colors = {
  akane: {
    50: '#fef7f7',   // 最薄茜色（背景用）
    100: '#feeaea',  // 薄茜色
    200: '#fdd5d5',  // 
    300: '#fab5b5',  // 
    400: '#f58989',  // アクセント茜色
    500: '#e65555',  // メイン茜色（Figmaプライマリ）
    600: '#d73535',  // 濃茜色
    700: '#b82828',  // 
    800: '#9a2222',  // 
    900: '#7f1d1d',  // 最濃茜色（テキスト用）
  },
  // 和風補色
  traditional: {
    gold: '#d4af37',     // 金色（アクセント）
    cream: '#faf7f2',    // クリーム色（背景）
    charcoal: '#2d2d2d', // 炭色（テキスト）
    ivory: '#fffef7',    // 象牙色（カード背景）
  }
};
```

### フォントシステム
```css
/* フォント階層 - 和風エレガント */
.font-playfair { font-family: 'Playfair Display', serif; } /* 英語タイトル用 */
.font-noto-serif { font-family: 'Noto Serif JP', serif; } /* 日本語メイン */
.font-noto-sans { font-family: 'Noto Sans JP', sans-serif; } /* UI要素用 */

/* タイポグラフィクラス */
.text-hero {
  @apply text-5xl md:text-7xl lg:text-8xl font-playfair font-bold;
  @apply text-akane-600 leading-tight tracking-wide;
}

.text-section-title {
  @apply text-3xl md:text-4xl lg:text-5xl font-playfair font-semibold;
  @apply text-akane-500 mb-6 md:mb-8 lg:mb-12;
}

.text-jp-title {
  @apply text-2xl md:text-3xl lg:text-4xl font-noto-serif font-medium;
  @apply text-traditional-charcoal tracking-wider;
}

.text-body {
  @apply text-base md:text-lg lg:text-xl font-noto-serif;
  @apply text-traditional-charcoal leading-relaxed;
}

.text-caption {
  @apply text-sm md:text-base font-noto-sans;
  @apply text-gray-600;
}
```

### コンポーネントデザイントークン
```typescript
// lib/design-tokens.ts
export const designTokens = {
  // スペーシング（和風余白）
  spacing: {
    section: 'py-16 md:py-24 lg:py-32',
    container: 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto',
    content: 'space-y-8 md:space-y-12 lg:space-y-16',
  },
  
  // シャドウ（エレガント）
  shadows: {
    card: 'shadow-lg shadow-akane-500/10',
    modal: 'shadow-2xl shadow-black/25',
    floating: 'shadow-xl shadow-akane-500/20',
  },
  
  // ボーダー（和風）
  borders: {
    accent: 'border-t-4 border-akane-500',
    decorative: 'border border-akane-200/50',
    subtle: 'border border-gray-200',
  },
  
  // アニメーション
  animations: {
    fadeIn: 'animate-fade-in-up',
    slideIn: 'animate-slide-in-left',
    zoom: 'animate-zoom-in',
    float: 'animate-float',
  },
};
```

# アーキテクチャ設計指示書

## 🏗️ システムアーキテクチャ

### アプリケーション構成
```
Frontend (Next.js 14)          Backend (Firebase)         External APIs
├── App Router (SSR/SSG)       ├── Firestore            ├── Google Maps Embed
├── Server Components          ├── Authentication       └── CDN (Vegas.js等)
├── Client Components          ├── Functions            
├── Loading/Error UI           └── Hosting              
└── API Routes                                          

Animation Libraries
├── Framer Motion (React用)
├── Vegas.js (背景スライドショー)
├── Vivus.js (SVGアニメーション)
└── ScrollTrigger (スクロール連動)
```

### データフロー（reference-site.html完全再現版）
```
User → LoadingScreen (5s) → Header (カルーセル) → Sections → RSVPForm → API → Firestore
                               ↓                              ↓
                        Navigation Menu              Security Validation
                               ↓                              ↓  
                        Smooth Scroll               Rate Limiting + Audit Log
                               ↓                              ↓
                        Animation Triggers          Admin Dashboard
```

## 🎨 コンポーネント設計パターン

### RSVPフォームパターン（reference-site.html完全再現版）
```typescript
// components/forms/RSVPForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { rsvpSchema } from '@/lib/validation';

interface RSVPFormProps {
  onSubmit: (data: RSVPFormData) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

interface RSVPFormData {
  // 出欠情報
  status: 1 | 2; // 1: 出席, 2: 欠席
  guest_side: 0 | 1; // 0: 新郎側, 1: 新婦側
  
  // 名前情報
  jpn_family_name: string;
  jpn_first_name: string;
  kana_family_name?: string;
  kana_first_name?: string;
  rom_family_name: string;
  rom_first_name: string;
  
  // 連絡先
  email: string;
  phone_number?: string;
  
  // 住所情報
  zipcode?: string;
  address?: string;
  address2?: string;
  
  // その他
  age_category?: 0 | 1 | 2; // 0: 大人, 1: 子供, 2: 幼児
  allergy_flag: 0 | 1; // 0: なし, 1: あり
  allergy?: string;
  guest_message?: string;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ 
  onSubmit, 
  isLoading = false, 
  error,
  className = '' 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm<RSVPFormData>({
    resolver: yupResolver(rsvpSchema),
    defaultValues: {
      status: 1,
      guest_side: 0,
      allergy_flag: 0
    }
  });

  const status = watch('status');
  const allergyFlag = watch('allergy_flag');

  const handleFormSubmit = async (data: RSVPFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('フォーム送信エラー:', error);
    }
  };

  return (
    <section id="rsvp" className="rsvp py-24 bg-gradient-to-br from-akane-50 to-akane-100">
      <div className="container max-w-4xl mx-auto px-8">
        <h2 className="text-center mb-12">
          <span className="en block font-playfair text-4xl md:text-5xl font-normal mb-2 text-akane-600">
            ご出欠
          </span>
          <span className="ja text-sm md:text-base text-gray-600 tracking-widest">
            R.S.V.P.
          </span>
        </h2>
        
        <div className="rsvp-txt text-center mb-12">
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            お手数ではございますが<br />
            ご出欠情報のご登録をお願い申し上げます
          </p>
          <p className="limit font-semibold text-akane-600">
            2025.10.30までにご一報をお願いいたします
          </p>
        </div>

        <form 
          onSubmit={handleSubmit(handleFormSubmit)} 
          className={`form bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto ${className}`}
        >
          {/* エラー表示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* 出欠選択 */}
          <div className="row attendance text-center mb-8">
            <div className="flex justify-center gap-8">
              <label className="form-check-inline flex items-center cursor-pointer">
                <input
                  {...register('status', { valueAsNumber: true })}
                  type="radio"
                  value={1}
                  className="w-5 h-5 mr-3 text-akane-500 focus:ring-akane-500"
                />
                <span className="text-xl font-semibold text-gray-800">ATTEND</span>
              </label>
              <label className="form-check-inline flex items-center cursor-pointer">
                <input
                  {...register('status', { valueAsNumber: true })}
                  type="radio"
                  value={2}
                  className="w-5 h-5 mr-3 text-akane-500 focus:ring-akane-500"
                />
                <span className="text-xl font-semibold text-gray-800">ABSENT</span>
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm mt-2">{errors.status.message}</p>
            )}
          </div>

          {/* ゲストカテゴリー */}
          <FormField
            title={{ ja: "ゲストカテゴリー", en: "Guest Category" }}
            required
            error={errors.guest_side?.message}
          >
            <div className="input-check flex gap-6">
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('guest_side', { valueAsNumber: true })}
                  type="radio"
                  value={0}
                  className="w-4 h-4 mr-2 text-akane-500 focus:ring-akane-500"
                />
                <span>新郎側ゲスト<span className="text-gray-500">（Groom）</span></span>
              </label>
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('guest_side', { valueAsNumber: true })}
                  type="radio"
                  value={1}
                  className="w-4 h-4 mr-2 text-akane-500 focus:ring-akane-500"
                />
                <span>新婦側ゲスト<span className="text-gray-500">（Bride）</span></span>
              </label>
            </div>
          </FormField>

          {/* 名前 */}
          <FormField
            title={{ ja: "お名前", en: "Name" }}
            required
          >
            <div className="input2 grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register('jpn_family_name')}
                  type="text"
                  placeholder="姓"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
                />
                {errors.jpn_family_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.jpn_family_name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('jpn_first_name')}
                  type="text"
                  placeholder="名"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
                />
                {errors.jpn_first_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.jpn_first_name.message}</p>
                )}
              </div>
            </div>
          </FormField>

          {/* かな */}
          <FormField
            title={{ ja: "かな", en: "Kana" }}
          >
            <div className="input2 grid grid-cols-2 gap-4">
              <input
                {...register('kana_family_name')}
                type="text"
                placeholder="せい"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
              />
              <input
                {...register('kana_first_name')}
                type="text"
                placeholder="めい"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
              />
            </div>
          </FormField>

          {/* ローマ字 */}
          <FormField
            title={{ ja: "ローマ字", en: "Latin alphabet" }}
            required
          >
            <div className="input2 grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register('rom_family_name')}
                  type="text"
                  placeholder="last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
                />
                {errors.rom_family_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.rom_family_name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('rom_first_name')}
                  type="text"
                  placeholder="first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
                />
                {errors.rom_first_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.rom_first_name.message}</p>
                )}
              </div>
            </div>
          </FormField>

          {/* メールアドレス */}
          <FormField
            title={{ ja: "メールアドレス", en: "Email Address" }}
            required
            error={errors.email?.message}
          >
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
            />
          </FormField>

          {/* 年齢区分 */}
          <FormField
            title={{ ja: "年齢区分", en: "Age Group" }}
          >
            <div className="input-check flex gap-6 flex-wrap">
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('age_category', { valueAsNumber: true })}
                  type="radio"
                  value={0}
                  className="w-4 h-4 mr-2"
                />
                <span>大人Adult</span>
              </label>
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('age_category', { valueAsNumber: true })}
                  type="radio"
                  value={1}
                  className="w-4 h-4 mr-2"
                />
                <span>子供Child</span>
              </label>
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('age_category', { valueAsNumber: true })}
                  type="radio"
                  value={2}
                  className="w-4 h-4 mr-2"
                />
                <span>幼児Infant</span>
              </label>
            </div>
          </FormField>

          {/* 食事制限 */}
          <FormField
            title={{ ja: "食事制限", en: "Dietary Restrictions" }}
            required
            error={errors.allergy_flag?.message}
          >
            <div className="input-check flex gap-6">
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('allergy_flag', { valueAsNumber: true })}
                  type="radio"
                  value={1}
                  className="w-4 h-4 mr-2"
                />
                <span>有りWith</span>
              </label>
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('allergy_flag', { valueAsNumber: true })}
                  type="radio"
                  value={0}
                  className="w-4 h-4 mr-2"
                />
                <span>無しWithout</span>
              </label>
            </div>
          </FormField>

          {/* アレルギー詳細 */}
          {allergyFlag === 1 && (
            <FormField>
              <input
                {...register('allergy')}
                type="text"
                placeholder="えび かに くるみ 小麦 そば 卵 乳 落花生 etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
              />
            </FormField>
          )}

          {/* メッセージ */}
          <FormField
            title={{ ja: "メッセージ", en: "Message" }}
          >
            <textarea
              {...register('guest_message')}
              rows={3}
              placeholder="MESSAGE"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent resize-vertical min-h-[100px]"
            />
          </FormField>

          {/* 送信ボタン */}
          <div className="btn-wrap text-center mt-8">
            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="bg-akane-500 text-white py-4 px-12 rounded-full text-lg font-semibold hover:bg-akane-600 focus:outline-none focus:ring-2 focus:ring-akane-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {isLoading || isSubmitting ? '送信中...' : (
                <img src="/images/submit.svg" alt="送信" className="w-24 h-auto" />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// フォームフィールドラッパー
const FormField: React.FC<{
  title?: { ja: string; en: string };
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ title, required = false, error, children }) => {
  return (
    <div className="row mb-8">
      {title && (
        <div className="tit mb-4">
          <span className="tit-ja block text-lg font-semibold text-gray-800 mb-1">
            {title.ja}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
          <span className="tit-en text-sm text-gray-500 font-playfair">
            {title.en}
          </span>
        </div>
      )}
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default RSVPForm;
```

### レイアウトコンポーネントパターン
```typescript
// components/Layout.tsx
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {title || '私たちの結婚式へようこそ'}
          </h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 Wedding Invitation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
```

## 🛠️ API Routes設計パターン

### RSVP送信APIパターン
```typescript
// app/api/rsvp/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { checkRateLimit } from '@/lib/rate-limiter';
import { validateRSVPData } from '@/lib/validation';
import { logSecurityEvent } from '@/lib/security-logger';
import { AppError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック
    const rateLimit = checkRateLimit(request, {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000 // 1時間
    });

    if (!rateLimit.allowed) {
      logSecurityEvent({
        type: 'RATE_LIMIT',
        ip: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        timestamp: new Date(),
        details: { action: 'rsvp_submit' }
      });

      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString()
          }
        }
      );
    }

    // リクエストボディの解析
    const body = await request.json();
    
    // 入力検証
    const validation = validateRSVPData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 重複チェック
    const isDuplicate = await checkDuplicateEmail(validation.data.email);
    if (isDuplicate) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 409 }
      );
    }

    // Firestoreに保存
    const rsvpData = {
      ...validation.data,
      timestamp: Timestamp.now(),
      ipAddress: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    const docRef = await addDoc(collection(db, 'rsvps'), rsvpData);

    // 成功ログ
    logSecurityEvent({
      type: 'AUTH_SUCCESS',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date(),
      details: { 
        action: 'rsvp_submit',
        docId: docRef.id,
        attendance: validation.data.attendance
      }
    });

    return NextResponse.json({
      success: true,
      message: 'RSVPを送信しました',
      id: docRef.id
    });

  } catch (error) {
    // エラーログ
    logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date(),
      details: { 
        action: 'rsvp_submit',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });

    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### 管理画面API認証パターン
```typescript
// app/api/admin/rsvps/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { checkAdminPermissions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // 認証トークン確認
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decodedToken = await auth.verifyIdToken(token);
    
    // 管理者権限確認
    const hasPermission = await checkAdminPermissions(decodedToken.email);
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // RSVPデータ取得
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const attendance = searchParams.get('attendance');

    const rsvpData = await getRSVPs({
      page,
      limit,
      attendance: attendance as 'yes' | 'no' | undefined
    });

    return NextResponse.json(rsvpData);

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

## 🔧 ユーティリティ関数パターン

### バリデーション関数
```typescript
// lib/validation.ts
import * as yup from 'yup';

export const rsvpSchema = yup.object({
  name: yup.string()
    .required('名前は必須です')
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以内で入力してください')
    .matches(/^[\p{L}\p{N}\s\-\.]+$/u, '有効な文字のみ使用してください'),
    
  furigana: yup.string()
    .required('ふりがなは必須です')
    .matches(/^[あ-ん\s]+$/, 'ひらがなで入力してください'),
    
  email: yup.string()
    .required('メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください')
    .max(100, 'メールアドレスは100文字以内で入力してください'),
    
  attendance: yup.string()
    .required('出欠確認は必須です')
    .oneOf(['yes', 'no'], '出席または欠席を選択してください'),
    
  companions: yup.number()
    .integer('整数で入力してください')
    .min(0, '0以上の数値を入力してください')
    .max(5, '同伴者は5名までです')
    .default(0),
    
  companionNames: yup.string()
    .max(300, '同伴者名は300文字以内で入力してください'),
    
  allergies: yup.string()
    .max(500, 'アレルギー情報は500文字以内で入力してください'),
    
  message: yup.string()
    .max(1000, 'メッセージは1000文字以内で入力してください'),
    
  notes: yup.string()
    .max(500, '連絡事項は500文字以内で入力してください')
});

export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  error?: string;
}

export function validateRSVPData(data: any): ValidationResult<RSVPFormData> {
  try {
    const validatedData = rsvpSchema.validateSync(data, { 
      abortEarly: false,
      stripUnknown: true
    });
    
    return {
      valid: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        valid: false,
        error: error.errors[0] // 最初のエラーメッセージを返す
      };
    }
    
    return {
      valid: false,
      error: 'バリデーションエラーが発生しました'
    };
  }
}
```

### データアクセス関数
```typescript
// lib/firebase-operations.ts
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter,
  where,
  Timestamp 
} from 'firebase/firestore';

export interface RSVPData {
  name: string;
  furigana: string;
  email: string;
  attendance: 'yes' | 'no';
  companions: number;
  companionNames?: string;
  allergies?: string;
  message?: string;
  notes?: string;
  timestamp: Timestamp;
  ipAddress?: string;
  userAgent?: string;
}

export interface GetRSVPsOptions {
  page: number;
  limit: number;
  attendance?: 'yes' | 'no';
}

export async function submitRSVP(data: Omit<RSVPData, 'timestamp'>): Promise<string> {
  try {
    const rsvpData: RSVPData = {
      ...data,
      timestamp: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'rsvps'), rsvpData);
    return docRef.id;
  } catch (error) {
    throw new AppError('RSVP送信に失敗しました', 'RSVP_SUBMIT_ERROR', 500);
  }
}

export async function getRSVPs(options: GetRSVPsOptions) {
  try {
    const { page, limit: pageSize, attendance } = options;
    const offset = (page - 1) * pageSize;
    
    let q = query(
      collection(db, 'rsvps'),
      orderBy('timestamp', 'desc')
    );
    
    if (attendance) {
      q = query(q, where('attendance', '==', attendance));
    }
    
    q = query(q, limit(pageSize));
    
    // ページネーション実装
    if (offset > 0) {
      // 実際のアプリケーションではcursorベースの実装を推奨
      const offsetQuery = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'), limit(offset));
      const offsetSnapshot = await getDocs(offsetQuery);
      const lastDoc = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
      
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
    }
    
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      items,
      hasMore: items.length === pageSize,
      total: snapshot.size
    };
  } catch (error) {
    throw new AppError('データ取得に失敗しました', 'DATA_FETCH_ERROR', 500);
  }
}

export async function checkDuplicateEmail(email: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'rsvps'),
      where('email', '==', email),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    // エラーの場合は安全側に倒して重複ありとする
    return true;
  }
}
```

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）
