"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

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
    <div className="w-full max-w-xl mx-auto my-8 px-4 text-center">
      <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-gold-600 bg-gold-100/70 border border-gold-300/60 px-4 py-1.5 rounded-full">
        <Clock className="w-3.5 h-3.5" />
        <span>Menghitung Hari Menuju Hari Bahagia</span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-4">
        {units.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl glass-card border border-gold-300/40 shadow-sm transition-transform hover:-translate-y-1 duration-200"
          >
            <span className="font-serif text-2xl sm:text-4xl font-extrabold text-islamic-emerald">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[11px] sm:text-xs text-islamic-forest/70 font-medium tracking-wider uppercase mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {timeLeft.isPassed && (
        <p className="text-sm font-medium text-emerald-700 mt-2">
          Alhamdulillah, acara telah terselenggara dengan penuh berkah.
        </p>
      )}

      <div className="mt-6">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-islamic-emerald text-gold-200 hover:text-white hover:bg-islamic-deep text-xs sm:text-sm font-medium border border-gold-500/40 shadow transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Calendar className="w-4 h-4 text-gold-400" />
          <span>Simpan Tanggal ke Google Calendar</span>
        </a>
      </div>
    </div>
  );
}

