/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode を一時的に無効化（Vivusエラー対策）
  reactStrictMode: false,
  
  // 静的サイト生成用の設定
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  
  // 環境変数の型安全性を確保
  env: {
    // 開発時のFirebaseエミュレータ設定
    NEXT_PUBLIC_USE_FIREBASE_EMULATOR: process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR || 'false',
    NEXT_PUBLIC_ENABLE_DEBUG_MODE: process.env.NEXT_PUBLIC_ENABLE_DEBUG_MODE || 'false',
  },
  
  // 実験的機能
  experimental: {
    // 最新の最適化機能
    optimizePackageImports: ['framer-motion'],
  },
  
  // 画像最適化設定
  images: {
    domains: [
      'firebasestorage.googleapis.com',  // Firebase Storage
      'maps.googleapis.com',             // Google Maps
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // セキュリティヘッダー
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // 環境変数のバリデーション（開発時のみ）
  webpack: (config, { dev }) => {
    if (dev) {
      // 開発時に必須環境変数の存在をチェック
      const requiredEnvVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_GROOM_FIRST_NAME_EN',
        'NEXT_PUBLIC_BRIDE_FIRST_NAME_EN',
        'NEXT_PUBLIC_WEDDING_DATE',
      ];
      
      const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
      
      if (missingVars.length > 0) {
        console.warn('\n⚠️  警告: 以下の必須環境変数が設定されていません:');
        missingVars.forEach(varName => {
          console.warn(`   - ${varName}`);
        });
        console.warn('   .env.local.example を参考に .env.local を設定してください。\n');
      }
    }
    
    return config;
  },
};

module.exports = nextConfig;
