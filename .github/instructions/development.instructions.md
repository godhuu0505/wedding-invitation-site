---
applyTo: "{package.json,next.config.js,tailwind.config.js,tsconfig.json,.env*}"
---

# 開発環境指示書

## 🔧 開発環境構築

### 前提条件
- **Node.js**: 18.0.0 以上
- **npm**: 9.0.0 以上  
- **Git**: 最新版
- **VS Code**: 推奨エディタ

### 環境確認コマンド
```bash
node --version    # v18.0.0+
npm --version     # 9.0.0+
git --version     # 任意
```

## 📂 プロジェクトセットアップ

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
cp .env.example .env.local
```

#### 必須環境変数（開発用 - reference-site.html完全対応）
```bash
# Firebase設定
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key

# 新郎新婦情報（Figmaデザイン & reference-site.html対応）
NEXT_PUBLIC_GROOM_NAME_EN="Naoto"
NEXT_PUBLIC_GROOM_NAME_JP="伊藤尚人"
NEXT_PUBLIC_GROOM_NAME_FULL_JP="伊藤 尚人"
NEXT_PUBLIC_GROOM_BIRTH_DATE="1995年3月1日"
NEXT_PUBLIC_GROOM_BIRTH_PLACE="東京都"
NEXT_PUBLIC_GROOM_BLOOD_TYPE="A型"
NEXT_PUBLIC_GROOM_OCCUPATION="会社員"
NEXT_PUBLIC_GROOM_HOBBY="アウトドアが好きで\\n週末は少し遠くまで出かけます\\n犬が大好きです"
NEXT_PUBLIC_GROOM_MESSAGE="美味しい料理・お酒を用意してお待ちしております\\n当日皆様にお会いできることを\\n心より楽しみにしております"
NEXT_PUBLIC_GROOM_PHOTO="/images/profiles/groom-photo.webp"

# 新婦情報（Figmaデザイン & reference-site.html対応）
NEXT_PUBLIC_BRIDE_NAME_EN="Yui"
NEXT_PUBLIC_BRIDE_NAME_JP="小林結衣"
NEXT_PUBLIC_BRIDE_NAME_FULL_JP="小林 結衣"
NEXT_PUBLIC_BRIDE_BIRTH_DATE="1995年6月5日"
NEXT_PUBLIC_BRIDE_BIRTH_PLACE="東京都"
NEXT_PUBLIC_BRIDE_BLOOD_TYPE="B型"
NEXT_PUBLIC_BRIDE_OCCUPATION="保育士"
NEXT_PUBLIC_BRIDE_HOBBY="子どもと猫が大好きです\\n週末は美味しいご飯を食べに出かけます"
NEXT_PUBLIC_BRIDE_MESSAGE="たくさん食べてたくさん飲んで\\n楽しい時間にしたいと思っています\\n当日皆様にお会いできることを\\n心より楽しみにしております"
NEXT_PUBLIC_BRIDE_PHOTO="/images/profiles/bride-photo.webp"

# 結婚式情報（2025年11月3日設定）
NEXT_PUBLIC_WEDDING_DATE="2025-11-03T10:00:00+09:00"
NEXT_PUBLIC_WEDDING_DATE_DISPLAY="2025.11.03"
NEXT_PUBLIC_WEDDING_DATE_JP="2025年11月3日"
NEXT_PUBLIC_WEDDING_DAY_JP="日曜日"
NEXT_PUBLIC_CEREMONY_TIME="10:00"
NEXT_PUBLIC_CEREMONY_TIME_DISPLAY="午前10時"
NEXT_PUBLIC_RECEPTION_TIME="12:30"
NEXT_PUBLIC_RECEPTION_TIME_DISPLAY="午後12時30分"
NEXT_PUBLIC_RSVP_DEADLINE="2025-10-20"
NEXT_PUBLIC_RSVP_DEADLINE_DISPLAY="2025年10月20日"

# 挙式会場情報
NEXT_PUBLIC_CEREMONY_VENUE_NAME="東京ベイサイドホテル チャペル"
NEXT_PUBLIC_CEREMONY_VENUE_ADDRESS="東京都港区台場1-1-1"
NEXT_PUBLIC_CEREMONY_VENUE_PHONE="03-1234-5678"
NEXT_PUBLIC_CEREMONY_LAT="35.6321"
NEXT_PUBLIC_CEREMONY_LNG="139.7736"

# 披露宴会場情報
NEXT_PUBLIC_RECEPTION_VENUE_NAME="東京ベイサイドホテル バンケットホール"
NEXT_PUBLIC_RECEPTION_VENUE_ADDRESS="東京都港区台場1-1-1"
NEXT_PUBLIC_RECEPTION_VENUE_PHONE="03-1234-5678"
NEXT_PUBLIC_RECEPTION_LAT="35.6321"
NEXT_PUBLIC_RECEPTION_LNG="139.7736"

