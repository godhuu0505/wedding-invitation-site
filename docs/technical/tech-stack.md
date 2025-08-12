# 技術仕様

## 技術スタック（学習目的重視）

### フロントエンド
- **フレームワーク**: Next.js 14 (App Router) - モダンなReactフレームワーク
- **言語**: TypeScript 5.1.6 - 型安全性とコード品質向上
- **UIフレームワーク**: Tailwind CSS 3.3.2 - ユーティリティファーストCSS
- **フォーム管理**: React Hook Form + Yup - バリデーション付きフォーム

### バックエンド
- **サーバーレス**: GCP Cloud Functions または Firebase Functions
- **データベース**: Firebase Firestore - NoSQLデータベース
- **認証**: Firebase Authentication（管理画面用）

### 外部サービス
- **マップ表示**: Google Maps API - 会場アクセス情報
- **デプロイ**: GCP Cloud Run（学習優先）または Vercel
- **ドメイン**: Google Domains または お名前.com

## 依存関係

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
    "@googlemaps/js-api-loader": "^1.16.0",
    "zustand": "^4.4.0"
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
    "eslint-config-next": "14.0.0",
    "prettier": "^3.0.0"
  }
}
```

## ブラウザサポート

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

## 環境設定

### 必要な環境変数
```bash
# Firebase設定
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""

# 管理者設定
ADMIN_EMAIL=""
ADMIN_PASSWORD=""

# 会場情報
NEXT_PUBLIC_VENUE_NAME="東京ベイサイドホテル"
NEXT_PUBLIC_VENUE_ADDRESS="東京都港区台場1-1-1"
NEXT_PUBLIC_VENUE_LAT="35.6321"
NEXT_PUBLIC_VENUE_LNG="139.7736"

# 結婚式詳細
NEXT_PUBLIC_WEDDING_DATE="2025-11-03"
NEXT_PUBLIC_CEREMONY_TIME="13:00"
NEXT_PUBLIC_RECEPTION_TIME="15:00"
```

### Firebase設定詳細
1. **プロジェクト作成**: `wedding-invitation-2025`
2. **Firestore Database**: `asia-northeast1` リージョン
3. **Authentication**: メール・パスワード認証有効化
4. **Storage**: 画像アップロード用（将来拡張）
5. **Hosting**: 本番デプロイ用（オプション）

### Google Cloud設定
1. **Google Maps API**: JavaScript API、Places API有効化
2. **Cloud Functions**: メール通知用（SendGrid連携）
3. **Cloud Storage**: 画像・ファイル保存用

## パフォーマンス要件

### ページロード時間目標
- **ホームページ**: 初回ロード2秒以内
- **RSVPページ**: インタラクティブまで3秒以内
- **管理画面**: 認証後5秒以内でダッシュボード表示

### Core Web Vitals 目標
- **LCP (Largest Contentful Paint)**: 2.5秒以内
- **FID (First Input Delay)**: 100ms以内
- **CLS (Cumulative Layout Shift)**: 0.1以下

### SEO対策
- **メタデータ**: 各ページに適切なtitle、description設定
- **構造化データ**: Schema.org Event マークアップ
- **OGP設定**: SNSシェア用画像・テキスト
- **サイトマップ**: 自動生成（next-sitemap）

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日
