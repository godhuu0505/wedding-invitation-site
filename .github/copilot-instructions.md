# GitHub Copilot メイン指示書

## 🎯 基本方針
- **日本語で応答すること**
- **必要に応じてユーザに質問し、要求を明確にする**
- コーディング規約を厳守してコードを生成すること
- 命名規則とインデントに特に注意を払うこと
- 実装前には必要に応じてWebで最新情報を検索すること

## 📋 開発プロセス

### ステップ1: 計画立案
ユーザの指示に対して、まず実装計画を立ててください。

**計画時の必須確認事項:**
- リポジトリ全般に関わることは、**必ず`docs/**.md`内のドキュメントを参照**
- ユーザの指示が不明瞭な場合は、必要な情報を質問して明確化

**計画に含めるべき内容:**
- 実装手順の明確化
- 必要な機能の洗い出し
- 使用する技術・ライブラリの選定

### ステップ2: 計画確認
- 計画を立てた後、**重要な変更がある場合は、必ずユーザに確認を求める**
- フィードバックがあった場合は計画を修正

### ステップ3: 実装
以下の品質基準に従って実装してください。

## 🔗 専門指示書の参照

### 技術分野別の詳細指示
実装時は、以下の専門指示書を必ず参照してください：

- **技術スタック**: `.github/instructions/tech-stack.instructions.md`
- **Firebase統合**: `.github/instructions/firebase.instructions.md`
- **セキュリティ**: `.github/instructions/security.instructions.md`
- **データベース**: `.github/instructions/database.instructions.md`
- **デプロイメント**: `.github/instructions/deployment.instructions.md`
- **開発環境**: `.github/instructions/development.instructions.md`
- **アーキテクチャ**: `.github/instructions/architecture.instructions.md`
- **コミット規約**: `.github/instructions/commit-message.instructions.md`

### 指示書の使い方
1. **実装前**: 関連する指示書を確認
2. **実装中**: パターンやベストプラクティスに従う
3. **実装後**: チェックリストで品質確認

## 🏗️ プロジェクト概要

### 結婚式招待サイト（2025年11月3日）- reference-site.html完全再現版
- **デザインコンセプト**: reference-site.htmlの見た目を100%再現する和風エレガントサイト
- **新郎新婦**: Naoto（伊藤 尚人）& Yui（小林 結衣）
- **テーマカラー**: 茜色（#e65555）
- **デザインスタイル**: モダン和風・エレガント

#### 主要セクション
1. **ローディング画面**: SVGアニメーション（5秒間）
2. **ヘッダー**: カルーセル背景 + カップル名表示
3. **メッセージ**: 挨拶文 + 新郎新婦紹介
4. **カウントダウン**: 結婚式まで残り日数表示
5. **式場案内**: 挙式・披露宴情報 + Google Maps
6. **出欠確認**: 包括的なRSVPフォーム
7. **フッター**: ナビゲーション + 法的情報

#### 技術スタック
- **フロントエンド**: Next.js 14 App Router + TypeScript + Tailwind CSS
- **アニメーション**: Framer Motion + Vegas.js + Vivus.js + ScrollTrigger
- **バックエンド**: Firebase Firestore + Cloud Functions
- **認証**: Firebase Authentication
- **デプロイ**: Vercel（フロントエンド）+ Firebase（バックエンド）
- **フォーム**: React Hook Form + Yup バリデーション

##  コーディング規約

### 命名規則
- **変数名**: キャメルケース (`userName`, `orderData`, `isMenuOpen`)
- **定数**: スネークケース (`MAX_RETRIES`, `DEFAULT_TIMEOUT`, `WEDDING_DATE`)
- **関数名**: 動詞から始める + キャメルケース (`getUserProfile`, `calculateDaysLeft`, `handleFormSubmit`)
- **クラス名**: パスカルケース (`UserService`, `RSVPForm`, `LoadingScreen`)
- **コンポーネント名**: パスカルケース (`HeaderSection`, `MessageSection`, `CountdownSection`)

### ファイル命名規則
```
components/
├── ui/           # Button.tsx, Input.tsx, Modal.tsx
├── layout/       # Header.tsx, Navigation.tsx, Footer.tsx
├── sections/     # HeroSection.tsx, MessageSection.tsx
└── forms/        # RSVPForm.tsx, ContactForm.tsx

pages/sections/   # 各セクションは大文字開始
└── MessageSection/
    ├── index.tsx
    ├── ProfileCard.tsx
    └── GreetingText.tsx
```

### カラークラス命名（Tailwind CSS）
```css
/* 茜色系統 */
bg-akane-50   /* 最薄い茜色 */
bg-akane-500  /* メイン茜色 */
bg-akane-900  /* 最も濃い茜色 */

text-akane-500  /* 茜色テキスト */
border-akane-500  /* 茜色ボーダー */
```

### フォーマット規則
- **インデント**: スペース2つ（タブ禁止）
- **コメント**: 複雑なロジックにはJSDoc形式
- **マジックナンバー**: 定数として定義
- **エラーハンドリング**: 適切な例外処理を実装
- **CSS**: Tailwind CSS優先、カスタムCSSは最小限

## ⚠️ 実装前の必須事項
- **最新情報検索**: 実装・ライブラリ変更前に必ずWeb検索
- **問題解決**: 問題発生時はまずWeb検索（記憶に依存しない）
- **ベストプラクティス**: 最新の技術情報・ベストプラクティスを確認

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）