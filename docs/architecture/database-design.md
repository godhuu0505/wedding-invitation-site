# データベース設計

## データベース概要

### 使用技術
- **Firebase Firestore** - NoSQLドキュメントデータベース
- **リージョン**: asia-northeast1（東京）
- **料金プラン**: Blaze（従量課金制）

## コレクション設計

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

#### インデックス
- `timestamp` (降順) - 最新の送信順で並び替え
- `attendance` (等価) - 出欠での絞り込み
- `email` (等価) - 重複チェック用

#### セキュリティルール
```javascript
match /rsvps/{document} {
  // 新規作成は認証不要（厳格なバリデーション付き）
  allow create: if isValidRSVPData(request.resource.data);
  
  // 読み取り・更新・削除は管理者のみ
  allow read, update, delete: if isAuthenticated() && isAdmin();
}
```

### 管理者設定コレクション (`admin`)

#### 目的
サイト設定と管理者情報を保存

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

#### セキュリティルール
```javascript
match /admin/{document} {
  // 管理者のみアクセス可能
  allow read, write: if isAuthenticated() && isAdmin();
}
```

## データバリデーション

### RSVP データバリデーション
```javascript
function isValidRSVPData(data) {
  return data.keys().hasAll(['name', 'furigana', 'email', 'attendance', 'timestamp']) &&
         
         // 基本情報の検証
         data.name is string && data.name.size() > 0 && data.name.size() <= 50 &&
         data.furigana is string && data.furigana.size() > 0 && data.furigana.size() <= 50 &&
         data.email is string && data.email.matches('.*@.*\\..*') &&
         
         // 出欠情報の検証
         data.attendance in ['yes', 'no'] &&
         (!('companions' in data) || (data.companions is int && data.companions >= 0 && data.companions <= 5)) &&
         
         // オプション項目の検証
         (!('allergies' in data) || (data.allergies is string && data.allergies.size() <= 500)) &&
         (!('message' in data) || (data.message is string && data.message.size() <= 1000)) &&
         (!('notes' in data) || (data.notes is string && data.notes.size() <= 500)) &&
         
         // システム情報の検証
         data.timestamp == request.time;
}
```

## クエリパターン

### 頻繁に使用されるクエリ

#### 出欠一覧取得（ページネーション）
```typescript
const rsvpsRef = db.collection('rsvps');
const query = rsvpsRef
  .orderBy('timestamp', 'desc')
  .limit(pageSize)
  .startAfter(lastDoc); // ページネーション用
```

#### 出欠状況での絞り込み
```typescript
const attendeesQuery = rsvpsRef
  .where('attendance', '==', 'yes')
  .orderBy('timestamp', 'desc');
```

#### 統計情報取得
```typescript
const statsQuery = rsvpsRef.get().then(snapshot => {
  const stats = {
    total: snapshot.size,
    attendees: 0,
    declined: 0,
    companions: 0
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
});
```

## データマイグレーション

### 初期データ設定
```typescript
// 管理者設定の初期化
const adminSettingsDoc = {
  admins: [process.env.ADMIN_EMAIL],
  settings: {
    siteName: "私たちの結婚式",
    weddingDate: "2025-11-03",
    rsvpDeadline: "2025-10-20",
    venueInfo: {
      name: process.env.NEXT_PUBLIC_VENUE_NAME,
      address: process.env.NEXT_PUBLIC_VENUE_ADDRESS,
      lat: parseFloat(process.env.NEXT_PUBLIC_VENUE_LAT),
      lng: parseFloat(process.env.NEXT_PUBLIC_VENUE_LNG)
    }
  },
  notifications: {
    emailEnabled: true,
    adminEmail: process.env.ADMIN_EMAIL
  }
};

await db.collection('admin').doc('settings').set(adminSettingsDoc);
```

## バックアップ・復旧

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
// RSVPデータのCSVエクスポート
export async function exportRSVPsToCSV() {
  const snapshot = await db.collection('rsvps').get();
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

## パフォーマンス最適化

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
**最終更新**: 2025年8月13日
