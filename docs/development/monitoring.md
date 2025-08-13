# 監視・メンテナンス仕様

## 監視概要

### 監視方針
- **プロアクティブ監視**: 問題発生前の予兆検知
- **リアルタイム アラート**: 重要な問題の即座通知
- **パフォーマンス監視**: ユーザー体験の継続的計測
- **セキュリティ監視**: 不正アクセスや異常行動の検知

### 監視対象
- **可用性**: サイトアクセシビリティ
- **パフォーマンス**: ページ読み込み速度
- **エラー率**: APIエラー・JavaScript エラー
- **RSVP機能**: フォーム送信成功率
- **セキュリティ**: 不正アクセス試行

## アプリケーション監視

### Vercel Analytics
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### カスタム メトリクス
```typescript
// lib/monitoring.ts
interface Metrics {
  rsvpSubmissionSuccess: number;
  rsvpSubmissionFailure: number;
  pageLoadTime: number;
  apiResponseTime: number;
}

class MonitoringService {
  private static instance: MonitoringService;
  
  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }
  
  // RSVP送信成功を記録
  recordRSVPSuccess(responseTime: number) {
    if (typeof window !== 'undefined') {
      // クライアントサイド分析
      this.sendToAnalytics('rsvp_success', {
        response_time: responseTime,
        timestamp: Date.now()
      });
    }
  }
  
  // RSVP送信失敗を記録
  recordRSVPFailure(error: string, responseTime: number) {
    if (typeof window !== 'undefined') {
      this.sendToAnalytics('rsvp_failure', {
        error_type: error,
        response_time: responseTime,
        timestamp: Date.now()
      });
    }
  }
  
  // ページパフォーマンスを記録
  recordPagePerformance(page: string) {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      this.sendToAnalytics('page_performance', {
        page,
        load_time: navigation.loadEventEnd - navigation.fetchStart,
        dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        first_paint: this.getFirstPaint(),
        timestamp: Date.now()
      });
    }
  }
  
  private getFirstPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }
  
  private sendToAnalytics(eventName: string, data: Record<string, any>) {
    // 本番環境では外部分析サービスに送信
    if (process.env.NODE_ENV === 'production') {
      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
      }
      
      // Vercel Analytics
      if (typeof window.va !== 'undefined') {
        window.va('track', eventName, data);
      }
    } else {
      console.log('Analytics Event:', eventName, data);
    }
  }
}

export const monitoring = MonitoringService.getInstance();
```

### エラー追跡
```typescript
// lib/error-tracking.ts
interface ErrorContext {
  user_id?: string;
  page: string;
  user_agent: string;
  timestamp: Date;
  additional_data?: Record<string, any>;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  
  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }
  
  // JavaScript エラーを追跡
  trackError(error: Error, context: Partial<ErrorContext> = {}) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      context: {
        page: window.location.pathname,
        user_agent: navigator.userAgent,
        timestamp: new Date(),
        ...context
      }
    };
    
    // 本番環境では Sentry や類似サービスに送信
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorData);
    } else {
      console.error('Tracked Error:', errorData);
    }
  }
  
  // API エラーを追跡
  trackAPIError(endpoint: string, status: number, message: string, context: Partial<ErrorContext> = {}) {
    const errorData = {
      type: 'api_error',
      endpoint,
      status,
      message,
      context: {
        page: typeof window !== 'undefined' ? window.location.pathname : 'server',
        timestamp: new Date(),
        ...context
      }
    };
    
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorData);
    } else {
      console.error('API Error:', errorData);
    }
  }
  
  private sendToErrorService(errorData: any) {
    // Sentry の例
    // Sentry.captureException(new Error(errorData.message), {
    //   extra: errorData
    // });
    
    // カスタムエラーサービスの例
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(err => {
      console.error('Failed to send error to tracking service:', err);
    });
  }
}

export const errorTracker = ErrorTracker.getInstance();

// グローバルエラーハンドラー
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    errorTracker.trackError(event.error, {
      additional_data: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      }
    });
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.trackError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
      additional_data: {
        reason: event.reason
      }
    });
  });
}
```

## アップタイム監視

