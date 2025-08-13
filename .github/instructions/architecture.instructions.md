# アーキテクチャ・コンポーネント設計指示書

## 🏗️ システムアーキテクチャ

### アプリケーション構成
```
Frontend (Next.js 14)     Backend (Firebase)     External APIs
├── App Router            ├── Firestore         ├── Google Maps API
├── Server Components     ├── Authentication    └── SendGrid (将来)
├── Client Components     ├── Functions         
└── API Routes           └── Hosting           
```

### データフロー
```
User → RSVPForm → API Route → Firestore → Admin Dashboard
                      ↓
                Security Validation
                      ↓  
                Rate Limiting
                      ↓
                Audit Logging
```

## 🎨 コンポーネント設計パターン

### RSVPフォームパターン（最重要）
```typescript
// components/RSVPForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { rsvpSchema } from '@/lib/validation';

interface RSVPFormProps {
  onSubmit: (data: RSVPFormData) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

interface RSVPFormData {
  name: string;
  furigana: string;
  email: string;
  attendance: 'yes' | 'no';
  companions: number;
  companionNames?: string;
  allergies?: string;
  message?: string;
  notes?: string;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ 
  onSubmit, 
  isLoading = false, 
  error,
  className = '' 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm<RSVPFormData>({
    resolver: yupResolver(rsvpSchema),
    defaultValues: {
      attendance: 'yes',
      companions: 0
    }
  });

  const attendance = watch('attendance');
  const companions = watch('companions');

  const handleFormSubmit = async (data: RSVPFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('フォーム送信エラー:', error);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      className={`space-y-6 max-w-md mx-auto ${className}`}
    >
      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* 基本情報 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="田中太郎"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ふりがな <span className="text-red-500">*</span>
          </label>
          <input
            {...register('furigana')}
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="たなかたろう"
          />
          {errors.furigana && (
            <p className="text-red-500 text-xs mt-1">{errors.furigana.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="tanaka@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* 出欠確認 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          出欠のご連絡 <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              {...register('attendance')}
              type="radio"
              value="yes"
              className="text-pink-500 focus:ring-pink-500"
            />
            <span className="ml-2 text-sm">出席いたします</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('attendance')}
              type="radio"
              value="no"
              className="text-pink-500 focus:ring-pink-500"
            />
            <span className="ml-2 text-sm">欠席いたします</span>
          </label>
        </div>
        {errors.attendance && (
          <p className="text-red-500 text-xs mt-1">{errors.attendance.message}</p>
        )}
      </div>

      {/* 同伴者（出席の場合のみ表示） */}
      {attendance === 'yes' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              同伴者数
            </label>
            <select
              {...register('companions', { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {[0, 1, 2, 3, 4, 5].map(num => (
                <key={num} value={num}>
                  {num}名
                </option>
              ))}
            </select>
            {errors.companions && (
              <p className="text-red-500 text-xs mt-1">{errors.companions.message}</p>
            )}
          </div>

          {companions > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                同伴者のお名前
              </label>
              <input
                {...register('companionNames')}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="田中花子"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              アレルギー・食事制限
            </label>
            <textarea
              {...register('allergies')}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="特にない場合は空欄で結構です"
            />
            {errors.allergies && (
              <p className="text-red-500 text-xs mt-1">{errors.allergies.message}</p>
            )}
          </div>
        </div>
      )}

      {/* メッセージ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          お祝いメッセージ
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="お祝いの言葉をお聞かせください（任意）"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isLoading || isSubmitting}
        className="w-full bg-pink-500 text-white py-3 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading || isSubmitting ? '送信中...' : '送信する'}
      </button>
    </form>
  );
};

export default RSVPForm;
```

### レイアウトコンポーネントパターン
```typescript
// components/Layout.tsx
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {title || '私たちの結婚式へようこそ'}
          </h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 Wedding Invitation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
```

## 🛠️ API Routes設計パターン

