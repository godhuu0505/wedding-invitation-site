'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BlackOverlayProps {
  showBlackOverlay: boolean;
}

export function BlackOverlay({ showBlackOverlay }: BlackOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: showBlackOverlay ? 0.8 : 0 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="absolute inset-0 bg-black z-10"
      style={{
        pointerEvents: showBlackOverlay ? 'auto' : 'none'
      }}
    />
  );
}

interface VerticalInvitationTextProps {
  showBlackOverlay: boolean;
}

export function VerticalInvitationText({ showBlackOverlay }: VerticalInvitationTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center z-30"
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
      }}
    >
      <div className="text-white tracking-wider font-elegant"
        style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: '400',
          letterSpacing: '0.5em',
          textShadow: '3px 3px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.5)',
          lineHeight: '1.8',
        }}
      >
        ご招待状
      </div>
    </motion.div>
  );
}

interface WeddingDateProps {
  showBlackOverlay: boolean;
  weddingDate: Date;
  venueName: string;
}

export function WeddingDate({ showBlackOverlay, weddingDate, venueName }: WeddingDateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ 
        opacity: showBlackOverlay ? 0 : 1,
        x: showBlackOverlay ? -50 : 0 
      }}
      transition={{ duration: 1, delay: showBlackOverlay ? 0 : 0.5, ease: "easeOut" }}
    >
      <div className="text-white text-left font-elegant"
        style={{
          fontWeight: '400',
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
          letterSpacing: '0.1em',
          textShadow: '1px 1px 6px rgba(0,0,0,0.8)',
          lineHeight: '1.6',
        }}
      >
        <div className="mb-2">
          {weddingDate.toLocaleDateString('ja-JP', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          })}
        </div>
        <div className="text-sm md:text-base opacity-90">
          at {venueName}
        </div>
      </div>
    </motion.div>
  );
}

interface SlideIndicatorProps {
  showBlackOverlay: boolean;
  backgroundStyles: any[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export function SlideIndicator({ 
  showBlackOverlay, 
  backgroundStyles, 
  currentSlide, 
  onSlideChange 
}: SlideIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showBlackOverlay ? 0 : 1 }}
      transition={{ duration: 1, delay: 6 }}
      className="absolute bottom-8 right-8 flex flex-col space-y-3 z-20"
    >
      {backgroundStyles.map((_, index) => (
        <motion.button
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: showBlackOverlay ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 6 + (index * 0.1) }}
          onClick={() => onSlideChange(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border ${
            index === currentSlide 
              ? 'bg-akane-500 border-akane-500 scale-125 shadow-lg' 
              : 'bg-transparent border-dusty-gray hover:bg-dusty-gray/30 hover:scale-110'
          }`}
          style={{
            borderColor: index === currentSlide ? '#e65555' : '#999999',
            backgroundColor: index === currentSlide ? '#e65555' : 'transparent',
            boxShadow: index === currentSlide ? '0 4px 12px rgba(230, 85, 85, 0.3)' : 'none',
          }}
          aria-label={`背景スライド ${index + 1}`}
        />
      ))}
    </motion.div>
  );
}
