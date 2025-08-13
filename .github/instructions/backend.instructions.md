---
applyTo: "app/api/**/*.{ts,js}"
---

# バックエンド技術スタック指示書 - reference-site.html完全対応版

## 📋 バックエンド技術スタック概要

### サーバーレス・データベース
- **API**: Next.js 14 API Routes (App Router) - サーバーレスAPI
- **データベース**: Firebase Firestore - NoSQLドキュメントデータベース
- **認証**: Firebase Authentication - 管理画面認証
- **ファイルストレージ**: Firebase Storage（プロフィール写真・式場画像用）
- **サーバーレス関数**: Firebase Functions - バックエンド処理
- **通知**: SendGrid（RSVP送信時メール通知）

### インフラストラクチャ
- **リージョン**: asia-northeast1（東京）
- **料金プラン**: Blaze（従量課金制）
- **デプロイ**: Vercel（API Routes）+ Firebase（Functions）

## 🔧 バックエンド依存関係管理

### Firebase関連依存関係
```json
{
  "dependencies": {
    "firebase": "^10.0.0",
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^4.0.0"
  }
}
```

### API開発用依存関係（reference-site.html対応）
```json
{
  "dependencies": {
    "next": "14.0.0",
    "validator": "^13.9.0",
    "isomorphic-dompurify": "^2.0.0",
    "rate-limiter-flexible": "^3.0.0",
    "@sendgrid/mail": "^7.7.0",
    "crypto": "^1.0.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/validator": "^13.9.0",
    "@types/uuid": "^9.0.0"
  }
}
```

## 🏗️ バックエンドアーキテクチャパターン（reference-site.html準拠）

### API Routes構成
```
app/
└── api/                    # Next.js API Routes
    ├── rsvp/               # RSVP関連API（reference-site.html完全対応）
    │   ├── submit/
    │   │   └── route.ts    # RSVP送信API（包括的バリデーション）
    │   ├── update/
    │   │   └── route.ts    # RSVP更新API（編集機能）
    │   ├── verify/
    │   │   └── route.ts    # RSVP確認API（submission_id使用）
    │   ├── list/
    │   │   └── route.ts    # RSVP一覧取得API（管理者用）
    │   ├── stats/
    │   │   └── route.ts    # RSVP統計API（ダッシュボード用）
    │   ├── export/
    │   │   └── route.ts    # CSVエクスポートAPI
    │   └── duplicate-check/
    │       └── route.ts    # 重複チェックAPI
    ├── auth/               # 認証関連API
    │   ├── signin/
    │   │   └── route.ts    # 管理者ログインAPI
    │   ├── signout/
    │   │   └── route.ts    # 管理者ログアウトAPI
    │   └── verify/
    │       └── route.ts    # トークン検証API
    ├── admin/              # 管理者専用API
    │   ├── settings/
    │   │   └── route.ts    # 管理者設定API
    │   ├── bulk-update/
    │   │   └── route.ts    # 一括更新API
    │   └── analytics/
    │       └── route.ts    # 分析データAPI
    ├── notification/       # 通知関連API
    │   ├── send-confirmation/
    │   │   └── route.ts    # 確認メール送信API
    │   └── send-reminder/
    │       └── route.ts    # リマインダー送信API
    └── health/
        └── route.ts        # ヘルスチェックAPI

lib/                        # バックエンド用ライブラリ
├── firebase.ts            # Firebase設定
├── firebase-admin.ts      # Firebase Admin SDK設定
├── firebase-operations.ts # Firestore操作関数（reference-site.html対応）
├── validation.ts          # サーバーサイドバリデーション
├── rate-limiter.ts        # レート制限
├── auth.ts               # 認証ヘルパー
├── email-service.ts      # メール送信サービス
├── error-handler.ts      # エラーハンドリング
├── csv-export.ts         # CSVエクスポート機能
└── security.ts           # セキュリティ関数
```

