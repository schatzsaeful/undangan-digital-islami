import React from "react";

export function BismillahCalligraphy({ className = "w-64 text-gold-400" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Clean Arabic Calligraphy Typography */}
      <p className="font-arabic text-3xl md:text-4xl text-center leading-relaxed tracking-wider text-gold-600 font-bold select-none py-1">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
      <div className="flex items-center gap-2 mt-2">
        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400"></span>
        <RubElHizb className="w-3.5 h-3.5 text-gold-500" />
        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400"></span>
      </div>
    </div>
  );
}

// 8-Pointed Islamic Star (Rub el Hizb)
export function RubElHizb({ className = "w-6 h-6 text-gold-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="50" height="50" rx="3" transform="rotate(0 50 50)" />
      <rect x="25" y="25" width="50" height="50" rx="3" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="10" fill="#fdfbf7" />
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
        return "scale-x-[-1]";
      case "bottom-left":
        return "scale-y-[-1]";
      case "bottom-right":
        return "scale-[-1]";
    }
  };

  const getPositionClass = () => {
    switch (position) {
      case "top-left":
        return "top-3 left-3";
      case "top-right":
        return "top-3 right-3";
      case "bottom-left":
        return "bottom-3 left-3";
      case "bottom-right":
        return "bottom-3 right-3";
    }
  };

  return (
    <div className={`absolute ${getPositionClass()} ${getTransform()} pointer-events-none z-10 w-12 h-12 md:w-16 md:h-16 opacity-75`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold-500">
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

