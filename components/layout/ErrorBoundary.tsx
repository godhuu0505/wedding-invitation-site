'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 text-akane-500">
              <svg 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                className="w-full h-full"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              申し訳ございません
            </h2>
            
            <p className="text-gray-600 mb-6">
              予期しないエラーが発生しました。
              ページを再読み込みしてお試しください。
            </p>

            <button
              onClick={() => window.location.reload()}
              className="bg-akane-500 text-white px-6 py-2 rounded-lg hover:bg-akane-600 transition-colors"
            >
              ページを再読み込み
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left bg-gray-100 p-4 rounded">
                <summary className="cursor-pointer font-medium text-sm">
                  エラー詳細（開発者向け）
                </summary>
                <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