### Firebase Functions構成（拡張用）
```
functions/
├── src/
│   ├── index.ts           # Cloud Functions エントリーポイント
│   ├── rsvp-notification.ts  # RSVP送信時メール通知
│   ├── daily-stats.ts     # 日次統計更新
│   ├── backup-scheduler.ts   # 自動バックアップ
│   └── data-cleanup.ts    # 定期的なデータクリーンアップ
├── package.json
└── firebase.json
```

## 🗄️ データベース操作パターン（reference-site.html完全対応）

### Firestore操作関数
```typescript
// lib/firebase-operations.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, limit, Timestamp, updateDoc, doc } from 'firebase/firestore';

interface RSVPData {
  // reference-site.html準拠の完全なインターフェース
  status: 1 | 2;                    // 1: 出席, 2: 欠席
  guest_side: 0 | 1;                // 0: 新郎側, 1: 新婦側
  jpn_family_name: string;
  jpn_first_name: string;
  kana_family_name?: string;
  kana_first_name?: string;
  rom_family_name: string;
  rom_first_name: string;
  email: string;
  phone_number?: string;
  zipcode?: string;
  address?: string;
  address2?: string;
  age_category?: 0 | 1 | 2;
  allergy_flag: 0 | 1;
  allergy?: string;
  guest_message?: string;
}

// RSVP送信（reference-site.html完全対応）
export async function submitRSVP(data: RSVPData) {
  try {
    // 1. 重複チェック（メールアドレス）
    const isDuplicate = await checkDuplicateEmail(data.email);
    if (isDuplicate) {
      throw new AppError('既に登録済みのメールアドレスです', 'DUPLICATE_EMAIL', 409);
    }
    
    // 2. submission_id生成
    const submissionId = generateSubmissionId();
    
    // 3. IPアドレス・User Agent取得
    const clientInfo = getClientInfo();
    
    // 4. Firestoreに保存
    const docRef = await addDoc(collection(db, 'rsvps'), {
      ...data,
      submission_id: submissionId,
      timestamp: Timestamp.now(),
      ip_address: clientInfo.ipAddress,
      user_agent: clientInfo.userAgent,
      is_verified: false,
      follow_up_required: false
    });
    
    // 5. 統計キャッシュ更新
    await updateStatsCache();
    
    // 6. 確認メール送信
    await sendConfirmationEmail(data.email, submissionId, data);
    
    return { 
      success: true, 
      id: docRef.id,
      submission_id: submissionId 
    };
  } catch (error) {
    console.error('RSVP送信エラー:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('RSVP送信に失敗しました', 'RSVP_SUBMIT_ERROR', 500);
  }
}

// RSVP一覧取得（管理者用・高度な検索対応）
export async function getRSVPs(options: {
  pageSize?: number;
  lastDoc?: any;
  status?: 1 | 2;
  guestSide?: 0 | 1;
  allergyFlag?: 0 | 1;
  searchTerm?: string;
  ageCategory?: 0 | 1 | 2;
} = {}) {
  const {
    pageSize = 20,
    lastDoc,
    status,
    guestSide,
    allergyFlag,
    searchTerm,
    ageCategory
  } = options;
  
  let q = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'));
  
  // フィルタリング
  if (status !== undefined) {
    q = query(q, where('status', '==', status));
  }
  
  if (guestSide !== undefined) {
    q = query(q, where('guest_side', '==', guestSide));
  }
  
  if (allergyFlag !== undefined) {
    q = query(q, where('allergy_flag', '==', allergyFlag));
  }
  
  if (ageCategory !== undefined) {
    q = query(q, where('age_category', '==', ageCategory));
  }
  
  // ページネーション
  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }
  
  q = query(q, limit(pageSize));
  
  const snapshot = await getDocs(q);
  let results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // クライアント側での名前検索（Firestoreの制限対応）
  if (searchTerm) {
    results = results.filter(rsvp => {
      const fullName = `${rsvp.jpn_family_name} ${rsvp.jpn_first_name}`;
      const kanaName = `${rsvp.kana_family_name || ''} ${rsvp.kana_first_name || ''}`;
      const romanName = `${rsvp.rom_first_name} ${rsvp.rom_family_name}`;
      const email = rsvp.email;
      
      return fullName.includes(searchTerm) ||
             kanaName.includes(searchTerm) ||
             romanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             email.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
  
  return {
    docs: results,
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
    hasMore: snapshot.docs.length === pageSize,
    total: results.length
  };
}

// 統計情報取得（リアルタイム & キャッシュ）
export async function getRSVPStats() {
  const snapshot = await getDocs(collection(db, 'rsvps'));
  
  const stats = {
    totalResponses: snapshot.size,
    totalAttendees: 0,
    totalDeclined: 0,
    groomSideGuests: 0,
    brideSideGuests: 0,
    allergyCount: 0,
    adultsCount: 0,
    childrenCount: 0,
    infantsCount: 0,
    lastUpdated: new Date(),
    
    // 詳細統計（reference-site.html対応）
    allergyDetails: [] as Array<{name: string, allergy: string, email: string}>,
    guestsByDay: {},
    responseRate: 0,
    pendingFollowUps: 0
  };
  
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    
    if (data.status === 1) { // 出席
      stats.totalAttendees++;
      
      // ゲスト側別カウント
      if (data.guest_side === 0) {
        stats.groomSideGuests++;
      } else {
        stats.brideSideGuests++;
      }
      
      // アレルギー情報収集
      if (data.allergy_flag === 1) {
        stats.allergyCount++;
        stats.allergyDetails.push({
          name: `${data.jpn_family_name} ${data.jpn_first_name}`,
          allergy: data.allergy || '',
          email: data.email
        });
      }
      
      // 年齢区分別カウント
      switch (data.age_category) {
        case 0:
          stats.adultsCount++;
          break;
        case 1:
          stats.childrenCount++;
          break;
        case 2:
          stats.infantsCount++;
          break;
        default:
          stats.adultsCount++; // デフォルトは大人
      }
    } else {
      stats.totalDeclined++;
    }
    
    // フォローアップ必要数
    if (data.follow_up_required) {
      stats.pendingFollowUps++;
    }
  });
  
  // 回答率計算（想定ゲスト数に対する回答率）
  const expectedGuests = parseInt(process.env.EXPECTED_GUEST_COUNT || '100');
  stats.responseRate = Math.round((stats.totalResponses / expectedGuests) * 100);
  
  return stats;
}

// 重複チェック関数
async function checkDuplicateEmail(email: string): Promise<boolean> {
  const q = query(
    collection(db, 'rsvps'),
    where('email', '==', email.toLowerCase()),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// サブミッションID生成
function generateSubmissionId(): string {
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0];
  const randomString = Math.random().toString(36).substring(2, 8);
  return `rsvp_${timestamp}_${randomString}`;
}

// クライアント情報取得
function getClientInfo() {
  // Next.js API Routesでのクライアント情報取得
  return {
    ipAddress: 'xxx.xxx.xxx.xxx', // 実際の実装では headers から取得
    userAgent: 'User-Agent情報'    // 実際の実装では headers から取得
  };
}

// CSVエクスポート機能
export async function exportRSVPsToCSV() {
  const snapshot = await getDocs(query(collection(db, 'rsvps'), orderBy('timestamp', 'desc')));
  
  const csvData = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ID: doc.id,
      サブミッションID: data.submission_id,
      出欠: data.status === 1 ? '出席' : '欠席',
      ゲスト側: data.guest_side === 0 ? '新郎側' : '新婦側',
      姓: data.jpn_family_name,
      名: data.jpn_first_name,
      姓かな: data.kana_family_name || '',
      名かな: data.kana_first_name || '',
      姓ローマ字: data.rom_family_name,
      名ローマ字: data.rom_first_name,
      メールアドレス: data.email,
      電話番号: data.phone_number || '',
      郵便番号: data.zipcode || '',
      住所1: data.address || '',
      住所2: data.address2 || '',
      年齢区分: data.age_category === 0 ? '大人' : data.age_category === 1 ? '子供' : data.age_category === 2 ? '幼児' : '大人',
      アレルギー有無: data.allergy_flag === 1 ? 'あり' : 'なし',
      アレルギー詳細: data.allergy || '',
      メッセージ: data.guest_message || '',
      送信日時: data.timestamp.toDate().toLocaleString('ja-JP'),
      確認済み: data.is_verified ? 'はい' : 'いいえ',
      フォローアップ: data.follow_up_required ? '必要' : '不要'
    };
  });
  
  return convertToCSV(csvData);
}
```

