# 技術スタック指示書

## 📋 技術スタック概要

### フロントエンド
- **フレームワーク**: Next.js 14 (App Router) - モダンなReactフレームワーク
- **言語**: TypeScript 5.1.6 - 型安全性とコード品質向上
- **UIフレームワーク**: Tailwind CSS 3.3.2 - ユーティリティファーストCSS
- **フォーム管理**: React Hook Form + Yup - バリデーション付きフォーム

### バックエンド
- **サーバーレス**: Firebase Functions
- **データベース**: Firebase Firestore - NoSQLデータベース
- **認証**: Firebase Authentication（管理画面用）

### 外部サービス
- **マップ表示**: Google Maps API - 会場アクセス情報
- **デプロイ**: Vercel（フロントエンド）
- **ドメイン**: Google Domains

## 🔧 依存関係管理

### 本番依存関係
```json
{
  "dependencies": {
    "firebase": "^10.0.0",
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.45.0",
    "yup": "^1.2.0",
    "@hookform/resolvers": "^3.1.0",
    "@googlemaps/js-api-loader": "^1.16.0"
  }
}
```

### 開発依存関係
```json
{
  "devDependencies": {
    "@types/react": "19.1.10",
    "@types/node": "^20.0.0",
    "@types/google.maps": "^3.53.0",
    "autoprefixer": "10.4.14",
    "postcss": "8.4.24",
    "tailwindcss": "3.3.2",
    "typescript": "5.1.6",
    "eslint": "^8.50.0",
    "eslint-config-next": "14.0.0"
  }
}
```

## 📱 ブラウザサポート

### デスクトップ
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### モバイル
- iOS Safari 14+
- Android Chrome 90+
- Samsung Internet 15+

### 対応解像度
- **モバイル**: 320px〜767px
- **タブレット**: 768px〜1023px
- **デスクトップ**: 1024px〜

## 🏗️ アーキテクチャパターン

### Next.js 14 App Router構成
```
app/                    # Next.js 14 App Router
├── page.tsx           # ホームページ
├── layout.tsx         # 共通レイアウト
└── rsvp/
    └── submit.ts      # API Routes

components/             # 再利用可能コンポーネント
├── RSVPForm.tsx       # フォームコンポーネント
└── *.tsx

lib/                   # ユーティリティ・設定
└── firebase.ts        # Firebase設定
```

### API設計パターン
```typescript
// app/rsvp/submit.ts の実装パターン
export async function POST(req: NextRequest) {
  const body = await req.json();
  // Firestore操作
  await addDoc(collection(db, 'rsvps'), data);
  return new Response('OK', { status: 200 });
}
```

## 🎨 コンポーネント設計パターン

### React Hook Form + Yup パターン
```typescript
// フロントエンド（React Hook Form + Yup）
const rsvpSchema = yup.object({
  name: yup.string().required().max(50)
    .matches(/^[\p{L}\p{N}\s\-\.]+$/u),
  email: yup.string().email().required().max(100),
  attendance: yup.string().oneOf(['yes', 'no']).required()
});
```

### TypeScript インターフェース定義
```typescript
interface RSVPFormProps {
  onSubmit: (data: RSVPFormData) => void;
  isLoading?: boolean;
  error?: string;
}

interface RSVPData {
  name: string;
  furigana: string;
  email: string;
  attendance: 'yes' | 'no';
  companions: number;
  allergies?: string;
  message?: string;
  timestamp: Timestamp;
}
```

## 🎯 パフォーマンス要件

### ページロード時間目標
- **ホームページ**: 初回ロード2秒以内
- **RSVPページ**: インタラクティブまで3秒以内
- **管理画面**: 認証後5秒以内でダッシュボード表示

### Core Web Vitals 目標
- **LCP (Largest Contentful Paint)**: 2.5秒以内
- **FID (First Input Delay)**: 100ms以内
- **CLS (Cumulative Layout Shift)**: 0.1以下

## 🚀 ビルド最適化パターン

### next.config.js設定
```javascript
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components', '@/lib']
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1週間
  }
};
```

## 📦 パッケージ管理指示

### 新しい依存関係追加時の確認事項
1. **最新バージョンの確認** - npm outdated でチェック
2. **セキュリティ確認** - npm audit でチェック
3. **バンドルサイズ影響** - @next/bundle-analyzer で確認
4. **型定義の確認** - TypeScript対応状況を確認

### 推奨しないパッケージ
- jQuery（Reactと競合）
- Bootstrap（Tailwind CSSと競合）
- Moment.js（日付操作はnative Date APIを使用）

### 推奨パッケージ
- **状態管理**: React Hook（useState, useContext）
- **HTTP通信**: 組み込みfetch API
- **日付処理**: native Date API
- **バリデーション**: Yup + React Hook Form

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）
