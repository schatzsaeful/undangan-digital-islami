"use client";

import React, { useState, use } from "react";
import { invitationConfig } from "@/config/invitation";
import { Cover } from "@/components/Cover";
import { AudioPlayer } from "@/components/AudioPlayer";
import { HeroSection } from "@/components/HeroSection";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CoupleSection } from "@/components/CoupleSection";
import { EventSection } from "@/components/EventSection";
import { LoveStorySection } from "@/components/LoveStorySection";
import { GallerySection } from "@/components/GallerySection";
import { GiftSection } from "@/components/GiftSection";
import { AdabWalimahSection } from "@/components/AdabWalimahSection";
import { RsvpGuestbook } from "@/components/RsvpGuestbook";
import { ClosingSection } from "@/components/ClosingSection";
import { BottomNav } from "@/components/BottomNav";

interface PageProps {
  params: Promise<{
    guest: string;
  }>;
}

export default function GuestPersonalPage({ params }: PageProps) {
  const resolvedParams = use(params);
  // Decode URL parameter e.g. "Bapak-Haji-Ahmad" or "Bapak%20Haji%20Ahmad"
  const rawName = resolvedParams.guest || "";
  const guestName = decodeURIComponent(rawName).replace(/-/g, " ");

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

        <GallerySection galleries={invitationConfig.galleries} />

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

