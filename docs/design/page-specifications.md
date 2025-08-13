# ページ仕様書（reference-site.html完全再現版）

## 🎯 設計方針

reference-site.htmlの構成・デザインを完全再現し、結婚式招待サイトとして必要な機能を実装

### 基本情報
- **結婚式日**: 2025年11月3日（文化の日）
- **新郎**: Naoto（伊藤 尚人）
- **新婦**: Yui（小林 結衣）
- **テーマカラー**: 茜色（#e65555）
- **デザインスタイル**: モダン和風・エレガント

## ページ構成概要

| セクション | 機能概要 | 参照元 | 優先度 |
|-----------|---------|-------|-------|
| ローディング | SVGアニメーション・フェードイン | `#loader-bg` | 最高 |
| ヘッダー | メインビジュアル・カルーセル・タイトル | `.header` | 最高 |
| メッセージ | 挨拶文・新郎新婦紹介 | `#message` | 最高 |
| カウントダウン | 結婚式までの日数表示 | `#countdown` | 高 |
| 式場案内 | 挙式・披露宴情報・地図 | `#infomation` | 最高 |
| 出欠確認 | RSVP フォーム | `#rsvp` | 最高 |
| フッター | パートナー情報・ナビゲーション | `footer` | 中 |

# ページ仕様書（reference-site.html完全再現版）

## 🎯 設計方針

reference-site.htmlの構成・デザインを完全再現し、結婚式招待サイトとして必要な機能を実装

### 基本情報
- **結婚式日**: 2025年11月3日（文化の日）
- **新郎**: Naoto（伊藤 尚人）
- **新婦**: Yui（小林 結衣）
- **テーマカラー**: 茜色（#e65555）
- **デザインスタイル**: モダン和風・エレガント

---

## ページ構成概要

| セクション | 機能概要 | 参照元 | 優先度 |
|-----------|---------|-------|-------|
| ローディング | SVGアニメーション・フェードイン | `#loader-bg` | 最高 |
| ヘッダー | メインビジュアル・カルーセル・タイトル | `.header` | 最高 |
| メッセージ | 挨拶文・新郎新婦紹介 | `#message` | 最高 |
| カウントダウン | 結婚式までの日数表示 | `#countdown` | 高 |
| 式場案内 | 挙式・披露宴情報・地図 | `#infomation` | 最高 |
| 出欠確認 | RSVP フォーム | `#rsvp` | 最高 |
| フッター | パートナー情報・ナビゲーション | `footer` | 中 |

---

## 1. ローディングセクション

### 目的
サイト読み込み時のユーザー体験向上・期待感の演出

### 表示要素
- **SVGアニメーション**: 六角形パターンの動的描画
- **背景**: 茜色のグラデーション
- **アニメーション時間**: 約5秒間
- **フェードアウト**: ローディング完了後2秒でフェードアウト

### 技術実装
```typescript
// components/LoadingScreen.tsx
interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  // SVG path アニメーション
  // 5秒後にonComplete実行
};
```

### アニメーション仕様
- **SVGパス**: Vivus.js でストロークアニメーション
- **背景**: フェード演出
- **完了後**: body クラス `loading` を削除

---

## 2. ヘッダーセクション

### 目的
結婚式の第一印象・メインビジュアル・基本情報表示

### 表示要素
- **背景画像カルーセル**: Vegas.js による背景スライドショー
- **招待状タイトル**: "ご招待状" テキスト
- **カップル名**: "Naoto and Yui" 英語フォント
- **開催日時**: "2025.11.03 Sun"
- **会場名**: "at サンプルホテル" （実際の会場名に変更）
- **スクロールインジケーター**: 下向き矢印SVG

### レイアウト構造
```html
<header class="header">
  <div class="carousel blur">
    <!-- 背景画像スライドショー -->
  </div>
  <div class="header-cont-wrap">
    <div class="header-cont">
      <p class="kv_invitation">ご招待状</p>
      <div class="crmny">
        <div class="name">
          <span>Naoto</span> and <span>Yui</span>
        </div>
        <time class="time">2025.11.03 <span>Sun</span></time>
        <p class="places">at <span>サンプルホテル</span></p>
      </div>
    </div>
  </div>
  <div class="scroll">
    <img src="scroll-indicator.svg" alt="scroll">
  </div>
</header>
```

### アニメーション
1. ローディング完了後、`kv_invitation` がフェードイン（0.8s）
2. 0.6s後、`crmny` がフェードイン（0.8s）
3. カルーセルのぼかし解除
4. 8s後、スクロールインジケーター表示

### 技術要件
- **Next.js Image**: 背景画像の最適化
- **Vegas.js**: 背景スライドショー
- **Intersection Observer**: スクロール連動アニメーション

---

## 3. ナビゲーション

### 構成
- **ハンバーガーメニュー**: 右上固定配置
- **サイドメニュー**: 右からスライドイン
- **ページ内アンカー**: スムーススクロール

### メニュー項目
```typescript
const navigationItems = [
  { en: "MESSAGE", ja: "メッセージ", href: "#message" },
  { en: "INFORMATION", ja: "ご案内", href: "#infomation" },
  { en: "R.S.V.P.", ja: "ご出欠", href: "#rsvp" }
];
```

