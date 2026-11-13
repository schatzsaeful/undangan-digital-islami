import React from "react";

export function BotanicalLeafBranch({ className = "w-6 h-6 text-emerald-700/60" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M50 90C50 60 52 35 70 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M52 75C40 73 35 60 48 58C55 68 53 73 52 75Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M53 62C65 58 70 45 57 43C50 53 52 60 53 62Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M55 46C43 42 40 30 52 28C58 37 56 44 55 46Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M58 33C68 28 72 16 60 15C54 23 57 31 58 33Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M70 15C67 8 74 3 79 7C79 13 74 16 70 15Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
    </svg>
  );
}

export function BotanicalCorner({
  position = "top-left",
  className = "w-24 h-24 text-emerald-800/40",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const transformMap = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  };

  const positionClass = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <div className={`absolute ${positionClass[position]} ${transformMap[position]} pointer-events-none ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M8 8C45 8 85 25 110 50"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 8C8 45 25 85 50 110"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Delicate leaves */}
        <path d="M25 10C35 4 45 10 35 22C24 22 20 15 25 10Z" fill="currentColor" fillOpacity="0.7" />
        <path d="M50 16C62 12 70 20 58 30C48 29 45 22 50 16Z" fill="currentColor" fillOpacity="0.7" />
        <path d="M78 28C90 26 96 36 84 44C75 42 73 34 78 28Z" fill="currentColor" fillOpacity="0.7" />
        <path d="M10 25C4 35 10 45 22 35C22 24 15 20 10 25Z" fill="currentColor" fillOpacity="0.7" />
        <path d="M16 50C12 62 20 70 30 58C29 48 22 45 16 50Z" fill="currentColor" fillOpacity="0.7" />
        <path d="M28 78C26 90 36 96 44 84C42 75 34 73 28 78Z" fill="currentColor" fillOpacity="0.7" />
        {/* Little berries */}
        <circle cx="38" cy="38" r="3" fill="currentColor" fillOpacity="0.8" />
        <circle cx="65" cy="50" r="2.5" fill="currentColor" fillOpacity="0.7" />
        <circle cx="50" cy="65" r="2.5" fill="currentColor" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

export function BotanicalDivider({ className = "my-4 text-emerald-800/40" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-emerald-700/30 to-emerald-700/60" />
      <div className="flex items-center gap-1 text-emerald-800/70">
        <BotanicalLeafBranch className="w-5 h-5 -rotate-45" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700/60" />
        <BotanicalLeafBranch className="w-5 h-5 rotate-45 scale-x-[-1]" />
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-emerald-700/30 to-emerald-700/60" />
    </div>
  );
}

export function BotanicalWreath({
  className = "w-32 h-32 text-emerald-800/50",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
        {/* Left arc branch */}
        <path
          d="M100 185C45 185 20 145 20 100C20 55 45 15 100 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
        {/* Right arc branch */}
        <path
          d="M100 185C155 185 180 145 180 100C180 55 155 15 100 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
        {/* Leaves along left arc */}
        <path d="M40 160C30 165 24 155 32 148C40 152 42 157 40 160Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M22 130C12 132 10 120 19 116C26 122 25 128 22 130Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M19 85C10 82 12 70 21 72C25 80 23 85 19 85Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M35 45C28 38 34 28 42 34C44 42 39 45 35 45Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M68 22C62 14 72 8 78 16C77 24 71 25 68 22Z" fill="currentColor" fillOpacity="0.8" />
        {/* Leaves along right arc */}
        <path d="M160 160C170 165 176 155 168 148C160 152 158 157 160 160Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M178 130C188 132 190 120 181 116C174 122 175 128 178 130Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M181 85C190 82 188 70 179 72C175 80 177 85 181 85Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M165 45C172 38 166 28 158 34C156 42 161 45 165 45Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M132 22C138 14 128 8 122 16C123 24 129 25 132 22Z" fill="currentColor" fillOpacity="0.8" />
        {/* Ribbon bow at bottom */}
        <circle cx="100" cy="185" r="4" fill="currentColor" />
        <circle cx="100" cy="15" r="3" fill="currentColor" />
      </svg>
      {children}
    </div>
  );
}

export function WaxSeal({
  initials = "H & A",
  className = "w-16 h-16",
}: {
  initials?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer ${className}`}
      style={{
        background: "radial-gradient(circle at 35% 35%, #C28E7E 0%, #A26B5C 60%, #7A4B3E 100%)",
        boxShadow: "0 6px 18px rgba(122, 75, 62, 0.45), inset 0 2px 3px rgba(255, 255, 255, 0.35)",
      }}
    >
      <div className="absolute inset-1 rounded-full border border-dashed border-[#F3E5E1]/40 pointer-events-none" />
      <span className="font-serif italic font-bold text-white/95 text-xs sm:text-sm tracking-wider drop-shadow-sm select-none">
        {initials}
      </span>
    </div>
  );
}

export function BismillahFloral({ className = "w-full text-emerald-800" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <span
        className="font-arabic text-2xl sm:text-3xl text-center leading-loose text-emerald-900/90 drop-shadow-xs"
        dir="rtl"
        lang="ar"
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </span>
      <p className="text-[11px] font-serif italic text-emerald-800/70 tracking-widest text-center">
        Dengan Menyebut Nama Allah Yang Maha Pengasih Lagi Maha Penyayang
      </p>
    </div>
  );
}

