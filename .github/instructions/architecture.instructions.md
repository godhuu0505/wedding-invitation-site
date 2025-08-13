---
applyTo: "components/**/*.{tsx,ts}"
---

# アーキテクチャ設計指示書

## 🏗️ システムアーキテクチャ

### アプリケーション構成
```
Frontend (Next.js 14)          Backend (Firebase)         External APIs
├── App Router (SSR/SSG)       ├── Firestore            ├── Google Maps Embed
├── Server Components          ├── Authentication       └── CDN (Vegas.js等)
├── Client Components          ├── Functions            
├── Loading/Error UI           └── Hosting              
└── API Routes                                          

Animation Libraries
├── Framer Motion (React用)
├── Vegas.js (背景スライドショー)
├── Vivus.js (SVGアニメーション)
└── ScrollTrigger (スクロール連動)
```

### データフロー（reference-site.html完全再現版）
```
User → LoadingScreen (5s) → Header (カルーセル) → Sections → RSVPForm → API → Firestore
                               ↓                              ↓
                        Navigation Menu              Security Validation
                               ↓                              ↓  
                        Smooth Scroll               Rate Limiting + Audit Log
                               ↓                              ↓
                        Animation Triggers          Admin Dashboard
```

## 🎨 コンポーネント設計パターン

