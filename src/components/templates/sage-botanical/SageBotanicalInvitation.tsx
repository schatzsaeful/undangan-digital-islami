"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ExternalLink,
  Send,
  Sparkles,
  Users,
  ChevronDown,
  Gift,
  CheckCircle2,
  Share2,
  Mail,
  X,
  Shirt,
  Utensils,
  HeartHandshake,
} from "lucide-react";
import { invitationConfig } from "@/config/invitation";
import {
  BotanicalLeafBranch,
  BotanicalCorner,
  BotanicalDivider,
  BotanicalWreath,
  WaxSeal,
  BismillahFloral,
} from "./BotanicalOrnaments";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface SageBotanicalInvitationProps {
  guestName?: string;
}

export function SageBotanicalInvitation({ guestName: propGuestName }: SageBotanicalInvitationProps) {
  const [guestName, setGuestName] = useState(propGuestName || "");
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Gallery Lightbox state
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; caption: string } | null>(null);

  // Copy feedback states
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(propGuestName || "");
  const [rsvpStatus, setRsvpStatus] = useState<"hadir" | "ragu" | "tidak_hadir">("hadir");
  const [rsvpPax, setRsvpPax] = useState(2);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
  const [wishesList, setWishesList] = useState([
    {
      id: "1",
      name: "Keluarga Besar Bpk. Darmawan",
      status: "hadir",
      pax: 2,
      message: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Heri & Asri!",
      time: "1 jam lalu",
    },
    {
      id: "2",
      name: "dr. Rian & Sahabat Kampus",
      status: "hadir",
      pax: 2,
      message: "Masya Allah tabarakallah, ikut berbahagia untuk kalian berdua! Semoga sakinah, mawaddah, warahmah selamanya.",
      time: "2 jam lalu",
    },
    {
      id: "3",
      name: "Siti Rahmawati",
      status: "hadir",
      pax: 1,
      message: "Selamat Asri cantik! Lancar sampai hari-H, doa terbaik menyertai langkah suci kalian berdua.",
      time: "5 jam lalu",
    },
  ]);

  // Audio setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(invitationConfig.audio.src);
      audio.loop = true;
      setAudioElement(audio);
      return () => {
        audio.pause();
      };
    }
  }, []);

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Countdown timer calculation
  useEffect(() => {
    const target = new Date(invitationConfig.mainDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioElement) {
      audioElement
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => setIsPlayingAudio(false));
    }
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#7D9D8B", "#B57E70", "#E8C9C1", "#FAF7F2", "#4A6354"],
      });
    } catch {
      // ignore
    }
  };

  const handleToggleAudio = () => {
    if (!audioElement) return;
    if (isPlayingAudio) {
      audioElement.pause();
      setIsPlayingAudio(false);
    } else {
      audioElement
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => setIsPlayingAudio(false));
    }
  };

  const copyToClipboard = (text: string, type: "account" | "address", id?: string) => {
    navigator.clipboard.writeText(text);
    if (type === "account" && id) {
      setCopiedAccount(id);
      setTimeout(() => setCopiedAccount(null), 2500);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    const newWish = {
      id: Date.now().toString(),
      name: rsvpName.trim(),
      status: rsvpStatus,
      pax: rsvpPax,
      message: rsvpMessage.trim(),
      time: "Baru saja",
    };

    setWishesList([newWish, ...wishesList]);
    setIsRsvpSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
        colors: ["#7D9D8B", "#C28E7E", "#F3EDE4"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#253B30] font-sans selection:bg-[#7D9D8B]/20 selection:text-[#253B30]">
      {/* Background subtle leaf texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `radial-gradient(#7D9D8B 0.65px, transparent 0.65px), radial-gradient(#C28E7E 0.5px, #FAF7F2 0.5px)`,
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
        }}
      />

      {/* Reading Progress Line */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#7D9D8B] via-[#B57E70] to-[#4A6354] z-50 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      {/* Floating Audio Controller */}
      {isOpen && (
        <button
          onClick={handleToggleAudio}
          className="fixed bottom-6 right-5 z-40 flex items-center gap-2 p-3 rounded-full bg-white/90 backdrop-blur-md border border-[#7D9D8B]/40 shadow-lg text-[#253B30] hover:scale-105 active:scale-95 transition-all group"
          title={isPlayingAudio ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlayingAudio ? (
            <Volume2 className="w-4 h-4 text-[#4A6354] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#B57E70]" />
          )}
          <span className="text-[11px] font-medium pr-1 hidden sm:inline text-[#4A6354]">
            {isPlayingAudio ? "Musik Aktif" : "Musik Mati"}
          </span>
        </button>
      )}

      {/* 1. COVER / AMPLOP ELEGAN DENGAN WAX SEAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F3EFE6] px-4 py-8 overflow-y-auto transition-all duration-1000 ease-in-out ${
          isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
        style={{
          backgroundImage: "radial-gradient(circle at center, #FBF9F5 0%, #F1ECE2 70%, #E6DECة 100%)",
        }}
      >
        <div className="relative max-w-md w-full my-auto p-7 sm:p-9 text-center rounded-[2.5rem] bg-white/95 border border-[#7D9D8B]/30 shadow-2xl shadow-[#4A6354]/10 backdrop-blur-md flex flex-col items-center">
          <BotanicalCorner position="top-left" className="w-20 h-20 text-[#7D9D8B]/40" />
          <BotanicalCorner position="top-right" className="w-20 h-20 text-[#7D9D8B]/40" />
          <BotanicalCorner position="bottom-left" className="w-20 h-20 text-[#7D9D8B]/40" />
          <BotanicalCorner position="bottom-right" className="w-20 h-20 text-[#7D9D8B]/40" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7D9D8B]/30 bg-[#E8EFE9]/60 text-[#4A6354] text-[11px] font-medium tracking-widest uppercase mb-4">
            <BotanicalLeafBranch className="w-3.5 h-3.5 text-[#4A6354]" />
            <span>Walimatul &apos;Urs</span>
            <BotanicalLeafBranch className="w-3.5 h-3.5 text-[#4A6354] scale-x-[-1]" />
          </div>

          <BismillahFloral className="scale-90 mb-3" />

          {/* Couple Monogram Wreath */}
          <BotanicalWreath className="w-28 h-28 my-1 text-[#7D9D8B]/50">
            <span className="font-serif italic text-2xl font-bold text-[#4A6354]">
              {invitationConfig.groom.nickName[0]} &amp; {invitationConfig.bride.nickName[0]}
            </span>
          </BotanicalWreath>

          <div className="space-y-1 mb-5">
            <p className="text-xs uppercase tracking-widest text-[#7D9D8B] font-medium">The Wedding of</p>
            <h1 className="font-serif italic text-3xl sm:text-4xl font-extrabold text-[#253B30] tracking-tight">
              {invitationConfig.groom.nickName} &amp; {invitationConfig.bride.nickName}
            </h1>
            <p className="text-xs text-[#5C6D64] font-medium tracking-wide">
              {invitationConfig.events.akad.date}
            </p>
          </div>

          <BotanicalDivider className="my-2" />

          {/* Tamu Undangan */}
          <div className="w-full max-w-xs my-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#7D9D8B]/25 text-center">
            <p className="text-[10.5px] uppercase tracking-widest text-[#5C6D64] mb-1 font-medium">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="font-serif font-bold text-lg sm:text-xl text-[#253B30] capitalize">
              {guestName || "Tamu Undangan"}
            </p>
            <p className="text-[10px] text-[#7D9D8B] italic mt-1">
              *Di Tempat
            </p>
          </div>

          {/* Open Invitation Wax Seal Button */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <button
              onClick={handleOpenInvitation}
              className="group flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <WaxSeal
                initials={`${invitationConfig.groom.nickName[0]}&${invitationConfig.bride.nickName[0]}`}
                className="w-14 h-14"
              />
              <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#4A6354] hover:bg-[#394E42] text-[#FAF7F2] text-xs font-semibold tracking-wider shadow-md transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>Buka Undangan</span>
              </span>
            </button>
            <p className="text-[10px] text-[#5C6D64] tracking-wide mt-1">
              Ketuk untuk membuka &amp; mendengarkan lantunan
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN INVITATION CONTENT */}
      <main className="relative z-10 max-w-xl mx-auto px-4 pb-24 space-y-16 sm:space-y-20 pt-8">
        {/* HERO SECTION */}
        <section className="text-center pt-8 sm:pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7D9D8B]/30 bg-white/80 text-[#4A6354] text-[11px] font-medium tracking-widest uppercase mb-6 shadow-xs">
            <BotanicalLeafBranch className="w-3.5 h-3.5 text-[#4A6354]" />
            <span>Pernikahan Suci &amp; Penuh Berkah</span>
            <BotanicalLeafBranch className="w-3.5 h-3.5 text-[#4A6354] scale-x-[-1]" />
          </div>

          <BismillahFloral className="mb-6" />

          {/* Couple Arch Portrait with Botanical Border */}
          <div className="relative w-64 sm:w-72 h-80 sm:h-88 mx-auto my-6 rounded-t-full rounded-b-3xl overflow-hidden p-2.5 bg-gradient-to-b from-[#7D9D8B]/40 via-[#FAF7F2] to-[#B57E70]/30 shadow-xl border border-white">
            <div className="relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden border border-white/80 shadow-inner">
              <Image
                src="/images/couple.jpg"
                alt="Heri & Asri"
                fill
                priority
                sizes="(max-width: 640px) 256px, 288px"
                className="object-cover object-[50%_10%] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <p className="text-xs uppercase tracking-widest text-[#7D9D8B] font-semibold">
              Walimatul &apos;Urs
            </p>
            <h1 className="font-serif italic text-4xl sm:text-5xl font-extrabold text-[#253B30] tracking-tight">
              {invitationConfig.groom.nickName} <span className="font-light text-[#B57E70]">&amp;</span> {invitationConfig.bride.nickName}
            </h1>
            <p className="text-xs sm:text-sm font-medium tracking-wider text-[#5C6D64] uppercase mt-2">
              {invitationConfig.events.akad.date}
            </p>
          </div>
        </section>

        {/* COUNTDOWN TIMER */}
        <section className="text-center p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#7D9D8B]/25 shadow-sm backdrop-blur-xs">
          <p className="text-[11px] uppercase tracking-widest text-[#7D9D8B] font-bold mb-4">
            Hitung Mundur Hari Bahagia
          </p>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm mx-auto mb-6">
            {[
              { val: timeLeft.days, label: "Hari" },
              { val: timeLeft.hours, label: "Jam" },
              { val: timeLeft.minutes, label: "Menit" },
              { val: timeLeft.seconds, label: "Detik" },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#7D9D8B]/25 text-center">
                <span className="block font-serif font-bold text-2xl sm:text-3xl text-[#253B30]">
                  {String(item.val).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#5C6D64] font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href={invitationConfig.events.akad.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A6354] hover:bg-[#394E42] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Simpan di Google Calendar</span>
          </a>
        </section>

        {/* COUPLE PROFILES */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <BotanicalLeafBranch className="w-6 h-6 mx-auto text-[#7D9D8B]" />
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#253B30]">
              Kedua Mempelai
            </h2>
            <p className="text-xs text-[#5C6D64] max-w-md mx-auto leading-relaxed">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon ridho Allah SWT, kami mengundang Anda untuk menyaksikan ikatan suci kami:
            </p>
          </div>

          {/* Groom Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/90 border border-[#7D9D8B]/25 shadow-sm text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto rounded-full p-1 border-2 border-dashed border-[#7D9D8B]/50 shadow-inner">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={invitationConfig.groom.photo}
                  alt={invitationConfig.groom.fullName}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#253B30]">
                {invitationConfig.groom.fullName}
              </h3>
              <p className="text-xs text-[#7D9D8B] font-serif italic mt-0.5">
                ({invitationConfig.groom.nickName})
              </p>
              <p className="text-xs text-[#5C6D64] mt-2 leading-relaxed">
                {invitationConfig.groom.orderInFamily}{" "}
                <span className="font-semibold text-[#253B30]">
                  Bpk. {invitationConfig.groom.fatherName} &amp; Ibu {invitationConfig.groom.motherName}
                </span>
              </p>
              {invitationConfig.groom.instagram && (
                <a
                  href={invitationConfig.groom.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#4A6354] hover:text-[#253B30] font-medium mt-3"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

          {/* Heart Divider */}
          <div className="flex items-center justify-center gap-3 text-[#B57E70]">
            <div className="h-[1px] w-16 bg-[#B57E70]/30" />
            <Heart className="w-4 h-4 fill-[#B57E70]/80" />
            <div className="h-[1px] w-16 bg-[#B57E70]/30" />
          </div>

          {/* Bride Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/90 border border-[#7D9D8B]/25 shadow-sm text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto rounded-full p-1 border-2 border-dashed border-[#B57E70]/50 shadow-inner">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={invitationConfig.bride.photo}
                  alt={invitationConfig.bride.fullName}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#253B30]">
                {invitationConfig.bride.fullName}
              </h3>
              <p className="text-xs text-[#B57E70] font-serif italic mt-0.5">
                ({invitationConfig.bride.nickName})
              </p>
              <p className="text-xs text-[#5C6D64] mt-2 leading-relaxed">
                {invitationConfig.bride.orderInFamily}{" "}
                <span className="font-semibold text-[#253B30]">
                  Bpk. {invitationConfig.bride.fatherName} &amp; Ibu {invitationConfig.bride.motherName}
                </span>
              </p>
              {invitationConfig.bride.instagram && (
                <a
                  href={invitationConfig.bride.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#4A6354] hover:text-[#253B30] font-medium mt-3"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

          {/* Quran Verse Ar-Rum 21 Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF7F2] border border-[#7D9D8B]/25 text-center space-y-3">
            <p className="font-arabic text-xl sm:text-2xl leading-loose text-[#253B30]" dir="rtl" lang="ar">
              {invitationConfig.quranVerse.arabic}
            </p>
            <p className="text-xs text-[#5C6D64] italic leading-relaxed font-serif">
              {invitationConfig.quranVerse.translation}
            </p>
            <p className="text-[11px] font-bold text-[#4A6354] tracking-wider uppercase">
              {invitationConfig.quranVerse.surah}
            </p>
          </div>
        </section>

        {/* EVENTS SECTION (AKAD & RESEPSI) */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <BotanicalLeafBranch className="w-6 h-6 mx-auto text-[#7D9D8B]" />
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#253B30]">
              Rangkaian Acara
            </h2>
            <p className="text-xs text-[#5C6D64]">
              Insya Allah acara pernikahan kami akan diselenggarakan pada:
            </p>
          </div>

          <div className="grid gap-6">
            {/* Akad Nikah */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-[#7D9D8B]/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#7D9D8B]/20 pb-3">
                <span className="font-serif italic font-bold text-xl text-[#253B30]">
                  {invitationConfig.events.akad.title}
                </span>
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#4A6354] bg-[#E8EFE9] px-3 py-1 rounded-full">
                  Khidmat
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-[#5C6D64]">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#4A6354] shrink-0" />
                  <span className="font-medium text-[#253B30]">{invitationConfig.events.akad.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#4A6354] shrink-0" />
                  <span>{invitationConfig.events.akad.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#4A6354] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#253B30]">{invitationConfig.events.akad.locationName}</p>
                    <p className="text-[#5C6D64] mt-0.5">{invitationConfig.events.akad.address}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={invitationConfig.events.akad.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4A6354] hover:bg-[#394E42] text-white text-xs font-medium shadow-xs transition-all active:scale-95"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>

            {/* Resepsi */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-[#B57E70]/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#B57E70]/20 pb-3">
                <span className="font-serif italic font-bold text-xl text-[#253B30]">
                  {invitationConfig.events.resepsi.title}
                </span>
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#B57E70] bg-[#FAF2EF] px-3 py-1 rounded-full">
                  Ramah Tamah
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-[#5C6D64]">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#B57E70] shrink-0" />
                  <span className="font-medium text-[#253B30]">{invitationConfig.events.resepsi.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#B57E70] shrink-0" />
                  <span>{invitationConfig.events.resepsi.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B57E70] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#253B30]">{invitationConfig.events.resepsi.locationName}</p>
                    <p className="text-[#5C6D64] mt-0.5">{invitationConfig.events.resepsi.address}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={invitationConfig.events.resepsi.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B57E70] hover:bg-[#9E6759] text-white text-xs font-medium shadow-xs transition-all active:scale-95"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* LOVE STORY / TIMELINE */}
        {invitationConfig.stories.length > 0 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <BotanicalLeafBranch className="w-6 h-6 mx-auto text-[#7D9D8B]" />
              <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#253B30]">
                Kisah Kasih Kami
              </h2>
              <p className="text-xs text-[#5C6D64]">
                Perjalanan menuju ikatan suci dalam naungan ridho-Nya:
              </p>
            </div>

            <div className="relative border-l-2 border-[#7D9D8B]/30 ml-4 sm:ml-6 pl-6 space-y-8 my-4">
              {invitationConfig.stories.map((story, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#FAF7F2] border-2 border-[#4A6354] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A6354]" />
                  </div>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#E8EFE9] text-[#4A6354] text-[10px] font-bold tracking-widest uppercase mb-1">
                    {story.year}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#253B30] mt-1">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#5C6D64] leading-relaxed mt-1">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PHOTO GALLERY */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <BotanicalLeafBranch className="w-6 h-6 mx-auto text-[#7D9D8B]" />
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#253B30]">
              Galeri Kenangan
            </h2>
            <p className="text-xs text-[#5C6D64]">
              Potret kebersamaan dan doa dalam menyambut hari bahagia:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {invitationConfig.galleries.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPhoto(img)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#7D9D8B]/20 shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-[#253B30]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 text-left text-white text-[11px] font-medium">
                  <span className="truncate">{img.caption}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in"
              onClick={() => setSelectedPhoto(null)}
            >
              <div
                className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden p-3 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden">
                  <Image
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="p-3 text-center text-xs font-medium text-[#253B30]">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* WEDDING GIFT / AMPLOP DIGITAL */}
        <section className="space-y-6 text-center">
          <div className="space-y-2">
            <BotanicalLeafBranch className="w-6 h-6 mx-auto text-[#7D9D8B]" />
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#253B30]">
              Tanda Kasih
            </h2>
            <p className="text-xs text-[#5C6D64] max-w-md mx-auto leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila berkenan memberikan tanda kasih, Anda dapat menyampaikannya melalui:
            </p>
          </div>

          <div className="space-y-4">
            {invitationConfig.bankAccounts.map((bank, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-[#7D9D8B]/25 shadow-xs text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A6354] bg-[#E8EFE9] px-2.5 py-0.5 rounded-full">
                    {bank.bankName}
                  </span>
                  <p className="font-mono font-bold text-lg text-[#253B30] mt-1.5 tracking-wider">
                    {bank.accountNumber}
                  </p>
                  <p className="text-xs text-[#5C6D64]">a.n. {bank.accountHolder}</p>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(bank.accountNumber, "account", bank.accountNumber)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#E8EFE9] border border-[#7D9D8B]/30 text-xs font-semibold text-[#4A6354] transition active:scale-95"
                >
                  {copiedAccount === bank.accountNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin No. Rekening</span>
                    </>
                  )}
                </button>
              </div>
            ))}

            {/* Kado Fisik */}
            {invitationConfig.physicalGiftAddress && (
              <div className="p-5 rounded-3xl bg-white border border-[#B57E70]/30 shadow-xs text-left space-y-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#B57E70]" />
                  <span className="font-serif font-bold text-sm text-[#253B30]">
                    Kirim Kado Fisik
                  </span>
                </div>
                <p className="text-xs text-[#5C6D64] leading-relaxed">
                  <strong className="text-[#253B30]">{invitationConfig.physicalGiftAddress.recipient}</strong> ({invitationConfig.physicalGiftAddress.phone})
                  <br />
                  {invitationConfig.physicalGiftAddress.address}
                </p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(invitationConfig.physicalGiftAddress.address, "address")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF2EF] hover:bg-[#F3E5E1] border border-[#B57E70]/30 text-xs font-semibold text-[#B57E70] transition active:scale-95"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Alamat Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Alamat Kirim Kado</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ADAB WALIMAH */}
        {invitationConfig.adabWalimah.length > 0 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <BotanicalLeafBranch className="w-6 h-6 mx-auto text-[#7D9D8B]" />
              <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#253B30]">
                Adab Menghadiri Walimah
              </h2>
              <p className="text-xs text-[#5C6D64]">
                Menjaga ukhuwah dan keberkahan sesuai sunnah Rasulullah SAW:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {invitationConfig.adabWalimah.map((adab, idx) => {
                const IconComponent =
                  adab.icon === "Shirt"
                    ? Shirt
                    : adab.icon === "Utensils"
                    ? Utensils
                    : adab.icon === "HeartHandshake"
                    ? HeartHandshake
                    : Users;

                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white/80 border border-[#7D9D8B]/25 flex items-start gap-3 text-left">
                    <div className="p-2 rounded-xl bg-[#E8EFE9] text-[#4A6354] shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#253B30]">
                        {adab.title}
                      </h4>
                      <p className="text-[11px] text-[#5C6D64] leading-relaxed mt-0.5">
                        {adab.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* RSVP & BUKU TAMU */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <BotanicalLeafBranch className="w-6 h-6 mx-auto text-[#7D9D8B]" />
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#253B30]">
              Konfirmasi Kehadiran (RSVP)
            </h2>
            <p className="text-xs text-[#5C6D64]">
              Mohon konfirmasikan kehadiran serta titipkan doa terbaik Anda:
            </p>
          </div>

          <form
            onSubmit={handleRsvpSubmit}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-[#7D9D8B]/30 shadow-sm space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#253B30] mb-1.5">
                Nama Lengkap Anda
              </label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Contoh: Bpk. Ahmad & Keluarga"
                className="w-full px-4 py-2.5 rounded-xl border border-[#7D9D8B]/30 bg-[#FAF7F2] text-xs text-[#253B30] focus:outline-none focus:ring-2 focus:ring-[#4A6354]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#253B30] mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "hadir", label: "Insya Allah Hadir" },
                  { id: "ragu", label: "Masih Ragu" },
                  { id: "tidak_hadir", label: "Berhalangan" },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setRsvpStatus(st.id as any)}
                    className={`p-2.5 rounded-xl text-[11px] font-semibold border transition text-center ${
                      rsvpStatus === st.id
                        ? "bg-[#4A6354] text-white border-[#4A6354] shadow-xs"
                        : "bg-[#FAF7F2] text-[#5C6D64] border-[#7D9D8B]/20 hover:border-[#7D9D8B]/50"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {rsvpStatus !== "tidak_hadir" && (
              <div>
                <label className="block text-xs font-semibold text-[#253B30] mb-1.5">
                  Jumlah Tamu Hadir
                </label>
                <select
                  value={rsvpPax}
                  onChange={(e) => setRsvpPax(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#7D9D8B]/30 bg-[#FAF7F2] text-xs text-[#253B30] focus:outline-none focus:ring-2 focus:ring-[#4A6354]"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                  <option value={5}>5+ Orang (Keluarga)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#253B30] mb-1.5">
                Ucapan Doa &amp; Harapan
              </label>
              <textarea
                required
                rows={3}
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Tuliskan doa restu untuk Heri & Asri..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#7D9D8B]/30 bg-[#FAF7F2] text-xs text-[#253B30] focus:outline-none focus:ring-2 focus:ring-[#4A6354]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#4A6354] hover:bg-[#394E42] text-white font-semibold text-xs tracking-wider shadow-md transition active:scale-98 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Konfirmasi &amp; Doa</span>
            </button>

            {isRsvpSubmitted && (
              <div className="p-3 rounded-xl bg-[#E8EFE9] text-[#253B30] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A6354] shrink-0" />
                <span>Terima kasih! Konfirmasi kehadiran &amp; doa Anda telah terkirim.</span>
              </div>
            )}
          </form>

          {/* List of wishes */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#253B30] uppercase tracking-wider text-center">
              Ucapan Doa ({wishesList.length})
            </p>
            <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
              {wishesList.map((wish) => (
                <div key={wish.id} className="p-4 rounded-2xl bg-white border border-[#7D9D8B]/20 text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-[#253B30]">
                      {wish.name}
                    </span>
                    <span
                      className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full ${
                        wish.status === "hadir"
                          ? "bg-emerald-100 text-emerald-800"
                          : wish.status === "ragu"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {wish.status === "hadir" ? "Hadir" : wish.status === "ragu" ? "Ragu" : "Berhalangan"}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C6D64] leading-relaxed italic">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                  <p className="text-[10px] text-[#7D9D8B]">{wish.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING SECTION */}
        <section className="text-center pt-8 border-t border-[#7D9D8B]/25 space-y-4">
          <BismillahFloral />
          <p className="text-xs text-[#5C6D64] max-w-md mx-auto leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami.
          </p>
          <p className="text-xs font-serif italic text-[#4A6354]">
            Jazakumullah Khairan Katsiran
          </p>
          <div className="pt-2">
            <p className="text-[11px] uppercase tracking-widest text-[#7D9D8B] font-medium">Kami yang berbahagia,</p>
            <p className="font-serif italic text-2xl font-extrabold text-[#253B30] mt-1">
              {invitationConfig.groom.nickName} &amp; {invitationConfig.bride.nickName}
            </p>
            <p className="text-xs text-[#5C6D64] mt-0.5">
              Beserta Keluarga Besar Bpk. {invitationConfig.groom.fatherName} &amp; Bpk. {invitationConfig.bride.fatherName}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