# サイトメタデータ
NEXT_PUBLIC_SITE_TITLE="Naoto & Yui Wedding Invitation - 2025.11.03"
NEXT_PUBLIC_SITE_DESCRIPTION="伊藤尚人・小林結衣の結婚式招待サイトです。2025年11月3日、東京ベイサイドホテルにて。皆様のご出席をお待ちしております。"
NEXT_PUBLIC_SITE_URL="https://wedding-invitation-site.com"
NEXT_PUBLIC_OG_IMAGE="/images/og-image.webp"

# デザインテーマ（Figma茜色テーマ）
NEXT_PUBLIC_THEME_PRIMARY_COLOR="#e65555"
NEXT_PUBLIC_THEME_SECONDARY_COLOR="#d73535"
NEXT_PUBLIC_THEME_ACCENT_COLOR="#f58989"
NEXT_PUBLIC_THEME_BACKGROUND_COLOR="#fef7f7"
NEXT_PUBLIC_THEME_TEXT_COLOR="#2d2d2d"

# フォント設定（和風エレガント）
NEXT_PUBLIC_FONT_PRIMARY="Playfair Display"
NEXT_PUBLIC_FONT_JAPANESE="Noto Serif JP"
NEXT_PUBLIC_FONT_UI="Noto Sans JP"

# アニメーション設定（Figmaベース）
NEXT_PUBLIC_ENABLE_LOADING_ANIMATION=true
NEXT_PUBLIC_LOADING_DURATION=5000
NEXT_PUBLIC_ENABLE_SCROLL_ANIMATIONS=true
NEXT_PUBLIC_ENABLE_CAROUSEL=true
NEXT_PUBLIC_CAROUSEL_TRANSITION_DURATION=2000
NEXT_PUBLIC_SCROLL_ANIMATION_THRESHOLD=0.1

# 背景画像設定（Figmaから生成・カルーセル用）
NEXT_PUBLIC_CAROUSEL_IMAGE_1="/images/backgrounds/hero-bg-1.webp"
NEXT_PUBLIC_CAROUSEL_IMAGE_2="/images/backgrounds/hero-bg-2.webp"
NEXT_PUBLIC_CAROUSEL_IMAGE_3="/images/backgrounds/hero-bg-3.webp"
NEXT_PUBLIC_LOADING_ANIMATION_SVG="/images/animations/loading-animation.svg"

# RSVP設定（reference-site.html準拠）
NEXT_PUBLIC_RSVP_ENABLE_PHONE=true
NEXT_PUBLIC_RSVP_ENABLE_ADDRESS=true
NEXT_PUBLIC_RSVP_ENABLE_AGE_CATEGORY=true
NEXT_PUBLIC_RSVP_MAX_MESSAGE_LENGTH=500
NEXT_PUBLIC_RSVP_REQUIRE_KANA=false
NEXT_PUBLIC_EXPECTED_GUEST_COUNT=100

# 通知設定
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_NOTIFICATION_EMAIL=admin@example.com
CONFIRMATION_EMAIL_TEMPLATE_ID=d-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 開発・テスト設定
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
NEXT_PUBLIC_ENABLE_DEBUG_MODE=true
NEXT_PUBLIC_MOCK_DATA_ENABLED=false
NEXT_PUBLIC_ENABLE_CONSOLE_LOGS=true

# パフォーマンス設定
NEXT_PUBLIC_ENABLE_PRELOAD_IMAGES=true
NEXT_PUBLIC_OPTIMIZE_ANIMATIONS=true
NEXT_PUBLIC_LAZY_LOAD_THRESHOLD=0.1
NEXT_PUBLIC_IMAGE_QUALITY=80

# セキュリティ設定
NEXT_PUBLIC_ENABLE_RATE_LIMITING=true
NEXT_PUBLIC_MAX_RSVP_PER_EMAIL=1
NEXT_PUBLIC_ENABLE_DUPLICATE_CHECK=true

# 分析・監視設定
NEXT_PUBLIC_ENABLE_ANALYTICS=true
VERCEL_ANALYTICS_ID=your_vercel_analytics_id
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id

# Next.js設定
NEXTAUTH_SECRET=your_development_secret_minimum_32_characters_long
NEXTAUTH_URL=http://localhost:3000
```

### 4. 開発サーバー起動
```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセスして動作確認。

## 🛠️ 開発コマンド

