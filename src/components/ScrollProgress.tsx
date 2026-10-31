"use client";

import React, { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
          const windowHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (windowHeight > 0) {
            const scrollPercent = (totalScroll / windowHeight) * 100;
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-gold-900/10 backdrop-blur-xs">
      <div
        className="h-full bg-gradient-to-r from-gold-600 via-gold-300 to-gold-500 shadow-[0_0_10px_rgba(213,164,56,0.7)] transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
