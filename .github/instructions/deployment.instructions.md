# デプロイメント指示書

## 🚀 デプロイメント概要

### 本番環境構成
- **フロントエンド**: Vercel（Next.js）
- **データベース**: Firebase Firestore
- **ドメイン**: `wedding-invitation-2025.com`
- **SSL証明書**: 自動管理（Vercel + Let's Encrypt）

### 環境分離
```
Production    : https://wedding-invitation-2025.com
Staging       : https://wedding-staging-xyz.vercel.app
Development   : http://localhost:3000
```

## 📦 Vercel デプロイメント

### プロジェクト設定ファイル
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "devCommand": "npm run dev",
  "functions": {
    "app/api/rsvp/submit.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/admin/dashboard",
      "permanent": false
    }
  ]
}
```

### 必須環境変数（Vercel設定）
```bash
# Firebase設定
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wedding-invitation-2025.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wedding-invitation-2025
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wedding-invitation-2025.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key

# 管理者設定
ADMIN_EMAILS=admin1@example.com,admin2@example.com

# セキュリティ
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://wedding-invitation-2025.com

# 会場情報
NEXT_PUBLIC_VENUE_NAME="東京ベイサイドホテル"
NEXT_PUBLIC_VENUE_ADDRESS="東京都港区台場1-1-1"
NEXT_PUBLIC_VENUE_LAT="35.6321"
NEXT_PUBLIC_VENUE_LNG="139.7736"

# 結婚式詳細
NEXT_PUBLIC_WEDDING_DATE="2025-11-03"
NEXT_PUBLIC_CEREMONY_TIME="13:00"
NEXT_PUBLIC_RECEPTION_TIME="15:00"
```

### デプロイコマンド
```bash
# Vercelにデプロイ
npx vercel --prod

# プレビューデプロイ
npx vercel

# 環境変数設定
npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
npx vercel env add ADMIN_EMAILS production

# ドメイン設定
npx vercel domains add wedding-invitation-2025.com
```

## 🔥 Firebase設定デプロイ

### Firebase プロジェクト初期化
```bash
# Firebase CLI インストール
npm install -g firebase-tools

# ログイン
firebase login

# プロジェクト初期化
firebase init

# プロジェクト設定
firebase use wedding-invitation-2025
```

### 設定ファイル
```javascript
// firebase.json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Firebase デプロイコマンド
```bash
# セキュリティルールデプロイ
firebase deploy --only firestore:rules

# インデックスデプロイ  
firebase deploy --only firestore:indexes

# 全体デプロイ
firebase deploy

# 特定環境へのデプロイ
firebase use staging
firebase deploy --only firestore:rules
```

## 🔄 CI/CD パイプライン

### GitHub Actions（Vercel）
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Build project
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_API_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
        if: github.ref == 'refs/heads/main'
      
      - name: Deploy Firebase Rules
        run: |
          npm install -g firebase-tools
          firebase deploy --only firestore:rules --token ${{ secrets.FIREBASE_TOKEN }}
        if: github.ref == 'refs/heads/main'
```

### ステージング環境デプロイ
```yaml
# .github/workflows/staging.yml
name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID_STAGING }}
      
      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          # --prodを除外してステージング環境へ
```

## 🌐 ドメイン・SSL設定

### カスタムドメイン設定
```bash
# Vercelでドメイン追加
npx vercel domains add wedding-invitation-2025.com
npx vercel domains add www.wedding-invitation-2025.com

# DNS設定確認
npx vercel domains inspect wedding-invitation-2025.com
```

### DNS設定例
```
# DNSレコード設定（お名前.com等）
Type: CNAME
Name: wedding-invitation-2025.com
Value: cname.vercel-dns.com

Type: CNAME  
Name: www
Value: cname.vercel-dns.com

# サブドメイン（ステージング用）
Type: CNAME
Name: staging
Value: cname.vercel-dns.com
```

## 📊 監視・ヘルスチェック

### Vercel Analytics設定
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### ヘルスチェックAPI
```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    // データベース接続確認
    await db.collection('health-check').limit(1).get();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'online',
        application: 'online'
      },
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed'
    }, { status: 503 });
  }
}
```

### アップタイム監視設定
```bash
# 外部監視サービス設定例（UptimeRobot等）
# チェックURL: https://wedding-invitation-2025.com/api/health
# 間隔: 5分
# アラート: メール + Slack
```

## 🔄 バックアップ・災害復旧

### 自動バックアップ設定
```bash
# Firestore 自動バックアップ
gcloud firestore export gs://wedding-invitation-backup/$(date +%Y%m%d-%H%M%S)

# 定期バックアップ（Cloud Scheduler）
gcloud scheduler jobs create http backup-firestore \
  --schedule "0 2 * * *" \
  --uri "https://firestore.googleapis.com/v1/projects/wedding-invitation-2025/databases/(default):exportDocuments" \
  --http-method POST
```

### 復旧手順書
```bash
# 1. Firestoreデータ復元
gcloud firestore import gs://wedding-invitation-backup/[BACKUP_ID]

# 2. 環境変数確認・復元
npx vercel env pull .env.local

# 3. Firebaseルール・インデックス復元
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes

# 4. 再デプロイ
npx vercel --prod

# 5. ヘルスチェック確認
curl https://wedding-invitation-2025.com/api/health

# 6. 機能テスト
# - ホームページ表示確認
# - RSVP送信テスト
# - 管理画面ログインテスト
```

## ⚡ パフォーマンス最適化

### ビルド最適化設定
```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components', '@/lib']
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1週間
  },
  
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/((?!api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  }
};
```

### CDN・キャッシュ戦略
```typescript
// キャッシュ最適化
export const revalidate = 3600; // 1時間でキャッシュ更新

// 静的ファイルの前読み込み
export default function RootLayout() {
  return (
    <html>
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="/hero-image.webp" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 🔍 デプロイ後チェックリスト

### 必須確認項目
- [ ] ホームページが正常に表示される
- [ ] RSVPフォームの送信が動作する
- [ ] 管理画面へのログインが可能
- [ ] Google Maps APIが動作する
- [ ] SSL証明書が有効
- [ ] セキュリティヘッダーが設定されている
- [ ] モバイル表示が適切
- [ ] ページ読み込み速度が要件を満たす（3秒以内）
- [ ] 404ページが適切に表示される
- [ ] ヘルスチェックAPIが応答する

### パフォーマンステスト
```bash
# Lighthouse テスト
npx lighthouse https://wedding-invitation-2025.com --output html

# WebPageTest
# https://www.webpagetest.org/ でテスト実行

# GTmetrix
# https://gtmetrix.com/ でテスト実行
```

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）
