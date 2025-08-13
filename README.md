# 結婚式招待サイト (Wedding Invitation Website)

Next.js 14 + Firebase Firestore を使った結婚式招待サイトのテンプレートです。
reference-site.htmlのデザインを完全再現し、環境変数によるカスタマイズに対応しています。

## 🎯 特徴

- **完全カスタマイズ可能**: 環境変数で新郎新婦情報を簡単変更
- **モダンなデザイン**: 茜色テーマの和風エレガントデザイン
- **レスポンシブ対応**: モバイル・タブレット・デスクトップ完全対応
- **アニメーション**: Framer Motion + Vegas.js + Vivus.js による美しいアニメーション
- **Firebase連携**: Firestore による RSVP フォーム機能
- **高パフォーマンス**: Next.js 14 App Router による最適化

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14, TypeScript, Tailwind CSS
- **バックエンド**: Firebase Firestore, Cloud Functions
- **アニメーション**: Framer Motion, Vegas.js, Vivus.js
- **認証**: Firebase Authentication
- **デプロイ**: Vercel (フロントエンド), Firebase (バックエンド)
- **スタイリング**: Tailwind CSS (カスタム茜色テーマ)

## 📦 クイックスタート

### 1. リポジトリクローン

```bash
git clone https://github.com/godhuu0505/wedding-invitation-site.git
cd wedding-invitation-site
```

### 2. 依存関係インストール

```bash
npm install
```

### 3. 環境変数設定

```bash
# 環境変数テンプレートをコピー
cp .env.local.example .env.local
```

`.env.local` を編集して新郎新婦情報をカスタマイズ：

```bash
# 新郎情報
NEXT_PUBLIC_GROOM_NAME_EN="あなたの名前"
NEXT_PUBLIC_GROOM_NAME_JP="あなたの漢字名"
NEXT_PUBLIC_GROOM_NAME_FULL_JP="姓 名"

# 新婦情報
NEXT_PUBLIC_BRIDE_NAME_EN="パートナーの名前"
NEXT_PUBLIC_BRIDE_NAME_JP="パートナーの漢字名"
NEXT_PUBLIC_BRIDE_NAME_FULL_JP="姓 名"

# 結婚式情報
NEXT_PUBLIC_WEDDING_DATE="2025-12-31T10:00:00+09:00"
NEXT_PUBLIC_WEDDING_DATE_DISPLAY="2025.12.31"
NEXT_PUBLIC_WEDDING_DATE_JP="2025年12月31日"
NEXT_PUBLIC_WEDDING_DAY_JP="火曜日"

# 式場情報
NEXT_PUBLIC_VENUE_NAME="あなたの式場名"
NEXT_PUBLIC_VENUE_ADDRESS="式場の住所"
```

### 4. 開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

## 🎨 カスタマイズ

### 新郎新婦情報の変更

環境変数でカスタマイズ可能：

```bash
# 基本情報
NEXT_PUBLIC_GROOM_NAME_EN="Taro"
NEXT_PUBLIC_GROOM_NAME_JP="田中太郎"
NEXT_PUBLIC_GROOM_BIRTH_DATE="1990年1月1日"
NEXT_PUBLIC_GROOM_OCCUPATION="エンジニア"
NEXT_PUBLIC_GROOM_HOBBY="プログラミング、読書"
NEXT_PUBLIC_GROOM_MESSAGE="お二人でお越しください"

NEXT_PUBLIC_BRIDE_NAME_EN="Hanako"
NEXT_PUBLIC_BRIDE_NAME_JP="佐藤花子"
NEXT_PUBLIC_BRIDE_BIRTH_DATE="1992年3月15日"
NEXT_PUBLIC_BRIDE_OCCUPATION="デザイナー"
NEXT_PUBLIC_BRIDE_HOBBY="絵画、旅行"
NEXT_PUBLIC_BRIDE_MESSAGE="楽しい時間にしましょう"
```

### 結婚式日程の変更

```bash
NEXT_PUBLIC_WEDDING_DATE="2025-06-15T14:00:00+09:00"
NEXT_PUBLIC_WEDDING_DATE_DISPLAY="2025.06.15"
NEXT_PUBLIC_WEDDING_DATE_JP="2025年6月15日"
NEXT_PUBLIC_WEDDING_DAY_JP="日曜日"
NEXT_PUBLIC_CEREMONY_TIME_DISPLAY="午後2時"
NEXT_PUBLIC_RECEPTION_TIME_DISPLAY="午後3時30分"
```

