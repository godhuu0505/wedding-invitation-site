---
applyTo: "{app/api/**/*.{ts,js},lib/auth/**/*.{ts,js},lib/security/**/*.{ts,js}}"
---

# セキュリティ指示書

## 🛡️ セキュリティ基本方針

### セキュリティ原則
- **ゼロトラスト原則**: すべてのアクセスを検証
- **多層防御**: 複数のセキュリティレイヤーで保護
- **最小権限**: 必要最小限のアクセス権限のみ付与
- **データ保護**: 個人情報の適切な取り扱い

## 🔐 認証・認可パターン

### 管理画面認証
```typescript
// lib/auth.ts
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

### RSVP送信セキュリティ
- **認証**: 不要（パブリックアクセス）
- **レート制限**: 同一IPから1時間に3回まで
- **入力検証**: フロント・バック両方で実施

## 🔍 入力検証パターン

### フロントエンド検証（React Hook Form + Yup）
```typescript
import * as yup from 'yup';

const rsvpSchema = yup.object({
  // 出欠情報
  status: yup.number()
    .required('出欠の選択は必須です')
    .oneOf([1, 2], '有効な出欠を選択してください'),
    
  guest_side: yup.number()
    .required('ゲストカテゴリーの選択は必須です')
    .oneOf([0, 1], '有効なゲストカテゴリーを選択してください'),
    
  // 名前情報
  jpn_family_name: yup.string()
    .required('姓は必須です')
    .min(1, '姓を入力してください')
    .max(20, '姓は20文字以内で入力してください')
    .matches(/^[\p{L}\p{N}\s\-\.]+$/u, '有効な文字のみ使用してください'),
    
  jpn_first_name: yup.string()
    .required('名は必須です')
    .min(1, '名を入力してください')
    .max(20, '名は20文字以内で入力してください')
    .matches(/^[\p{L}\p{N}\s\-\.]+$/u, '有効な文字のみ使用してください'),
    
  kana_family_name: yup.string()
    .max(20, 'かな姓は20文字以内で入力してください')
    .matches(/^[あ-ん\s]*$/, 'ひらがなで入力してください'),
    
  kana_first_name: yup.string()
    .max(20, 'かな名は20文字以内で入力してください')
    .matches(/^[あ-ん\s]*$/, 'ひらがなで入力してください'),
    
  rom_family_name: yup.string()
    .required('ローマ字姓は必須です')
    .min(1, 'ローマ字姓を入力してください')
    .max(30, 'ローマ字姓は30文字以内で入力してください')
    .matches(/^[a-zA-Z\s\-\.]+$/, '英字のみ使用してください'),
    
  rom_first_name: yup.string()
    .required('ローマ字名は必須です')
    .min(1, 'ローマ字名を入力してください')
    .max(30, 'ローマ字名は30文字以内で入力してください')
    .matches(/^[a-zA-Z\s\-\.]+$/, '英字のみ使用してください'),
    
  // 連絡先
  email: yup.string()
    .required('メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください')
    .max(100, 'メールアドレスは100文字以内で入力してください'),
    
  phone_number: yup.string()
    .max(20, '電話番号は20文字以内で入力してください')
    .matches(/^[\d\-\(\)\+\s]*$/, '有効な電話番号を入力してください'),
    
  // 住所情報
  zipcode: yup.string()
    .max(10, '郵便番号は10文字以内で入力してください')
    .matches(/^[\d\-]*$/, '有効な郵便番号を入力してください'),
    
  address: yup.string()
    .max(100, '住所は100文字以内で入力してください'),
    
  address2: yup.string()
    .max(100, '建物名等は100文字以内で入力してください'),
    
  // その他
  age_category: yup.number()
    .oneOf([0, 1, 2], '有効な年齢区分を選択してください'),
    
  allergy_flag: yup.number()
    .required('食事制限の選択は必須です')
    .oneOf([0, 1], '有効な食事制限を選択してください'),
    
  allergy: yup.string()
    .max(500, 'アレルギー情報は500文字以内で入力してください'),
    
  guest_message: yup.string()
    .max(1000, 'メッセージは1000文字以内で入力してください')
});
```

### バックエンド検証・サニタイゼーション
```typescript
import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';

// サニタイゼーション
const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

// 数値検証
const validateNumericEnum = (value: any, allowedValues: number[]): boolean => {
  const num = parseInt(value);
  return !isNaN(num) && allowedValues.includes(num);
};

// API Routesでの検証
export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // 入力サニタイゼーション
  const sanitizedData = {
    status: parseInt(body.status),
    guest_side: parseInt(body.guest_side),
    jpn_family_name: sanitizeInput(body.jpn_family_name),
    jpn_first_name: sanitizeInput(body.jpn_first_name),
    kana_family_name: sanitizeInput(body.kana_family_name || ''),
    kana_first_name: sanitizeInput(body.kana_first_name || ''),
    rom_family_name: sanitizeInput(body.rom_family_name),
    rom_first_name: sanitizeInput(body.rom_first_name),
    email: validator.normalizeEmail(body.email),
    phone_number: sanitizeInput(body.phone_number || ''),
    zipcode: sanitizeInput(body.zipcode || ''),
    address: sanitizeInput(body.address || ''),
    address2: sanitizeInput(body.address2 || ''),
    age_category: body.age_category ? parseInt(body.age_category) : 0,
    allergy_flag: parseInt(body.allergy_flag),
    allergy: sanitizeInput(body.allergy || ''),
    guest_message: sanitizeInput(body.guest_message || '')
  };
  
  // バリデーション
  const validation = validateRSVPData(sanitizedData);
  if (!validation.valid) {
    return new Response(validation.error, { status: 400 });
  }
  
  // 重複チェック
  const isDuplicate = await checkDuplicateEmail(sanitizedData.email);
  if (isDuplicate) {
    return new Response('既に登録済みのメールアドレスです', { status: 409 });
  }
  
  // 処理続行...
}

