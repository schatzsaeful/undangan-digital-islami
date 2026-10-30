"use client";

import React, { useState, useEffect, useRef } from "react";
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
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-3.5 rounded-full bg-islamic-emerald/90 text-gold-400 hover:text-gold-200 border border-gold-400/50 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        <div className={`relative flex items-center justify-center ${isPlaying ? "animate-spin-slow" : ""}`}>
          <Music className="w-5 h-5 text-gold-400 group-hover:text-gold-300" />
        </div>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-gold-200 transition-all duration-300 group-hover:max-w-xs group-hover:px-1">
          {isPlaying ? "Musik Aktif" : "Putar Musik"}
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-gold-400" />
        ) : (
          <VolumeX className="w-4 h-4 text-red-400" />
        )}
      </button>
    </>
  );
}