### 式場情報の変更

```bash
NEXT_PUBLIC_VENUE_NAME="ホテルオークラ東京"
NEXT_PUBLIC_VENUE_ADDRESS="東京都港区虎ノ門2-10-4"
NEXT_PUBLIC_VENUE_LAT="35.6668"
NEXT_PUBLIC_VENUE_LNG="139.7378"
```

## 🚀 デプロイ

### Vercel (推奨)

```bash
# Vercel CLI インストール
npm install -g vercel

# デプロイ
vercel

# 環境変数設定
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# 他の環境変数も同様に設定
```

### Firebase Hosting

```bash
# Firebase CLI インストール
npm install -g firebase-tools

# ログイン
firebase login

# ビルド
npm run build

# デプロイ
firebase deploy
```

## 📂 プロジェクト構造

```
wedding-invitation-site/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # グローバルレイアウト
│   └── page.tsx           # メインページ
├── components/             # Reactコンポーネント
│   ├── layout/            # レイアウトコンポーネント
│   │   ├── LoadingScreen.tsx
│   │   └── Navigation.tsx
│   └── sections/          # セクションコンポーネント
│       ├── HeaderSection.tsx
│       ├── MessageSection.tsx
│       └── CountdownSection.tsx
├── lib/                   # ユーティリティ・設定
│   ├── env.ts            # 環境変数管理
│   ├── firebase.ts       # Firebase設定
│   └── types/            # TypeScript型定義
├── styles/               # スタイルファイル
│   └── globals.css       # グローバルCSS（Tailwind）
├── docs/                 # ドキュメント
│   ├── development/      # 開発ガイド
│   └── design/          # デザイン仕様
├── .env.local.example    # 環境変数テンプレート
└── README.md
```

## 🎭 アニメーション機能

### ローディングアニメーション
- **Vivus.js**: SVG描画アニメーション（5秒間）
- **プログレスバー**: リアルタイム進行状況表示

### 背景カルーセル
- **Vegas.js**: 背景画像のスライド切り替え
- **Ken Burns効果**: 写真のズームアニメーション
- **Gradient Fallback**: 画像なしでも美しいグラデーション

### スクロールアニメーション
- **Framer Motion**: セクション間のスムーズな遷移
- **ScrollTrigger**: スクロール連動アニメーション

## 📱 レスポンシブデザイン

- **モバイル**: 320px～767px
- **タブレット**: 768px～1023px
- **デスクトップ**: 1024px以上
- **Ultra Wide**: 1920px以上

全画面サイズで最適化されたレイアウト

## 🔧 開発コマンド

```bash
# 開発環境起動
npm run dev

# 本番ビルド
npm run build

# 本番環境テスト
npm run start

# コード品質チェック
npm run lint
npm run type-check

# 依存関係更新
npm update
```

## 📋 環境変数一覧

### 必須設定

```bash
# Firebase設定
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# 新郎新婦情報（必須）
NEXT_PUBLIC_GROOM_NAME_EN=
NEXT_PUBLIC_GROOM_NAME_JP=
NEXT_PUBLIC_BRIDE_NAME_EN=
NEXT_PUBLIC_BRIDE_NAME_JP=

# 結婚式情報（必須）
NEXT_PUBLIC_WEDDING_DATE=
NEXT_PUBLIC_VENUE_NAME=
NEXT_PUBLIC_VENUE_ADDRESS=
```

### オプション設定

```bash
# Google Maps API（Maps表示用）
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# アニメーション制御
NEXT_PUBLIC_ENABLE_LOADING_ANIMATION=true
NEXT_PUBLIC_LOADING_DURATION=5000

# カスタムメッセージ
NEXT_PUBLIC_GROOM_MESSAGE=
NEXT_PUBLIC_BRIDE_MESSAGE=
```

## 🤝 コントリビューション

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 📞 サポート

- **ドキュメント**: [docs/](docs/) フォルダ内の詳細ガイド
- **Issues**: GitHub Issues でバグ報告・機能要請
- **Discussions**: 使用方法やカスタマイズに関する質問

---

**作成日**: 2025年8月13日  
**対象**: 結婚式招待サイトテンプレート（環境変数対応版）

````
