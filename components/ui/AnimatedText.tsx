'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({
  text,
  delay = 0,
  className = '',
  style = {}
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // 文字を配列に分割（スペースや改行も含める）
  const characters = text.split('');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    }
  };

  const characterVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.5, 1] as const
      }
    }
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char === '\n' ? <br /> : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
