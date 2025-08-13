---
applyTo: "lib/**/*.{ts,js}"
---

# データベース設計指示書 - reference-site.html完全対応版

## 🗄️ データベース概要

### 使用技術
- **Firebase Firestore** - NoSQLドキュメントデータベース
- **リージョン**: asia-northeast1（東京）
- **料金プラン**: Blaze（従量課金制）

## 📊 コレクション設計（reference-site.html準拠）

### RSVPコレクション (`rsvps`) - reference-site.html完全対応

#### 目的
ゲストからの出欠確認情報を保存（reference-site.htmlフォーム仕様に完全準拠）

#### ドキュメント構造
```typescript
interface RSVPData {
  // ========== 出欠情報 ==========
  status: 1 | 2;                    // 1: 出席, 2: 欠席 (reference-site準拠)
  guest_side: 0 | 1;                // 0: 新郎側, 1: 新婦側 (reference-site準拠)
  
  // ========== 名前情報（reference-site.html完全対応） ==========
  jpn_family_name: string;          // 日本語姓（必須）
  jpn_first_name: string;           // 日本語名（必須）
  kana_family_name?: string;        // かな姓（任意）
  kana_first_name?: string;         // かな名（任意）
  rom_family_name: string;          // ローマ字姓（必須）
  rom_first_name: string;           // ローマ字名（必須）
  
  // ========== 連絡先情報 ==========
  email: string;                    // メールアドレス（必須、重複チェック）
  phone_number?: string;            // 電話番号（任意）
  
  // ========== 住所情報（reference-site.html準拠） ==========
  zipcode?: string;                 // 郵便番号（7桁、ハイフンなし）
  address?: string;                 // 住所1（都道府県・市区町村・番地）
  address2?: string;                // 住所2（建物名・部屋番号等）
  
  // ========== ゲスト分類（reference-site.html準拠） ==========
  age_category?: 0 | 1 | 2;         // 0: 大人（デフォルト）, 1: 子供, 2: 幼児
  
  // ========== 食事制限・アレルギー情報 ==========
  allergy_flag: 0 | 1;              // 0: なし, 1: あり（必須選択）
  allergy?: string;                 // アレルギー詳細（allergy_flag=1の場合）
  
  // ========== メッセージ ==========
  guest_message?: string;           // ゲストからのメッセージ（任意、500文字以内）
  
  // ========== システム情報 ==========
  timestamp: Timestamp;             // 送信日時
  submission_id: string;            // 一意のサブミッションID (rsvp_yyyymmdd_hhmmss_xxxxx)
  ip_address?: string;              // 送信元IP（セキュリティ・重複防止用）
  user_agent?: string;              // ブラウザ情報（分析用）
  last_modified?: Timestamp;        // 最終更新日時（編集機能用）
  
  // ========== 管理者情報 ==========
  admin_notes?: string;             // 管理者用メモ（内部用）
  is_verified?: boolean;            // 確認済みフラグ（管理者用）
  follow_up_required?: boolean;     // フォローアップ必要フラグ
}
```

#### reference-site.html準拠のバリデーションルール
```typescript
// lib/validation/rsvp-validation.ts
export const rsvpValidationSchema = {
  // 必須フィールド
  required: [
    'status',           // 出欠選択
    'guest_side',       // ゲストカテゴリー（新郎側・新婦側）
    'jpn_family_name',  // お名前（姓）
    'jpn_first_name',   // お名前（名）
    'rom_family_name',  // ローマ字姓
    'rom_first_name',   // ローマ字名
    'email',            // メールアドレス
    'allergy_flag'      // 食事制限の有無
  ],
  
  // フィールド長制限
  maxLength: {
    jpn_family_name: 50,
    jpn_first_name: 50,
    kana_family_name: 50,
    kana_first_name: 50,
    rom_family_name: 50,
    rom_first_name: 50,
    email: 100,
    phone_number: 15,
    zipcode: 7,
    address: 200,
    address2: 100,
    allergy: 500,
    guest_message: 500,
    admin_notes: 1000
  },
  
  // 形式バリデーション
  patterns: {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone_number: /^[0-9\-\+\(\)\s]+$/,
    zipcode: /^\d{7}$/,
    kana: /^[あ-んー\s]*$/,
    romaji: /^[a-zA-Z\s\-\.\']+$/
  },
  
  // 列挙値
  enums: {
    status: [1, 2],              // 1: 出席, 2: 欠席
    guest_side: [0, 1],          // 0: 新郎側, 1: 新婦側
    age_category: [0, 1, 2],     // 0: 大人, 1: 子供, 2: 幼児
    allergy_flag: [0, 1]         // 0: なし, 1: あり
  }
};
```

