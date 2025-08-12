# GitHub Copilot への指示

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

## 🏗️ プロジェクト固有のアーキテクチャ

### 結婚式招待サイト（2025年11月3日）
- **主要機能**: RSVP システム、会場案内、管理画面
- **技術スタック**: Next.js 14 App Router + Firebase Firestore + Tailwind CSS
- **デプロイ**: Vercel（フロントエンド）+ GCP（バックエンド）

### ディレクトリ構造パターン
```
app/                    # Next.js 14 App Router
├── page.tsx           # ホームページ
├── layout.tsx         # 共通レイアウト
└── rsvp/
    └── submit.ts      # API Routes

components/             # 再利用可能コンポーネント
├── RSVPForm.tsx       # フォームコンポーネント
└── *.tsx

lib/                   # ユーティリティ・設定
└── firebase.ts        # Firebase設定

docs/                  # プロジェクト仕様書
├── technical/         # 技術仕様
├── architecture/      # システム設計
└── development/       # 開発ガイド
```

## 💻 実装品質基準

### Firebase統合パターン
- **設定**: `lib/firebase.ts`で一元管理
- **環境変数**: `NEXT_PUBLIC_FIREBASE_*`プレフィックス
- **コレクション**: `rsvps` (出欠データ), `admin` (管理設定)
- **API Routes**: `app/*/submit.ts`パターンでFirestore操作

### コンポーネント設計
- **'use client'**指定でクライアントコンポーネント明示
- **TypeScript interface**で props の型定義必須
- **Tailwind CSS**のユーティリティクラス使用
- **React Hook Form + Yup**でフォームバリデーション

### API設計パターン
```typescript
// app/rsvp/submit.ts の実装パターン
export async function POST(req: NextRequest) {
  const body = await req.json();
  // Firestore操作
  await addDoc(collection(db, 'rsvps'), data);
  return new Response('OK', { status: 200 });
}
```

## � 開発ワークフロー

### 必須コマンド
```bash
# 開発環境起動
npm run dev                 # ローカル開発サーバー起動

# ビルド・テスト
npm run build              # 本番ビルド
npm run start              # 本番環境でのローカル起動
npm run lint               # ESLintチェック
npm run type-check         # TypeScript型チェック

# Firebase関連
firebase emulators:start   # Firestore エミュレータ
firebase deploy            # Firebase設定・ルールデプロイ

# デプロイ
vercel --prod             # Vercel本番デプロイ
vercel                    # Vercelプレビューデプロイ
```

### デバッグワークフロー
```bash
# ログ確認
vercel logs               # Vercel本番ログ
firebase functions:log    # Firebase Functions ログ

# ローカルデバッグ
npm run dev:debug         # Debuggerポート付きで起動
npm run analyze           # Bundle分析
```

### テスト戦略
```bash
# 推奨テストコマンド（将来追加時）
npm test                  # Jest単体テスト
npm run test:e2e         # Playwright E2Eテスト
npm run test:coverage    # カバレッジレポート
```

## 🔒 セキュリティパターン

### Firestore セキュリティルール（必須パターン）
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document} {
      allow create: if isValidRSVPData(request.resource.data);
      allow read, update, delete: if isAuthenticated() && isAdmin();
    }
    match /admin/{document} {
      allow read, write: if isAuthenticated() && isAdmin();
    }
  }
}
```

### 入力検証パターン（フロント・バック両方必須）
```typescript
// フロントエンド（React Hook Form + Yup）
const rsvpSchema = yup.object({
  name: yup.string().required().max(50)
    .matches(/^[\p{L}\p{N}\s\-\.]+$/u),
  email: yup.string().email().required().max(100),
  attendance: yup.string().oneOf(['yes', 'no']).required()
});

// バックエンド（API Routes）
const sanitizedData = {
  name: DOMPurify.sanitize(data.name),
  email: validator.normalizeEmail(data.email),
  // ... 
};
```

### レート制限パターン
```typescript
// app/rsvp/submit.ts
const rateLimit = checkRateLimit(request, {
  maxRequests: 3,        // 1時間に3回まで
  windowMs: 60 * 60 * 1000
});
if (!rateLimit.allowed) {
  return new Response('Rate limit exceeded', { status: 429 });
}
```

## 🚀 デプロイ戦略

### Vercel設定パターン
```json
// vercel.json
{
  "framework": "nextjs",
  "functions": {
    "app/api/rsvp/submit.ts": { "maxDuration": 30 }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

### 環境変数管理
```bash
# 必須環境変数（Vercel設定）
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN  
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ADMIN_EMAILS                      # カンマ区切り
```

### CI/CD パイプライン
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    steps:
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: amondnet/vercel-action@v25
```

## 🎨 コンポーネントパターン

### RSVPフォームパターン（重要）
```typescript
// components/RSVPForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface RSVPFormProps {
  onSubmit: (data: RSVPFormData) => void;
  isLoading?: boolean;
  error?: string;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmit, isLoading, error }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(rsvpSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* フォーム実装 */}
    </form>
  );
};
```

### Firebaseデータ操作パターン
```typescript
// lib/firebase-operations.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export async function submitRSVP(data: RSVPData) {
  try {
    await addDoc(collection(db, 'rsvps'), {
      ...data,
      timestamp: new Date(),
      ipAddress: getClientIP()
    });
  } catch (error) {
    throw new Error('RSVP送信に失敗しました');
  }
}
```

### エラーハンドリングパターン
```typescript
// lib/error-handler.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// API Routesでの使用
try {
  // 処理
} catch (error) {
  if (error instanceof AppError) {
    return new Response(error.message, { status: error.statusCode });
  }
  return new Response('Internal Server Error', { status: 500 });
}
```

## �📚 参照ドキュメント

### プロジェクト要件
- `docs/technical/project-overview.md` - プロジェクト基本情報
- `docs/technical/tech-stack.md` - 技術スタック詳細
- `docs/architecture/database-design.md` - Firestore スキーマ
- `docs/design/page-specifications.md` - UI/UX要件

### 開発・運用ガイド
- `docs/development/setup-guide.md` - 環境構築手順
- `docs/development/deployment.md` - デプロイ手順
- `docs/architecture/security.md` - セキュリティ仕様

## 📝 コーディング規約

### 命名規則

#### 変数名
- **キャメルケース** (`camelCase`) を使用
- 例: `userName`, `orderId`
- **短縮形は避ける**
- 例: `usrNm` ❌ → `userName` ✅

#### 定数
- **スネークケース** (`SNAKE_CASE`) を使用
- 例: `MAX_RETRIES`, `DEFAULT_TIMEOUT`

#### 関数名
- **動詞から始める** + キャメルケース
- 例: `getUserProfile`, `calculateTotalPrice`
- 機能が明確にわかる命名

#### クラス名
- **パスカルケース** (`PascalCase`) を使用
- 例: `UserService`, `ProductRepository`

### フォーマット規則

#### インデント
- **スペース2つ**を使用（タブ禁止）

#### コメント
- 複雑なロジックにはJSDoc形式のコメント
- TODOコメントは対応完了後に削除

#### その他
- マジックナンバーは定数として定義
- 適切なエラーハンドリング
- プロダクション環境でのログ出力に注意

## ⚠️ 実装前の必須事項
- **実装・ライブラリ変更前に必ずWeb検索**
- 問題発生時はまずWeb検索（記憶に依存しない）
- 最新の技術情報・ベストプラクティスを確認