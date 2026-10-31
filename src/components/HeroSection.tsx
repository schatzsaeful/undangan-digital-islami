import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { BismillahCalligraphy } from "./IslamicOrnaments";
import { ScrollReveal } from "./ScrollReveal";
import { InvitationConfig } from "@/config/invitation";

interface HeroSectionProps {
  groom: InvitationConfig["groom"];
  bride: InvitationConfig["bride"];
  mainDateFormatted: string;
}

export function HeroSection({ groom, bride, mainDateFormatted }: HeroSectionProps) {
  return (
    <section className="relative pt-16 pb-20 px-4 text-center overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Subtle royal badge with comfortable margins */}
        <ScrollReveal animation="fade-down" duration={600} className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-400/50 bg-gold-100/80 text-gold-800 text-xs tracking-widest uppercase shadow-sm animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Walimatul &apos;Urs Syar&apos;i</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          </div>
        </ScrollReveal>

        {/* Bismillah Calligraphy with dedicated vertical breathing room */}
        <ScrollReveal animation="fade-up" delay={100} duration={700} className="w-full my-6 sm:my-8">
          <BismillahCalligraphy className="w-full text-gold-600" />
        </ScrollReveal>

        {/* Hero Arch Frame with Syar'i Couple Illustration */}
        <ScrollReveal animation="scale-up" delay={200} duration={800} className="my-6 sm:my-8">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-t-full rounded-b-3xl overflow-hidden p-2 bg-gradient-to-b from-gold-400 via-gold-200 to-islamic-forest shadow-2xl animate-float">
            <div className="relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden border-2 border-white/95">
              <Image
                src="/images/couple.jpg"
                alt={`${groom.nickName} & ${bride.nickName}`}
                fill
                priority
                sizes="(max-width: 640px) 256px, 288px"
                className="object-cover object-[50%_15%] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Bride & Groom Main Display */}
        <ScrollReveal animation="fade-up" delay={300} duration={700} className="mt-4 sm:mt-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-gold-600 font-sans font-semibold">
              Pernikahan Suci
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-islamic-emerald tracking-wide">
              {groom.nickName} <span className="text-gold-500 font-light">&amp;</span> {bride.nickName}
            </h1>
            <p className="text-xs sm:text-sm text-gold-700 font-semibold uppercase tracking-widest mt-1">
              {mainDateFormatted}
            </p>
          </div>
        </ScrollReveal>

        {/* Navigation Shortcut Pills */}
        <ScrollReveal animation="fade-up" delay={400} duration={700}>
          <nav className="flex flex-wrap items-center justify-center gap-2 mt-8 text-xs font-semibold">
          <a
            href="#mempelai"
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Mempelai
          </a>
          <a
            href="#acara"
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Acara
          </a>
          <a
            href="#cerita"
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Kisah Ta&apos;aruf
          </a>
          <a
            href="#nasihat"
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Mutiara Sunnah
          </a>
          <a
            href="#adab"
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Adab Walimah
          </a>
          <a
            href="#amplop"
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Tanda Kasih
          </a>
          <a
            href="#rsvp"
            className="px-3.5 py-1.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-shine text-islamic-emerald font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Buku Tamu
          </a>
        </nav>
        </ScrollReveal>
      </div>
    </section>
  );
}
