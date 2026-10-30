import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { BismillahCalligraphy, RubElHizb } from "./IslamicOrnaments";
import { InvitationConfig } from "@/config/invitation";

interface HeroSectionProps {
  groom: InvitationConfig["groom"];
  bride: InvitationConfig["bride"];
  mainDateFormatted: string;
}

export function HeroSection({ groom, bride, mainDateFormatted }: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-gold-100/60 text-gold-800 text-xs tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>The Wedding Of</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
        </div>

        {/* Bismillah */}
        <BismillahCalligraphy className="w-full text-gold-600 mb-6" />

        {/* Hero Arch Photo Frame */}
        <div className="relative w-56 h-72 sm:w-64 sm:h-80 my-4 rounded-t-full rounded-b-3xl overflow-hidden p-2 bg-gradient-to-b from-gold-400 via-gold-200 to-islamic-forest shadow-2xl">
          <div className="relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
              alt="Mempelai"
              fill
              priority
              sizes="(max-width: 640px) 224px, 256px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Bride & Groom Main Display */}
        <div className="mt-6 space-y-2">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-islamic-emerald tracking-wide">
            {groom.nickName} <span className="text-gold-500 font-light">&amp;</span> {bride.nickName}
          </h1>
          <p className="text-xs sm:text-sm text-gold-700 font-semibold uppercase tracking-widest mt-1">
            {mainDateFormatted}
          </p>
        </div>

        {/* Navigation Shortcut Pills */}
        <nav className="flex flex-wrap items-center justify-center gap-2 mt-8 text-xs font-semibold">
          <a
            href="#mempelai"
            className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105"
          >
            Mempelai
          </a>
          <a
            href="#acara"
            className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105"
          >
            Acara
          </a>
          <a
            href="#cerita"
            className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105"
          >
            Kisah
          </a>
          <a
            href="#galeri"
            className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105"
          >
            Galeri
          </a>
          <a
            href="#amplop"
            className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105"
          >
            Tanda Kasih
          </a>
          <a
            href="#rsvp"
            className="px-3.5 py-1.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-sm transition-all hover:scale-105"
          >
            Buku Tamu
          </a>
        </nav>
      </div>
    </section>
  );
}