### 必須コマンド（reference-site.html開発対応）
```bash
# 開発環境起動
npm run dev                 # ローカル開発サーバー起動（ホットリロード対応）

# ビルド・テスト
npm run build              # 本番ビルド（アニメーション最適化込み）
npm run start              # 本番環境でのローカル起動
npm run lint               # ESLintチェック（TypeScript + JSX）
npm run type-check         # TypeScript型チェック

# アニメーション関連
npm run dev:animations     # アニメーション集約確認モード
npm run test:loading       # ローディングアニメーション確認
npm run optimize:images    # 画像最適化（Next.js Image Optimization）

# パフォーマンス
npm run analyze            # Bundle分析（webpack-bundle-analyzer）
npm run lighthouse         # Lighthouse パフォーマンステスト
npm run speed-test         # ページ速度テスト
```

### Firebase関連コマンド
```bash
# Firebase エミュレータ（reference-site.html対応データ構造）
firebase emulators:start --only firestore
firebase emulators:start --only firestore,auth

# Firebase設定・ルールデプロイ
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes

# テストデータ投入（reference-site.html構造対応）
npm run seed:dev           # 開発用テストRSVPデータ投入
npm run seed:wedding-data  # 結婚式情報の初期データ投入
npm run clear:dev-data     # 開発用データクリア

# Firebase CLI インストール（グローバル）
npm install -g firebase-tools
firebase login
firebase use wedding-invitation-site
```

### デバッグコマンド（詳細版）
```bash
# デバッグモードで起動
NODE_OPTIONS='--inspect' npm run dev

# アニメーションデバッグ
npm run debug:animations   # Framer Motion, Vegas.js, Vivus.js確認
npm run debug:carousel     # 背景カルーセル確認
npm run debug:scroll       # ScrollTrigger確認

# Bundle分析（詳細）
npm run analyze:client     # クライアントサイドBundle分析
npm run analyze:server     # サーバーサイドBundle分析

# パフォーマンス測定
npx lighthouse http://localhost:3000 --output html --chrome-flags="--headless"
npm run check:core-vitals  # Core Web Vitals チェック

# 依存関係チェック（アニメーションライブラリ含む）
npm audit                  # 脆弱性チェック
npm run check:deps         # 依存関係の更新確認
npm run check:licenses     # ライセンス確認
```

## 🏗️ VS Code 設定

### 必須拡張機能
インストール推奨の拡張機能：

```json
// .vscode/extensions.json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json",
    "firebase.vscode-firebase-explorer"
  ]
}
```

### ワークスペース設定
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"],
    ["classNames\\(([^)]*)\\)", "'([^']*)'"]
  ]
}
```

### デバッグ設定
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

## 🔍 コード品質設定

### Prettier設定
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf"
}
```

