---
applyTo: "lib/firebase.{ts,js}"
---

# Firebase統合指示書

## 🔥 Firebase プロジェクト構成

### プロジェクト情報
- **プロジェクト名**: `wedding-invitation-2025`
- **リージョン**: `asia-northeast1`（東京）
- **料金プラン**: Blaze（従量課金制）

### 有効化サービス
- **Firestore Database**: メインデータベース
- **Authentication**: 管理画面認証
- **Functions**: サーバーレス処理
- **Hosting**: 本番デプロイ用（オプション）

## ⚙️ Firebase設定パターン

### 環境変数設定
```bash
# 必須環境変数
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
```

### Firebase初期化パターン
```typescript
// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```

## 🗄️ Firestore操作パターン

### データ追加パターン（reference-site.html対応）
```typescript
// lib/firebase-operations.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface RSVPData {
  // 出欠情報
  status: 1 | 2;                    // 1: 出席, 2: 欠席
  guest_side: 0 | 1;                // 0: 新郎側, 1: 新婦側
  
  // 名前情報
  jpn_family_name: string;          // 日本語姓
  jpn_first_name: string;           // 日本語名
  kana_family_name?: string;        // かな姓
  kana_first_name?: string;         // かな名
  rom_family_name: string;          // ローマ字姓
  rom_first_name: string;           // ローマ字名
  
  // 連絡先
  email: string;                    // メールアドレス
  phone_number?: string;            // 電話番号
  
  // 住所情報
  zipcode?: string;                 // 郵便番号
  address?: string;                 // 住所1
  address2?: string;                // 住所2
  
  // その他
  age_category?: 0 | 1 | 2;         // 0: 大人, 1: 子供, 2: 幼児
  allergy_flag: 0 | 1;              // 0: なし, 1: あり
  allergy?: string;                 // アレルギー詳細
  guest_message?: string;           // ゲストメッセージ
}

export async function submitRSVP(data: RSVPData) {
  try {
    // 重複チェック
    const isDuplicate = await checkDuplicateEmail(data.email);
    if (isDuplicate) {
      throw new AppError('既に登録済みのメールアドレスです', 'DUPLICATE_EMAIL', 409);
    }
    
    // サブミッションIDの生成
    const submissionId = generateSubmissionId();
    
    const docRef = await addDoc(collection(db, 'rsvps'), {
      ...data,
      timestamp: Timestamp.now(),
      submissionId,
      ipAddress: getClientIP(),
      userAgent: getUserAgent()
    });
    
    // 統計情報の更新（キャッシュ）
    await updateStatsCache();
    
    return { 
      success: true, 
      id: docRef.id,
      submissionId 
    };
  } catch (error) {
    console.error('RSVP送信エラー:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('RSVP送信に失敗しました', 'RSVP_SUBMIT_ERROR', 500);
  }
}

// 重複チェック関数
async function checkDuplicateEmail(email: string): Promise<boolean> {
  const q = query(
    collection(db, 'rsvps'),
    where('email', '==', email),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// サブミッションID生成
function generateSubmissionId(): string {
  return `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
```

### データ取得パターン（包括的クエリ）
```typescript
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, where, startAfter } from 'firebase/firestore';

// 全RSVP取得（ページネーション）
export async function getRSVPs(pageSize: number = 20, lastDoc?: any) {
  const rsvpsRef = collection(db, 'rsvps');
  let q = query(rsvpsRef, orderBy('timestamp', 'desc'), limit(pageSize));
  
  if (lastDoc) {
    q = query(rsvpsRef, orderBy('timestamp', 'desc'), startAfter(lastDoc), limit(pageSize));
  }
  
  const snapshot = await getDocs(q);
  return {
    docs: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
    hasMore: snapshot.docs.length === pageSize
  };
}