## 🔐 認証・認可パターン

### Firebase Admin認証
```typescript
// lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();

// 管理者権限チェック
export async function checkAdminPermissions(userEmail: string): Promise<boolean> {
  if (!userEmail) return false;
  
  try {
    const adminDoc = await adminDb.collection('admin').doc('settings').get();
    const adminEmails = adminDoc.data()?.admins || [];
    return adminEmails.includes(userEmail);
  } catch (error) {
    console.error('権限チェックエラー:', error);
    return false;
  }
}
```

### API認証ミドルウェア
```typescript
// lib/auth.ts
import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function verifyAuthToken(request: NextRequest): Promise<string | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.email || null;
  } catch (error) {
    console.error('認証トークン検証エラー:', error);
    return null;
  }
}

// API Routes で使用する認証チェック
export async function requireAuth(request: NextRequest): Promise<string> {
  const userEmail = await verifyAuthToken(request);
  if (!userEmail) {
    throw new AppError('認証が必要です', 'UNAUTHORIZED', 401);
  }
  
  const isAdmin = await checkAdminPermissions(userEmail);
  if (!isAdmin) {
    throw new AppError('管理者権限が必要です', 'FORBIDDEN', 403);
  }
  
  return userEmail;
}
```

## 🛡️ セキュリティ・バリデーションパターン