// サーバーサイドバリデーション関数
function validateRSVPData(data: any): { valid: boolean; error?: string } {
  // 必須フィールドチェック
  const requiredFields = ['status', 'guest_side', 'jpn_family_name', 'jpn_first_name', 'rom_family_name', 'rom_first_name', 'email', 'allergy_flag'];
  for (const field of requiredFields) {
    if (!data[field] && data[field] !== 0) {
      return { valid: false, error: `${field}は必須項目です` };
    }
  }
  
  // 数値列挙型チェック
  if (!validateNumericEnum(data.status, [1, 2])) {
    return { valid: false, error: '無効な出欠情報です' };
  }
  
  if (!validateNumericEnum(data.guest_side, [0, 1])) {
    return { valid: false, error: '無効なゲストカテゴリーです' };
  }
  
  if (!validateNumericEnum(data.allergy_flag, [0, 1])) {
    return { valid: false, error: '無効な食事制限情報です' };
  }
  
  if (data.age_category !== undefined && !validateNumericEnum(data.age_category, [0, 1, 2])) {
    return { valid: false, error: '無効な年齢区分です' };
  }
  
  // メールアドレス検証
  if (!validator.isEmail(data.email)) {
    return { valid: false, error: '無効なメールアドレスです' };
  }
  
  // 文字数制限チェック
  const textLimits = {
    jpn_family_name: 20,
    jpn_first_name: 20,
    kana_family_name: 20,
    kana_first_name: 20,
    rom_family_name: 30,
    rom_first_name: 30,
    email: 100,
    phone_number: 20,
    zipcode: 10,
    address: 100,
    address2: 100,
    allergy: 500,
    guest_message: 1000
  };
  
  for (const [field, limit] of Object.entries(textLimits)) {
    if (data[field] && data[field].length > limit) {
      return { valid: false, error: `${field}は${limit}文字以内で入力してください` };
    }
  }
  
  return { valid: true };
}
```

## 🚫 レート制限実装

### API レート制限
```typescript
// lib/rate-limiter.ts
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

// RSVP API での使用例
export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request, {
    maxRequests: 3,        // 1時間に3回まで
    windowMs: 60 * 60 * 1000
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

## 🔒 CSRF・CORS対策

### セキュリティヘッダー設定
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      },
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
          }
        ]
      }
    ];
  }
};
```

### CSRF トークン検証
```typescript
// 追加のCSRF 保護（必要に応じて）
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

## 🚨 セキュリティログ・監査

### セキュリティイベントログ
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
    sendToExternalLoggingService(logData);
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

// 使用例
export async function POST(request: NextRequest) {
  try {
    // 処理
    logSecurityEvent({
      type: 'AUTH_SUCCESS',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date(),
      details: { action: 'rsvp_submit' }
    });
  } catch (error) {
    logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date(),
      details: { error: error.message, action: 'rsvp_submit' }
    });
  }
}
```

## 🗄️ データ保護・プライバシー

### 個人情報取り扱い原則
- **最小化原則**: 必要最小限の情報のみ収集
- **目的制限**: 結婚式運営目的のみに使用
- **保存期間**: 結婚式終了後1年で削除
- **アクセス制御**: 管理者のみアクセス可能

### データ削除機能（GDPR対応）
```typescript
// lib/data-protection.ts
export async function deleteGuestData(email: string) {
  try {
    const batch = db.batch();
    
    // RSVPデータの削除
    const rsvpQuery = await db.collection('rsvps').where('email', '==', email).get();
    rsvpQuery.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    // セキュリティログ記録
    logSecurityEvent({
      type: 'DATA_DELETION',
      ip: 'system',
      userAgent: 'system',
      timestamp: new Date(),
      details: { email, reason: 'user_request' }
    });
    
    return { success: true, message: 'データを削除しました' };
  } catch (error) {
    throw new AppError('データ削除に失敗しました', 'DATA_DELETION_ERROR', 500);
  }
}
```

## 🔐 エラーハンドリング・セキュリティ

### セキュアなエラーレスポンス
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

// API Routesでの使用
export async function POST(request: NextRequest) {
  try {
    // 処理
  } catch (error) {
    // セキュリティログ
    logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date(),
      details: { error: error.message }
    });
    
    if (error instanceof AppError) {
      // 制御されたエラー
      return new Response(
        error.exposeToClient ? error.message : 'Internal Server Error', 
        { status: error.statusCode }
      );
    }
    
    // 予期しないエラー（詳細を隠す）
    return new Response('Internal Server Error', { status: 500 });
  }
}
```

## 🧪 セキュリティテスト

### セキュリティチェック項目
```bash
# 依存関係の脆弱性チェック
npm audit

# 修正可能な脆弱性を自動修正
npm audit fix

# セキュリティホールの手動確認
npm audit --audit-level moderate

# 環境変数漏洩チェック
grep -r "NEXT_PUBLIC" . --exclude-dir=node_modules
```

### 手動セキュリティテスト
- SQLインジェクション（NoSQLインジェクション）テスト
- XSSテスト
- CSRFテスト
- レート制限テスト
- 認証バイパステスト

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）