### 動作仕様
- ハンバーガーアイコン: 3本線 → X に変形
- メニュー表示: `right: -300px` → `right: 0`
- 背景: `backdrop-filter: blur(10px)`
- Page Top ボタン: 最下部に配置

---

## 4. メッセージセクション

### 目的
挨拶文・新郎新婦の人物紹介

### 4.1 挨拶部分（Greeting）
```html
<div class="greeting">
  <h2>
    <span class="en">ご挨拶</span>
    <span class="ja">MESSAGE</span>
  </h2>
  <div class="txt-wrap">
    <p>
      皆様にはご健勝のことと<br>
      お慶び申し上げます<br>
      このたび　私たちは<br>
      結婚式を挙げることになりました<br>
      つきましては　親しい皆様の末永い<br>
      お力添えをいただきたく<br>
      心ばかりの小宴をもうけたいと存じます<br>
      おいそがしい中と存じますが<br>
      ご列席くださいますよう<br>
      お願い申し上げます
    </p>
  </div>
</div>
```

### 4.2 新郎新婦紹介（Intro）
```typescript
interface ProfileData {
  role: "新郎" | "新婦";
  nameJp: string;
  nameEn: string;
  photo: string;
  introduction: string;
}

const groomData: ProfileData = {
  role: "新郎",
  nameJp: "伊藤 尚人",
  nameEn: "Naoto\nIto",
  photo: "/images/groom.jpg",
  introduction: `1995年3月1日　東京都生まれ
A型　会社員
アウトドアが好きで
週末は少し遠くまで出かけます
犬が大好きです

美味しい料理・お酒を用意してお待ちしております
当日皆様にお会いできることを
心より楽しみにしております`
};

const brideData: ProfileData = {
  role: "新婦", 
  nameJp: "小林 結衣",
  nameEn: "Yui\nKobayashi",
  photo: "/images/bride.jpg",
  introduction: `1995年6月5日　東京都生まれ
B型　保育士
子どもと猫が大好きです
週末は美味しいご飯を食べに出かけます

たくさん食べてたくさん飲んで
楽しい時間にしたいと思っています
当日皆様にお会いできることを
心より楽しみにしております`
};
```

### レイアウト
- **デスクトップ**: 2カラム（新郎 | 新婦）
- **モバイル**: 1カラム（新郎 → 新婦）
- **写真**: 200px × 200px 円形
- **アニメーション**: スクロール連動でフェードイン

---

## 5. カウントダウンセクション

### 目的
結婚式までの日数を視覚的に表示・期待感の演出

### 表示要素
- **背景**: 暗い背景 + オーバーレイ画像
- **SVGタイトル**: "COUNTDOWN To Our Wedding DAYS"
- **カウントダウン数字**: 結婚式まで残り日数

### 技術実装
```typescript
const CountdownSection: React.FC = () => {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  
  useEffect(() => {
    const weddingDate = new Date('2025-11-03');
    const today = new Date();
    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);
  }, []);
  
  return (
    <section className="countdown">
      {/* SVG + カウントダウン数字 */}
    </section>
  );
};
```

### デザイン仕様
- **背景色**: `#171717` （ダークグレー）
- **テキスト色**: `#ffffff`
- **カウントダウン数字**: 茜色（`#f58989`）+ テキストシャドウ
- **フォント**: 英語部分は Playfair Display

---

## 6. 式場案内セクション

### 目的
結婚式・披露宴の詳細情報・会場アクセス情報提供

### 6.1 挙式情報
```typescript
const ceremonyInfo = {
  title: { en: "Wedding Ceremony", ja: "挙　式" },
  date: "2025.11.03 Sun",
  time: "10:00",
  venue: {
    name: "サンプルホテル",
    address: "東京都港区北青山３丁目５−１５",
    phone: "000-0000-0000",
    website: "https://sample_webinvitation.jp/"
  }
};
```

### 6.2 披露宴情報
```typescript
const receptionInfo = {
  title: { en: "Wedding Reception", ja: "披露宴" },
  time: "11:00"
  // 会場は挙式と同じ（same_flag: true）
};
```

### 6.3 アクセス情報
- **Google Maps 埋め込み**: Interactive map
- **住所**: フルアドレス表示
- **電話番号**: `tel:` リンク
- **ウェブサイト**: 外部リンク

### レイアウト
```html
<section class="info">
  <div class="container">
    <h2>
      <span class="en">ご案内</span>
      <span class="ja">INFORMATION</span>
    </h2>
    <div class="schedule">
      <!-- 挙式情報 -->
      <div class="box" id="ceremony">
        <div class="tit_ceremony">
          <span class="en">Wedding<br>Ceremony</span>
          <span class="ja">挙　式</span>
        </div>
        <div class="detail">
          <p>2025.11.03 Sun<br>10:00</p>
        </div>
        <div class="access">
          <div class="txt">
            <div class="tit-access">
              <span class="en">Access</span>
              <span class="ja">アクセス</span>
            </div>
            <p class="place">サンプルホテル</p>
            <p class="address">
              東京都港区北青山３丁目５−１５
              <a href="tel:000-0000-0000">000-0000-0000</a>
              <a href="https://sample_webinvitation.jp/" target="_blank">
                https://sample_webinvitation.jp/
              </a>
            </p>
          </div>
          <div class="map">
            <iframe src="Google Maps Embed URL"></iframe>
          </div>
        </div>
      </div>
      
      <!-- 披露宴情報 -->
      <div class="box" id="reception">
        <!-- 同様の構造 -->
      </div>
    </div>
  </div>
</section>
```

