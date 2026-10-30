"use client";

import React, { useEffect, useRef } from "react";
import { Music, VolumeX, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function AudioPlayer({ src, isPlaying, onTogglePlay }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked or audio interrupted:", err);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Jeda Musik Latar" : "Putar Musik Latar"}
        className="fixed top-5 right-5 z-40 flex items-center gap-2 p-3 rounded-full bg-islamic-emerald/90 text-gold-300 hover:text-gold-100 border border-gold-400/50 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <div className={`relative flex items-center justify-center ${isPlaying ? "animate-spin-slow" : ""}`}>
          <Music className="w-4 h-4 text-gold-400 group-hover:text-gold-200" />
        </div>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-medium text-gold-200 transition-all duration-300 group-hover:max-w-xs group-hover:pr-1">
          {isPlaying ? "Musik Aktif" : "Putar Musik"}
        </span>
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-gold-400" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
        )}
      </button>
    </>
  );
}
