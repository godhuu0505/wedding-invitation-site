# 🎨 Figmaデザイン画像アセット

## 📁 フォルダ構成

```
public/images/
├── figma-assets/          # Figmaデザインから生成したアセット
│   ├── wedding-bg-figma.svg      # メイン背景パターン（和風結婚式テーマ）
│   ├── wedding-pattern-1.svg     # 和風パターン1（青海波・桜）
│   └── wedding-pattern-2.svg     # 和風パターン2（麻の葉・竹）
├── profiles/              # プロフィール画像
│   ├── groom-placeholder.svg     # 新郎プロフィール画像（SVGプレースホルダー）
│   ├── bride-placeholder.svg     # 新婦プロフィール画像（SVGプレースホルダー）
│   ├── groom-profile.jpg         # 新郎実写真（実装時に差し替え）
│   └── bride-profile.jpg         # 新婦実写真（実装時に差し替え）
└── backgrounds/           # 既存背景画像
    ├── wedding-bg-1.jpg
    ├── wedding-bg-2.jpg
    └── wedding-bg-3.jpg
```

## 🎯 使用箇所

### HeaderSection
- **背景カルーセル**: 4つの背景パターンを7秒間隔で循環
  1. `wedding-bg-figma.svg` + グラデーション
  2. `wedding-pattern-1.svg` + グラデーション
  3. `wedding-pattern-2.svg` + グラデーション
  4. `wedding-bg-1.jpg` + グラデーション

### MessageSection
- **新郎プロフィール**: `groom-placeholder.svg`
- **新婦プロフィール**: `bride-placeholder.svg`

## 🎨 デザイン仕様

### カラーパレット
- **茜色**: `#e65555` (メインテーマ)
- **Lavender Gray**: `#BDBCDA` (サブテーマ)
- **Old Lace**: `#F5F5DC` (背景ベース)
- **Mine Shaft**: `#333333` (テキスト)

### 和風モチーフ
- **青海波**: 波の重なりパターン
- **桜**: 四季を表現する桜の花びら
- **麻の葉**: 六角形の組み合わせパターン
- **竹**: 縦ストライプの竹模様
- **神社要素**: 鳥居のシルエット
- **和風雲**: 流れるような雲の形状

## 🔄 実装時の差し替え手順

### 1. 実写真への差し替え
```bash
# 新郎写真を追加
public/images/profiles/groom-profile.jpg (400x400px推奨)

# 新婦写真を追加  
public/images/profiles/bride-profile.jpg (400x400px推奨)
```

### 2. コンポーネント更新
```tsx
// MessageSection.tsx内で画像パスを変更
src="/images/profiles/groom-profile.jpg"
src="/images/profiles/bride-profile.jpg"
```

### 3. 高解像度背景画像
```bash
# 実際の結婚式会場写真に差し替え
public/images/backgrounds/venue-ceremony.jpg (1920x1080px以上)
public/images/backgrounds/venue-reception.jpg (1920x1080px以上)
```

## 📱 レスポンシブ対応

### デスクトップ
- プロフィール画像: 288x288px (w-72 h-72)
- 背景画像: 1920x1080px フルサイズ

### タブレット
- プロフィール画像: 240x240px (w-60 h-60)
- 背景画像: 1024x768px 適応

### モバイル
- プロフィール画像: 200x200px (w-50 h-50)
- 背景画像: 768x1024px 縦向き対応

## 🎯 最適化設定

### SVG画像
- **圧縮**: SVGO適用済み
- **フォント**: Web Safe Font指定
- **カラー**: HEX形式で統一

### 今後の写真
- **形式**: WebP推奨（フォールバックJPG）
- **品質**: 80-90%
- **サイズ**: 最大1MB以下

---

**更新日**: 2025年8月13日
**Figmaデザイン**: node-id 3:2188準拠