### ESLint設定確認
```json
// .eslintrc.json（Next.jsで自動生成）
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

### TypeScript設定最適化
```json
// tsconfig.json（追加設定）
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/styles/*": ["styles/*"]
    },
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 🧪 テスト環境（将来拡張用）

### Jest設定（将来追加時）
```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

### テスト関連コマンド
```bash
# 将来追加予定のテストコマンド
npm test                  # Jest単体テスト
npm run test:watch        # テスト監視モード
npm run test:coverage     # カバレッジレポート
npm run test:e2e         # Playwright E2Eテスト
```

## 🔥 Firebase エミュレータ設定

### エミュレータ設定
```json
// firebase.json
{
  "emulators": {
    "firestore": {
      "port": 8080
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

### エミュレータ使用手順
```bash
# 1. エミュレータ起動
firebase emulators:start --only firestore

# 2. 別ターミナルで開発サーバー起動
npm run dev

# 3. エミュレータUIアクセス
# http://localhost:4000

# 4. アプリからエミュレータ接続
# .env.local に以下を追加（開発時のみ）
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

### テストデータ投入（reference-site.html対応）
```bash
# テストデータ投入スクリプト実行
npm run seed:dev                    # 基本RSVPテストデータ
npm run seed:wedding-data           # 結婚式設定データ
npm run seed:comprehensive          # 包括的テストデータ（全パターン）

# エミュレータデータをエクスポート
firebase emulators:export ./firebase-export

# エクスポートしたデータをインポート
firebase emulators:start --import ./firebase-export

# 特定データセット投入
npm run seed:allergy-guests         # アレルギー有りゲストデータ
npm run seed:international-guests   # 海外ゲストデータ（ローマ字名重視）
npm run seed:family-guests          # 家族ゲストデータ（子供・幼児含む）
```

### テストデータ作成スクリプト例
```typescript
// scripts/seed-comprehensive.ts
const comprehensiveTestData = [
  {
    status: 1,
    guest_side: 0,
    jpn_family_name: "田中",
    jpn_first_name: "太郎",
    kana_family_name: "たなか",
    kana_first_name: "たろう",
    rom_family_name: "Tanaka", 
    rom_first_name: "Taro",
    email: "tanaka.taro@example.com",
    age_category: 0,
    allergy_flag: 1,
    allergy: "エビ、カニ",
    guest_message: "おめでとうございます！楽しみにしています。"
  },
  {
    status: 1,
    guest_side: 1,
    jpn_family_name: "佐藤",
    jpn_first_name: "花子",
    kana_family_name: "さとう",
    kana_first_name: "はなこ",
    rom_family_name: "Sato",
    rom_first_name: "Hanako", 
    email: "sato.hanako@example.com",
    phone_number: "090-1234-5678",
    zipcode: "150-0001",
    address: "東京都渋谷区神宮前1-1-1",
    age_category: 0,
    allergy_flag: 0,
    guest_message: "結婚おめでとう！お幸せに！"
  },
  {
    status: 1,
    guest_side: 0,
    jpn_family_name: "山田",
    jpn_first_name: "次郎",
    rom_family_name: "Yamada",
    rom_first_name: "Jiro",
    email: "yamada.jiro@example.com",
    age_category: 1, // 子供
    allergy_flag: 1,
    allergy: "小麦、乳製品",
    guest_message: ""
  },
  {
    status: 2, // 欠席
    guest_side: 1,
    jpn_family_name: "鈴木",
    jpn_first_name: "三郎",
    kana_family_name: "すずき",
    kana_first_name: "さぶろう",
    rom_family_name: "Suzuki",
    rom_first_name: "Saburo",
    email: "suzuki.saburo@example.com",
    age_category: 0,
    allergy_flag: 0,
    guest_message: "残念ながら参加できません。お二人の幸せをお祈りしています。"
  }
];
```

## 🔧 トラブルシューティング

### よくある問題と解決策

#### 1. Firebase接続エラー
```bash
# エラー: Firebase: No Firebase App '[DEFAULT]' has been created

# 解決策:
# 1. .env.local の設定を確認
cat .env.local

# 2. Firebase設定を再確認
# lib/firebase.ts の初期化コードを確認

# 3. 開発サーバー再起動
npm run dev
```

#### 2. Google Maps API エラー
```bash
# エラー: RefererNotAllowedMapError

# 解決策:
# 1. Google Cloud Console でAPI キーの制限を確認
# 2. localhost:3000 が許可リストに含まれているか確認
# 3. API キーの有効化状況を確認
```

#### 3. npm install エラー
```bash
# 解決策:
# キャッシュクリア
npm cache clean --force

# node_modules削除して再インストール
rm -rf node_modules package-lock.json
npm install

# Node.js バージョン確認
node --version  # 18.0.0+ が必要
```

#### 4. TypeScript エラー
```bash
# 解決策:
# TypeScript設定確認
npx tsc --noEmit

# 型定義インストール
npm install --save-dev @types/node @types/react @types/react-dom

# VS Code再起動
```

#### 5. Tailwind CSS が効かない
```bash
# 解決策:
# Tailwind設定確認
cat tailwind.config.js

# CSSインポート確認（globals.css）
# @tailwind directives が含まれているか確認

# ビルドキャッシュクリア
rm -rf .next
npm run dev
```

### パフォーマンス確認
```bash
# ビルド時間確認
time npm run build

# Bundle サイズ分析
npm run analyze

# メモリ使用量確認
npm run dev -- --max-old-space-size=4096
```

### セキュリティチェック
```bash
# 依存関係の脆弱性チェック
npm audit

# 修正可能な脆弱性を自動修正
npm audit fix

# 環境変数漏洩チェック
grep -r "NEXT_PUBLIC" . --exclude-dir=node_modules
```

## 📝 開発ワークフロー

### 1. 機能開発フロー
```bash
# 1. 最新のmainブランチから開発ブランチ作成
git checkout main
git pull origin main
git checkout -b feature/rsvp-form-enhancement

# 2. 開発・テスト
npm run dev
npm run lint
npm run type-check

# 3. コミット（Conventional Commits形式）
git add .
git commit -m "feat: RSVP フォームにアレルギー項目を追加"

# 4. プッシュ・プルリクエスト
git push origin feature/rsvp-form-enhancement
```

### 2. バグ修正フロー
```bash
# 1. hotfixブランチ作成
git checkout main
git checkout -b hotfix/form-validation-bug

# 2. 修正・テスト
npm run dev
npm run lint

# 3. コミット
git commit -m "fix: RSVPフォームのメール検証バグを修正"

# 4. マージ
git checkout main
git merge hotfix/form-validation-bug
git push origin main
```

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）