### サーバーサイドバリデーション
```typescript
// lib/validation.ts
import validator from 'validator';
import DOMPurify from 'isomorphic-dompurify';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitizedData?: any;
}

// 入力サニタイゼーション
export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
}

// RSVPデータバリデーション
export function validateRSVPData(data: any): ValidationResult {
  try {
    // 必須フィールドチェック
    const requiredFields = [
      'status', 'guest_side', 'jpn_family_name', 'jpn_first_name', 
      'rom_family_name', 'rom_first_name', 'email', 'allergy_flag'
    ];
    
    for (const field of requiredFields) {
      if (!data[field] && data[field] !== 0) {
        return { valid: false, error: `${field}は必須項目です` };
      }
    }
    
    // 数値列挙型チェック
    if (![1, 2].includes(data.status)) {
      return { valid: false, error: '無効な出欠情報です' };
    }
    
    if (![0, 1].includes(data.guest_side)) {
      return { valid: false, error: '無効なゲストカテゴリーです' };
    }
    
    if (![0, 1].includes(data.allergy_flag)) {
      return { valid: false, error: '無効な食事制限情報です' };
    }
    
    // メールアドレス検証
    if (!validator.isEmail(data.email)) {
      return { valid: false, error: '無効なメールアドレスです' };
    }
    
    // データサニタイゼーション
    const sanitizedData = {
      status: parseInt(data.status),
      guest_side: parseInt(data.guest_side),
      jpn_family_name: sanitizeInput(data.jpn_family_name),
      jpn_first_name: sanitizeInput(data.jpn_first_name),
      kana_family_name: sanitizeInput(data.kana_family_name || ''),
      kana_first_name: sanitizeInput(data.kana_first_name || ''),
      rom_family_name: sanitizeInput(data.rom_family_name),
      rom_first_name: sanitizeInput(data.rom_first_name),
      email: validator.normalizeEmail(data.email),
      phone_number: sanitizeInput(data.phone_number || ''),
      zipcode: sanitizeInput(data.zipcode || ''),
      address: sanitizeInput(data.address || ''),
      address2: sanitizeInput(data.address2 || ''),
      age_category: data.age_category ? parseInt(data.age_category) : 0,
      allergy_flag: parseInt(data.allergy_flag),
      allergy: sanitizeInput(data.allergy || ''),
      guest_message: sanitizeInput(data.guest_message || '')
    };
    
    return { valid: true, sanitizedData };
  } catch (error) {
    return { valid: false, error: 'バリデーションエラーが発生しました' };
  }
}
```