#### インデックス設計（検索・パフォーマンス最適化）
```javascript
// firestore.indexes.json
{
  "indexes": [
    // 時系列ソート（管理画面用）
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    
    // 出欠別ソート
    {
      "collectionGroup": "rsvps", 
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    
    // ゲスト側別ソート
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION", 
      "fields": [
        { "fieldPath": "guest_side", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    
    // メールアドレス検索（重複チェック用）
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION", 
      "fields": [
        { "fieldPath": "email", "order": "ASCENDING" }
      ]
    },
    
    // アレルギー有り検索
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION", 
      "fields": [
        { "fieldPath": "allergy_flag", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    
    // 年齢区分別検索
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION", 
      "fields": [
        { "fieldPath": "age_category", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    },
    
    // 管理者用複合検索
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION", 
      "fields": [
        { "fieldPath": "is_verified", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    
    // 名前検索用（姓）
    {
      "collectionGroup": "rsvps",
      "queryScope": "COLLECTION", 
      "fields": [
        { "fieldPath": "jpn_family_name", "order": "ASCENDING" }
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
  
  // サイト設定（reference-site.html対応）
  settings: {
    siteName: string;        // サイトタイトル
    weddingDate: string;     // 結婚式日程（2025-11-03）
    rsvpDeadline: string;    // RSVP締切日（2025-10-30）
    
    // 新郎新婦情報
    groom: {
      name: string;          // Naoto（伊藤 尚人）
      englishName: string;   // Naoto
    };
    bride: {
      name: string;          // Yui（小林 結衣）
      englishName: string;   // Yui
    };
    
    // 会場情報
    ceremony: {
      name: string;          // 挙式会場名
      address: string;       // 住所
      time: string;          // 開始時間
      lat: number;           // 緯度
      lng: number;           // 経度
    };
    reception: {
      name: string;          // 披露宴会場名
      address: string;       // 住所
      time: string;          // 開始時間
      lat: number;           // 緯度
      lng: number;           // 経度
    };
    
    // デザイン設定
    theme: {
      primaryColor: string;  // #e65555（茜色）
      fontFamily: string;    // Playfair Display, Noto Serif JP
      backgroundImages: string[]; // カルーセル画像URL配列
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
    totalResponses: number;     // 総回答数
    totalAttendees: number;     // 出席者数
    totalDeclined: number;      // 欠席者数
    groomSideGuests: number;    // 新郎側ゲスト数
    brideSideGuests: number;    // 新婦側ゲスト数
    allergyCount: number;       // アレルギー有りの数
    childrenCount: number;      // 子供の数
    infantsCount: number;       // 幼児の数
    lastUpdated: Timestamp;     // 最終更新日時
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
export async function getRSVPsByStatus(status: 1 | 2) {
  const q = query(
    collection(db, 'rsvps'),
    where('status', '==', status),
    orderBy('timestamp', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

#### ゲスト側別の絞り込み
```typescript
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
```

#### アレルギー情報の取得
```typescript
export async function getAllergyGuests() {
  const q = query(
    collection(db, 'rsvp'),
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
```

#### 統計情報取得（リアルタイム）
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

#### 名前での検索
```typescript
export async function searchRSVPsByName(searchTerm: string) {
  // Firestoreの制限により部分一致検索は複雑
  // 代替案：全データ取得後にクライアント側でフィルタリング
  const snapshot = await getDocs(collection(db, 'rsvps'));
  
  const results = snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(rsvp => {
      const fullName = `${rsvp.jpn_family_name} ${rsvp.jpn_first_name}`;
      const kanaName = `${rsvp.kana_family_name || ''} ${rsvp.kana_first_name || ''}`;
      const romanName = `${rsvp.rom_first_name} ${rsvp.rom_family_name}`;
      
      return fullName.includes(searchTerm) ||
             kanaName.includes(searchTerm) ||
             romanName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
  return results;
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
  --project wedding-invitation-site
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
