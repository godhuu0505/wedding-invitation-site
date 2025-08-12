# Wedding Invitation Site ドキュメント

結婚式の招待状サイトの開発・運用に関する包括的なドキュメントです。

## 📋 ドキュメント構成

### 🎯 プロジェクト基本情報
- **[プロジェクト概要](./technical/project-overview.md)** - 基本情報・スケジュール・学習目標
- **[技術スタック](./technical/tech-stack.md)** - 使用技術・ライブラリ・要件
- **[API仕様](./technical/api-specification.md)** - REST APIエンドポイント・データ仕様

### 📐 設計仕様
- **[ページ仕様](./design/page-specifications.md)** - 画面設計・UI/UX要件
- **[データベース設計](./architecture/database-design.md)** - Firestore スキーマ・クエリ設計
- **[セキュリティ仕様](./architecture/security.md)** - 認証・認可・データ保護

### 🛠️ 開発・運用
- **[セットアップガイド](./development/setup-guide.md)** - 環境構築・初期設定手順
- **[開発ガイド](./development/development-guide.md)** - 開発環境・コーディング規約・テスト
- **[デプロイメント](./development/deployment.md)** - Vercel・Cloud Run・CI/CD
- **[監視・メンテナンス](./development/monitoring.md)** - 監視・ログ・アラート

## 🎯 プロジェクト概要

結婚式（2025年11月3日）の招待状サイトを Next.js + Firebase で開発する学習プロジェクトです。

### 主要機能
- **RSVP システム**: ゲストの出欠確認
- **会場案内**: 地図・アクセス情報
- **管理画面**: RSVP データの確認・管理

### 技術スタック
- **フロントエンド**: Next.js 14, TypeScript, Tailwind CSS
- **バックエンド**: Firebase (Firestore, Authentication)
- **インフラ**: Vercel, Google Cloud Platform
- **その他**: Google Maps API, React Hook Form

## 🚀 クイックスタート

```bash
# リポジトリクローン
git clone <repository-url>
cd wedding-invitation-site

# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env.local
# .env.local を編集

# 開発サーバー起動
npm run dev
```

詳細は [セットアップガイド](./development/setup-guide.md) を参照してください。

## 📁 ディレクトリ構成

```
docs/
├── README.md                           # このファイル
├── design/                             # UI/UX 設計
│   └── page-specifications.md          # 画面仕様・デザイン要件
├── technical/                          # 技術仕様
│   ├── project-overview.md             # プロジェクト基本情報
│   ├── tech-stack.md                   # 技術スタック詳細
│   └── api-specification.md            # API仕様書
├── architecture/                       # システム設計
│   ├── database-design.md              # データベース設計
│   └── security.md                     # セキュリティ仕様
└── development/                        # 開発・運用
    ├── setup-guide.md                 # セットアップガイド
    ├── development-guide.md            # 開発ガイド
    ├── deployment.md                   # デプロイメント手順
    └── monitoring.md                   # 監視・メンテナンス
```

## 🎨 設計方針

### 📱 レスポンシブデザイン
モバイルファーストでデザインし、すべてのデバイスで快適に利用できます。

### 🔒 セキュリティ
個人情報保護と不正アクセス防止を最優先に設計されています。

### ⚡ パフォーマンス
高速な読み込みとスムーズな操作性を実現します。

### ♿ アクセシビリティ
すべてのユーザーが使いやすいインターフェースを提供します。

## 📈 開発フェーズ

### Phase 1: 基盤構築 ✅
- プロジェクト設定
- 基本コンポーネント
- Firebase 設定

### Phase 2: コア機能開発 🚧
- RSVP フォーム
- 管理画面
- 基本UI

### Phase 3: 詳細機能・最適化 📋
- 高度なUI/UX
- パフォーマンス最適化
- テスト充実

### Phase 4: 本番運用準備 📋
- セキュリティ監査
- デプロイ設定
- 監視設定

## 🎓 学習ポイント

このプロジェクトで習得できる技術スキル：

### Frontend (Next.js 14)
- **App Router**: ファイルベースルーティング
- **Server Components**: SSR・SSG の理解
- **TypeScript**: 型安全なコード記述
- **Tailwind CSS**: モダンなスタイリング
- **React Hook Form**: 効率的なフォーム管理

### Backend (GCP/Firebase)
- **Firestore**: NoSQLデータベース設計
- **Firebase Authentication**: 認証システム
- **Cloud Functions**: サーバーレス関数
- **Google Maps API**: 地図サービス統合
- **Cloud Run**: コンテナベースデプロイ

### DevOps/運用
- **Vercel/GCP デプロイ**: 本番環境構築
- **Firebase Security Rules**: データベースセキュリティ
- **レスポンシブデザイン**: モバイルファースト
- **SEO対応**: メタデータ・構造化データ

## 🤝 コントリビューション

開発に参加する際は [開発ガイド](./development/development-guide.md) の規約に従ってください。

## 📞 サポート

質問や課題がある場合は、プロジェクトの Issue で報告してください。

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日