### ヘルスチェック API
```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    application: 'online' | 'offline';
    database: 'online' | 'offline';
    external_apis: 'online' | 'offline';
  };
  response_time: number;
  version: string;
}

export async function GET(): Promise<NextResponse<HealthCheckResult>> {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  
  const healthCheck: HealthCheckResult = {
    status: 'healthy',
    timestamp,
    services: {
      application: 'online',
      database: 'offline',
      external_apis: 'offline'
    },
    response_time: 0,
    version: process.env.npm_package_version || '1.0.0'
  };
  
  try {
    // データベース接続確認
    await db.collection('health-check').limit(1).get();
    healthCheck.services.database = 'online';
  } catch (error) {
    console.error('Database health check failed:', error);
    healthCheck.services.database = 'offline';
    healthCheck.status = 'degraded';
  }
  
  try {
    // Google Maps API確認（軽量なリクエスト）
    const mapsResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=tokyo&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      { signal: AbortSignal.timeout(5000) }
    );
    
    if (mapsResponse.ok) {
      healthCheck.services.external_apis = 'online';
    } else {
      healthCheck.services.external_apis = 'offline';
      healthCheck.status = 'degraded';
    }
  } catch (error) {
    console.error('External API health check failed:', error);
    healthCheck.services.external_apis = 'offline';
    healthCheck.status = 'degraded';
  }
  
  // 全サービスがオフラインの場合
  const allServicesOffline = Object.values(healthCheck.services).every(status => status === 'offline');
  if (allServicesOffline) {
    healthCheck.status = 'unhealthy';
  }
  
  healthCheck.response_time = Date.now() - startTime;
  
  const statusCode = healthCheck.status === 'unhealthy' ? 503 : 200;
  return NextResponse.json(healthCheck, { status: statusCode });
}
```

### 外部監視サービス設定
```bash
# UptimeRobot 監視設定例
# URL: https://wedding-invitation-site.com/api/health
# 監視間隔: 5分
# アラート閾値: 2回連続失敗でアラート

# アラート通知先:
# - メール: admin@example.com
# - Slack: #wedding-alerts
# - SMS: 緊急時のみ
```

## パフォーマンス監視

### Web Vitals 測定
```typescript
// lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Web Vitals データを分析サービスに送信
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
    entries: metric.entries,
    url: window.location.href,
    timestamp: Date.now()
  });
  
  // Navigator.sendBeacon を使用してデータを確実に送信
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/web-vitals', body);
  } else {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    }).catch(console.error);
  }
}

// Core Web Vitals 測定開始
export function measureWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}

// ページ読み込み完了時に測定開始
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    measureWebVitals();
  } else {
    window.addEventListener('load', measureWebVitals);
  }
}
```

### パフォーマンス分析API
```typescript
// app/api/analytics/web-vitals/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  url: string;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();
    
    // パフォーマンス閾値チェック
    const thresholds = {
      CLS: 0.1,    // Cumulative Layout Shift
      FID: 100,    // First Input Delay (ms)
      FCP: 1800,   // First Contentful Paint (ms)
      LCP: 2500,   // Largest Contentful Paint (ms)
      TTFB: 800    // Time to First Byte (ms)
    };
    
    const threshold = thresholds[metric.name as keyof typeof thresholds];
    
    if (threshold && metric.value > threshold) {
      // 閾値を超えた場合のアラート
      console.warn(`Performance Alert: ${metric.name} exceeded threshold`, {
        value: metric.value,
        threshold,
        url: metric.url
      });
      
      // 本番環境では監視サービスにアラート送信
      if (process.env.NODE_ENV === 'production') {
        await sendPerformanceAlert(metric, threshold);
      }
    }
    
    // メトリクスをログまたは分析サービスに保存
    await storeMetric(metric);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Web Vitals API Error:', error);
    return NextResponse.json({ error: 'Failed to process metric' }, { status: 500 });
  }
}

async function sendPerformanceAlert(metric: WebVitalMetric, threshold: number) {
  // Slack や Discord へのアラート送信
  const alertMessage = {
    text: `🚨 Performance Alert`,
    attachments: [
      {
        color: 'danger',
        fields: [
          { title: 'Metric', value: metric.name, short: true },
          { title: 'Value', value: `${metric.value}ms`, short: true },
          { title: 'Threshold', value: `${threshold}ms`, short: true },
          { title: 'URL', value: metric.url, short: false }
        ]
      }
    ]
  };
  
  // Slack Webhook の例
  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertMessage)
    });
  }
}

async function storeMetric(metric: WebVitalMetric) {
  // Firebase Firestore に保存
  try {
    await db.collection('performance-metrics').add({
      ...metric,
      timestamp: new Date(metric.timestamp)
    });
  } catch (error) {
    console.error('Failed to store metric:', error);
  }
}
```

## ログ管理

