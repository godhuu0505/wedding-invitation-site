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

### データ追加パターン
```typescript
// lib/firebase-operations.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function submitRSVP(data: RSVPData) {
  try {
    const docRef = await addDoc(collection(db, 'rsvps'), {
      ...data,
      timestamp: Timestamp.now(),
      ipAddress: getClientIP()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('RSVP送信エラー:', error);
    throw new AppError('RSVP送信に失敗しました', 'RSVP_SUBMIT_ERROR', 500);
  }
}
```

### データ取得パターン
```typescript
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';

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
export async function getRSVPsByAttendance(attendance: 'yes' | 'no') {
  const q = query(
    collection(db, 'rsvps'),
    where('attendance', '==', attendance),
    orderBy('timestamp', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### 統計情報取得パターン
```typescript
export async function getRSVPStats() {
  const snapshot = await getDocs(collection(db, 'rsvps'));
  
  const stats = {
    total: snapshot.size,
    attendees: 0,
    declined: 0,
    companions: 0,
    lastUpdated: new Date()
  };
  
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (data.attendance === 'yes') {
      stats.attendees++;
      stats.companions += data.companions || 0;
    } else {
      stats.declined++;
    }
  });
  
  return stats;
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

### 手動エクスポート
```typescript
// scripts/export-data.ts
export async function exportRSVPsToCSV() {
  const snapshot = await getDocs(collection(db, 'rsvps'));
  
  const csvData = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      名前: data.name,
      ふりがな: data.furigana,
      メール: data.email,
      出欠: data.attendance === 'yes' ? '出席' : '欠席',
      同伴者数: data.companions || 0,
      アレルギー: data.allergies || '',
      メッセージ: data.message || '',
      送信日時: data.timestamp.toDate().toLocaleString('ja-JP')
    };
  });
  
  return convertToCSV(csvData);
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
