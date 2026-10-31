import React from "react";
import { ScrollReveal } from "./ScrollReveal";

export function QuickNav() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-4 mb-12 text-center">
      <ScrollReveal animation="fade-up" duration={600}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold-400 opacity-60"></span>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-700 font-semibold font-sans">
            Navigasi Pintas
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold-400 opacity-60"></span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          <a
            href="#mempelai"
            className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Mempelai
          </a>
          <a
            href="#acara"
            className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Acara
          </a>
          <a
            href="#cerita"
            className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Kisah Ta&apos;aruf
          </a>
          <a
            href="#nasihat"
            className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Mutiara Sunnah
          </a>
          <a
            href="#adab"
            className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Adab Walimah
          </a>
          <a
            href="#amplop"
            className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-gold-50 text-islamic-emerald border border-gold-300 shadow-sm transition-all hover:scale-105 active:scale-95"
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
  );
}