### 構造化ログ
```typescript
// lib/logger.ts
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  error?: Error;
  requestId?: string;
  userId?: string;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  
  constructor() {
    this.logLevel = process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG;
  }
  
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  debug(message: string, context?: Record<string, any>) {
    this.log(LogLevel.DEBUG, message, context);
  }
  
  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context);
  }
  
  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context);
  }
  
  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log(LogLevel.ERROR, message, context, error);
  }
  
  fatal(message: string, error?: Error, context?: Record<string, any>) {
    this.log(LogLevel.FATAL, message, context, error);
  }
  
  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    if (level < this.logLevel) return;
    
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } as any : undefined,
      requestId: this.getRequestId(),
      userId: this.getUserId()
    };
    
    if (process.env.NODE_ENV === 'production') {
      // 本番環境では外部ログサービスに送信
      this.sendToLogService(logEntry);
    } else {
      // 開発環境ではコンソール出力
      this.consoleLog(logEntry);
    }
  }
  
  private consoleLog(entry: LogEntry) {
    const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
    const levelColors = ['gray', 'blue', 'yellow', 'red', 'magenta'];
    
    console.log(
      `%c[${levelNames[entry.level]}] ${entry.timestamp.toISOString()} - ${entry.message}`,
      `color: ${levelColors[entry.level]}`
    );
    
    if (entry.context) {
      console.log('Context:', entry.context);
    }
    
    if (entry.error) {
      console.error('Error:', entry.error);
    }
  }
  
  private sendToLogService(entry: LogEntry) {
    // Google Cloud Logging, Datadog, New Relic等に送信
    // ここでは簡単な例として fetch を使用
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    }).catch(console.error);
  }
  
  private getRequestId(): string | undefined {
    // Next.js のリクエストIDを取得（カスタム実装）
    return typeof window !== 'undefined' ? undefined : 'server-request';
  }
  
  private getUserId(): string | undefined {
    // 認証されたユーザーIDを取得
    return undefined; // 実装に応じて取得
  }
}

export const logger = Logger.getInstance();
```

## アラート設定

### アラート条件
```typescript
// lib/alerts.ts
interface AlertCondition {
  name: string;
  condition: (metrics: any) => boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  cooldown: number; // 秒
}

const alertConditions: AlertCondition[] = [
  {
    name: 'High Error Rate',
    condition: (metrics) => metrics.errorRate > 0.05, // 5%以上
    severity: 'high',
    cooldown: 300 // 5分
  },
  {
    name: 'Slow Response Time',
    condition: (metrics) => metrics.avgResponseTime > 3000, // 3秒以上
    severity: 'medium',
    cooldown: 600 // 10分
  },
  {
    name: 'RSVP Function Down',
    condition: (metrics) => metrics.rsvpSuccessRate < 0.9, // 90%未満
    severity: 'critical',
    cooldown: 180 // 3分
  },
  {
    name: 'High Traffic',
    condition: (metrics) => metrics.requestsPerMinute > 1000,
    severity: 'low',
    cooldown: 1800 // 30分
  }
];

class AlertManager {
  private alertHistory = new Map<string, number>();
  
  checkAlerts(metrics: any) {
    alertConditions.forEach(condition => {
      if (condition.condition(metrics)) {
        this.triggerAlert(condition, metrics);
      }
    });
  }
  
  private triggerAlert(condition: AlertCondition, metrics: any) {
    const now = Date.now();
    const lastAlert = this.alertHistory.get(condition.name) || 0;
    
    // クールダウン期間中はアラートをスキップ
    if (now - lastAlert < condition.cooldown * 1000) {
      return;
    }
    
    this.alertHistory.set(condition.name, now);
    
    // アラート送信
    this.sendAlert(condition, metrics);
  }
  
  private async sendAlert(condition: AlertCondition, metrics: any) {
    const alertData = {
      condition: condition.name,
      severity: condition.severity,
      timestamp: new Date().toISOString(),
      metrics,
      site: 'Wedding Invitation Site'
    };
    
    // Slack通知
    if (process.env.SLACK_WEBHOOK_URL) {
      await this.sendSlackAlert(alertData);
    }
    
    // メール通知（重要度高の場合）
    if (condition.severity === 'high' || condition.severity === 'critical') {
      await this.sendEmailAlert(alertData);
    }
  }
  
  private async sendSlackAlert(alertData: any) {
    const colorMap = {
      low: 'good',
      medium: 'warning', 
      high: 'danger',
      critical: '#FF0000'
    };
    
    const message = {
      text: `🚨 Alert: ${alertData.condition}`,
      attachments: [
        {
          color: colorMap[alertData.severity as keyof typeof colorMap],
          fields: [
            { title: 'Severity', value: alertData.severity.toUpperCase(), short: true },
            { title: 'Site', value: alertData.site, short: true },
            { title: 'Time', value: alertData.timestamp, short: false }
          ]
        }
      ]
    };
    
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
  }
  
  private async sendEmailAlert(alertData: any) {
    // SendGrid, AWS SES, Gmail API等を使用してメール送信
    console.log('Email alert would be sent:', alertData);
  }
}

export const alertManager = new AlertManager();
```