### RSVPフォームパターン（reference-site.html完全再現版）
```typescript
// components/forms/RSVPForm.tsx
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
  // 出欠情報
  status: 1 | 2; // 1: 出席, 2: 欠席
  guest_side: 0 | 1; // 0: 新郎側, 1: 新婦側
  
  // 名前情報
  jpn_family_name: string;
  jpn_first_name: string;
  kana_family_name?: string;
  kana_first_name?: string;
  rom_family_name: string;
  rom_first_name: string;
  
  // 連絡先
  email: string;
  phone_number?: string;
  
  // 住所情報
  zipcode?: string;
  address?: string;
  address2?: string;
  
  // その他
  age_category?: 0 | 1 | 2; // 0: 大人, 1: 子供, 2: 幼児
  allergy_flag: 0 | 1; // 0: なし, 1: あり
  allergy?: string;
  guest_message?: string;
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
      status: 1,
      guest_side: 0,
      allergy_flag: 0
    }
  });

  const status = watch('status');
  const allergyFlag = watch('allergy_flag');

  const handleFormSubmit = async (data: RSVPFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('フォーム送信エラー:', error);
    }
  };

  return (
    <section id="rsvp" className="rsvp py-24 bg-gradient-to-br from-akane-50 to-akane-100">
      <div className="container max-w-4xl mx-auto px-8">
        <h2 className="text-center mb-12">
          <span className="en block font-playfair text-4xl md:text-5xl font-normal mb-2 text-akane-600">
            ご出欠
          </span>
          <span className="ja text-sm md:text-base text-gray-600 tracking-widest">
            R.S.V.P.
          </span>
        </h2>
        
        <div className="rsvp-txt text-center mb-12">
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            お手数ではございますが<br />
            ご出欠情報のご登録をお願い申し上げます
          </p>
          <p className="limit font-semibold text-akane-600">
            2025.10.30までにご一報をお願いいたします
          </p>
        </div>

        <form 
          onSubmit={handleSubmit(handleFormSubmit)} 
          className={`form bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto ${className}`}
        >
          {/* エラー表示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* 出欠選択 */}
          <div className="row attendance text-center mb-8">
            <div className="flex justify-center gap-8">
              <label className="form-check-inline flex items-center cursor-pointer">
                <input
                  {...register('status', { valueAsNumber: true })}
                  type="radio"
                  value={1}
                  className="w-5 h-5 mr-3 text-akane-500 focus:ring-akane-500"
                />
                <span className="text-xl font-semibold text-gray-800">ATTEND</span>
              </label>
              <label className="form-check-inline flex items-center cursor-pointer">
                <input
                  {...register('status', { valueAsNumber: true })}
                  type="radio"
                  value={2}
                  className="w-5 h-5 mr-3 text-akane-500 focus:ring-akane-500"
                />
                <span className="text-xl font-semibold text-gray-800">ABSENT</span>
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm mt-2">{errors.status.message}</p>
            )}
          </div>

          {/* ゲストカテゴリー */}
          <FormField
            title={{ ja: "ゲストカテゴリー", en: "Guest Category" }}
            required
            error={errors.guest_side?.message}
          >
            <div className="input-check flex gap-6">
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('guest_side', { valueAsNumber: true })}
                  type="radio"
                  value={0}
                  className="w-4 h-4 mr-2 text-akane-500 focus:ring-akane-500"
                />
                <span>新郎側ゲスト<span className="text-gray-500">（Groom）</span></span>
              </label>
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('guest_side', { valueAsNumber: true })}
                  type="radio"
                  value={1}
                  className="w-4 h-4 mr-2 text-akane-500 focus:ring-akane-500"
                />
                <span>新婦側ゲスト<span className="text-gray-500">（Bride）</span></span>
              </label>
            </div>
          </FormField>

          {/* 名前 */}
          <FormField
            title={{ ja: "お名前", en: "Name" }}
            required
          >
            <div className="input2 grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register('jpn_family_name')}
                  type="text"
                  placeholder="姓"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
                />
                {errors.jpn_family_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.jpn_family_name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('jpn_first_name')}
                  type="text"
                  placeholder="名"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
                />
                {errors.jpn_first_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.jpn_first_name.message}</p>
                )}
              </div>
            </div>
          </FormField>

          {/* かな */}
          <FormField
            title={{ ja: "かな", en: "Kana" }}
          >
            <div className="input2 grid grid-cols-2 gap-4">
              <input
                {...register('kana_family_name')}
                type="text"
                placeholder="せい"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
              />
              <input
                {...register('kana_first_name')}
                type="text"
                placeholder="めい"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
              />
            </div>
          </FormField>

          {/* ローマ字 */}
          <FormField
            title={{ ja: "ローマ字", en: "Latin alphabet" }}
            required
          >
            <div className="input2 grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register('rom_family_name')}
                  type="text"
                  placeholder="last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
                />
                {errors.rom_family_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.rom_family_name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('rom_first_name')}
                  type="text"
                  placeholder="first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
                />
                {errors.rom_first_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.rom_first_name.message}</p>
                )}
              </div>
            </div>
          </FormField>

          {/* メールアドレス */}
          <FormField
            title={{ ja: "メールアドレス", en: "Email Address" }}
            required
            error={errors.email?.message}
          >
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
            />
          </FormField>

          {/* 年齢区分 */}
          <FormField
            title={{ ja: "年齢区分", en: "Age Group" }}
          >
            <div className="input-check flex gap-6 flex-wrap">
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('age_category', { valueAsNumber: true })}
                  type="radio"
                  value={0}
                  className="w-4 h-4 mr-2"
                />
                <span>大人Adult</span>
              </label>
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('age_category', { valueAsNumber: true })}
                  type="radio"
                  value={1}
                  className="w-4 h-4 mr-2"
                />
                <span>子供Child</span>
              </label>
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('age_category', { valueAsNumber: true })}
                  type="radio"
                  value={2}
                  className="w-4 h-4 mr-2"
                />
                <span>幼児Infant</span>
              </label>
            </div>
          </FormField>

          {/* 食事制限 */}
          <FormField
            title={{ ja: "食事制限", en: "Dietary Restrictions" }}
            required
            error={errors.allergy_flag?.message}
          >
            <div className="input-check flex gap-6">
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('allergy_flag', { valueAsNumber: true })}
                  type="radio"
                  value={1}
                  className="w-4 h-4 mr-2"
                />
                <span>有りWith</span>
              </label>
              <label className="form-check flex items-center cursor-pointer">
                <input
                  {...register('allergy_flag', { valueAsNumber: true })}
                  type="radio"
                  value={0}
                  className="w-4 h-4 mr-2"
                />
                <span>無しWithout</span>
              </label>
            </div>
          </FormField>

          {/* アレルギー詳細 */}
          {allergyFlag === 1 && (
            <FormField>
              <input
                {...register('allergy')}
                type="text"
                placeholder="えび かに くるみ 小麦 そば 卵 乳 落花生 etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent"
              />
            </FormField>
          )}

          {/* メッセージ */}
          <FormField
            title={{ ja: "メッセージ", en: "Message" }}
          >
            <textarea
              {...register('guest_message')}
              rows={3}
              placeholder="MESSAGE"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent resize-vertical min-h-[100px]"
            />
          </FormField>

          {/* 送信ボタン */}
          <div className="btn-wrap text-center mt-8">
            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="bg-akane-500 text-white py-4 px-12 rounded-full text-lg font-semibold hover:bg-akane-600 focus:outline-none focus:ring-2 focus:ring-akane-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {isLoading || isSubmitting ? '送信中...' : (
                <img src="/images/submit.svg" alt="送信" className="w-24 h-auto" />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// フォームフィールドラッパー
const FormField: React.FC<{
  title?: { ja: string; en: string };
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ title, required = false, error, children }) => {
  return (
    <div className="row mb-8">
      {title && (
        <div className="tit mb-4">
          <span className="tit-ja block text-lg font-semibold text-gray-800 mb-1">
            {title.ja}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
          <span className="tit-en text-sm text-gray-500 font-playfair">
            {title.en}
          </span>
        </div>
      )}
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
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
