"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { invitationConfig } from "@/config/invitation";
import { Cover } from "@/components/Cover";
import { AudioPlayer } from "@/components/AudioPlayer";
import { HeroSection } from "@/components/HeroSection";
import { CountdownTimer } from "@/components/CountdownTimer";
import { QuickNav } from "@/components/QuickNav";
import { CoupleSection } from "@/components/CoupleSection";
import { EventSection } from "@/components/EventSection";
import { LoveStorySection } from "@/components/LoveStorySection";
import { QuotesSection } from "@/components/QuotesSection";
import { GiftSection } from "@/components/GiftSection";
import { AdabWalimahSection } from "@/components/AdabWalimahSection";
import { RsvpGuestbook } from "@/components/RsvpGuestbook";
import { ClosingSection } from "@/components/ClosingSection";
import { BottomNav } from "@/components/BottomNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GoldenStardust } from "@/components/GoldenStardust";
import { ThemePreviewBar } from "@/components/theme/ThemePreviewBar";

function EmeraldGoldContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || searchParams.get("tamu") || searchParams.get("u") || "";

  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleOpenInvitation = () => {
    setIsCoverOpen(true);
    setIsPlayingAudio(true);
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen islamic-pattern">
      {/* Interactive Floating Theme Switcher */}
      <ThemePreviewBar currentTheme="emerald-gold" />

      {/* Interactive Cover Modal / Curtain */}
      <Cover
        guestName={guestName}
        groomNick={invitationConfig.groom.nickName}
        brideNick={invitationConfig.bride.nickName}
        weddingDate={invitationConfig.events.akad.date}
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Luxury Scroll Reading Progress & Ambient Stardust */}
      {isCoverOpen && (
        <>
          <ScrollProgress />
          <GoldenStardust />
        </>
      )}

      {/* Floating Audio Controller */}
      {isCoverOpen && (
        <AudioPlayer
          src={invitationConfig.audio.src}
          isPlaying={isPlayingAudio}
          onTogglePlay={handleToggleAudio}
        />
      )}

      {/* Main Invitation Sections */}
      <main className="transition-opacity duration-700 ease-in-out">
        {/* Hero Section */}
        <HeroSection
          groom={invitationConfig.groom}
          bride={invitationConfig.bride}
          mainDateFormatted={invitationConfig.events.akad.date}
        />

        {/* Countdown Timer */}
        <CountdownTimer
          targetDate={invitationConfig.mainDate}
          calendarUrl={invitationConfig.events.akad.calendarUrl}
        />

        {/* Quick Section Navigation Shortcuts */}
        <QuickNav />

        {/* Bride & Groom Details */}
        <CoupleSection
          groom={invitationConfig.groom}
          bride={invitationConfig.bride}
          quranVerse={invitationConfig.quranVerse}
        />

        {/* Event Schedule (Akad & Resepsi) */}
        <EventSection
          akad={invitationConfig.events.akad}
          resepsi={invitationConfig.events.resepsi}
        />

        {/* Love Story / Ta'aruf Timeline */}
        <LoveStorySection stories={invitationConfig.stories} />

        {/* Quotes & Du'a */}
        <QuotesSection />

        {/* Digital Envelope & Gift Registry */}
        <GiftSection
          bankAccounts={invitationConfig.bankAccounts}
          physicalGiftAddress={invitationConfig.physicalGiftAddress}
        />

        {/* Adab Walimah */}
        <AdabWalimahSection items={invitationConfig.adabWalimah} />

        {/* Realtime RSVP & Guestbook */}
        <RsvpGuestbook initialGuestName={guestName} />

        {/* Closing Warm Regards */}
        <ClosingSection
          groom={invitationConfig.groom}
          bride={invitationConfig.bride}
        />

        {/* Mobile Persistent Bottom Navigation */}
        <BottomNav />
      </main>
    </div>
  );
}

export default function EmeraldGoldPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B2B26] text-white flex items-center justify-center">Memuat template...</div>}>
      <EmeraldGoldContent />
    </Suspense>
  );
}

