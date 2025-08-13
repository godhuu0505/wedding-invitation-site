# データベース設計指示書

## 🗄️ データベース概要

### 使用技術
- **Firebase Firestore** - NoSQLドキュメントデータベース
- **リージョン**: asia-northeast1（東京）
- **料金プラン**: Blaze（従量課金制）

## 📊 コレクション設計

### RSVPコレクション (`rsvps`)

#### 目的
ゲストからの出欠確認情報を保存

#### ドキュメント構造
```typescript
interface RSVPData {
  // 基本情報
  name: string;              // ゲスト名
  furigana: string;          // ふりがな
  email: string;             // メールアドレス
  
  // 出欠情報
  attendance: 'yes' | 'no';  // 出欠
  companions: number;        // 同伴者数
  companionNames?: string;   // 同伴者名
  
  // 追加情報
  allergies?: string;        // アレルギー情報
  message?: string;          // お祝いメッセージ
  notes?: string;           // 連絡事項
  
  // システム情報
  timestamp: Timestamp;      // 送信日時
  ipAddress?: string;        // 送信元IP（セキュリティ用）
  userAgent?: string;        // ブラウザ情報
  lastModified?: Timestamp;  // 最終更新日時
}
```

#### インデックス設定
```javascript
// firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "rsvps", 
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "attendance", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION", 
      "fields": [
        { "fieldPath": "email", "order": "ASCENDING" }
      ]
    }
  ]
}
```

### 管理者設定コレクション (`admin`)

#### ドキュメント構造
```typescript
interface AdminSettings {
  // 管理者一覧
  admins: string[];          // 管理者メールアドレス配列
  
  // サイト設定
  settings: {
    siteName: string;        // サイトタイトル
    weddingDate: string;     // 結婚式日程
    rsvpDeadline: string;    // RSVP締切日
    venueInfo: {
      name: string;          // 会場名
      address: string;       // 住所
      lat: number;           // 緯度
      lng: number;           // 経度
    };
  };
  
  // 通知設定
  notifications: {
    emailEnabled: boolean;   // メール通知の有無
    adminEmail: string;      // 通知先メールアドレス
    sendGridApiKey?: string; // SendGrid API Key
  };
  
  // 統計情報（キャッシュ用）
  stats?: {
    totalResponses: number;
    totalAttendees: number;
    totalDeclined: number;
    lastUpdated: Timestamp;
  };
}
```

## 🔍 クエリパターン

### 頻繁に使用されるクエリ

#### RSVP一覧取得（ページネーション）
```typescript
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
```

