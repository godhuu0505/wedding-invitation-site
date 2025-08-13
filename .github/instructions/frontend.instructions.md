---
applyTo: "app/**/*.{tsx,jsx,ts,js}"
---

# フロントエンド技術スタック指示書 - Figmaデザイン完全対応版

## 📋 フロントエンド技術スタック概要

### UIフレームワーク・ライブラリ（和風エレガント対応）
- **フレームワーク**: Next.js 14 (App Router) - モダンなReactフレームワーク
- **言語**: TypeScript 5.1.6 - 型安全性とコード品質向上
- **UIフレームワーク**: Tailwind CSS 3.3.2 - ユーティリティファーストCSS + 茜色カスタムテーマ
- **フォント**: Playfair Display（英語エレガント）+ Noto Serif JP（和風）
- **フォーム管理**: React Hook Form + Yup - reference-site.html完全対応RSVPバリデーション
- **アニメーション**: Framer Motion + Vegas.js + Vivus.js + ScrollTrigger

### 外部UIサービス
- **マップ表示**: Google Maps Embed API - 式場アクセス情報（東京ベイサイドホテル対応）
- **背景スライドショー**: Vegas.js - ヘッダーカルーセル（和風背景画像）
- **SVGアニメーション**: Vivus.js - 5秒間ローディング画面
- **スクロール連動**: ScrollTrigger - セクション切り替えアニメーション

## 🔧 フロントエンド依存関係管理（Figma対応）

### 本番依存関係（UI関連）
```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.45.0",
    "yup": "^1.2.0",
    "@hookform/resolvers": "^3.1.0",
    "framer-motion": "^10.16.0",
    "vegas": "^2.5.4",
    "vivus": "^0.4.6",
    "gsap": "^3.12.0",
    "tailwindcss": "3.3.2",
    "autoprefixer": "10.4.14",
    "postcss": "8.4.24",
    "@google/maps": "^1.1.3",
    "date-fns": "^2.30.0"
  }
}
```

### 開発依存関係（フロントエンド）
```json
{
  "devDependencies": {
    "@types/react": "19.1.10",
    "@types/node": "^20.0.0",
    "@types/vegas": "^2.5.0",
    "@types/google.maps": "^3.54.0",
    "typescript": "5.1.6",
    "eslint": "^8.50.0",
    "eslint-config-next": "14.0.0",
    "@next/bundle-analyzer": "^14.0.0",
    "@tailwindcss/typography": "^0.5.10",
    "@tailwindcss/forms": "^0.5.6"
  }
}
```

## 📱 ブラウザサポート・レスポンシブデザイン（Figmaベース）

### デスクトップサポート
- Chrome 90+ （最優先）
- Firefox 88+
- Safari 14+
- Edge 90+

### モバイルサポート
- iOS Safari 14+ （iPhone対応）
- Android Chrome 90+
- Samsung Internet 15+

### 対応解像度（Figmaデザイン準拠）
- **モバイル**: 375px〜767px (iPhone 12 Pro ベース)
- **タブレット**: 768px〜1023px (iPad ベース)
- **デスクトップ**: 1024px〜1920px (標準デスクトップ)
- **大型デスクトップ**: 1920px〜 (4K対応)

## 🏗️ フロントエンドアーキテクチャパターン（Figmaデザインシステム対応）

