'use client';

import React from 'react';
import { AnimatedMessageContainer } from '../ui/AnimatedMessageSection';

export default function MessageSection() {
  // メッセージテキストを行ごとに配列に分割
  const messageLines = [
    "皆様にはご健勝のことと お慶び申し上げます",
    "このたび 私たちは 結婚式を挙げることになりました",
    "",
    "つきましては 親しい皆様の末永い",
    "お力添えをいただきたく心ばかりの小宴をもうけたいと存じます",
    "",
    "おいそがしい中と存じますがご列席くださいますようお願い申し上げます"
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
