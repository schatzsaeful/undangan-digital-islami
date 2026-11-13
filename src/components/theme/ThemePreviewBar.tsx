"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Sparkles, Eye, Palette, ChevronUp, ChevronDown, Check, ArrowRight, BookOpen } from "lucide-react";

interface ThemePreviewBarProps {
  currentTheme: "emerald-gold" | "sage-botanical";
}

export function ThemePreviewBar({ currentTheme }: ThemePreviewBarProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const guestQuery = searchParams.get("to") ? `?to=${encodeURIComponent(searchParams.get("to")!)}` : "";

  const handleSwitchTheme = (targetTheme: "emerald-gold" | "sage-botanical") => {
    if (targetTheme === currentTheme) return;
    router.push(`/template/${targetTheme}${guestQuery}`);
  };

  return (
    <aside
      aria-label="Bilah Pilihan Tema Desain"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg transition-all duration-300"
    >
      <div className="rounded-2xl sm:rounded-full bg-slate-900/90 text-white p-2.5 sm:px-4 sm:py-2.5 shadow-2xl backdrop-blur-xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Top / Left: Active Badge & Title */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-amber-400/20 text-amber-300">
              <Palette className="w-3.5 h-3.5" />
            </span>
            <div className="text-left">
              <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">
                Preview Mode Calon Mempelai
              </p>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                {currentTheme === "emerald-gold" ? (
                  <>
                    <span>🏛️</span>
                    <span>Royal Emerald &amp; Gold</span>
                  </>
                ) : (
                  <>
                    <span>🌿</span>
                    <span>Sage Botanical Editorial</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="sm:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
            title={isMinimized ? "Buka panel switcher" : "Perkecil panel switcher"}
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Controls */}
        <div
          className={`flex items-center gap-1.5 w-full sm:w-auto justify-end ${
            isMinimized ? "hidden sm:flex" : "flex"
          }`}
        >
          {/* Switch to Emerald */}
          <button
            type="button"
            onClick={() => handleSwitchTheme("emerald-gold")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTheme === "emerald-gold"
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-white/10 hover:bg-white/20 text-slate-200"
            }`}
          >
            <span>🏛️ Emerald</span>
            {currentTheme === "emerald-gold" && <Check className="w-3 h-3" />}
          </button>

          {/* Switch to Sage Botanical */}
          <button
            type="button"
            onClick={() => handleSwitchTheme("sage-botanical")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTheme === "sage-botanical"
                ? "bg-emerald-500 text-slate-950 shadow-sm"
                : "bg-white/10 hover:bg-white/20 text-slate-200"
            }`}
          >
            <span>🌿 Sage</span>
            {currentTheme === "sage-botanical" && <Check className="w-3 h-3" />}
          </button>

          {/* Link to Showcase / Katalog */}
          <Link
            href={`/template/katalog${guestQuery}`}
            className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors flex items-center gap-1 shrink-0"
          >
            <BookOpen className="w-3 h-3" />
            <span className="hidden xs:inline">Katalog</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

