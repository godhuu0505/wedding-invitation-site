# セットアップガイド

## 開発環境構築

### 前提条件

以下のツールが必要です：

- **Node.js**: 18.0.0 以上
- **npm**: 9.0.0 以上  
- **Git**: 最新版
- **VS Code**: 推奨エディタ

### バージョン確認

```bash
node --version    # v18.0.0+
npm --version     # 9.0.0+
git --version     # 任意
```

## プロジェクトセットアップ

### 1. リポジトリクローン

```bash
git clone https://github.com/your-org/wedding-invitation-site.git
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

`.env.local` を編集：

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

# 管理者設定（開発用）
ADMIN_EMAILS=admin@example.com

# Next.js設定
NEXTAUTH_SECRET=your_development_secret_minimum_32_characters
NEXTAUTH_URL=http://localhost:3000
```

### 4. 開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセスして動作確認。

## Firebase設定

### 1. Firebase プロジェクト作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名: `wedding-invitation-2025`
4. Google Analytics: 有効（推奨）

### 2. Firestore データベース設定

1. Firebase Console → Firestore Database
2. 「データベースの作成」をクリック
3. セキュリティルール: テストモードで開始
4. ロケーション: `asia-northeast1` (東京)

### 3. Authentication 設定

1. Firebase Console → Authentication
2. 「始める」をクリック
3. Sign-in method → Email/Password を有効化
4. 管理者用メールアドレスを Users タブで追加

### 4. Firebase SDK 設定

1. プロジェクト設定（歯車アイコン）
2. 「アプリを追加」→ Web アプリ
3. アプリ名: `wedding-invitation-frontend`
4. Firebase Hosting: 「このアプリ用に Firebase Hosting も設定します」をチェック
5. 設定をコピーして `.env.local` に反映

### 5. セキュリティルール設定

```bash
# Firebase CLI インストール（グローバル）
npm install -g firebase-tools

# ログイン
firebase login

# プロジェクト初期化
firebase init

# 以下を選択：
# ✓ Firestore: Configure security rules and indexes files for Firestore
# ✓ Hosting: Configure files for Firebase Hosting
```

`firestore.rules` ファイルを編集：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 開発中は緩い設定
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

```bash
# ルールをデプロイ
firebase deploy --only firestore:rules
```

## Google Maps API設定

### 1. Google Cloud Console 設定

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成（Firebase プロジェクトを選択）
3. API とサービス → ライブラリ
4. 以下のAPIを有効化：
   - Maps JavaScript API
   - Places API
   - Geocoding API

### 2. API キー作成

1. API とサービス → 認証情報
2. 「認証情報を作成」→ API キー
3. 作成されたキーを制限：
   - アプリケーションの制限: HTTP リファラー
   - 許可するリファラー: 
     - `localhost:3000/*` (開発用)
     - `your-domain.com/*` (本番用)
4. API の制限: 有効化したMaps APIのみ選択

### 3. 環境変数設定

```bash
# .env.local に追加
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key_here
```

## 開発ツール設定

### VS Code 拡張機能

必須拡張機能をインストール：

```bash
# VS Codeで以下を検索・インストール
# 1. TypeScript and JavaScript Language Features (内蔵)
# 2. ES7+ React/Redux/React-Native snippets
# 3. Prettier - Code formatter
# 4. ESLint
# 5. Tailwind CSS IntelliSense
# 6. Auto Rename Tag
# 7. Bracket Pair Colorizer 2
# 8. GitLens
```

### Prettier設定

`.prettierrc` ファイル作成：

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### ESLint設定確認

`package.json` の scripts に以下があることを確認：

```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix"
  }
}
```

## データベース初期設定

### テストデータ投入

開発用のテストデータを投入：

```bash
# Firebase エミュレータ起動（オプション）
firebase emulators:start --only firestore

# 別ターミナルでテストデータ投入スクリプト実行
npm run seed:dev
```

`scripts/seed-dev.js` の例：

