"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface CountdownProps {
  targetDate: string; // ISO format e.g. "2026-12-12T08:00:00"
  calendarUrl: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export function CountdownTimer({ targetDate, calendarUrl }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="w-full max-w-xl mx-auto my-10 px-4 text-center">
      <ScrollReveal animation="fade-up" duration={700}>
        {/* Prominent Wedding Date Banner */}
        <div className="inline-flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl glass-card border border-gold-400/50 shadow-md w-full mb-6 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-400/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-islamic-sage/20 rounded-full blur-xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 text-gold-700 text-[11px] font-bold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
            <span>Hari Bahagia Akad &amp; Walimah</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-islamic-emerald tracking-wide">
            Sabtu, 12 Desember 2026
          </h3>
          <p className="text-xs text-gold-700 font-medium mt-1">
            23 Jumadil Akhir 1448 H • 08.00 WIB s/d Selesai
          </p>
        </div>
      </ScrollReveal>

      {/* Countdown Grid with Staggered Reveal */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-4">
        {units.map((unit, index) => (
          <ScrollReveal
            key={index}
            animation="scale-up"
            delay={index * 120}
            duration={600}
          >
            <div className="relative group overflow-hidden flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl glass-card border border-gold-300/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 hover:border-gold-400">
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-gold-500/5 pointer-events-none" />
              <span className="font-serif text-2xl sm:text-4xl font-extrabold text-islamic-emerald group-hover:text-gold-700 transition-colors tabular-nums tracking-tight">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-islamic-forest/75 font-semibold tracking-wider uppercase mt-1">
                {unit.label}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {timeLeft.isPassed && (
        <p className="text-sm font-medium text-emerald-700 mt-2">
          Alhamdulillah, acara telah terselenggara dengan penuh berkah.
        </p>
      )}

      {/* Save The Date / Add to Calendar Button */}
      <ScrollReveal animation="fade-up" delay={300}>
        <div className="mt-6">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-shine text-islamic-emerald font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-gold-500/20 transition-all duration-300 hover:scale-105 active:scale-95 shimmer-btn"
          >
            <Calendar className="w-4 h-4 text-islamic-emerald" />
            <span>Simpan Tanggal ke Google Calendar</span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
