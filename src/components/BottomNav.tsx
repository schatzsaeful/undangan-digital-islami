"use client";

import React, { useState, useEffect } from "react";
import { Users, Calendar, BookOpen, Sparkles, Gift, MessageSquareHeart } from "lucide-react";

const NAV_ITEMS = [
  { id: "mempelai", label: "Mempelai", icon: Users },
  { id: "acara", label: "Acara", icon: Calendar },
  { id: "cerita", label: "Kisah", icon: BookOpen },
  { id: "nasihat", label: "Sunnah", icon: Sparkles },
  { id: "amplop", label: "Hadiah", icon: Gift },
  { id: "rsvp", label: "Ucapan", icon: MessageSquareHeart },
];

export function BottomNav() {
  const [activeSection, setActiveSection] = useState("mempelai");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw] px-2 py-1.5 rounded-full bg-islamic-emerald/90 border border-gold-400/40 shadow-2xl backdrop-blur-md flex items-center gap-1 sm:gap-2 animate-fade-in">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-2.5 sm:px-3 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-300 min-h-[40px] sm:min-h-[44px] ${
              isActive
                ? "bg-gold-500/25 text-gold-300 scale-105 border border-gold-400/40 shadow-sm"
                : "text-islamic-sage hover:text-gold-200"
            }`}
            aria-label={`Navigasi ke ${item.label}`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? "text-gold-300 scale-110" : "text-islamic-sage"}`} />
            <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