---

## 7. 出欠確認セクション（RSVP）

### 目的
包括的な出欠確認・ゲスト情報収集

### 7.1 セクションヘッダー
```html
<section class="rsvp">
  <div class="container">
    <h2>
      <span class="en">ご出欠</span>
      <span class="ja">R.S.V.P.</span>
    </h2>
    <div class="rsvp-txt">
      <p>お手数ではございますが<br>ご出欠情報のご登録をお願い申し上げます</p>
      <p class="limit">2025.10.30までにご一報をお願いいたします</p>
    </div>
  </div>
</section>
```

### 7.2 フォーム項目
```typescript
interface RSVPFormData {
  // 出欠情報
  status: 1 | 2; // 1: 出席, 2: 欠席
  
  // ゲストカテゴリー
  guest_side: 0 | 1; // 0: 新郎側, 1: 新婦側
  
  // 名前情報
  jpn_family_name: string;    // 姓
  jpn_first_name: string;     // 名
  kana_family_name?: string;  // せい
  kana_first_name?: string;   // めい
  rom_family_name: string;    // last name
  rom_first_name: string;     // first name
  
  // 連絡先
  email: string;              // メールアドレス
  phone_number?: string;      // 電話番号
  
  // 住所情報
  zipcode?: string;           // 郵便番号
  address?: string;           // 住所
  address2?: string;          // 建物名
  
  // その他情報
  age_category?: 0 | 1 | 2;   // 0: 大人, 1: 子供, 2: 幼児
  allergy_flag: 0 | 1;        // 0: なし, 1: あり
  allergy?: string;           // アレルギー詳細
  guest_message?: string;     // メッセージ
}
```

### 7.3 バリデーション
```typescript
const validationSchema = yup.object({
  status: yup.number().required(),
  guest_side: yup.number().required(),
  jpn_family_name: yup.string().required(),
  jpn_first_name: yup.string().required(),
  rom_family_name: yup.string().required(),
  rom_first_name: yup.string().required(),
  email: yup.string().email().required(),
  allergy_flag: yup.number().required(),
  // その他は任意項目
});
```

### 7.4 フォーム動作
1. **出欠選択**: ラジオボタン（出席/欠席）
2. **リアルタイムバリデーション**: 入力時エラーチェック
3. **同伴者追加**: "お連れ様の追加" ボタン
4. **食事制限**: "有り" 選択時、詳細入力フィールド表示
5. **送信確認**: モーダルダイアログで確認
6. **API送信**: Firebase Firestore保存

### UI/UX要件
- **ステップ表示**: 進捗インジケーター
- **エラー表示**: 分かりやすいエラーメッセージ
- **送信ボタン**: 茜色の丸みを帯びたボタン
- **レスポンシブ**: モバイル最適化

---

## 8. フッターセクション

### 目的
サイト情報・ナビゲーション・法的情報

### 8.1 ナビゲーション
- **Page Top**: SVGアイコン付きスクロールトップ
- **Privacy Policy**: プライバシーポリシーリンク
- **推奨動作環境**: ブラウザ要件

### 8.2 コピーライト
```html
<div class="copyright">
  <a href="https://sample.myprint.ppcg.jp" target="copyright">
    <!-- パートナー企業ロゴSVG -->
  </a>
</div>
```

---

## 9. 技術実装要件

### 9.1 必須ライブラリ
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "framer-motion": "^10.0.0",
    "react-hook-form": "^7.0.0",
    "yup": "^1.0.0",
    "firebase": "^10.0.0"
  }
}
```

### 9.2 アニメーションライブラリ
- **Vegas.js**: 背景スライドショー
- **Vivus.js**: SVGアニメーション
- **ScrollTrigger**: スクロール連動アニメーション
- **Framer Motion**: React アニメーション

### 9.3 パフォーマンス要件
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **画像最適化**: WebP対応・Lazy Loading

---

## 10. アクセシビリティ要件

### 10.1 必須対応
- **キーボードナビゲーション**: Tab移動対応
- **スクリーンリーダー**: 適切なARIA属性
- **カラーコントラスト**: WCAG AA準拠
- **フォーカス表示**: 明確なフォーカススタイル

### 10.2 セマンティックHTML
```html
<main role="main">
  <section aria-labelledby="message-heading">
    <h2 id="message-heading">ご挨拶</h2>
  </section>
  <form aria-labelledby="rsvp-heading">
    <fieldset>
      <legend>出欠確認</legend>
    </fieldset>
  </form>
</main>
```

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日  
**参照**: reference-site.html
