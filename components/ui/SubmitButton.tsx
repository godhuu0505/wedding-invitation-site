'use client';

import React from 'react';

interface SubmitButtonProps {
  isSubmitting?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function SubmitButton({ 
  isSubmitting = false, 
  disabled = false,
  className = '',
  onClick,
  type = 'submit'
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isSubmitting}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        transition-all duration-300 transform
        hover:scale-105 hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900
        ${className}
      `}
      style={{
        backgroundColor: disabled || isSubmitting ? '#9CA3AF' : '#711207',
        borderRadius: '3.04px',
        padding: '7px 13px',
        minHeight: '90px',
        minWidth: '236px',
        opacity: disabled || isSubmitting ? 0.5 : 0.65,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isSubmitting) {
          e.currentTarget.style.opacity = '0.85';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isSubmitting) {
          e.currentTarget.style.opacity = '0.65';
        }
      }}
    >
      {isSubmitting ? (
        <span className="flex flex-col items-center justify-center text-white">
          <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mb-2"></div>
          <span 
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '500',
              fontSize: '0.875rem',
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: '1.2',
            }}
          >
            送信中...
          </span>
        </span>
      ) : (
        <div className="flex flex-col items-center justify-center text-white">
          <span 
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '500',
              fontSize: '1.125rem',
              color: '#FFFFFF',
              marginBottom: '4px',
              letterSpacing: '0.1em',
            }}
          >
            送信
          </span>
          <span 
            style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: '400',
              fontSize: '0.875rem',
              color: '#FFFFFF',
              letterSpacing: '0.05em',
            }}
          >
            Submit
          </span>
        </div>
      )}
    </button>
  );
}
