"use client";

import React, { useState } from "react";
import { Gift, Copy, Check, MapPin, ChevronDown, ChevronUp, Wifi } from "lucide-react";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";
import { ScrollReveal } from "./ScrollReveal";
import { BankAccount } from "@/config/invitation";

function EmvChipSvg() {
  return (
    <div className="relative w-11 h-8 rounded-[6px] overflow-hidden bg-gradient-to-br from-[#f6e6b4] via-[#d5a438] to-[#996e14] p-[1.5px] shadow-[0_2px_6px_rgba(0,0,0,0.35)] border border-[#f6e6b4]/60 shrink-0">
      <svg
        viewBox="0 0 44 32"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="44" height="32" rx="4" fill="url(#chipGrad)" />
        <path
          d="M0 16 H14 M30 16 H44 M14 7 H30 M14 25 H30 M14 7 V25 M30 7 V25 M22 7 V25"
          stroke="#684700"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        <circle cx="22" cy="16" r="3.5" fill="#D5A438" stroke="#684700" strokeWidth="1" />
        <defs>
          <linearGradient id="chipGrad" x1="0" y1="0" x2="44" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDF2D0" />
            <stop offset="0.35" stopColor="#E6C27A" />
            <stop offset="0.7" stopColor="#C59325" />
            <stop offset="1" stopColor="#8C630D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  physicalGiftAddress: {
    recipient: string;
    phone: string;
    address: string;
  };
}

export function GiftSection({ bankAccounts, physicalGiftAddress }: GiftSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto text-center" id="amplop">
      <ScrollReveal animation="fade-up">
        <SectionDivider
          title="Tanda Kasih (Amplop Digital)"
          subtitle="Ungkapan syukur dan doa restu terindah untuk kedua mempelai"
        />

        <div className="p-6 sm:p-10 rounded-3xl glass-card ornate-border shadow-md">
          <p className="text-xs sm:text-sm text-islamic-forest/90 leading-relaxed font-sans max-w-xl mx-auto">
            Kehadiran serta doa restu Bapak/Ibu/Saudara/i sekalian merupakan karunia dan hadiah yang paling bermakna bagi kami.
            Namun jika berkenan memberikan tanda kasih sebagai ungkapan doa restu,
            dapat disalurkan melalui rekening di bawah ini:
          </p>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mt-6 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-shine text-islamic-emerald text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all duration-300 hover:scale-105 active:scale-95 shimmer-btn"
          >
            <Gift className="w-4 h-4 text-islamic-emerald" />
            <span>{isOpen ? "Tutup Amplop Digital" : "Kirim Hadiah / Tanda Kasih"}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isOpen && (
            <div className="mt-8 space-y-6 animate-fade-up">
              {/* ATM Styled Bank Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                {bankAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl atm-card-surface text-white relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    {/* Glossy Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                    {/* Subtle Background Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Top Row: Chip & Contactless / Bank Logo */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2.5">
                        <EmvChipSvg />
                        <Wifi className="w-4 h-4 text-gold-300 rotate-90 opacity-70" />
                      </div>
                      <span className="font-serif font-bold text-xs tracking-wider text-gold-300 border border-gold-400/40 bg-gold-500/15 px-2.5 py-1 rounded-md">
                        {account.bankName}
                      </span>
                    </div>

                    {/* Account Number in Embossed Monospace Style */}
                    <p className="text-[11px] text-gold-200/60 uppercase tracking-widest font-sans">
                      Nomor Rekening
                    </p>
                    <p className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-gold-100 my-2 drop-shadow">
                      {account.accountNumber}
                    </p>

                    {/* Account Holder */}
                    <div className="mt-3 mb-4">
                      <p className="text-[10px] text-gold-200/60 uppercase tracking-widest font-sans">
                        Atas Nama
                      </p>
                      <p className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase font-sans">
                        {account.accountHolder}
                      </p>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(account.accountNumber, index)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-200 border border-gold-400/40 text-xs font-semibold transition-all active:scale-95"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Nomor Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gold-300" />
                          <span>Salin No. Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Physical Gift Box */}
              <div className="p-6 rounded-2xl bg-white border border-gold-300/60 text-left shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-islamic-emerald font-serif font-bold text-base">
                  <MapPin className="w-4 h-4 text-gold-600" />
                  <span>Kirim Kado Fisik</span>
                </div>
                <p className="text-xs text-islamic-forest/80 font-sans mb-1">
                  Penerima: <span className="font-semibold text-islamic-emerald">{physicalGiftAddress.recipient}</span> ({physicalGiftAddress.phone})
                </p>
                <p className="text-xs text-islamic-forest/80 leading-relaxed font-sans mb-3">
                  {physicalGiftAddress.address}
                </p>
                <button
                  onClick={() => handleCopyAddress(`${physicalGiftAddress.recipient} - ${physicalGiftAddress.phone} - ${physicalGiftAddress.address}`)}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-islamic-emerald/5 hover:bg-islamic-emerald/15 text-islamic-emerald border border-gold-300 text-xs font-semibold transition-colors active:scale-95"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Alamat Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gold-600" />
                      <span>Salin Alamat Lengkap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
