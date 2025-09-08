'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';

interface AnimatedProfileMessageProps {
  message: string;
  name?: string;
  birthDate?: string;
  birthPlace?: string;
  bloodType?: string;
  hobby?: string;
  className?: string;
}

export default function AnimatedProfileMessage({
  message,
  name,
  birthDate,
  birthPlace,
  bloodType,
  hobby,
  className = ''
}: AnimatedProfileMessageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // メッセージを文単位で分割（和風招待状風に改行を考慮）
  const formatProfileText = () => {
    const lines = [];
    
    // 基本情報
    if (birthDate && birthPlace) {
      lines.push(`${birthDate}　${birthPlace}生まれ`);
    }
    if (bloodType) {
      lines.push(bloodType);
    }
    
    // 趣味・興味
    if (hobby) {
      lines.push(hobby);
    }
    
    // メッセージ
    if (message) {
      lines.push(message);
    }
    
    return lines;
  };

  const profileLines = formatProfileText();

  // アニメーション設定
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.2
      }
    }
  };

  const decorativeVariants: Variants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut' as const,
        delay: 0.5
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`figma-card p-8 md:p-10 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(230, 85, 85, 0.1)',
      }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* 装飾的な要素 */}
      <motion.div 
        className="flex justify-center mb-6"
        variants={decorativeVariants}
      >
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
      </motion.div>

      {/* プロフィールテキスト */}
      <div className="space-y-6">
        {profileLines.map((line, index) => (
          <div key={index} className="block">
            <AnimatedText
              text={line}
              delay={index * 0.8}
              className="text-mine-shaft leading-relaxed block"
              style={{
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: '400',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                lineHeight: '1.8',
                letterSpacing: '0.02em',
                color: '#333333',
                textAlign: 'center',
                display: 'block'
              }}
            />
          </div>
        ))}
      </div>

      {/* 下部装飾 */}
      <motion.div 
        className="flex justify-center mt-8"
        variants={decorativeVariants}
      >
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
      </motion.div>
    </motion.div>
  );
}