### RSVP送信APIパターン
```typescript
// app/api/rsvp/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { checkRateLimit } from '@/lib/rate-limiter';
import { validateRSVPData } from '@/lib/validation';
import { logSecurityEvent } from '@/lib/security-logger';
import { AppError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック
    const rateLimit = checkRateLimit(request, {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000 // 1時間
    });

    if (!rateLimit.allowed) {
      logSecurityEvent({
        type: 'RATE_LIMIT',
        ip: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        timestamp: new Date(),
        details: { action: 'rsvp_submit' }
      });

      return NextResponse.json(
        { error: 'Rate limit exceeded' },
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

    // リクエストボディの解析
    const body = await request.json();
    
    // 入力検証
    const validation = validateRSVPData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 重複チェック
    const isDuplicate = await checkDuplicateEmail(validation.data.email);
    if (isDuplicate) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 409 }
      );
    }

    // Firestoreに保存
    const rsvpData = {
      ...validation.data,
      timestamp: Timestamp.now(),
      ipAddress: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    const docRef = await addDoc(collection(db, 'rsvps'), rsvpData);

    // 成功ログ
    logSecurityEvent({
      type: 'AUTH_SUCCESS',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date(),
      details: { 
        action: 'rsvp_submit',
        docId: docRef.id,
        attendance: validation.data.attendance
      }
    });

    return NextResponse.json({
      success: true,
      message: 'RSVPを送信しました',
      id: docRef.id
    });

  } catch (error) {
    // エラーログ
    logSecurityEvent({
      type: 'SUSPICIOUS_ACTIVITY',
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date(),
      details: { 
        action: 'rsvp_submit',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });

    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### 管理画面API認証パターン
```typescript
// app/api/admin/rsvps/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { checkAdminPermissions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // 認証トークン確認
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decodedToken = await auth.verifyIdToken(token);
    
    // 管理者権限確認
    const hasPermission = await checkAdminPermissions(decodedToken.email);
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // RSVPデータ取得
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const attendance = searchParams.get('attendance');

    const rsvpData = await getRSVPs({
      page,
      limit,
      attendance: attendance as 'yes' | 'no' | undefined
    });

    return NextResponse.json(rsvpData);

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

## 🔧 ユーティリティ関数パターン

### バリデーション関数
```typescript
// lib/validation.ts
import * as yup from 'yup';

export const rsvpSchema = yup.object({
  name: yup.string()
    .required('名前は必須です')
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以内で入力してください')
    .matches(/^[\p{L}\p{N}\s\-\.]+$/u, '有効な文字のみ使用してください'),
    
  furigana: yup.string()
    .required('ふりがなは必須です')
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
    
  companionNames: yup.string()
    .max(300, '同伴者名は300文字以内で入力してください'),
    
  allergies: yup.string()
    .max(500, 'アレルギー情報は500文字以内で入力してください'),
    
  message: yup.string()
    .max(1000, 'メッセージは1000文字以内で入力してください'),
    
  notes: yup.string()
    .max(500, '連絡事項は500文字以内で入力してください')
});

export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  error?: string;
}

export function validateRSVPData(data: any): ValidationResult<RSVPFormData> {
  try {
    const validatedData = rsvpSchema.validateSync(data, { 
      abortEarly: false,
      stripUnknown: true
    });
    
    return {
      valid: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        valid: false,
        error: error.errors[0] // 最初のエラーメッセージを返す
      };
    }
    
    return {
      valid: false,
      error: 'バリデーションエラーが発生しました'
    };
  }
}
```

### データアクセス関数
```typescript
// lib/firebase-operations.ts
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter,
  where,
  Timestamp 
} from 'firebase/firestore';

export interface RSVPData {
  name: string;
  furigana: string;
  email: string;
  attendance: 'yes' | 'no';
  companions: number;
  companionNames?: string;
  allergies?: string;
  message?: string;
  notes?: string;
  timestamp: Timestamp;
  ipAddress?: string;
  userAgent?: string;
}

export interface GetRSVPsOptions {
  page: number;
  limit: number;
  attendance?: 'yes' | 'no';
}

export async function submitRSVP(data: Omit<RSVPData, 'timestamp'>): Promise<string> {
  try {
    const rsvpData: RSVPData = {
      ...data,
      timestamp: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'rsvps'), rsvpData);
    return docRef.id;
  } catch (error) {
    throw new AppError('RSVP送信に失敗しました', 'RSVP_SUBMIT_ERROR', 500);
  }
}

export async function getRSVPs(options: GetRSVPsOptions) {
  try {
    const { page, limit: pageSize, attendance } = options;
    const offset = (page - 1) * pageSize;
    
    let q = query(
      collection(db, 'rsvps'),
      orderBy('timestamp', 'desc')
    );
    
    if (attendance) {
      q = query(q, where('attendance', '==', attendance));
    }
    
    q = query(q, limit(pageSize));
    
    // ページネーション実装
    if (offset > 0) {
      // 実際のアプリケーションではcursorベースの実装を推奨
      const offsetQuery = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'), limit(offset));
      const offsetSnapshot = await getDocs(offsetQuery);
      const lastDoc = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
      
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
    }
    
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      items,
      hasMore: items.length === pageSize,
      total: snapshot.size
    };
  } catch (error) {
    throw new AppError('データ取得に失敗しました', 'DATA_FETCH_ERROR', 500);
  }
}

export async function checkDuplicateEmail(email: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'rsvps'),
      where('email', '==', email),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    // エラーの場合は安全側に倒して重複ありとする
    return true;
  }
}
```

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）
