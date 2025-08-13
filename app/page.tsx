'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/layout/LoadingScreen';
import HeaderSection from '@/components/sections/HeaderSection';
import MessageSection from '@/components/sections/MessageSection';
import CountdownSection from '@/components/sections/CountdownSection';
import Navigation from '@/components/layout/Navigation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5秒間のローディング

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen isVisible={isLoading} />;
  }

  return (
    <main className="min-h-screen">
      <Navigation items={[
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'message', label: 'Message', href: '#message' },
        { id: 'countdown', label: 'Countdown', href: '#countdown' },
        { id: 'information', label: 'Information', href: '#information' },
        { id: 'rsvp', label: 'RSVP', href: '#rsvp' }
      ]} />
      <HeaderSection />
      <MessageSection />
      <CountdownSection />
      {/* Phase 3で実装予定 */}
      {/* <InformationSection /> */}
      {/* <RSVPSection /> */}
      {/* <FooterSection /> */}
    </main>
  );
}
