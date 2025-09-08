'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface AnimatedProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function AnimatedProfileImage({
  src,
  alt,
  className = ''
}: AnimatedProfileImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // メイン画像のアニメーション
  const imageVariants: Variants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -10
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.4, 0.5, 1] as const,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  // 外側のリング1のアニメーション
  const ring1Variants: Variants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1.1,
      opacity: 0.3,
      transition: {
        duration: 1.5,
        ease: 'easeOut' as const,
        delay: 0.3
      }
    }
  };

  // 外側のリング2のアニメーション
  const ring2Variants: Variants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1.25,
      opacity: 0.15,
      transition: {
        duration: 1.8,
        ease: 'easeOut' as const,
        delay: 0.6
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className={`relative w-72 h-72 mx-auto mb-12 ${className}`}
      initial="hidden"
      animate={controls}
    >
      {/* メイン画像 */}
      <motion.div 
        className="w-full h-full rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #F5F2E4 0%, #E5E3DF 50%, #BDBCDA 100%)',
          border: '3px solid #e65555',
        }}
        variants={imageVariants}
      >
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </motion.div>
      
      {/* 外側のリング1 */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          border: '2px solid #e65555',
        }}
        variants={ring1Variants}
      />
      
      {/* 外側のリング2 */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid #e65555',
        }}
        variants={ring2Variants}
      />
    </motion.div>
  );
}
