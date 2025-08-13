---
applyTo: "**/*"
---

# コミットメッセージ規約

## 🎯 基本方針
- **必ず日本語で記述してください**
- **Conventional Commits 形式に準拠**
- **結婚式招待サイト（reference-site.html）プロジェクト専用**

## 📝 基本形式
```
<type>(<scope>): <description>

<body>

<footer>
```

### 必須要素
- `<type>`: コミットの種類（英語）
- `<description>`: 変更内容の要約（日本語）

### オプション要素
- `<scope>`: 変更対象の範囲（英語）
- `<body>`: 詳細説明（日本語）
- `<footer>`: 破壊的変更やIssue番号（日本語/英語）

## 🏷️ Type（コミット種別）

### 主要Type
- **feat**: 新機能の追加
- **fix**: バグ修正
- **docs**: ドキュメントの変更
- **style**: コードフォーマットやスタイルの変更
- **refactor**: リファクタリング
- **perf**: パフォーマンス改善
- **test**: テスト関連の変更

### プロジェクト特有Type
- **design**: デザイン・UI/UX関連の変更
- **animation**: アニメーション機能の追加・修正
- **firebase**: Firebase設定やルールの変更
- **rsvp**: RSVP機能関連の変更
- **admin**: 管理画面関連の変更
- **deploy**: デプロイ設定関連の変更

## 🎯 Scope（変更範囲）

### コンポーネント関連
- **loading**: ローディング画面
- **header**: ヘッダーセクション
- **message**: メッセージセクション
- **countdown**: カウントダウンセクション
- **information**: 式場案内セクション
- **rsvp**: 出欠確認セクション
- **footer**: フッターセクション

### 機能関連
- **carousel**: 背景カルーセル機能
- **form**: フォーム機能
- **validation**: バリデーション機能
- **maps**: Google Maps機能
- **auth**: 認証機能
- **database**: データベース関連

### 技術関連
- **vegas**: Vegas.js（背景カルーセル）
- **vivus**: Vivus.js（SVGアニメーション）
- **framer**: Framer Motion
- **tailwind**: Tailwind CSS
- **firebase**: Firebase関連
- **vercel**: Vercel設定

## ✅ 良いコミットメッセージ例

### 新機能追加
```bash
feat(rsvp): RSVPフォームにアレルギー項目を追加

reference-site.htmlの仕様に合わせてアレルギー情報の入力フィールドを追加。
- allergy_flagとallergy項目を追加
- バリデーションルールを更新
- UI/UXをreference-site.htmlと同じにする

Closes #123
```

### バグ修正
```bash
fix(carousel): 背景画像の切り替えタイミングを修正

Vegas.jsのtransitionDurationが正しく設定されていなかった問題を解決。
- transitionDuration: 2000に設定
- overlay透明度を調整
- モバイル表示での表示崩れを修正
```

### デザイン変更
```bash
design(header): 茜色テーマに合わせてヘッダーカラーを調整

reference-site.htmlと完全に一致するよう色調を修正。
- 茜色（#e65555）をプライマリカラーに設定
- グラデーション効果を追加
- フォントサイズをレスポンシブ対応
```

### アニメーション関連
```bash
animation(loading): SVGローディングアニメーションを実装

Vivus.jsを使用したSVGアニメーションを追加。
- 5秒間のアニメーション時間設定
- reference-site.htmlと同じ動作を実現
- パフォーマンス最適化も実施
```

### Firebase関連
```bash
firebase(rules): RSVPデータの新しいスキーマに対応

reference-site.htmlのフォーム仕様に合わせてFirestoreルールを更新。
- 新しいフィールド（allergy_flag, guest_side等）を追加
- バリデーションルールを強化
- セキュリティ設定を改善
```

### リファクタリング
```bash
refactor(components): RSVPフォームコンポーネントを分割

保守性向上のためにフォームコンポーネントを細分化。
- FormField コンポーネントを独立
- バリデーション関数を分離
- TypeScript型定義を整理
```

## ❌ 悪いコミットメッセージ例

```bash
# 悪い例：説明が不十分
fix: バグ修正

# 悪い例：英語と日本語が混在
fix: fix the RSVP form bug

# 悪い例：typeが不適切
feat: コードフォーマット修正

# 悪い例：説明が曖昧
update: いろいろ修正
```

## 🔄 実用的なパターン

### 複数ファイル変更
```bash
feat(rsvp): 包括的なRSVPシステムを実装

reference-site.htmlの仕様を完全再現するRSVPシステム。
- RSVPFormコンポーネントの実装
- Firebase Firestoreスキーマ設計
- バリデーション機能の追加
- 管理画面での確認機能

変更ファイル：
- components/forms/RSVPForm.tsx
- lib/firebase-operations.ts
- app/api/rsvp/submit/route.ts
- docs/database/schema.md

Closes #45, #67, #89
```

### 緊急修正
```bash
fix(auth)!: 管理画面ログイン機能の緊急修正

BREAKING CHANGE: 認証フローを変更

本番環境でログインできない問題を緊急修正。
- Firebase Auth設定を修正
- 環境変数の設定を更新
- セキュリティルールを修正

Fixes #234
```

### ドキュメント更新
```bash
docs(setup): reference-site.html対応の環境構築手順を追加

開発者向けのセットアップガイドを更新。
- 新しい環境変数の説明を追加
- アニメーションライブラリのインストール手順
- Firebase設定の詳細手順
```

## 📋 コミット前チェックリスト

- [ ] typeが適切に選択されている
- [ ] scopeが変更内容と一致している
- [ ] 説明文が日本語で明確に記述されている
- [ ] 必要に応じてbody部分で詳細を説明
- [ ] 破壊的変更がある場合はBREAKING CHANGEを記載
- [ ] Issue番号が適切に記載されている

## 🛠️ Git Hooks設定

### commit-msg フック
```bash
#!/bin/sh
# .git/hooks/commit-msg

# コミットメッセージの形式チェック
commit_regex='^(feat|fix|docs|style|refactor|perf|test|design|animation|firebase|rsvp|admin|deploy)(\(.+\))?: .{10,100}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ コミットメッセージが規約に違反しています"
    echo "形式: type(scope): 日本語の説明"
    echo "例: feat(rsvp): RSVPフォームにアレルギー項目を追加"
    exit 1
fi

echo "✅ コミットメッセージが規約に準拠しています"
```

## 📊 コミット統計

### 推奨Type分布
- **feat**: 40% - 新機能開発
- **fix**: 25% - バグ修正
- **design**: 15% - UI/UX改善
- **refactor**: 10% - コード改善
- **docs**: 5% - ドキュメント
- **その他**: 5% - テスト、設定等

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）- reference-site.html完全再現版