# セキュリティ仕様

## セキュリティ概要

### セキュリティ方針
- **ゼロトラスト原則**: すべてのアクセスを検証
- **多層防御**: 複数のセキュリティレイヤーで保護
- **最小権限**: 必要最小限のアクセス権限のみ付与
- **データ保護**: 個人情報の適切な取り扱い

## 認証・認可

### 管理画面認証
- **方式**: Firebase Authentication（メール・パスワード）
- **セッション管理**: JWT トークンベース
- **自動ログアウト**: 無操作時30分でセッション切れ
- **パスワードポリシー**: 8文字以上、英数字記号混在

### RSVP送信
- **認証**: 不要（パブリックアクセス）
- **レート制限**: 同一IPから1時間に3回まで
- **入力検証**: フロント・バック両方で実施

### 権限管理
```typescript
// 管理者権限チェック
interface UserPermissions {
  isAdmin: boolean;
  canViewRSVPs: boolean;
  canExportData: boolean;
  canModifySettings: boolean;
}

const checkAdminPermissions = async (userEmail: string): Promise<UserPermissions> => {
  const adminDoc = await db.collection('admin').doc('settings').get();
  const adminEmails = adminDoc.data()?.admins || [];
  
  const isAdmin = adminEmails.includes(userEmail);
  
  return {
    isAdmin,
    canViewRSVPs: isAdmin,
    canExportData: isAdmin,
    canModifySettings: isAdmin
  };
};
```

## Firestore セキュリティルール

### 完全なセキュリティルール
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // RSVP データの管理
    match /rsvps/{document} {
      // 新規作成: 認証不要だが厳格なバリデーション
      allow create: if isValidRSVPData(request.resource.data) && 
                       isWithinRateLimit();
      
      // 読み取り・更新・削除: 管理者のみ
      allow read, update, delete: if isAuthenticated() && isAdmin();
    }
    
    // 管理者設定（管理者のみアクセス可能）
    match /admin/{document} {
      allow read, write: if isAuthenticated() && isAdmin();
    }
    
    // ========== ヘルパー関数 ==========
    
    // 認証チェック
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // 管理者チェック
    function isAdmin() {
      return isAuthenticated() && 
             request.auth.token.email in resource.data.admins;
    }
    
    // RSVP データバリデーション
    function isValidRSVPData(data) {
      return data.keys().hasAll(['name', 'furigana', 'email', 'attendance', 'timestamp']) &&
             
             // 基本情報の検証
             isValidName(data.name) &&
             isValidFurigana(data.furigana) &&
             isValidEmail(data.email) &&
             
             // 出欠情報の検証
             data.attendance in ['yes', 'no'] &&
             isValidCompanions(data) &&
             
             // オプション項目の検証
             isValidOptionalFields(data) &&
             
             // システム情報の検証
             data.timestamp == request.time;
    }
    
    // 名前バリデーション
    function isValidName(name) {
      return name is string && 
             name.size() > 0 && 
             name.size() <= 50 &&
             name.matches('^[\\p{L}\\p{N}\\s\\-\\.]+$'); // Unicode文字、数字、スペース、ハイフン、ピリオドのみ
    }
    
    // ふりがなバリデーション
    function isValidFurigana(furigana) {
      return furigana is string && 
             furigana.size() > 0 && 
             furigana.size() <= 50 &&
             furigana.matches('^[あ-ん\\s]+$'); // ひらがなとスペースのみ
    }
    
    // メールアドレスバリデーション
    function isValidEmail(email) {
      return email is string && 
             email.size() > 0 && 
             email.size() <= 100 &&
             email.matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    }
    
    // 同伴者バリデーション
    function isValidCompanions(data) {
      return !('companions' in data) || 
             (data.companions is int && 
              data.companions >= 0 && 
              data.companions <= 5);
    }
    
    // オプション項目バリデーション
    function isValidOptionalFields(data) {
      return (!('allergies' in data) || isValidOptionalText(data.allergies, 500)) &&
             (!('message' in data) || isValidOptionalText(data.message, 1000)) &&
             (!('notes' in data) || isValidOptionalText(data.notes, 500)) &&
             (!('companionNames' in data) || isValidOptionalText(data.companionNames, 300));
    }
    
    // オプションテキストバリデーション
    function isValidOptionalText(text, maxLength) {
      return text is string && text.size() <= maxLength;
    }
    
    // レート制限チェック（簡易版）
    function isWithinRateLimit() {
      // 実際のレート制限はCloud Functionsで実装
      return true;
    }
  }
}
```

## 入力検証・XSS対策

### フロントエンド検証
```typescript
// React Hook Form + Yup バリデーションスキーマ
import * as yup from 'yup';

