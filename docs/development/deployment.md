# デプロイメント仕様

## デプロイメント概要

### 本番環境構成
- **フロントエンド**: Vercel（Next.js）
- **バックエンドAPI**: Google Cloud Run
- **データベース**: Firebase Firestore
- **ドメイン**: `wedding-invitation-2025.com`
- **SSL証明書**: 自動管理（Vercel + Let's Encrypt）

### 環境分離
```
Production    : https://wedding-invitation-2025.com
Staging       : https://wedding-staging-xyz.vercel.app
Development   : http://localhost:3000
```

## Vercel デプロイメント

### プロジェクト設定
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

### 環境変数設定
```bash
# Vercel環境変数（本番用）
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

# Vercel固有
VERCEL_ENV=production
```

### デプロイコマンド
```bash
# Vercelにデプロイ
npx vercel --prod

# プレビューデプロイ
npx vercel

# 環境変数設定
npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
```

## Google Cloud Run（オプション）

### Dockerファイル
```dockerfile
# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Cloud Run設定
```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/wedding-invitation:$BUILD_ID', '.']
  
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/wedding-invitation:$BUILD_ID']
  
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'wedding-invitation'
      - '--image'
      - 'gcr.io/$PROJECT_ID/wedding-invitation:$BUILD_ID'
      - '--region'
      - 'asia-northeast1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
      - '--memory'
      - '512Mi'
      - '--cpu'
      - '1'
      - '--max-instances'
      - '10'
```

### Cloud Run デプロイコマンド
```bash
# プロジェクト設定
gcloud config set project wedding-invitation-2025

# Cloud Buildを使用したデプロイ
gcloud builds submit --config cloudbuild.yaml

# 直接デプロイ
gcloud run deploy wedding-invitation \
  --source . \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --set-env-vars "NODE_ENV=production"
```

## Firebase設定

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

### Firestore セキュリティルールデプロイ
```bash
# ルールファイル作成
# firestore.rules ファイルにセキュリティルール記述

# ルールデプロイ
firebase deploy --only firestore:rules

# インデックスデプロイ
firebase deploy --only firestore:indexes
```

### Firebase設定ファイル
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

## CI/CD パイプライン

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
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint
      
      - name: Build project
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
        if: github.ref == 'refs/heads/main'
```

### GitHub Actions（Cloud Run）
```yaml
# .github/workflows/cloud-run.yml
name: Deploy to Cloud Run

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: wedding-invitation-2025

      - name: Configure Docker
        run: gcloud auth configure-docker

      - name: Build and Push
        run: |
          docker build -t gcr.io/wedding-invitation-2025/app:$GITHUB_SHA .
          docker push gcr.io/wedding-invitation-2025/app:$GITHUB_SHA

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy wedding-invitation \
            --image gcr.io/wedding-invitation-2025/app:$GITHUB_SHA \
            --region asia-northeast1 \
            --platform managed \
            --allow-unauthenticated
```

## ドメイン・SSL設定

### カスタムドメイン設定（Vercel）
```bash
# Vercelでドメイン追加
npx vercel domains add wedding-invitation-2025.com

# DNS設定確認
npx vercel domains inspect wedding-invitation-2025.com
```

### DNS設定例
```
# DNSレコード設定
Type: CNAME
Name: wedding-invitation-2025.com
Value: cname.vercel-dns.com

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

## 監視・ヘルスチェック

### Vercel Analytics
```javascript
// pages/_app.tsx または app/layout.tsx
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

### アップタイム監視
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
      }
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

## バックアップ・災害復旧

### Firestore バックアップ
```bash
# 自動バックアップ設定（Google Cloud Console）
# または手動エクスポート
gcloud firestore export gs://wedding-invitation-backup/$(date +%Y%m%d-%H%M%S)
```

### 復旧手順
```bash
# 1. Firestoreデータ復元
gcloud firestore import gs://wedding-invitation-backup/[BACKUP_ID]

# 2. 環境変数再設定
npx vercel env pull .env.local

# 3. 再デプロイ
npx vercel --prod

# 4. ヘルスチェック確認
curl https://wedding-invitation-2025.com/api/health
```

## パフォーマンス最適化

### ビルド最適化
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
      }
    ];
  }
};
```

### CDN設定
```javascript
// Vercelでは自動的にEdge Networkが利用される
// 追加設定は不要だが、必要に応じてカスタムヘッダーで制御

// pages/_app.tsx
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日
