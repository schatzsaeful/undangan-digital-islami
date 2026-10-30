"use client";

import React from "react";
import confetti from "canvas-confetti";
import { MailOpen, Heart, Sparkles } from "lucide-react";
import { BismillahCalligraphy, CornerFlourish, RubElHizb } from "./IslamicOrnaments";

interface CoverProps {
  guestName: string;
  groomNick: string;
  brideNick: string;
  weddingDate: string;
  isOpen: boolean;
  onOpen: () => void;
}

export function Cover({ guestName, groomNick, brideNick, weddingDate, isOpen, onOpen }: CoverProps) {
  const handleOpenInvitation = () => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C59325", "#8EB69B", "#F3E5AB", "#163832"],
      });
    } catch {
      // ignore in SSR or test
    }
    onOpen();
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-islamic-emerald bg-opacity-95 text-islamic-ivory transition-all duration-1000 ease-in-out px-4 overflow-hidden ${
        isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at center, #163832 0%, #0B2B26 100%)`,
      }}
    >
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" />
      <CornerFlourish position="bottom-left" />
      <CornerFlourish position="bottom-right" />

      {/* Decorative center frame */}
      <div className="relative max-w-lg w-full py-10 px-6 sm:px-10 text-center rounded-3xl border border-gold-400/30 glass-card-dark shadow-2xl flex flex-col items-center animate-fade-up">
        {/* Subtle decorative top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-300 text-xs tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>Walimatul &apos;Urs</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        </div>

        {/* Bismillah */}
        <BismillahCalligraphy className="w-full text-gold-400 mb-6 scale-90 sm:scale-100" />

        {/* Couple Names */}
        <div className="space-y-1 mb-6">
          <p className="text-xs uppercase tracking-widest text-gold-200/80 font-sans">
            Undangan Pernikahan
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold-gradient tracking-wide py-1">
            {groomNick} &amp; {brideNick}
          </h1>
          <p className="text-sm text-islamic-sage font-medium tracking-wide">
            {weddingDate}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 w-40 my-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold-400" />
          <RubElHizb className="w-3.5 h-3.5 text-gold-400" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Guest Recipient Box */}
        <div className="w-full max-w-sm my-6 p-4 rounded-2xl bg-islamic-deep/60 border border-gold-400/25 text-center">
          <p className="text-xs text-gold-200/70 uppercase tracking-wider mb-1 font-sans">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide capitalize">
            {guestName || "Tamu Undangan Yang Berbahagia"}
          </p>
          <p className="text-[11px] text-islamic-sage mt-1 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Open Button */}
        <button
          onClick={handleOpenInvitation}
          className="relative group overflow-hidden inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gold-gradient text-islamic-emerald font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <MailOpen className="w-4 h-4 text-islamic-emerald transition-transform group-hover:scale-110" />
          <span>Buka Undangan</span>
          <Heart className="w-3.5 h-3.5 text-islamic-emerald/70 fill-islamic-emerald/70" />
        </button>

        <p className="text-[11px] text-gold-200/50 mt-6 tracking-wide">
          Sentuh tombol untuk membuka &amp; memutar audio
        </p>
      </div>
    </div>
  );
}

