'use client';

import React from 'react';
import { AnimatedMessageContainer } from '../ui/AnimatedMessageSection';

export default function MessageSection() {
  // メッセージテキストを行ごとに配列に分割
  const messageLines = [
    "皆様ご健勝のことと",
    "お慶び申し上げます",
    "",
    "このたび私たちは",
    "結婚式を挙げることに",
    "なりました",
    "",
    "つきましては親しい皆様と",
    "心ばかりの小宴を",
    "もうけたいと存じます",
    "",
    "ご多用の中恐縮ですが",
    "ご列席くださいますよう",
    "お願い申し上げます"
  ];

  return (
    <AnimatedMessageContainer
      sectionId="message"
      sectionClassName="py-24 bg-old-lace relative"
      title="Message"
      subtitle="メッセージ"
      textLines={messageLines}
    />
  );
}
