# 開発ガイド

## 開発環境セットアップ

### 必要な環境
- **Node.js**: 18.0.0 以上
- **npm**: 9.0.0 以上
- **Git**: 最新版
- **VS Code**: 推奨エディタ

### プロジェクトセットアップ
```bash
# リポジトリクローン
git clone https://github.com/your-org/wedding-invitation-site.git
cd wedding-invitation-site

# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env.local

# 開発サーバー起動
npm run dev
```

### 環境変数設定
```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key

# 管理者設定（開発用）
ADMIN_EMAILS=admin@example.com

# Next.js設定
NEXTAUTH_SECRET=your_development_secret
NEXTAUTH_URL=http://localhost:3000
```

## コーディング規約

### TypeScript
```typescript
// ✅ 良い例
interface Guest {
  id: string;
  name: string;
  email: string;
  attendance: 'yes' | 'no';
  companions?: number;
  createdAt: Date;
}

const processGuestRSVP = async (guest: Guest): Promise<void> => {
  // 処理実装
};

// ❌ 悪い例
const processRSVP = async (data: any) => {
  // any型の使用は避ける
};
```

### コンポーネント設計
```typescript
// ✅ 良い例: Props型定義とドキュメント
interface RSVPFormProps {
  /** フォーム送信時のコールバック */
  onSubmit: (data: RSVPFormData) => void;
  /** 初期値（編集時に使用） */
  initialData?: Partial<RSVPFormData>;
  /** ローディング状態 */
  isLoading?: boolean;
  /** エラーメッセージ */
  error?: string;
}

/**
 * RSVP送信フォームコンポーネント
 * 
 * ゲストの出欠確認と詳細情報を入力するフォーム
 */
const RSVPForm: React.FC<RSVPFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  error
}) => {
  // 実装
};
```

### ファイル命名規則
```
components/
  ├── RSVPForm.tsx          # React コンポーネント
  ├── RSVPForm.test.tsx     # テストファイル
  └── RSVPForm.stories.tsx  # Storybook（将来追加時）

lib/
  ├── firebase.ts           # 設定・ユーティリティ
  ├── validation.ts         # バリデーション
  └── types.ts             # 型定義

app/
  ├── page.tsx             # ページコンポーネント
  ├── layout.tsx           # レイアウト
  └── api/
      └── rsvp/
          └── submit.ts    # API ルート
```

## Git ワークフロー

### ブランチ戦略
```bash
main        # 本番環境（保護ブランチ）
├── develop # 開発環境
├── feature/rsvp-form    # 機能開発
├── bugfix/email-validation   # バグ修正
└── hotfix/security-patch     # 緊急修正
```

### コミットメッセージ
```bash
# 形式: type(scope): description

# 機能追加
feat(rsvp): add email validation to RSVP form
feat(admin): implement guest list export functionality

# バグ修正
fix(ui): resolve mobile layout issue on RSVP form
fix(api): handle undefined companions field

# ドキュメント
docs(readme): update setup instructions

# スタイル修正
style(form): improve button hover animations

# リファクタリング
refactor(auth): simplify admin authentication logic

# テスト
test(rsvp): add unit tests for form validation

# ビルド・設定
build(deps): update next.js to version 14.1
ci(github): add automated testing workflow
```

### プルリクエスト
```markdown
## 変更内容
- RSVP フォームにメールバリデーションを追加
- エラーメッセージの表示を改善

## テスト
- [ ] 手動テスト完了
- [ ] 自動テスト追加
- [ ] レスポンシブデザイン確認

## チェックリスト
- [ ] TypeScript エラーなし
- [ ] ESLint エラーなし
- [ ] コードレビュー対応
- [ ] ドキュメント更新
```

## テスト

### ユニットテスト
```typescript
// components/RSVPForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RSVPForm } from './RSVPForm';

describe('RSVPForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields correctly', () => {
    render(<RSVPForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('お名前')).toBeInTheDocument();
    expect(screen.getByLabelText('ふりがな')).toBeInTheDocument();
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('出席')).toBeInTheDocument();
    expect(screen.getByLabelText('欠席')).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<RSVPForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: '送信' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('名前は必須です')).toBeInTheDocument();
      expect(screen.getByText('ふりがなは必須です')).toBeInTheDocument();
      expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit valid form data', async () => {
    render(<RSVPForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText('お名前'), {
      target: { value: '田中太郎' }
    });
    fireEvent.change(screen.getByLabelText('ふりがな'), {
      target: { value: 'たなかたろう' }
    });
    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'tanaka@example.com' }
    });
    fireEvent.click(screen.getByLabelText('出席'));

    const submitButton = screen.getByRole('button', { name: '送信' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: '田中太郎',
        furigana: 'たなかたろう',
        email: 'tanaka@example.com',
        attendance: 'yes',
        companions: 0
      });
    });
  });
});
```

