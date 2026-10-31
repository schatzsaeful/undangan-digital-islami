import React from "react";

export function BismillahCalligraphy({ className = "w-64 text-gold-400" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center py-2 ${className}`}>
      {/* Clean Arabic Calligraphy Typography */}
      <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-center leading-loose tracking-wider text-current font-bold select-none px-4">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
      <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
        <span className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-transparent to-current opacity-70"></span>
        <RubElHizb className="w-3.5 h-3.5 text-current" />
        <span className="h-[1px] w-14 sm:w-20 bg-gradient-to-l from-transparent to-current opacity-70"></span>
      </div>
    </div>
  );
}

// 8-Pointed Islamic Star (Rub el Hizb) with genuine transparent center
export function RubElHizb({ className = "w-6 h-6 text-gold-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 50.0 4.0 L 62.6 19.5 L 82.5 17.5 L 80.5 37.4 L 96.0 50.0 L 80.5 62.6 L 82.5 82.5 L 62.6 80.5 L 50.0 96.0 L 37.4 80.5 L 17.5 82.5 L 19.5 62.6 L 4.0 50.0 L 19.5 37.4 L 17.5 17.5 L 37.4 19.5 Z M 50 39 A 11 11 0 1 0 50 61 A 11 11 0 1 0 50 39 Z"
      />
    </svg>
  );
}

export function SectionDivider({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center my-8 text-center px-4">
      <div className="flex items-center justify-center gap-3 w-full max-w-xs">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-400 to-gold-600" />
        <RubElHizb className="w-5 h-5 text-gold-500 animate-pulse" />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-400 to-gold-600" />
      </div>
      {title && (
        <h2 className="font-serif text-2xl md:text-3xl text-islamic-emerald font-bold tracking-wide mt-3">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-xs md:text-sm text-islamic-forest/70 font-sans tracking-widest uppercase mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function CornerFlourish({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const getTransform = () => {
    switch (position) {
      case "top-left":
        return "";
      case "top-right":
        return "-scale-x-100";
      case "bottom-left":
        return "-scale-y-100";
      case "bottom-right":
        return "-scale-100";
    }
  };

  const getPositionClass = () => {
    switch (position) {
      case "top-left":
        return "top-3 sm:top-4 left-3 sm:left-4";
      case "top-right":
        return "top-3 sm:top-4 right-3 sm:right-4";
      case "bottom-left":
        return "bottom-3 sm:bottom-4 left-3 sm:left-4";
      case "bottom-right":
        return "bottom-3 sm:bottom-4 right-3 sm:right-4";
    }
  };

  return (
    <div className={`absolute ${getPositionClass()} ${getTransform()} pointer-events-none z-10 w-10 h-10 sm:w-14 sm:h-14 opacity-75`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold-400">
        <path
          d="M5 5 H 55 C 55 5, 20 20, 20 55 V 95"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 10 H 40 C 40 10, 18 18, 18 40 V 70"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="10" cy="10" r="3" fill="currentColor" />
        <circle cx="55" cy="5" r="2.5" fill="currentColor" />
        <circle cx="5" cy="55" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}

