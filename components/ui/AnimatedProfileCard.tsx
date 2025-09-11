'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedProfileCardProps {
  birthDate?: string;
  birthPlace?: string;
  bloodType?: string;
  hobbyLines?: string[];
  messageLines?: string[];
  className?: string;
}

// プロフィール情報の各行のアニメーション（AnimatedMessageSection参考）
export function AnimatedProfileLine({ 
  children, 
  index, 
  className,
  style 
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.span
      className={className}
      style={{
        ...style,
        minHeight: typeof children === 'string' && children === "" ? '1.5em' : 'auto',
        display: 'block',
      }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: 0.8 + (index * 0.15) 
      }}
    >
      {children}
    </motion.span>
  );
}

// 装飾的な要素のアニメーション
export function AnimatedProfileDecoration({ variant = 'top' }: { variant?: 'top' | 'bottom' }) {
  return (
    <motion.div 
      className={`flex justify-center ${variant === 'top' ? 'mb-6' : 'mt-8'}`}
      initial={{ 
        scale: 0,
        rotate: variant === 'top' ? -180 : 180,
        opacity: 0
      }}
      whileInView={{
        scale: 1,
        rotate: 0,
        opacity: 1
      }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        ease: 'easeOut',
        delay: variant === 'top' ? 0.5 : 1.5
      }}
    >
      {variant === 'top' ? (
        <div className="w-12 h-12 relative">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #e65555, #ff7777)',
              opacity: 0.1
            }}
          />
          <div 
            className="absolute inset-2 rounded-full border-2"
            style={{
              borderColor: '#e65555',
              opacity: 0.3
            }}
          />
          <div 
            className="absolute inset-4 rounded-full"
            style={{
              background: '#e65555',
              opacity: 0.6
            }}
          />
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-0.5"
            style={{
              background: 'linear-gradient(to right, transparent, #e65555, transparent)'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full"
            style={{ background: '#e65555' }}
          />
          <div 
            className="w-8 h-0.5"
            style={{
              background: 'linear-gradient(to right, transparent, #e65555, transparent)'
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

// プロフィールカード全体のアニメーション
export function AnimatedProfileCard({
  birthDate,
  birthPlace,
  bloodType,
  hobbyLines = [],
  messageLines = [],
  className = ''
}: AnimatedProfileCardProps) {
  return (
    <motion.div
      className={`figma-card p-8 md:p-10 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(230, 85, 85, 0.1)',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {/* 上部装飾 */}
      <AnimatedProfileDecoration variant="top" />

      {/* プロフィール情報 */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* 基本情報 */}
        {(birthDate || birthPlace) && (
          <AnimatedProfileLine
            index={0}
            className="text-mine-shaft leading-loose text-center"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              lineHeight: '2',
              letterSpacing: '0.05em',
              color: '#333333',
            }}
          >
            {birthDate && birthPlace ? `${birthDate}　${birthPlace}生まれ` : (birthDate || birthPlace)}
          </AnimatedProfileLine>
        )}

        {/* 血液型・性格 */}
        {bloodType && (
          <AnimatedProfileLine
            index={1}
            className="text-mine-shaft leading-loose text-center"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              lineHeight: '2',
              letterSpacing: '0.05em',
              color: '#333333',
            }}
          >
            {bloodType}
          </AnimatedProfileLine>
        )}

        {/* 趣味・特技（複数行対応） */}
        {hobbyLines.map((line, index) => (
          <AnimatedProfileLine
            key={`hobby-${index}`}
            index={2 + index}
            className="text-mine-shaft leading-loose text-center"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(0.9rem, 1.0vw, 1.1rem)',
              lineHeight: '1.5',
              letterSpacing: '0.05em',
              color: '#333333',
            }}
          >
            {line}
          </AnimatedProfileLine>
        ))}

        {/* メッセージ（複数行対応） */}
        {messageLines.map((line, index) => (
          <AnimatedProfileLine
            key={`message-${index}`}
            index={2 + hobbyLines.length + index}
            className="text-mine-shaft leading-loose text-center"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(0.9rem, 1.0vw, 1.1rem)',
              lineHeight: '1',
              letterSpacing: '0.05em',
              color: '#333333',
            }}
          >
            {line}
          </AnimatedProfileLine>
        ))}
      </motion.div>

      {/* 下部装飾 */}
      <AnimatedProfileDecoration variant="bottom" />
    </motion.div>
  );
}

export default AnimatedProfileCard;
