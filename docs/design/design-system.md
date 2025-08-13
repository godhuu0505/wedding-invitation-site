# デザインシステム

## 🎯 デザインコンセプト

reference-site.htmlを完全再現するための和風・上品な結婚式招待サイトデザインシステム

### テーマ
- **基調色**: 茜色（アカネ）- 暖かく上品な赤系統
- **スタイル**: モダン和風・エレガント
- **印象**: 上品・温かみ・伝統的でありながら現代的

---

## 🎨 カラーシステム

### プライマリカラー（茜色系統）
```css
:root {
  /* メインカラー - 茜色 */
  --color-primary-50: #fef7f7;   /* 最薄い茜色 */
  --color-primary-100: #feeaea;  /* 薄い茜色 */
  --color-primary-200: #fdd5d5;  /* ライト茜色 */
  --color-primary-300: #fab5b5;  /* ミディアム茜色 */
  --color-primary-400: #f58989;  /* 茜色 */
  --color-primary-500: #e65555;  /* メイン茜色 */
  --color-primary-600: #d73535;  /* ダーク茜色 */
  --color-primary-700: #b82828;  /* より濃い茜色 */
  --color-primary-800: #9a2222;  /* 深い茜色 */
  --color-primary-900: #7f1d1d;  /* 最も濃い茜色 */
}
```

### ニュートラルカラー
```css
:root {
  /* グレースケール */
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
  
  /* ホワイト・ブラック */
  --color-white: #ffffff;
  --color-black: #000000;
}
```

### セマンティックカラー
```css
:root {
  /* ステータスカラー */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### Tailwind CSS設定
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        akane: {
          50: '#fef7f7',
          100: '#feeaea',
          200: '#fdd5d5',
          300: '#fab5b5',
          400: '#f58989',
          500: '#e65555',
          600: '#d73535',
          700: '#b82828',
          800: '#9a2222',
          900: '#7f1d1d',
        }
      }
    }
  }
}
```

---

## 📝 タイポグラフィ

### フォントファミリー
```css
:root {
  /* 日本語フォント */
  --font-japanese: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'YuGothic', 'Meiryo', sans-serif;
  
  /* 英語フォント */
  --font-english: 'Playfair Display', 'Times New Roman', serif;
  
  /* 基本フォント */
  --font-base: var(--font-japanese);
}
```

### フォントサイズ
```css
:root {
  /* フォントサイズ */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */
}
```

### フォントウェイト
```css
:root {
  --font-thin: 100;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

### 行間
```css
:root {
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

---

## 📐 レイアウトシステム

### スペーシング
```css
:root {
  /* スペーシング */
  --space-0: 0;
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
  --space-32: 8rem;    /* 128px */
}
```

### ブレイクポイント
```css
:root {
  /* レスポンシブブレイクポイント */
  --breakpoint-sm: 640px;   /* スマートフォン */
  --breakpoint-md: 768px;   /* タブレット */
  --breakpoint-lg: 1024px;  /* デスクトップ小 */
  --breakpoint-xl: 1280px;  /* デスクトップ大 */
  --breakpoint-2xl: 1536px; /* 大画面 */
}
```

### コンテナ幅
```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

---

## 🎭 コンポーネント設計

### 1. ヘッダー（Header）
```scss
.header {
  // メインビジュアル部分
  position: relative;
  height: 100vh;
  overflow: hidden;
  
  .header-wrap {
    position: relative;
    height: 100%;
  }
  
  // カルーセル背景
  .carousel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(0px);
    transition: filter 0.5s ease;
    
    &.blur {
      filter: blur(5px);
    }
  }
  
  // コンテンツ部分
  .header-cont-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 10;
  }
  
  // 招待状タイトル
  .kv_invitation {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 300;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
    
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  // カップル名・日時部分
  .crmny {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
    
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    .name {
      font-family: var(--font-english);
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 300;
      margin-bottom: 1rem;
      
      span {
        display: inline-block;
      }
    }
    
    .time {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      margin-bottom: 0.5rem;
    }
    
    .places {
      font-size: clamp(1rem, 2.5vw, 1.4rem);
    }
  }
  
  // スクロールインジケーター
  .scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.5s ease;
    
    &.visible {
      opacity: 1;
    }
    
    img {
      width: 30px;
      height: auto;
    }
  }
}
```

### 2. ナビゲーション（Navigation）
```scss
.nav {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: right 0.3s ease;
  z-index: 1000;
  
  &.active {
    right: 0;
  }
  
  .nav-cont {
    padding: 4rem 2rem 2rem;
    
    ul {
      list-style: none;
      
      li {
        margin-bottom: 2rem;
        
        a {
          display: block;
          text-decoration: none;
          color: var(--color-gray-800);
          transition: color 0.3s ease;
          
          &:hover {
            color: var(--color-primary-500);
          }
          
          .en {
            font-family: var(--font-english);
            font-size: 1.2rem;
            font-weight: 600;
            display: block;
          }
          
          .ja {
            font-size: 0.9rem;
            color: var(--color-gray-600);
            margin-top: 0.2rem;
          }
        }
      }
    }
  }
}

