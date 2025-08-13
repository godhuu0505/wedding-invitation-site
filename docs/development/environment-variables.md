# 環境変数設定ガイド

## 🔧 環境変数一覧

このプロジェクトでは、新郎新婦の情報や結婚式の詳細を環境変数で管理できます。
`.env.local.example` をコピーして `.env.local` を作成し、以下の環境変数を設定してください。

## 📝 設定必須項目

### Firebase設定（必須）

```bash
# Firebase コンソールから取得
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key_here"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef123456"
```

### 新郎情報（必須）

```bash
# 基本情報
NEXT_PUBLIC_GROOM_NAME_EN="Naoto"                    # 英語名
NEXT_PUBLIC_GROOM_NAME_JP="伊藤尚人"                  # 日本語名（フルネーム）
NEXT_PUBLIC_GROOM_NAME_FULL_JP="伊藤 尚人"            # 表示用日本語名（スペース区切り）

# 詳細情報
NEXT_PUBLIC_GROOM_BIRTH_DATE="1995年3月1日"          # 生年月日
NEXT_PUBLIC_GROOM_BIRTH_PLACE="東京都"               # 出身地
NEXT_PUBLIC_GROOM_BLOOD_TYPE="A型"                  # 血液型
NEXT_PUBLIC_GROOM_OCCUPATION="会社員"                # 職業

# プロフィール（改行は\nで表現）
NEXT_PUBLIC_GROOM_HOBBY="アウトドアが好きで\n週末は少し遠くまで出かけます\n犬が大好きです"
NEXT_PUBLIC_GROOM_MESSAGE="美味しい料理・お酒を用意してお待ちしております\n当日皆様にお会いできることを\n心より楽しみにしております"
```

### 新婦情報（必須）

```bash
# 基本情報
NEXT_PUBLIC_BRIDE_NAME_EN="Yui"                      # 英語名
NEXT_PUBLIC_BRIDE_NAME_JP="小林結衣"                  # 日本語名（フルネーム）
NEXT_PUBLIC_BRIDE_NAME_FULL_JP="小林 結衣"            # 表示用日本語名（スペース区切り）

# 詳細情報
NEXT_PUBLIC_BRIDE_BIRTH_DATE="1995年6月5日"          # 生年月日
NEXT_PUBLIC_BRIDE_BIRTH_PLACE="東京都"               # 出身地
NEXT_PUBLIC_BRIDE_BLOOD_TYPE="B型"                  # 血液型
NEXT_PUBLIC_BRIDE_OCCUPATION="保育士"                # 職業

# プロフィール（改行は\nで表現）
NEXT_PUBLIC_BRIDE_HOBBY="子どもと猫が大好きです\n週末は美味しいご飯を食べに出かけます"
NEXT_PUBLIC_BRIDE_MESSAGE="たくさん食べてたくさん飲んで\n楽しい時間にしたいと思っています\n当日皆様にお会いできることを\n心より楽しみにしております"
```

### 結婚式情報（必須）

```bash
# 日程
NEXT_PUBLIC_WEDDING_DATE="2100-12-31T10:00:00+09:00"    # ISO形式の日時
NEXT_PUBLIC_WEDDING_DATE_DISPLAY="2100.12.31"           # 表示用日付
NEXT_PUBLIC_WEDDING_DATE_JP="2100年12月31日"            # 日本語表記日付
NEXT_PUBLIC_WEDDING_DAY_JP="金曜日"                     # 曜日

# 時間
NEXT_PUBLIC_CEREMONY_TIME="10:00"                       # 挙式時刻（24時間形式）
NEXT_PUBLIC_CEREMONY_TIME_DISPLAY="午前10時"             # 挙式時刻（表示用）
NEXT_PUBLIC_RECEPTION_TIME="11:00"                      # 披露宴時刻（24時間形式）
NEXT_PUBLIC_RECEPTION_TIME_DISPLAY="午前11時"            # 披露宴時刻（表示用）
```

### 式場情報（必須）

```bash
NEXT_PUBLIC_VENUE_NAME="サンプルホテル"                    # 会場名
NEXT_PUBLIC_VENUE_ADDRESS="東京都港区北青山３丁目５－１５"    # 住所
NEXT_PUBLIC_VENUE_LAT="35.6762"                         # 緯度（Google Maps用）
NEXT_PUBLIC_VENUE_LNG="139.6503"                        # 経度（Google Maps用）
```

### メタデータ（必須）

```bash
NEXT_PUBLIC_SITE_TITLE="Naoto & Yui Wedding Invitation - 2100.12.31"
NEXT_PUBLIC_SITE_DESCRIPTION="伊藤尚人・小林結衣の結婚式招待サイトです。2100年12月31日、皆様のご出席をお待ちしております。"
```

## 🎯 オプション項目

