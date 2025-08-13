# プロジェクト概要

## 基本情報

### プロジェクト名
**Wedding Invitation Website** - 結婚式招待サイト（2025年11月3日・reference-site.html完全再現版）

### 目的
- **プライマリ目的**: reference-site.htmlの完全再現による結婚式招待サイト構築
- **セカンダリ目的**: Next.js 14・Firebase・Figmaデザインシステムの実践的実装
- **デザイン品質**: 茜色（#e65555）をテーマとした和風エレガントサイト
- **ユーザー体験**: SVGアニメーション・カルーセル・スクロール効果による高品質UI
- **技術学習機能**: App Router・TypeScript・Tailwind CSS・Framer Motionの習得

### 対象ユーザー
- **メインユーザー**: 結婚式に招待されたゲスト（モバイル利用が主）
- **新郎新婦**: Naoto（伊藤 尚人）& Yui（小林 結衣）- 2025年11月3日
- **管理者**: 出欠状況確認・ゲスト管理・RSVP管理
- **開発者**: モダンWebアプリケーション開発の学習者

### プロジェクトの特徴
- **Figmaデザイン完全再現**: pixel-perfectなデザイン実装
- **包括的なRSVP機能**: reference-site.html準拠の全13フィールド対応
- **アニメーション豊富**: Vivus.js（SVG）・Vegas.js（カルーセル）・Framer Motion
- **レスポンシブデザイン**: モバイルファースト・マルチデバイス対応
- **型安全性**: TypeScript完全対応・エラーハンドリング充実

## 完全実装状況

### 実装完了機能（2025年8月13日現在）
- ✅ **ローディング画面**: Vivus.js SVGアニメーション（5秒間）
- ✅ **ヘッダーセクション**: Vegas.js背景カルーセル・カップル名表示
- ✅ **メッセージセクション**: 挨拶文・新郎新婦プロフィール
- ✅ **カウントダウンセクション**: 結婚式まで残り日数リアルタイム表示
- ✅ **式場案内セクション**: 挙式・披露宴情報・Google Maps統合
- ✅ **出欠確認セクション**: 包括的RSVPフォーム（全13フィールド対応）
- ✅ **フッターセクション**: ナビゲーション・法的情報
- ✅ **レスポンシブナビゲーション**: スクロールスパイ・ハンバーガーメニュー

### Figmaデザイン実装
- ✅ **カラーシステム**: 茜色（#e65555）ベースのデザイントークン
- ✅ **タイポグラフィ**: Playfair Display・日本語フォント設定
- ✅ **スペーシング**: 8pxベースのレスポンシブスペーシング
- ✅ **アニメーション**: CSS transitions・Framer Motion統合
- ✅ **コンポーネント**: 再利用可能なUIコンポーネントシステム

### 技術スタック実装
- ✅ **Next.js 14**: App Router・TypeScript・レスポンシブ対応
- ✅ **Tailwind CSS**: Figmaデザイントークン統合・カスタムカラー
- ✅ **React Hook Form**: Yupバリデーション・エラーハンドリング
- ✅ **Firebase**: Firestore・Authentication・セキュリティルール
- ✅ **開発環境**: ESLint・Prettier・TypeScript設定

## 技術仕様詳細

### アニメーションライブラリ
```typescript
// ローディング画面
import Vivus from 'vivus';
const vivus = new Vivus('loading-svg', {
  type: 'delayed',
  duration: 200,
  animTimingFunction: Vivus.EASE_OUT
});

// 背景カルーセル
import 'vegas/dist/vegas.min.css';
import 'vegas/dist/vegas.min.js';
$('#header').vegas({
  slides: backgroundImages,
  transition: 'fade',
  delay: 5000
});

// スクロールアニメーション
import { ScrollTrigger } from 'gsap/ScrollTrigger';
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  toggleClass: "active"
});
```

