# Firebase Hosting デプロイ手順

## 前提条件
- Firebase プロジェクトが作成済み
- 必要な環境変数が設定済み
- Firebase CLI（`firebase-tools`）がインストール済み

## デプロイ手順

1. **環境変数の設定**
   ```bash
   cp .env.production.example .env.production
   # .env.production の値を実際の値に変更
   # NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   # NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
   # NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_maps_api_key
   ```

2. **ビルド & 静的エクスポート**
   ```bash
   npm run export
   # または
   npm run build && next export
   ```
   - `out/` ディレクトリが生成されます（静的ファイル）

3. **Firebase Hosting へデプロイ**
   ```bash
   npm run deploy
   # または
   firebase deploy --only hosting
   ```
   - `npm run deploy` は `npm run export` と `firebase deploy --only hosting` をまとめて実行します

4. **デプロイ完了後の確認**
   - デプロイが完了すると、公開URLが表示されます。
   - 例: https://your-project-id.web.app

## 補足
- 必要なファイル: `firebase.json`, `.firebaseignore`, `out/` ディレクトリ
- Firestore等を利用する場合は、`firestore.rules` も `npm run firebase:deploy:rules` でデプロイ可能
- カスタムドメインやSSLはFirebase Hostingの管理画面から設定可能

---

**最終更新**: 2025年9月7日