### インテグレーションテスト
```typescript
// __tests__/api/rsvp.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '../../app/api/rsvp/submit';

describe('/api/rsvp/submit', () => {
  it('should create RSVP successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: '田中太郎',
        furigana: 'たなかたろう',
        email: 'tanaka@example.com',
        attendance: 'yes',
        companions: 1
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
  });

  it('should validate required fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: '',
        email: 'invalid-email'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.errors).toBeDefined();
  });
});
```

### E2Eテスト（Playwright）
```typescript
// e2e/rsvp-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('RSVP Flow', () => {
  test('should complete RSVP submission successfully', async ({ page }) => {
    await page.goto('/');

    // RSVP フォームに入力
    await page.fill('[data-testid=name-input]', '田中太郎');
    await page.fill('[data-testid=furigana-input]', 'たなかたろう');
    await page.fill('[data-testid=email-input]', 'tanaka@example.com');
    await page.check('[data-testid=attendance-yes]');
    
    // 送信ボタンをクリック
    await page.click('[data-testid=submit-button]');
    
    // 成功メッセージの確認
    await expect(page.locator('[data-testid=success-message]')).toBeVisible();
    await expect(page.locator('[data-testid=success-message]')).toContainText('ありがとうございました');
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/');

    // 無効なデータで送信
    await page.fill('[data-testid=email-input]', 'invalid-email');
    await page.click('[data-testid=submit-button]');
    
    // エラーメッセージの確認
    await expect(page.locator('[data-testid=name-error]')).toContainText('名前は必須です');
    await expect(page.locator('[data-testid=email-error]')).toContainText('有効なメールアドレスを入力してください');
  });
});
```

## パフォーマンス最適化

### 画像最適化
```typescript
// components/OptimizedImage.tsx
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
};
```

### レンダリング最適化
```typescript
// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 使用例
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // API コール
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="検索..."
    />
  );
};
```

### バンドルサイズ最適化
```typescript
// 動的インポートの使用
const AdminDashboard = dynamic(() => import('../components/AdminDashboard'), {
  loading: () => <div>読み込み中...</div>,
  ssr: false
});

// ライブラリの選択的インポート
import { debounce } from 'lodash/debounce'; // ❌ 全体インポート
import debounce from 'lodash.debounce';    // ✅ 個別パッケージ

// Tree shaking の活用
import { format } from 'date-fns';         // ✅ 必要な関数のみ
import * as dateFns from 'date-fns';       // ❌ 全体インポート
```

## デバッグ

### ローカルデバッグ
```typescript
// lib/debug.ts
const DEBUG = process.env.NODE_ENV === 'development';

export const debugLog = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data);
  }
};

export const debugError = (message: string, error?: any) => {
  if (DEBUG) {
    console.error(`[DEBUG ERROR] ${message}`, error);
  }
};

// 使用例
import { debugLog, debugError } from '@/lib/debug';

const submitRSVP = async (data: RSVPData) => {
  debugLog('RSVP submission started', data);
  
  try {
    const result = await api.submitRSVP(data);
    debugLog('RSVP submission successful', result);
    return result;
  } catch (error) {
    debugError('RSVP submission failed', error);
    throw error;
  }
};
```

### Firebase エミュレータ
```bash
# Firebase エミュレータ起動
firebase emulators:start --only firestore,auth

# テスト用データの準備
firebase emulators:exec --only firestore "npm run seed-test-data"
```

```typescript
// lib/firebase-dev.ts
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

// 開発環境でエミュレータに接続
if (process.env.NODE_ENV === 'development') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
  } catch (error) {
    // エミュレータ接続エラーは無視（既に接続済みの場合）
  }
}
```

## トラブルシューティング

### よくある問題と解決方法

#### 1. Firebase 接続エラー
```bash
# エラー: Firebase project not found
firebase use <project-id>

# エラー: Permission denied
# Firebase Console で認証設定を確認
# セキュリティルールを確認
```

#### 2. ビルドエラー
```bash
# 型エラー
npm run type-check

# ESLint エラー
npm run lint
npm run lint:fix

# 依存関係の問題
rm -rf node_modules package-lock.json
npm install
```

#### 3. パフォーマンス問題
```typescript
// React DevTools Profiler を使用
// Bundle Analyzer でバンドルサイズ確認
npm run analyze

// Lighthouse でパフォーマンス測定
npx lighthouse http://localhost:3000 --output html
```

#### 4. CSS/スタイル問題
```bash
# Tailwind CSS の再生成
npm run build:css

# PostCSS の問題
rm -rf .next
npm run dev
```

## VS Code 設定

### 推奨拡張機能
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright"
  ]
}
```

### 設定ファイル
```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### デバッグ設定
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日