### Google Maps API（推奨）

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
```

### アニメーション制御（オプション）

```bash
NEXT_PUBLIC_ENABLE_LOADING_ANIMATION="true"              # ローディングアニメーション有効化
NEXT_PUBLIC_LOADING_DURATION="5000"                     # ローディング時間（ミリ秒）
NEXT_PUBLIC_ENABLE_SCROLL_ANIMATIONS="true"             # スクロールアニメーション有効化
NEXT_PUBLIC_ENABLE_CAROUSEL="true"                      # 背景カルーセル有効化
```

### デザインテーマ（オプション）

```bash
NEXT_PUBLIC_THEME_PRIMARY_COLOR="#e65555"                # プライマリ色（茜色）
NEXT_PUBLIC_THEME_SECONDARY_COLOR="#d64545"             # セカンダリ色
NEXT_PUBLIC_THEME_ACCENT_COLOR="#f66666"                # アクセント色
```

### 開発・デバッグ用（オプション）

```bash
NEXT_PUBLIC_USE_FIREBASE_EMULATOR="false"               # Firebaseエミュレータ使用
NEXT_PUBLIC_ENABLE_DEBUG_MODE="false"                   # デバッグモード
NEXT_PUBLIC_MOCK_DATA_ENABLED="false"                   # モックデータ使用
```

## 🚀 カスタマイズ例

### ケース1: 英語名カップル

```bash
NEXT_PUBLIC_GROOM_NAME_EN="Michael"
NEXT_PUBLIC_GROOM_NAME_JP="マイケル"
NEXT_PUBLIC_GROOM_NAME_FULL_JP="スミス マイケル"
NEXT_PUBLIC_BRIDE_NAME_EN="Emily"
NEXT_PUBLIC_BRIDE_NAME_JP="エミリー"
NEXT_PUBLIC_BRIDE_NAME_FULL_JP="ジョンソン エミリー"
```

### ケース2: 同性カップル

```bash
NEXT_PUBLIC_GROOM_NAME_EN="Alex"
NEXT_PUBLIC_GROOM_NAME_JP="アレックス"
NEXT_PUBLIC_BRIDE_NAME_EN="Jordan"
NEXT_PUBLIC_BRIDE_NAME_JP="ジョーダン"
```

### ケース3: 異なる会場での挙式・披露宴

```bash
NEXT_PUBLIC_CEREMONY_VENUE_NAME="〇〇教会"
NEXT_PUBLIC_CEREMONY_VENUE_ADDRESS="東京都渋谷区〇〇1-1-1"
NEXT_PUBLIC_RECEPTION_VENUE_NAME="〇〇ホテル"
NEXT_PUBLIC_RECEPTION_VENUE_ADDRESS="東京都港区〇〇2-2-2"
```

### ケース4: 春の結婚式

```bash
NEXT_PUBLIC_WEDDING_DATE="2025-04-05T14:00:00+09:00"
NEXT_PUBLIC_WEDDING_DATE_DISPLAY="2025.04.05"
NEXT_PUBLIC_WEDDING_DATE_JP="2025年4月5日"
NEXT_PUBLIC_WEDDING_DAY_JP="土曜日"
NEXT_PUBLIC_CEREMONY_TIME_DISPLAY="午後2時"
NEXT_PUBLIC_RECEPTION_TIME_DISPLAY="午後3時30分"
```

## 🔧 設定手順

### 1. 環境変数ファイル作成

```bash
# プロジェクトルートで実行
cp .env.local.example .env.local
```

### 2. ファイル編集

お好みのエディタで `.env.local` を開き、上記の値を設定：

```bash
# VS Code を使用する場合
code .env.local

# nano を使用する場合
nano .env.local
```

### 3. 開発サーバー再起動

環境変数の変更後は、開発サーバーを再起動してください：

```bash
# 開発サーバーを停止（Ctrl+C）
# 再起動
npm run dev
```

## ⚠️ 注意事項

### セキュリティ

- **Firebase API キー**: 公開されても問題ありませんが、適切な制限設定が必要
- **個人情報**: 新郎新婦の個人情報は適切に管理してください
- **Git管理**: `.env.local` は `.gitignore` に含まれており、Gitで管理されません

### 形式

- **改行**: メッセージ内の改行は `\n` で表現
- **日時**: ISO 8601形式（例: `2025-12-31T10:00:00+09:00`）
- **座標**: 緯度・経度は小数点形式（例: `35.6762`）

### 必須項目

以下の環境変数は必須です：

- Firebase設定（6項目）
- 新郎・新婦の基本情報（英語名、日本語名）
- 結婚式の日時・会場情報
- サイトのメタデータ

### オプション項目

以下は設定しなくても動作します：

- 詳細プロフィール情報
- Google Maps API
- アニメーション制御
- デザインテーマ

## 🛠️ トラブルシューティング

### 変更が反映されない

1. 開発サーバーを再起動
2. ブラウザのキャッシュをクリア
3. 環境変数名のスペルをチェック

### Firebase接続エラー

1. Firebase設定値をダブルチェック
2. Firebase プロジェクトの設定を確認
3. API キーの制限設定を確認

### 表示が崩れる

1. 長すぎる文章は適切に改行
2. 特殊文字のエスケープ確認
3. 日本語文字エンコーディングの確認

---

**作成日**: 2025年8月13日  
**対象プロジェクト**: 結婚式招待サイト（環境変数完全対応版）