```javascript
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Firebase設定（.env.local から読み込み）
const firebaseConfig = {
  // 設定値
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedData() {
  // サンプルRSVPデータ
  const sampleRSVPs = [
    {
      name: '田中太郎',
      furigana: 'たなかたろう',
      email: 'tanaka@example.com',
      attendance: 'yes',
      companions: 1,
      allergies: 'エビアレルギー',
      message: '楽しみにしています！',
      createdAt: new Date(),
    },
    // 他のサンプルデータ...
  ];

  for (const rsvp of sampleRSVPs) {
    await addDoc(collection(db, 'rsvps'), rsvp);
  }

  console.log('テストデータの投入が完了しました');
}

seedData().catch(console.error);
```

## 動作確認

### 基本機能テスト

1. **ホームページ**: http://localhost:3000
   - ページが正常に表示される
   - ナビゲーションが動作する

2. **RSVPフォーム**: http://localhost:3000/rsvp
   - フォームが表示される
   - バリデーションが動作する
   - 送信が成功する

3. **管理画面**: http://localhost:3000/admin
   - ログインフォームが表示される
   - 認証が動作する
   - RSVP データが確認できる

### 接続確認

```bash
# Firebase接続確認
npm run test:firebase

# Google Maps API確認
npm run test:maps

# 全体テスト
npm run test
```

## トラブルシューティング

### よくある問題

#### 1. Firebase接続エラー

**エラー**: `FirebaseError: Firebase: No Firebase App '[DEFAULT]' has been created`

**解決策**:
```bash
# 1. .env.local の設定を確認
cat .env.local

# 2. Firebase設定を再確認
# lib/firebase.ts の初期化コードを確認

# 3. 開発サーバー再起動
npm run dev
```

#### 2. Google Maps API エラー

**エラー**: `Google Maps JavaScript API error: RefererNotAllowedMapError`

**解決策**:
1. Google Cloud Console でAPI キーの制限を確認
2. `localhost:3000` が許可リストに含まれているか確認
3. API キーの有効化状況を確認

#### 3. npm install エラー

**エラー**: `npm ERR! peer dep missing`

**解決策**:
```bash
# キャッシュクリア
npm cache clean --force

# node_modules削除して再インストール
rm -rf node_modules package-lock.json
npm install

# Node.js バージョン確認
node --version  # 18.0.0+ が必要
```

#### 4. TypeScript エラー

**エラー**: `TS2307: Cannot find module`

**解決策**:
```bash
# TypeScript設定確認
npx tsc --noEmit

# 型定義インストール
npm install --save-dev @types/node @types/react @types/react-dom

# VS Code再起動
```

#### 5. Tailwind CSS が効かない

**解決策**:
```bash
# Tailwind設定確認
cat tailwind.config.js

# CSSインポート確認
# globals.css で @tailwind directives が含まれているか確認

# ビルドキャッシュクリア
rm -rf .next
npm run dev
```

### デバッグ方法

#### 1. ブラウザ開発者ツール

- **Console**: JavaScript エラーを確認
- **Network**: API通信を確認
- **Application**: LocalStorage, Cookies を確認

#### 2. Next.js デバッグ

```bash
# デバッグモードで起動
NODE_OPTIONS='--inspect' npm run dev

# Chrome DevTools でデバッグ
# chrome://inspect にアクセス
```

#### 3. Firebase デバッグ

```bash
# Firebase エミュレータでローカルテスト
firebase emulators:start

# ログ確認
firebase functions:log
```

### パフォーマンス確認

```bash
# ビルド時間確認
npm run build

# Bundle サイズ分析
npm run analyze

# Lighthouse でパフォーマンス測定
npx lighthouse http://localhost:3000 --output html
```

### セキュリティチェック

```bash
# 依存関係の脆弱性チェック
npm audit

# 修正可能な脆弱性を自動修正
npm audit fix

# セキュリティホールの手動確認
npm audit --audit-level moderate
```

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日