## メンテナンス

### 定期メンテナンスタスク
```typescript
// scripts/maintenance.ts
import { db } from '../lib/firebase';
import { logger } from '../lib/logger';

class MaintenanceService {
  // 古いログの削除（30日以上前）
  async cleanupOldLogs() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    try {
      const oldLogs = await db.collection('logs')
        .where('timestamp', '<', thirtyDaysAgo)
        .limit(500)
        .get();
      
      const batch = db.batch();
      oldLogs.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      logger.info(`Cleaned up ${oldLogs.size} old log entries`);
    } catch (error) {
      logger.error('Failed to cleanup old logs', error);
    }
  }
  
  // パフォーマンスメトリクスの集計
  async aggregatePerformanceMetrics() {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      
      const today = new Date(yesterday);
      today.setDate(today.getDate() + 1);
      
      const metrics = await db.collection('performance-metrics')
        .where('timestamp', '>=', yesterday)
        .where('timestamp', '<', today)
        .get();
      
      const aggregated = this.aggregateMetrics(metrics.docs.map(doc => doc.data()));
      
      await db.collection('daily-performance').doc(yesterday.toISOString().split('T')[0]).set(aggregated);
      
      logger.info('Performance metrics aggregated for', { date: yesterday.toISOString().split('T')[0] });
    } catch (error) {
      logger.error('Failed to aggregate performance metrics', error);
    }
  }
  
  private aggregateMetrics(metrics: any[]) {
    const grouped = metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric.value);
      return acc;
    }, {} as Record<string, number[]>);
    
    const result: Record<string, any> = {};
    
    Object.entries(grouped).forEach(([name, values]) => {
      result[name] = {
        count: values.length,
        avg: values.reduce((sum, val) => sum + val, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        p50: this.percentile(values, 50),
        p95: this.percentile(values, 95),
        p99: this.percentile(values, 99)
      };
    });
    
    return result;
  }
  
  private percentile(values: number[], p: number): number {
    const sorted = values.sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[index];
  }
  
  // RSVP データの整合性チェック
  async validateRSVPData() {
    try {
      const rsvps = await db.collection('rsvps').get();
      const issues: string[] = [];
      
      rsvps.docs.forEach(doc => {
        const data = doc.data();
        
        // 必須フィールドのチェック
        if (!data.name || !data.email || !data.attendance) {
          issues.push(`Document ${doc.id}: Missing required fields`);
        }
        
        // メール形式のチェック
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          issues.push(`Document ${doc.id}: Invalid email format`);
        }
        
        // 出欠の値チェック
        if (data.attendance && !['yes', 'no'].includes(data.attendance)) {
          issues.push(`Document ${doc.id}: Invalid attendance value`);
        }
      });
      
      if (issues.length > 0) {
        logger.warn('RSVP data validation issues found', { issues });
      } else {
        logger.info('RSVP data validation completed successfully');
      }
    } catch (error) {
      logger.error('Failed to validate RSVP data', error);
    }
  }
  
  // データベースの最適化
  async optimizeDatabase() {
    try {
      // インデックスの利用状況を確認し、不要なインデックスを特定
      // 実際の実装では Firebase Admin SDK を使用
      
      logger.info('Database optimization completed');
    } catch (error) {
      logger.error('Failed to optimize database', error);
    }
  }
}

// cron ジョブまたは定期実行で使用
const maintenance = new MaintenanceService();

export { maintenance };
```

### メンテナンス スケジュール
```bash
# Vercel Cron Jobs（vercel.json）
{
  "crons": [
    {
      "path": "/api/maintenance/cleanup",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/maintenance/aggregate",
      "schedule": "0 3 * * *"
    },
    {
      "path": "/api/maintenance/validate",
      "schedule": "0 4 * * 0"
    }
  ]
}

# または GitHub Actions
# .github/workflows/maintenance.yml
# 毎日午前2時（JST）に実行
```

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日