### レート制限
```typescript
// lib/rate-limiter.ts
import { NextRequest } from 'next/server';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  request: NextRequest, 
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  
  // 古いエントリをクリーンアップ
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
  
  const current = rateLimitMap.get(ip) || { count: 0, resetTime: now + config.windowMs };
  
  if (current.resetTime < now) {
    current.count = 0;
    current.resetTime = now + config.windowMs;
  }
  
  const allowed = current.count < config.maxRequests;
  
  if (allowed) {
    current.count++;
    rateLimitMap.set(ip, current);
  }
  
  return {
    allowed,
    remaining: Math.max(0, config.maxRequests - current.count),
    resetTime: current.resetTime
  };
}
```

## 🔧 API設計パターン

### RSVP送信API
```typescript
// app/api/rsvp/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { submitRSVP } from '@/lib/firebase-operations';
import { validateRSVPData } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limiter';
import { AppError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック
    const rateLimit = checkRateLimit(request, {
      maxRequests: 3,        // 1時間に3回まで
      windowMs: 60 * 60 * 1000
    });
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'レート制限を超過しました' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString()
          }
        }
      );
    }
    
    const body = await request.json();
    
    // バリデーション
    const validation = validateRSVPData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    // RSVP送信
    const result = await submitRSVP(validation.sanitizedData);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('RSVP送信API エラー:', error);
    
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
```

### 管理者用RSVP一覧API
```typescript
// app/api/admin/rsvp/list/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getRSVPs } from '@/lib/firebase-operations';

export async function GET(request: NextRequest) {
  try {
    // 認証チェック
    await requireAuth(request);
    
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const lastDocId = searchParams.get('lastDoc');
    
    const result = await getRSVPs(pageSize, lastDocId);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('RSVP一覧取得API エラー:', error);
    
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
```

## 🚨 エラーハンドリングパターン

### 統一エラーハンドリング
```typescript
// lib/error-handler.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 500,
    public exposeToClient: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Firebase エラー処理
export function handleFirebaseError(error: any): AppError {
  switch (error.code) {
    case 'permission-denied':
      return new AppError('権限がありません', 'PERMISSION_DENIED', 403);
    case 'not-found':
      return new AppError('データが見つかりません', 'NOT_FOUND', 404);
    case 'unavailable':
      return new AppError('サービスが一時的に利用できません', 'SERVICE_UNAVAILABLE', 503);
    case 'unauthenticated':
      return new AppError('認証が必要です', 'UNAUTHENTICATED', 401);
    default:
      return new AppError('データベースエラーが発生しました', 'DATABASE_ERROR', 500, false);
  }
}

// セキュリティログ
export function logSecurityEvent(event: {
  type: string;
  ip: string;
  userAgent: string;
  details: any;
}) {
  const logData = {
    ...event,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  };
  
  if (process.env.NODE_ENV === 'production') {
    // 本番環境では外部ログサービスに送信
    console.log('Security Event:', logData);
  } else {
    console.log('Security Event:', logData);
  }
}
```

## 📊 パフォーマンス最適化

### データベースクエリ最適化
- 適切なインデックス設定
- ページネーション実装
- キャッシュ戦略（統計情報）
- 読み取り回数の最小化

### API最適化
- レスポンス時間: 500ms以内
- 同時接続: 1000リクエスト/秒
- データ圧縮: gzip有効化
- キャッシュヘッダー設定

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）- バックエンド技術スタック
