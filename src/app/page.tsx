"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { invitationConfig } from "@/config/invitation";
import { Cover } from "@/components/Cover";
import { AudioPlayer } from "@/components/AudioPlayer";
import { HeroSection } from "@/components/HeroSection";
import { CountdownTimer } from "@/components/CountdownTimer";
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

function InvitationContent() {
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

        {/* Mutiara Sunnah & Hadits Pernikahan (Pengganti Galeri untuk Konsep Syar'i) */}
        <QuotesSection />

        {/* Islamic Etiquette (Adab Walimah) */}
        <AdabWalimahSection items={invitationConfig.adabWalimah} />

        {/* Digital Envelope & Gifts */}
        <GiftSection
          bankAccounts={invitationConfig.bankAccounts}
          physicalGiftAddress={invitationConfig.physicalGiftAddress}
        />

        {/* RSVP & Digital Guestbook */}
        <RsvpGuestbook initialGuestName={guestName} />

        {/* Closing & Family Blessings */}
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

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-islamic-emerald text-gold-400 font-serif">
          <div className="text-center">
            <p className="font-arabic text-3xl mb-3">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="text-sm tracking-widest text-gold-200">Memuat Undangan...</p>
          </div>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}

