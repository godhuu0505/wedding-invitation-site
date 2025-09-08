'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedMessageSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

interface AnimatedTextLinesProps {
  lines: string[];
  className?: string;
  style?: React.CSSProperties;
}

// メインセクションのアニメーションWrapper
export function AnimatedSection({ children, className, id }: AnimatedMessageSectionProps) {
  return (
    <motion.section 
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  );
}

// タイトル部分のアニメーションWrapper
export function AnimatedTitleContainer({ children, className }: AnimatedMessageSectionProps) {
  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// メインタイトルのアニメーション
export function AnimatedTitle({ children, className, style }: AnimatedTitleProps) {
  return (
    <motion.h2 
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {children}
    </motion.h2>
  );
}

// 装飾線のアニメーション
export function AnimatedDecorationLine() {
  return (
    <motion.div 
      className="flex items-center justify-center mb-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <motion.div 
        className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.div 
        className="w-3 h-3 bg-akane-500 rounded-full mx-6 shadow-sm"
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 360 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.div 
        className="w-20 h-0.5 bg-gradient-to-r from-transparent via-akane-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </motion.div>
  );
}

// サブタイトルのアニメーション
export function AnimatedSubtitle({ children, className, style }: AnimatedTitleProps) {
  return (
    <motion.p 
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.9 }}
    >
      {children}
    </motion.p>
  );
}

// カード全体のアニメーション
export function AnimatedCard({ children, className }: AnimatedCardProps) {
  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

// テキスト行のスタガーアニメーション
export function AnimatedTextLines({ lines, className, style }: AnimatedTextLinesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className={className}
          style={{
            ...style,
            minHeight: line === "" ? '1.5em' : 'auto',
            display: 'block',
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: 1 + (index * 0.15) 
          }}
        >
          {line}
        </motion.span>
      ))}
    </motion.div>
  );
}

// まとめて使える高レベルコンポーネント
export function AnimatedMessageContainer({ 
  title, 
  subtitle, 
  textLines, 
  sectionId, 
  sectionClassName 
}: {
  title: string;
  subtitle: string;
  textLines: string[];
  sectionId?: string;
  sectionClassName?: string;
}) {
  return (
    <AnimatedSection id={sectionId} className={sectionClassName}>
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-ecru-white/50 to-old-lace" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* タイトル部分 */}
        <AnimatedTitleContainer className="text-center mb-20">
          <AnimatedTitle 
            className="text-mine-shaft mb-8"
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.1',
              letterSpacing: '0.1em',
              color: '#333333',
            }}
          >
            {title}
          </AnimatedTitle>
          
          <AnimatedDecorationLine />
          
          <AnimatedSubtitle 
            className="text-tundora"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: '1.125rem',
              letterSpacing: '0.1em',
              color: '#4D4D4D',
            }}
          >
            {subtitle}
          </AnimatedSubtitle>
        </AnimatedTitleContainer>

        {/* メッセージカード */}
        <AnimatedCard className="max-w-4xl mx-auto figma-card p-12 md:p-16">
          <AnimatedTextLines 
            lines={textLines}
            className="text-mine-shaft leading-loose text-center"
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: '400',
              fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
              lineHeight: '2',
              letterSpacing: '0.05em',
              color: '#333333',
            }}
          />
        </AnimatedCard>
      </div>
    </AnimatedSection>
  );
}
