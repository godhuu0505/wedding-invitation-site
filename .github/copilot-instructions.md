# GitHub Copilot メイン指示書

## 🎯 基本方針
- **日本語で応答すること**
- **必要に応じてユーザに質問し、要求を明確にする**
- コーディング規約を厳守してコードを生成すること
- 命名規則とインデントに特に注意を払うこと
- 実装前には必ずWebで最新情報を検索すること

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
- 計画を立てた後、**必ずユーザに確認を求める**
- フィードバックがあった場合は計画を修正

### ステップ3: 実装
計画にOKが出たら、以下の品質基準に従って実装してください。

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

### 結婚式招待サイト（2025年11月3日）
- **主要機能**: RSVP システム、会場案内、管理画面
- **技術スタック**: Next.js 14 App Router + Firebase Firestore + Tailwind CSS
- **デプロイ**: Vercel（フロントエンド）+ Firebase（バックエンド）

##  コーディング規約

### 命名規則
- **変数名**: キャメルケース (`userName`, `orderId`)
- **定数**: スネークケース (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **関数名**: 動詞から始める + キャメルケース (`getUserProfile`, `calculateTotalPrice`)
- **クラス名**: パスカルケース (`UserService`, `ProductRepository`)

### フォーマット規則
- **インデント**: スペース2つ（タブ禁止）
- **コメント**: 複雑なロジックにはJSDoc形式
- **マジックナンバー**: 定数として定義
- **エラーハンドリング**: 適切な例外処理を実装

## ⚠️ 実装前の必須事項
- **最新情報検索**: 実装・ライブラリ変更前に必ずWeb検索
- **問題解決**: 問題発生時はまずWeb検索（記憶に依存しない）
- **ベストプラクティス**: 最新の技術情報・ベストプラクティスを確認

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）