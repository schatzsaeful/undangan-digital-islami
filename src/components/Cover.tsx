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
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.65 },
        colors: ["#C59325", "#8EB69B", "#F3E5AB", "#163832"],
      });
    } catch {
      // ignore
    }
    onOpen();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-islamic-emerald text-islamic-ivory transition-all duration-1000 ease-in-out px-4 overflow-hidden ${
        isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at center, #163832 0%, #0B2B26 65%, #061713 100%)`,
      }}
    >
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" />
      <CornerFlourish position="bottom-left" />
      <CornerFlourish position="bottom-right" />

      {/* Decorative center frame with double ornate border */}
      <div className="relative max-w-lg w-full py-10 px-6 sm:px-10 text-center rounded-[2.5rem] glass-card-dark ornate-border-dark shadow-2xl flex flex-col items-center animate-fade-up">
        {/* Subtle decorative top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-300 text-xs tracking-widest uppercase mb-5 shadow-sm">
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
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-gradient tracking-wide py-1">
            {groomNick} <span className="text-gold-300/80 font-light">&amp;</span> {brideNick}
          </h1>
          <p className="text-sm text-islamic-sage font-medium tracking-wide">
            {weddingDate}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 w-40 my-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold-400" />
          <RubElHizb className="w-3.5 h-3.5 text-gold-400" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Guest Recipient Box */}
        <div className="w-full max-w-sm my-6 p-4 sm:p-5 rounded-2xl bg-islamic-deep/70 border border-gold-400/30 text-center shadow-inner">
          <p className="text-[11px] text-gold-200/80 uppercase tracking-widest mb-1.5 font-sans">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide capitalize drop-shadow-sm">
            {guestName || "Tamu Undangan Yang Berbahagia"}
          </p>
          <p className="text-[11px] text-islamic-sage/80 mt-1.5 italic font-sans">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Open Button with Gold Shine & Tactile Feedback */}
        <button
          onClick={handleOpenInvitation}
          className="relative group overflow-hidden inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-shine text-islamic-emerald font-semibold text-sm sm:text-base tracking-wide shadow-xl shadow-gold-500/20 hover:shadow-gold-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="p-1 rounded-full bg-islamic-emerald/10 border border-islamic-emerald/20">
            <MailOpen className="w-4 h-4 text-islamic-emerald transition-transform group-hover:scale-110" />
          </div>
          <span>Buka Undangan</span>
          <Heart className="w-3.5 h-3.5 text-islamic-emerald fill-islamic-emerald opacity-75" />
        </button>

        <p className="text-[11px] text-gold-200/60 mt-6 tracking-wider font-sans">
          Sentuh tombol untuk membuka &amp; mendengarkan alunan musik
        </p>
      </div>
    </div>
  );
}