### Next.js 14 App Router構成
```
app/                    # Next.js 14 App Router
├── page.tsx           # メインページ（6セクション統合）
│                      #   1. ローディング（5秒SVG）
│                      #   2. ヒーロー（カルーセル背景）
│                      #   3. メッセージ（挨拶+プロフィール）
│                      #   4. カウントダウン（結婚式まで）
│                      #   5. インフォメーション（式場案内）
│                      #   6. RSVP（出欠確認フォーム）
├── layout.tsx         # 共通レイアウト + フォント読み込み
├── loading.tsx        # SVGローディング（Vivus.js）
├── error.tsx          # エラーUI（和風デザイン）
├── not-found.tsx      # 404ページ
├── globals.css        # 茜色テーマ + 和風フォント
└── admin/             # 管理画面（認証必要）
    ├── page.tsx       # 管理ダッシュボード
    ├── layout.tsx     # 管理専用レイアウト
    ├── dashboard/     # 統計ダッシュボード
    ├── rsvp-list/     # RSVP一覧管理
    └── settings/      # 管理設定

components/             # 再利用可能コンポーネント（Figmaベース）
├── ui/                # 基本UIコンポーネント（茜色テーマ）
│   ├── Button.tsx     # プライマリ（茜色）、セカンダリ、アウトライン
│   ├── Input.tsx      # フォーム入力（和風スタイル）
│   ├── Select.tsx     # セレクトボックス（カスタムスタイル）
│   ├── Modal.tsx      # モーダルダイアログ（エレガント）
│   ├── Card.tsx       # カードコンポーネント（影付き）
│   ├── Divider.tsx    # セクション区切り（和風装飾）
│   └── LoadingSpinner.tsx # ローディングスピナー
├── layout/            # レイアウトコンポーネント
│   ├── Header.tsx     # サイトヘッダー（固定ナビ）
│   ├── Navigation.tsx # スムーススクロールナビ
│   ├── Footer.tsx     # フッター（クレジット）
│   ├── LoadingScreen.tsx # 5秒間ローディング画面
│   └── ScrollProgress.tsx # スクロール進捗バー
├── sections/          # メインセクションコンポーネント
│   ├── HeroSection.tsx    # ヒーロー + 背景カルーセル
│   ├── MessageSection.tsx # 挨拶文 + 新郎新婦プロフィール
│   ├── CountdownSection.tsx # 結婚式までカウントダウン
│   ├── InformationSection.tsx # 式場案内 + Google Maps
│   ├── RSVPSection.tsx    # reference-site.html完全対応フォーム
│   └── FooterSection.tsx  # フッター + ソーシャルリンク
├── forms/             # フォームコンポーネント（reference-site.html準拠）
│   ├── RSVPForm.tsx       # メインRSVPフォーム
│   ├── PersonalInfoFields.tsx # 個人情報入力
│   ├── ContactFields.tsx  # 連絡先入力
│   ├── AllergyFields.tsx  # アレルギー情報入力
│   ├── MessageField.tsx   # メッセージ入力
│   └── FormValidation.tsx # バリデーション表示
└── animations/        # アニメーション専用コンポーネント
    ├── CarouselBackground.tsx # Vegas.js背景カルーセル
    ├── SVGLoadingAnimation.tsx # Vivus.js 5秒ローディング
    ├── ScrollRevealAnimation.tsx # スクロール連動表示
    ├── CountdownAnimation.tsx # カウントダウン数字アニメ
    └── FloatingElements.tsx # 浮遊装飾要素

lib/                   # フロントエンド用ユーティリティ
├── constants.ts       # 定数定義（カップル情報、日程等）
├── utils.ts          # ユーティリティ関数
├── validation.ts     # reference-site.html準拠バリデーション
├── animations.ts     # アニメーション設定
├── date-utils.ts     # 日付計算（カウントダウン用）
├── scroll-utils.ts   # スムーススクロール
└── design-tokens.ts  # デザイントークン（色、フォント、スペース）

styles/                # スタイル定義（Figmaベース）
├── globals.css        # グローバルスタイル + 茜色テーマ
├── components.css     # コンポーネント専用CSS
├── animations.css     # アニメーション定義
├── fonts.css         # 和風フォント読み込み
└── utilities.css     # カスタムユーティリティクラス
```

## 🎨 コンポーネント設計パターン

### React Hook Form + Yup パターン（RSVP フォーム）
```typescript
// 包括的RSVPフォームスキーマ
const rsvpSchema = yup.object({
  // 出欠情報
  status: yup.number().oneOf([1, 2]).required(), // 1: 出席, 2: 欠席
  guest_side: yup.number().oneOf([0, 1]).required(), // 0: 新郎側, 1: 新婦側
  
  // 名前情報
  jpn_family_name: yup.string().required().max(50),
  jpn_first_name: yup.string().required().max(50),
  kana_family_name: yup.string().max(50),
  kana_first_name: yup.string().max(50),
  rom_family_name: yup.string().required().max(50),
  rom_first_name: yup.string().required().max(50),
  
  // 連絡先
  email: yup.string().email().required().max(100),
  phone_number: yup.string().max(15),
  
  // 住所情報
  zipcode: yup.string().matches(/^\d{7}$/).optional(),
  address: yup.string().max(200),
  address2: yup.string().max(100),
  
  // その他
  age_category: yup.number().oneOf([0, 1, 2]).optional(), // 0: 大人, 1: 子供, 2: 幼児
  allergy_flag: yup.number().oneOf([0, 1]).required(), // 0: なし, 1: あり
  allergy: yup.string().max(500),
  guest_message: yup.string().max(500)
});
```

### TypeScript インターフェース定義（フロントエンド）
```typescript
// RSVPフォームデータ型定義
interface RSVPFormData {
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

// プロフィールデータ型定義
interface ProfileData {
  role: '新郎' | '新婦';
  nameJp: string;
  nameEn: string;
  photo: string;
  introduction: string;
}

// セクションコンポーネントProps
interface HeaderProps {
  backgroundImages: string[];
  coupleNames: { groom: string; bride: string; };
  weddingDate: string;
  venue: string;
}

interface MessageSectionProps {
  greetingMessage: string;
  groomData: ProfileData;
  brideData: ProfileData;
}

interface CountdownSectionProps {
  weddingDate: string;
  backgroundImage?: string;
}

// API レスポンス型定義
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface RSVPSubmitResponse {
  id: string;
  submissionId: string;
}
```