// 出欠状況での絞り込み
export async function getRSVPsByStatus(status: 1 | 2) {
  const q = query(
    collection(db, 'rsvps'),
    where('status', '==', status),
    orderBy('timestamp', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ゲスト側別の絞り込み
export async function getRSVPsByGuestSide(guestSide: 0 | 1) {
  const q = query(
    collection(db, 'rsvps'),
    where('guest_side', '==', guestSide),
    where('status', '==', 1), // 出席者のみ
    orderBy('timestamp', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// アレルギー情報の取得
export async function getAllergyGuests() {
  const q = query(
    collection(db, 'rsvps'),
    where('allergy_flag', '==', 1),
    where('status', '==', 1), // 出席者のみ
    orderBy('timestamp', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: `${data.jpn_family_name} ${data.jpn_first_name}`,
      romanName: `${data.rom_first_name} ${data.rom_family_name}`,
      allergy: data.allergy,
      email: data.email
    };
  });
}

// 年齢区分別の取得
export async function getRSVPsByAgeCategory(ageCategory: 0 | 1 | 2) {
  const q = query(
    collection(db, 'rsvps'),
    where('age_category', '==', ageCategory),
    where('status', '==', 1), // 出席者のみ
    orderBy('timestamp', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### 統計情報取得パターン（詳細版）
```typescript
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
    lastUpdated: new Date()
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
      
      // アレルギー
      if (data.allergy_flag === 1) {
        stats.allergyCount++;
      }
      
      // 年齢区分
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
  });
  
  return stats;
}

// 統計情報キャッシュ更新
export async function updateStatsCache() {
  try {
    const stats = await getRSVPStats();
    await setDoc(doc(db, 'admin', 'stats'), {
      ...stats,
      lastUpdated: Timestamp.now()
    });
  } catch (error) {
    console.error('統計情報キャッシュ更新エラー:', error);
  }
}
```

## 🔐 Firebase Authentication

### 管理者認証パターン
```typescript
// lib/auth.ts
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export async function signInAdmin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // 管理者権限チェック
    const isAdmin = await checkAdminPermissions(userCredential.user.email);
    if (!isAdmin) {
      await signOut(auth);
      throw new Error('管理者権限がありません');
    }
    
    return userCredential.user;
  } catch (error) {
    throw new AppError('ログインに失敗しました', 'AUTH_ERROR', 401);
  }
}

export async function signOutAdmin() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new AppError('ログアウトに失敗しました', 'SIGNOUT_ERROR', 500);
  }
}
```

### 権限チェックパターン
```typescript
export async function checkAdminPermissions(userEmail: string | null): Promise<boolean> {
  if (!userEmail) return false;
  
  try {
    const adminDoc = await getDoc(doc(db, 'admin', 'settings'));
    const adminEmails = adminDoc.data()?.admins || [];
    return adminEmails.includes(userEmail);
  } catch (error) {
    console.error('権限チェックエラー:', error);
    return false;
  }
}
```

## 🛡️ セキュリティルールパターン

### 基本的なセキュリティルール
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // RSVP データの管理
    match /rsvps/{document} {
      allow create: if isValidRSVPData(request.resource.data);
      allow read, update, delete: if isAuthenticated() && isAdmin();
    }
    
    // 管理者設定
    match /admin/{document} {
      allow read, write: if isAuthenticated() && isAdmin();
    }
    
    // 認証チェック
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // 管理者チェック
    function isAdmin() {
      return isAuthenticated() && 
             request.auth.token.email in resource.data.admins;
    }
  }
}
```

## 🔧 Firebase開発コマンド

### 必須コマンド
```bash
# Firebase CLI インストール
npm install -g firebase-tools

# ログイン
firebase login

# プロジェクト初期化
firebase init

# エミュレータ起動（開発用）
firebase emulators:start --only firestore

# セキュリティルールデプロイ
firebase deploy --only firestore:rules

# インデックスデプロイ
firebase deploy --only firestore:indexes
```

### デバッグ・監視コマンド
```bash
# Firestore使用量確認
firebase firestore:usage

# セキュリティルールテスト
firebase emulators:exec --only firestore "npm test"

# ログ確認
firebase functions:log
```

## 📊 データエクスポート・バックアップ

### 手動エクスポート（reference-site.html対応フォーマット）
```typescript
// scripts/export-data.ts
export async function exportRSVPsToCSV() {
  const snapshot = await getDocs(collection(db, 'rsvps'));
  
  const csvData = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ID: doc.id,
      出欠: data.status === 1 ? '出席' : '欠席',
      ゲスト側: data.guest_side === 0 ? '新郎側' : '新婦側',
      日本語姓: data.jpn_family_name,
      日本語名: data.jpn_first_name,
      かな姓: data.kana_family_name || '',
      かな名: data.kana_first_name || '',
      ローマ字姓: data.rom_family_name,
      ローマ字名: data.rom_first_name,
      メールアドレス: data.email,
      電話番号: data.phone_number || '',
      郵便番号: data.zipcode || '',
      住所1: data.address || '',
      住所2: data.address2 || '',
      年齢区分: getAgeCategoryText(data.age_category),
      食事制限: data.allergy_flag === 1 ? 'あり' : 'なし',
      アレルギー詳細: data.allergy || '',
      メッセージ: data.guest_message || '',
      送信日時: data.timestamp.toDate().toLocaleString('ja-JP'),
      サブミッションID: data.submissionId || ''
    };
  });
  
  return convertToCSV(csvData);
}

function getAgeCategoryText(category?: number): string {
  switch (category) {
    case 0: return '大人';
    case 1: return '子供';
    case 2: return '幼児';
    default: return '大人';
  }
}

// アレルギー情報専用エクスポート
export async function exportAllergyInfo() {
  const allergyGuests = await getAllergyGuests();
  
  const csvData = allergyGuests.map(guest => ({
    氏名: guest.name,
    ローマ字名: guest.romanName,
    メールアドレス: guest.email,
    アレルギー詳細: guest.allergy
  }));
  
  return convertToCSV(csvData);
}

// ゲスト側別エクスポート
export async function exportGuestsBySide() {
  const groomGuests = await getRSVPsByGuestSide(0);
  const brideGuests = await getRSVPsByGuestSide(1);
  
  return {
    groomSide: convertToCSV(groomGuests.map(formatGuestForExport)),
    brideSide: convertToCSV(brideGuests.map(formatGuestForExport))
  };
}

function formatGuestForExport(doc: any) {
  const data = doc.data ? doc.data() : doc;
  return {
    氏名: `${data.jpn_family_name} ${data.jpn_first_name}`,
    ローマ字名: `${data.rom_first_name} ${data.rom_family_name}`,
    かな: `${data.kana_family_name || ''} ${data.kana_first_name || ''}`,
    メールアドレス: data.email,
    年齢区分: getAgeCategoryText(data.age_category),
    アレルギー: data.allergy_flag === 1 ? data.allergy || 'あり（詳細なし）' : 'なし',
    送信日時: data.timestamp.toDate().toLocaleString('ja-JP')
  };
}
```

### 自動バックアップ
```bash
# Cloud Scheduler + Cloud Functions でのバックアップ
gcloud firestore export gs://wedding-invitation-backup/$(date +%Y%m%d-%H%M%S)
```

## 🚨 エラーハンドリングパターン

### Firebase エラー処理
```typescript
// lib/error-handler.ts
export class FirebaseError extends Error {
  constructor(
    public message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'FirebaseError';
  }
}

export function handleFirebaseError(error: any): FirebaseError {
  switch (error.code) {
    case 'permission-denied':
      return new FirebaseError('権限がありません', 'PERMISSION_DENIED');
    case 'not-found':
      return new FirebaseError('データが見つかりません', 'NOT_FOUND');
    case 'unavailable':
      return new FirebaseError('サービスが一時的に利用できません', 'SERVICE_UNAVAILABLE');
    default:
      return new FirebaseError('データベースエラーが発生しました', 'UNKNOWN_ERROR', error);
  }
}
```

## 📈 パフォーマンス最適化

### 読み取り最適化
- 複合インデックスの適切な設定
- ページネーションによる大量データ対応
- キャッシュ戦略（統計情報のキャッシュ）

### 書き込み最適化
- バッチ書き込みの活用
- トランザクションでの整合性保証
- レート制限による負荷分散

### コスト最適化
- 不要なインデックスの削除
- 読み取り回数の最小化
- 適切なセキュリティルールでの無駄なアクセス防止

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）