### RSVPフォーム仕様
```typescript
interface RSVPFormData {
  status: 1 | 2;                    // 出席(1)/欠席(2)
  guest_side: 0 | 1;               // 新郎側(0)/新婦側(1)
  jpn_family_name: string;         // 姓（日本語）
  jpn_first_name: string;          // 名（日本語）
  kana_family_name?: string;       // 姓（かな）
  kana_first_name?: string;        // 名（かな）
  rom_family_name: string;         // 姓（ローマ字）
  rom_first_name: string;          // 名（ローマ字）
  email: string;                   // メールアドレス
  phone_number?: string;           // 電話番号
  zipcode?: string;                // 郵便番号
  address?: string;                // 住所
  address2?: string;               // 建物名等
  age_category?: 0 | 1 | 2;        // 大人(0)/子供(1)/幼児(2)
  allergy_flag: 0 | 1;            // アレルギー有無
  allergy?: string;                // アレルギー詳細
  guest_message?: string;          // メッセージ
}
```

## プロジェクトスケジュール

### 開発フェーズ
| 期間 | フェーズ | 主な作業内容 | 成果物 |
|------|---------|-------------|-------|
| 8月中旬 | 要件定義・設計 | 仕様策定・UI設計・技術検証 | 設計書・モックアップ |
| 8月末〜9月上旬 | 基盤開発 | Next.js環境構築・Firebase設定・基本UI | 開発環境・基本ページ |
| 9月中旬 | 機能実装 | RSVP機能・Google Maps・管理画面 | MVP版完成 |
| 9月末 | テスト・調整 | ユーザビリティテスト・性能最適化 | ベータ版リリース |
| 10月上旬 | 本番準備 | ドメイン取得・本番デプロイ・セキュリティ強化 | 本番環境 |
| 10月中旬〜下旬 | 運用・改善 | フィードバック対応・最終調整 | 完成版 |
| 結婚式当日 | 🎉 | - | - |

### 環境変数対応の追加マイルストーン
- **2025年8月13日**: 環境変数システム完成・ドキュメント整備
- **カスタマイズ対応**: 他のカップルでも利用可能な汎用システム完成

## 学習目標

### Next.js 14 習得目標
- **App Router**: ファイルベースルーティングの理解
- **Server Components**: サーバーサイドレンダリングの活用
- **API Routes**: RESTful APIの実装
- **Image Optimization**: 画像最適化の実践
- **SEO対応**: メタデータ・構造化データの実装
- **環境変数管理**: 型安全な設定管理システム

### Firebase技術習得目標
- **Firebase Firestore**: NoSQLデータベース設計・操作
- **Cloud Functions**: サーバーレス関数の実装
- **Firebase Authentication**: 認証システムの構築
- **環境変数統合**: Firebaseサービスの設定管理
- **セキュリティルール**: 環境に応じたセキュリティ設定

### フロントエンド技術習得目標
- **TypeScript**: 型安全なコード記述
- **Tailwind CSS**: ユーティリティファーストCSS
- **React Hook Form**: 効率的なフォーム管理
- **レスポンシブデザイン**: モバイルファースト設計
- **環境変数活用**: 動的コンテンツ管理

## 参考サイト

## デプロイメント・運用

### 本番環境
- **フロントエンド**: Vercel（https://wedding-invitation-site.vercel.app）
- **バックエンド**: Firebase Hosting・Cloud Functions
- **データベース**: Firestore・セキュリティルール適用
- **CDN**: Vercel Edge Network・最適化配信

### 監視・メトリクス
- **パフォーマンス**: Lighthouse Score 90+維持
- **可用性**: Uptime monitoring・エラー追跡
- **ユーザー分析**: RSVP送信率・デバイス別利用統計
- **セキュリティ**: Firebase Security Rules・API制限

### 運用フロー
1. **開発**: localhost:3001での機能開発・テスト
2. **ステージング**: Vercel Preview Deploy
3. **本番**: Vercel Production Deploy
4. **監視**: リアルタイム監視・エラー通知

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日（Figmaデザイン完全実装完了）  
**参照**: reference-site.html完全再現・Figmaデザインシステム準拠