## 🎯 フロントエンドパフォーマンス要件

### ページロード時間目標
- **ホームページ**: 初回ロード2秒以内
- **RSVPページ**: インタラクティブまで3秒以内
- **管理画面**: 認証後5秒以内でダッシュボード表示

### Core Web Vitals 目標
- **LCP (Largest Contentful Paint)**: 2.5秒以内
- **FID (First Input Delay)**: 100ms以内
- **CLS (Cumulative Layout Shift)**: 0.1以下

### アニメーション最適化
- **ローディングアニメーション**: 5秒間（Vivus.js）
- **スクロールアニメーション**: 60fps維持
- **カルーセル切り替え**: スムーズトランジション

## 🚀 フロントエンドビルド最適化パターン

### next.config.js設定
```javascript
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components', '@/lib'],
    serverComponentsExternalPackages: ['vegas', 'vivus']
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1週間
    domains: ['sample.domain.com'], // 外部画像ドメイン許可
  },
  
  // Vegas.js などの外部スクリプト最適化
  webpack: (config, { dev, isServer }) => {
    // Vegas.js, Vivus.js の最適化
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'vegas': 'vegas/dist/vegas.min.js',
        'vivus': 'vivus/dist/vivus.min.js'
      };
    }
    
    // SVGアニメーション用のバンドル最適化
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    
    return config;
  }
};
```

### tailwind.config.js 茜色カスタム設定
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        akane: {
          50: '#fef7f7',
          100: '#feeaea',
          200: '#fdd5d5',
          300: '#fab5b5',
          400: '#f58989',
          500: '#e65555', // メイン茜色
          600: '#d73535',
          700: '#b82828',
          800: '#9a2222',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'noto': ['Noto Sans JP', 'sans-serif']
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'zoom-in': 'zoomIn 1s ease-out forwards',
        'loading-svg': 'drawPath 5s ease-out forwards'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        drawPath: {
          '0%': { 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dashoffset': '0' }
        }
      }
    }
  },
  plugins: []
};
```

## 📦 フロントエンドパッケージ管理指示

### 新しい依存関係追加時の確認事項
1. **最新バージョンの確認** - npm outdated でチェック
2. **セキュリティ確認** - npm audit でチェック
3. **バンドルサイズ影響** - @next/bundle-analyzer で確認
4. **型定義の確認** - TypeScript対応状況を確認
5. **アニメーション競合** - 既存のアニメーションライブラリとの競合確認

### 推奨しないパッケージ（フロントエンド）
- jQuery（Reactと競合、Vegas.js は例外的に許可）
- Bootstrap（Tailwind CSSと競合）
- Moment.js（日付操作はnative Date APIを使用）
- styled-components（Tailwind CSS優先）
- Three.js（パフォーマンス懸念、シンプルなSVGアニメーション推奨）

### 推奨パッケージ（フロントエンド）
- **状態管理**: React Hook（useState, useContext）
- **HTTP通信**: 組み込みfetch API
- **日付処理**: native Date API（カウントダウン計算）
- **バリデーション**: Yup + React Hook Form
- **アニメーション**: Framer Motion（React用）+ 専用ライブラリ（Vegas.js, Vivus.js）
- **スタイリング**: Tailwind CSS + カスタム茜色パレット
- **アイコン**: Heroicons, Lucide React
- **ユーティリティ**: clsx, cn（Tailwind CSS クラス結合）

## 🎨 デザインシステム統合

### カラーパレット（茜色テーマ）
```css
:root {
  --color-akane-50: #fef7f7;
  --color-akane-100: #feeaea;
  --color-akane-200: #fdd5d5;
  --color-akane-300: #fab5b5;
  --color-akane-400: #f58989;
  --color-akane-500: #e65555; /* メイン茜色 */
  --color-akane-600: #d73535;
  --color-akane-700: #b82828;
  --color-akane-800: #9a2222;
  --color-akane-900: #7f1d1d;
}
```

### タイポグラフィ階層
```css
.text-hero {
  @apply text-4xl md:text-6xl font-playfair font-bold text-akane-600;
}

.text-section-title {
  @apply text-2xl md:text-4xl font-playfair font-semibold text-akane-500;
}

.text-body {
  @apply text-base md:text-lg font-noto leading-relaxed text-gray-700;
}

.text-caption {
  @apply text-sm font-noto text-gray-500;
}
```

### コンポーネントスタイル例
```typescript
// Button コンポーネント
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  children, 
  onClick, 
  disabled 
}) => {
  const baseStyles = 'font-noto rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-akane-500 text-white hover:bg-akane-600',
    secondary: 'bg-akane-100 text-akane-700 hover:bg-akane-200',
    outline: 'border-2 border-akane-500 text-akane-500 hover:bg-akane-500 hover:text-white'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）- フロントエンド技術スタック
