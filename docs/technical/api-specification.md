# API 仕様書

## API エンドポイント概要

結婚式招待サイトで使用するREST APIの仕様です。

### エンドポイント一覧

| エンドポイント | メソッド | 用途 | 認証 |
|---------------|---------|------|------|
| `/api/rsvp/submit` | POST | RSVP送信 | 不要 |
| `/api/admin/auth` | POST | 管理者認証 | 不要 |
| `/api/admin/rsvps` | GET | RSVP一覧取得 | 必要 |
| `/api/admin/rsvps/export` | GET | RSVPデータエクスポート | 必要 |
| `/api/admin/stats` | GET | 統計情報取得 | 必要 |
| `/api/health` | GET | ヘルスチェック | 不要 |

## RSVP API

### POST /api/rsvp/submit

ゲストの出欠確認と詳細情報を送信します。

#### リクエスト

```typescript
interface RSVPRequest {
  // 基本情報
  name: string;           // お名前（必須、1-50文字）
  furigana: string;       // ふりがな（必須、1-50文字、ひらがなのみ）
  email: string;          // メールアドレス（必須、有効な形式）
  
  // 出欠情報
  attendance: 'yes' | 'no';  // 出欠（必須）
  companions?: number;       // 同伴者数（0-5、デフォルト: 0）
  
  // オプション情報
  allergies?: string;        // アレルギー情報（最大500文字）
  message?: string;          // メッセージ（最大1000文字）
  notes?: string;           // 連絡事項（最大500文字）
  companionNames?: string;   // 同伴者名（最大300文字）
}
```

#### レスポンス

**成功時 (200)**
```json
{
  "success": true,
  "message": "RSVPを受け付けました",
  "id": "rsvp_12345",
  "timestamp": "2025-08-13T10:30:00.000Z"
}
```

**エラー時 (400)**
```json
{
  "success": false,
  "message": "入力内容に誤りがあります",
  "errors": [
    {
      "field": "email",
      "message": "有効なメールアドレスを入力してください"
    }
  ]
}
```

**レート制限エラー (429)**
```json
{
  "success": false,
  "message": "送信回数の上限に達しました。しばらく時間をおいてから再度お試しください",
  "retryAfter": 3600
}
```

#### バリデーション

- **name**: 1-50文字、Unicode文字・数字・スペース・ハイフン・ピリオドのみ
- **furigana**: 1-50文字、ひらがなとスペースのみ
- **email**: RFC 5322準拠、最大100文字
- **attendance**: 'yes' または 'no' のみ
- **companions**: 0-5の整数
- **その他テキスト**: HTMLタグは除去、改行は保持

#### 例

```bash
curl -X POST https://wedding-invitation-site.com/api/rsvp/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "田中太郎",
    "furigana": "たなかたろう",
    "email": "tanaka@example.com",
    "attendance": "yes",
    "companions": 1,
    "allergies": "エビアレルギー",
    "message": "楽しみにしています！"
  }'
```

## 管理者API

### POST /api/admin/auth

管理者認証を行います。

#### リクエスト

```typescript
interface AdminAuthRequest {
  email: string;     // 管理者メールアドレス
  password: string;  // パスワード
}
```

#### レスポンス

**成功時 (200)**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "admin@example.com",
    "permissions": ["read_rsvps", "export_data"]
  }
}
```

### GET /api/admin/rsvps

RSVP一覧を取得します。

#### クエリパラメータ

| パラメータ | 型 | 説明 | デフォルト |
|-----------|---|------|----------|
| `page` | number | ページ番号 | 1 |
| `limit` | number | 1ページあたりの件数 | 50 |
| `attendance` | string | 出欠フィルタ ('yes', 'no', 'all') | 'all' |
| `sort` | string | ソート順 ('created_asc', 'created_desc', 'name_asc', 'name_desc') | 'created_desc' |
| `search` | string | 名前・メールで検索 | - |

#### レスポンス

```json
{
  "success": true,
  "data": [
    {
      "id": "rsvp_12345",
      "name": "田中太郎",
      "furigana": "たなかたろう",
      "email": "tanaka@example.com",
      "attendance": "yes",
      "companions": 1,
      "allergies": "エビアレルギー",
      "message": "楽しみにしています！",
      "createdAt": "2025-08-13T10:30:00.000Z",
      "updatedAt": "2025-08-13T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### GET /api/admin/rsvps/export

RSVPデータをCSV形式でエクスポートします。

#### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|---|------|
| `format` | string | エクスポート形式 ('csv', 'xlsx') |
| `attendance` | string | 出欠フィルタ ('yes', 'no', 'all') |

#### レスポンス

CSVファイルのダウンロードが開始されます。

**ヘッダー**
```
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="rsvp-export-20250813.csv"
```

**CSVデータ例**
```csv
名前,ふりがな,メールアドレス,出欠,同伴者数,アレルギー情報,メッセージ,連絡事項,登録日時
田中太郎,たなかたろう,tanaka@example.com,出席,1,エビアレルギー,楽しみにしています！,,2025-08-13 10:30:00
```

### GET /api/admin/stats

統計情報を取得します。

#### レスポンス

```json
{
  "success": true,
  "data": {
    "overview": {
      "totalResponses": 150,
      "attendingCount": 120,
      "notAttendingCount": 30,
      "attendanceRate": 0.8,
      "totalGuests": 180,
      "responseRate": 0.75
    },
    "timeline": [
      {
        "date": "2025-08-13",
        "responses": 5,
        "cumulative": 150
      }
    ],
    "allergies": [
      {
        "type": "エビ",
        "count": 3
      },
      {
        "type": "卵",
        "count": 2
      }
    ],
    "lastUpdated": "2025-08-13T15:30:00.000Z"
  }
}
```

## セキュリティ

### 認証

管理者APIは JWT トークンベースの認証を使用します。

```bash
# Authorization ヘッダーにトークンを設定
curl -H "Authorization: Bearer <token>" \
  https://wedding-invitation-site.com/api/admin/rsvps
```

### レート制限

| エンドポイント | 制限 | ウィンドウ |
|---------------|------|----------|
| `/api/rsvp/submit` | 3回 | 1時間 |
| `/api/admin/auth` | 5回 | 15分 |
| その他管理者API | 100回 | 1分 |

### CORS

許可されたオリジン:
- `https://wedding-invitation-site.com` (本番)
- `http://localhost:3000` (開発)

## エラーハンドリング

### エラーレスポンス形式

```typescript
interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  code?: string;
  timestamp: string;
}
```

### HTTP ステータスコード

| コード | 説明 |
|--------|------|
| 200 | 成功 |
| 400 | リクエストエラー（バリデーション失敗等） |
| 401 | 認証エラー |
| 403 | 認可エラー |
| 429 | レート制限エラー |
| 500 | サーバーエラー |

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日