// ハンバーガーメニュー
.hamburger {
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1001;
  
  .inner_line {
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    margin: 8px 0;
    transition: all 0.3s ease;
  }
  
  &.active {
    .inner_line:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    
    .inner_line:nth-child(2) {
      opacity: 0;
    }
    
    .inner_line:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  }
}
```

### 3. メッセージセクション（Message）
```scss
.message {
  padding: 6rem 0;
  background: linear-gradient(135deg, #fef7f7 0%, #feeaea 100%);
  
  .container-full {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .greeting {
    text-align: center;
    margin-bottom: 4rem;
    
    h2 {
      margin-bottom: 2rem;
      
      .en {
        font-family: var(--font-english);
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 400;
        display: block;
        margin-bottom: 0.5rem;
        color: var(--color-primary-600);
      }
      
      .ja {
        font-size: clamp(0.9rem, 2vw, 1.1rem);
        color: var(--color-gray-600);
        letter-spacing: 0.2em;
      }
    }
    
    .txt-wrap {
      p {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        line-height: var(--leading-relaxed);
        color: var(--color-gray-700);
        max-width: 600px;
        margin: 0 auto;
      }
    }
  }
  
  .intro {
    .message-detail-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }
    
    .message-detail {
      text-align: center;
      
      .user-photo {
        margin-bottom: 2rem;
        
        .photo {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        
        .photo_tit {
          font-size: 1.1rem;
          color: var(--color-primary-600);
          font-weight: 600;
        }
      }
      
      .introduction {
        .name_jp {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-gray-800);
        }
        
        .name_ab {
          font-family: var(--font-english);
          font-size: 1.2rem;
          color: var(--color-primary-500);
          margin-bottom: 1.5rem;
        }
        
        .introduction_txt {
          font-size: 0.95rem;
          line-height: var(--leading-relaxed);
          color: var(--color-gray-600);
          text-align: left;
        }
      }
    }
  }
}
```

### 4. カウントダウンセクション（Countdown）
```scss
.countdown {
  position: relative;
  padding: 6rem 0;
  background: var(--color-gray-900);
  color: white;
  text-align: center;
  overflow: hidden;
  
  .cont {
    position: relative;
    z-index: 2;
    
    .countdownPic {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
      }
    }
    
    #CountDown_txt {
      width: 100%;
      max-width: 600px;
      height: auto;
      margin: 0 auto 2rem;
      
      .cls-1 {
        fill: currentColor;
        font-family: var(--font-english);
        font-size: 48px;
        font-weight: 400;
      }
      
      .cls-2 {
        fill: currentColor;
        font-family: var(--font-english);
        font-size: 24px;
        font-weight: 300;
      }
      
      .cls-3 {
        fill: currentColor;
        font-family: var(--font-english);
        font-size: 32px;
        font-weight: 400;
      }
    }
    
    .countdown-num {
      font-size: clamp(4rem, 10vw, 8rem);
      font-weight: 700;
      color: var(--color-primary-400);
      text-shadow: 0 0 20px rgba(245, 137, 137, 0.5);
    }
  }
}
```

### 5. 情報セクション（Information）
```scss
.info {
  padding: 6rem 0;
  background: white;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 4rem;
    
    .en {
      font-family: var(--font-english);
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 400;
      display: block;
      margin-bottom: 0.5rem;
      color: var(--color-primary-600);
    }
    
    .ja {
      font-size: clamp(0.9rem, 2vw, 1.1rem);
      color: var(--color-gray-600);
      letter-spacing: 0.2em;
    }
  }
  
  .schedule {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .box {
      text-align: center;
      
      .tit_ceremony, .tit_reception {
        margin-bottom: 2rem;
        
        .en {
          font-family: var(--font-english);
          font-size: 1.8rem;
          font-weight: 400;
          color: var(--color-primary-600);
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .ja {
          font-size: 1.1rem;
          color: var(--color-gray-600);
          letter-spacing: 0.2em;
        }
      }
      
      .detail {
        margin-bottom: 2rem;
        
        p {
          font-size: 1.2rem;
          line-height: var(--leading-relaxed);
          color: var(--color-gray-700);
        }
      }
      
      .access {
        .txt {
          margin-bottom: 2rem;
          
          .tit-access {
            margin-bottom: 1rem;
            
            .en {
              font-family: var(--font-english);
              font-size: 1.2rem;
              font-weight: 600;
              color: var(--color-primary-600);
              display: block;
            }
            
            .ja {
              font-size: 0.9rem;
              color: var(--color-gray-600);
            }
          }
          
          .place {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--color-gray-800);
            margin-bottom: 0.5rem;
          }
          
          .address {
            font-size: 1rem;
            color: var(--color-gray-600);
            line-height: var(--leading-relaxed);
            
            a {
              color: var(--color-primary-500);
              text-decoration: none;
              display: block;
              margin-top: 0.5rem;
              
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
        
        .map {
          margin-bottom: 2rem;
          
          iframe {
            width: 100%;
            height: 300px;
            border: none;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
```

### 6. RSVPセクション（出欠確認）
```scss
.rsvp {
  padding: 6rem 0;
  background: linear-gradient(135deg, #fef7f7 0%, #feeaea 100%);
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 3rem;
    
    .en {
      font-family: var(--font-english);
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 400;
      display: block;
      margin-bottom: 0.5rem;
      color: var(--color-primary-600);
    }
    
    .ja {
      font-size: clamp(0.9rem, 2vw, 1.1rem);
      color: var(--color-gray-600);
      letter-spacing: 0.2em;
    }
  }
  
  .rsvp-txt {
    text-align: center;
    margin-bottom: 3rem;
    
    p {
      font-size: 1.1rem;
      line-height: var(--leading-relaxed);
      color: var(--color-gray-700);
      margin-bottom: 1rem;
    }
    
    .limit {
      font-weight: 600;
      color: var(--color-primary-600);
    }
  }
  
  .form {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    
    .row {
      margin-bottom: 2rem;
      
      .tit {
        margin-bottom: 1rem;
        
        .tit-ja {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-gray-800);
          display: block;
          margin-bottom: 0.2rem;
        }
        
        .tit-en {
          font-size: 0.9rem;
          color: var(--color-gray-500);
          font-family: var(--font-english);
        }
        
        &.required::after {
          content: '*';
          color: var(--color-error);
          margin-left: 0.3rem;
        }
      }
      
      .input1, .input2 {
        input, textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-gray-300);
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          
          &:focus {
            outline: none;
            border-color: var(--color-primary-400);
            box-shadow: 0 0 0 3px rgba(245, 137, 137, 0.1);
          }
        }
        
        textarea {
          resize: vertical;
          min-height: 100px;
        }
      }
      
      .input2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      
      .input-check {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        
        .form-check {
          display: flex;
          align-items: center;
          
          input[type="radio"] {
            margin-right: 0.5rem;
          }
          
          label {
            font-size: 1rem;
            color: var(--color-gray-700);
            cursor: pointer;
          }
        }
      }
    }
    
    .attendance {
      text-align: center;
      
      .form-check-inline {
        display: inline-flex;
        align-items: center;
        margin: 0 2rem 1rem 0;
        
        input[type="radio"] {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.8rem;
        }
        
        label {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-gray-800);
          cursor: pointer;
        }
      }
    }
    
    .btn-wrap {
      text-align: center;
      margin-top: 3rem;
      
      .btn {
        background: var(--color-primary-500);
        border: none;
        padding: 1rem 3rem;
        border-radius: 50px;
        color: white;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--color-primary-600);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        img {
          width: 100px;
          height: auto;
        }
      }
    }
  }
}
```

---

## ✨ アニメーション仕様

### エントランスアニメーション
```scss
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomInImage {
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.sfx {
  opacity: 0;
  transition: all 0.8s ease;
  
  &.focus_in {
    animation: fadeInUp 0.8s ease forwards;
  }
  
  &.fade-in-left {
    animation: fadeInLeft 0.8s ease forwards;
  }
  
  &.fade-in-bottom {
    animation: fadeInUp 0.8s ease forwards;
  }
  
  &.zoom_in_image {
    animation: zoomInImage 1s ease forwards;
  }
  
  &.force {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
  }
}
```

### スクロール連動アニメーション
```javascript
// アニメーション制御のJavaScript設定例
const scrollTriggerOptions = {
  once: true,
  offset: {
    viewport: {
      y: (trigger, frame, direction) => {
        return trigger.visible ? 0 : 0.2
      }
    }
  }
};
```

---

## 📱 レスポンシブ仕様

### モバイルファースト設計
```scss
// ベースはモバイル（〜639px）
.component {
  // モバイル用スタイル
  
  // タブレット（640px〜）
  @media (min-width: 640px) {
    // タブレット用スタイル
  }
  
  // デスクトップ小（768px〜）
  @media (min-width: 768px) {
    // デスクトップ小用スタイル
  }
  
  // デスクトップ大（1024px〜）
  @media (min-width: 1024px) {
    // デスクトップ大用スタイル
  }
}
```

### Tailwind CSS対応クラス
```html
<!-- レスポンシブ例 -->
<div class="text-lg md:text-xl lg:text-2xl">
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
<div class="p-4 md:p-8 lg:p-12">
```

---

## 🎯 実装ガイドライン

### 1. コンポーネント命名規則
- **PascalCase**: React コンポーネント（例：`HeaderSection`, `RSVPForm`）
- **kebab-case**: CSS クラス（例：`.header-section`, `.rsvp-form`）
- **camelCase**: JavaScript 変数（例：`isMenuOpen`, `formData`）

### 2. ファイル構成
```
components/
├── ui/           # 基本UIコンポーネント
├── layout/       # レイアウトコンポーネント
├── sections/     # セクションコンポーネント
└── forms/        # フォームコンポーネント

styles/
├── globals.css   # グローバルスタイル
├── components/   # コンポーネント別スタイル
└── utilities/    # ユーティリティクラス
```

### 3. 優先順位
1. **機能性**: 正しく動作すること
2. **アクセシビリティ**: 誰でも使えること
3. **パフォーマンス**: 高速に動作すること
4. **美しさ**: 見た目が美しいこと

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日  
**参照**: reference-site.html