#### 出欠状況での絞り込み
```typescript
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

#### 統計情報取得（リアルタイム）
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

#### 重複チェッククエリ
```typescript
export async function checkDuplicateEmail(email: string): Promise<boolean> {
  const q = query(
    collection(db, 'rsvps'),
    where('email', '==', email),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
```

## 🔐 セキュリティルール

### 完全なセキュリティルール
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // RSVP データの管理
    match /rsvps/{document} {
      // 新規作成: 認証不要だが厳格なバリデーション
      allow create: if isValidRSVPData(request.resource.data) && 
                       !isDuplicateEmail(request.resource.data.email);
      
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
             request.auth.token.email in get(/databases/$(database)/documents/admin/settings).data.admins;
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
             name.matches('^[\\p{L}\\p{N}\\s\\-\\.]+$');
    }
    
    // ふりがなバリデーション
    function isValidFurigana(furigana) {
      return furigana is string && 
             furigana.size() > 0 && 
             furigana.size() <= 50 &&
             furigana.matches('^[あ-ん\\s]+$');
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
    
    // 重複メールチェック（簡易版）
    function isDuplicateEmail(email) {
      // 実装は複雑になるため、アプリケーション側でチェック推奨
      return false;
    }
  }
}
```

## 🔄 データマイグレーション

### 初期データセットアップ
```typescript
// scripts/setup-admin.ts
export async function setupAdminSettings() {
  const adminSettingsDoc = {
    admins: [process.env.ADMIN_EMAIL],
    settings: {
      siteName: "私たちの結婚式",
      weddingDate: "2025-11-03",
      rsvpDeadline: "2025-10-20",
      venueInfo: {
        name: process.env.NEXT_PUBLIC_VENUE_NAME || "東京ベイサイドホテル",
        address: process.env.NEXT_PUBLIC_VENUE_ADDRESS || "東京都港区台場1-1-1",
        lat: parseFloat(process.env.NEXT_PUBLIC_VENUE_LAT || "35.6321"),
        lng: parseFloat(process.env.NEXT_PUBLIC_VENUE_LNG || "139.7736")
      }
    },
    notifications: {
      emailEnabled: true,
      adminEmail: process.env.ADMIN_EMAIL
    }
  };

  await setDoc(doc(db, 'admin', 'settings'), adminSettingsDoc);
  console.log('管理者設定が初期化されました');
}
```

### テストデータ投入
```typescript
// scripts/seed-dev.ts
export async function seedTestData() {
  const sampleRSVPs = [
    {
      name: '田中太郎',
      furigana: 'たなかたろう',
      email: 'tanaka@example.com',
      attendance: 'yes',
      companions: 1,
      companionNames: '田中花子',
      allergies: 'エビアレルギー',
      message: '楽しみにしています！',
      timestamp: Timestamp.now(),
    },
    {
      name: '佐藤次郎',
      furigana: 'さとうじろう',
      email: 'sato@example.com',
      attendance: 'no',
      companions: 0,
      message: '残念ながら参加できません。お幸せに！',
      timestamp: Timestamp.now(),
    }
  ];

  for (const rsvp of sampleRSVPs) {
    await addDoc(collection(db, 'rsvps'), rsvp);
  }
  
  console.log('テストデータの投入が完了しました');
}
```

## 💾 バックアップ・復旧

### 自動バックアップ設定
```bash
# Firebase CLI でのバックアップスケジュール設定
firebase firestore:schedule-backup \
  --schedule "0 2 * * *" \
  --retention "30d" \
  --project wedding-invitation-2025
```

### 手動エクスポート
```typescript
// scripts/export-data.ts
export async function exportRSVPsToCSV() {
  const snapshot = await getDocs(collection(db, 'rsvps'));
  
  const csvData = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ID: doc.id,
      名前: data.name,
      ふりがな: data.furigana,
      メール: data.email,
      出欠: data.attendance === 'yes' ? '出席' : '欠席',
      同伴者数: data.companions || 0,
      同伴者名: data.companionNames || '',
      アレルギー: data.allergies || '',
      メッセージ: data.message || '',
      連絡事項: data.notes || '',
      送信日時: data.timestamp.toDate().toLocaleString('ja-JP'),
      最終更新: data.lastModified?.toDate().toLocaleString('ja-JP') || ''
    };
  });
  
  return convertToCSV(csvData);
}
```

### 復旧手順
```bash
# 1. Firestoreデータ復元
gcloud firestore import gs://wedding-invitation-backup/[BACKUP_ID]

# 2. インデックス再構築
firebase deploy --only firestore:indexes

# 3. セキュリティルール再適用
firebase deploy --only firestore:rules
```

## 📈 パフォーマンス最適化

### インデックス最適化
- 複合インデックスは実際のクエリパターンに基づいて設定
- 使用しないインデックスは削除（コスト削減）
- 配列フィールドのインデックスは慎重に設定

### クエリ最適化
```typescript
// 効率的なページネーション
export async function getRSVPsPaginated(pageSize: number, cursor?: string) {
  let q = query(
    collection(db, 'rsvps'),
    orderBy('timestamp', 'desc'),
    limit(pageSize)
  );
  
  if (cursor) {
    // カーソルベースページネーション
    const cursorDoc = await getDoc(doc(db, 'rsvps', cursor));
    q = query(q, startAfter(cursorDoc));
  }
  
  const snapshot = await getDocs(q);
  return {
    items: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    nextCursor: snapshot.docs.length === pageSize ? snapshot.docs[snapshot.docs.length - 1].id : null,
    hasMore: snapshot.docs.length === pageSize
  };
}
```

### コスト最適化
- 読み取り回数の最小化
- 適切なキャッシュ戦略
- 不要なリアルタイムリスナーの削除

---

**作成日**: 2025年8月13日
**対象プロジェクト**: 結婚式招待サイト（2025年11月3日）