const rsvpSchema = yup.object({
  name: yup.string()
    .required('名前は必須です')
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以内で入力してください')
    .matches(/^[\p{L}\p{N}\s\-\.]+$/u, '有効な文字のみ使用してください'),
    
  furigana: yup.string()
    .required('ふりがなは必須です')
    .min(1, 'ふりがなを入力してください')
    .max(50, 'ふりがなは50文字以内で入力してください')
    .matches(/^[あ-ん\s]+$/, 'ひらがなで入力してください'),
    
  email: yup.string()
    .required('メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください')
    .max(100, 'メールアドレスは100文字以内で入力してください'),
    
  attendance: yup.string()
    .required('出欠確認は必須です')
    .oneOf(['yes', 'no'], '出席または欠席を選択してください'),
    
  companions: yup.number()
    .integer('整数で入力してください')
    .min(0, '0以上の数値を入力してください')
    .max(5, '同伴者は5名までです')
    .default(0),
    
  allergies: yup.string()
    .max(500, 'アレルギー情報は500文字以内で入力してください'),
    
  message: yup.string()
    .max(1000, 'メッセージは1000文字以内で入力してください'),
    
  notes: yup.string()
    .max(500, '連絡事項は500文字以内で入力してください')
});
```

### バックエンド検証
```typescript
// Joi を使用したサーバーサイドバリデーション
import Joi from 'joi';

const rsvpValidationSchema = Joi.object({
  name: Joi.string().min(1).max(50).pattern(/^[\p{L}\p{N}\s\-\.]+$/u).required(),
  furigana: Joi.string().min(1).max(50).pattern(/^[あ-ん\s]+$/).required(),
  email: Joi.string().email().max(100).required(),
  attendance: Joi.string().valid('yes', 'no').required(),
  companions: Joi.number().integer().min(0).max(5).default(0),
  allergies: Joi.string().max(500).allow(''),
  message: Joi.string().max(1000).allow(''),
  notes: Joi.string().max(500).allow(''),
  companionNames: Joi.string().max(300).allow('')
});

// サニタイゼーション
import DOMPurify from 'isomorphic-dompurify';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};
```

## CSRF・CORS対策

### CSRF対策
```typescript
// Next.js の組み込み CSRF 保護を使用
// pages/api/ または app/api/ でのAPIでは自動的に適用される

// 追加のCSRF トークン検証（必要に応じて）
import { getCsrfToken } from 'next-auth/csrf';

export async function POST(request: Request) {
  const csrfToken = request.headers.get('x-csrf-token');
  const expectedToken = await getCsrfToken();
  
  if (csrfToken !== expectedToken) {
    return new Response('CSRF token mismatch', { status: 403 });
  }
  
  // 処理続行
}
```

### CORS設定
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? 'https://wedding-invitation-2025.com'
              : 'http://localhost:3000'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-CSRF-Token'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};
```

## レート制限

### API レート制限
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
  const windowStart = now - config.windowMs;
  
  // 古いエントリをクリーンアップ
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
  
  const current = rateLimitMap.get(ip) || { count: 0, resetTime: now + config.windowMs };
  
  if (current.resetTime < now) {
    // ウィンドウリセット
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

// 使用例（RSVP API）
export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request, {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000 // 1時間
  });
  
  if (!rateLimit.allowed) {
    return new Response('Rate limit exceeded', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': '3',
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString()
      }
    });
  }
  
  // 正常処理続行
}
```

## 監査・ログ

### セキュリティログ
```typescript
// lib/security-logger.ts
interface SecurityEvent {
  type: 'AUTH_SUCCESS' | 'AUTH_FAILURE' | 'RATE_LIMIT' | 'SUSPICIOUS_ACTIVITY';
  ip: string;
  userAgent: string;
  timestamp: Date;
  details: Record<string, any>;
}

export function logSecurityEvent(event: SecurityEvent) {
  const logData = {
    ...event,
    severity: getEventSeverity(event.type),
    environment: process.env.NODE_ENV
  };
  
  // 本番環境では外部ログサービスに送信
  if (process.env.NODE_ENV === 'production') {
    sendToSentryOrLoggingService(logData);
  } else {
    console.log('Security Event:', logData);
  }
}

function getEventSeverity(type: SecurityEvent['type']): 'low' | 'medium' | 'high' | 'critical' {
  const severityMap = {
    'AUTH_SUCCESS': 'low',
    'AUTH_FAILURE': 'medium',
    'RATE_LIMIT': 'medium',
    'SUSPICIOUS_ACTIVITY': 'high'
  } as const;
  
  return severityMap[type];
}
```

## データ保護・プライバシー

### 個人情報の取り扱い
- **最小化原則**: 必要最小限の情報のみ収集
- **目的制限**: 結婚式運営目的のみに使用
- **保存期間**: 結婚式終了後1年で削除
- **アクセス制御**: 管理者のみアクセス可能

### データ削除機能
```typescript
// データ削除API（GDPR対応）
export async function deleteGuestData(email: string) {
  const batch = db.batch();
  
  // RSVPデータの削除
  const rsvpQuery = await db.collection('rsvps').where('email', '==', email).get();
  rsvpQuery.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
  
  // ログ記録
  logSecurityEvent({
    type: 'DATA_DELETION',
    ip: 'system',
    userAgent: 'system',
    timestamp: new Date(),
    details: { email }
  });
}
```

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日
