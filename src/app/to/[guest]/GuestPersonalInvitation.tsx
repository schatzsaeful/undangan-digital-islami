"use client";

import React, { useState } from "react";
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

interface GuestPersonalInvitationProps {
  guestName: string;
}

export function GuestPersonalInvitation({ guestName }: GuestPersonalInvitationProps) {
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
      {/* Interactive Cover Modal / Curtain with Guest Name */}
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
        <HeroSection
          groom={invitationConfig.groom}
          bride={invitationConfig.bride}
          mainDateFormatted={invitationConfig.events.akad.date}
        />

        <CountdownTimer
          targetDate={invitationConfig.mainDate}
          calendarUrl={invitationConfig.events.akad.calendarUrl}
        />

        {/* Quick Section Navigation Shortcuts */}
        <QuickNav />

        <CoupleSection
          groom={invitationConfig.groom}
          bride={invitationConfig.bride}
          quranVerse={invitationConfig.quranVerse}
        />

        <EventSection
          akad={invitationConfig.events.akad}
          resepsi={invitationConfig.events.resepsi}
        />

        <LoveStorySection stories={invitationConfig.stories} />

        {/* Mutiara Sunnah & Hadits Pernikahan (Pengganti Galeri untuk Konsep Syar'i) */}
        <QuotesSection />

        <AdabWalimahSection items={invitationConfig.adabWalimah} />

        <GiftSection
          bankAccounts={invitationConfig.bankAccounts}
          physicalGiftAddress={invitationConfig.physicalGiftAddress}
        />

        <RsvpGuestbook initialGuestName={guestName} />

        <ClosingSection
          groom={invitationConfig.groom}
          bride={invitationConfig.bride}
        />
      </main>

      {/* Sticky Bottom Navigation Dock */}
      {isCoverOpen && <BottomNav />}
    </div>
  );
}
