"use client";

import React, { useState } from "react";
import { Gift, Copy, Check, MapPin, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";
import { BankAccount } from "@/config/invitation";

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
      <SectionDivider
        title="Tanda Kasih (Amplop Digital)"
        subtitle="Doa restu Anda merupakan karunia terindah bagi kami"
      />

      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-gold-300/50 shadow-md">
        <p className="text-sm text-islamic-forest/90 leading-relaxed font-sans max-w-xl mx-auto">
          Kehadiran serta doa restu Bapak/Ibu/Saudara/i sekalian merupakan hadiah yang paling bermakna bagi kami.
          Namun jika berkenan memberikan tanda kasih sebagai ungkapan doa dan restu,
          dapat disalurkan melalui tautan di bawah ini:
        </p>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-islamic-emerald hover:bg-islamic-deep text-gold-300 hover:text-white text-xs sm:text-sm font-semibold tracking-wide border border-gold-400 shadow-md transition-all duration-300 hover:scale-105"
        >
          <Gift className="w-4 h-4 text-gold-400" />
          <span>{isOpen ? "Tutup Amplop Digital" : "Kirim Hadiah / Tanda Kasih"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isOpen && (
          <div className="mt-8 space-y-6 animate-fade-up">
            {/* Bank Accounts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {bankAccounts.map((account, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-white/90 border border-gold-300/60 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-xs uppercase tracking-wider text-islamic-emerald bg-gold-100/70 border border-gold-200 px-2.5 py-1 rounded-md">
                      {account.bankName}
                    </span>
                    <CreditCard className="w-4 h-4 text-gold-600" />
                  </div>

                  <p className="text-xs text-islamic-forest/70 font-sans">Nomor Rekening:</p>
                  <p className="font-mono text-lg font-bold text-islamic-emerald tracking-wider my-1">
                    {account.accountNumber}
                  </p>
                  <p className="text-xs text-islamic-forest/80 mb-3">
                    a.n <span className="font-semibold text-islamic-emerald">{account.accountHolder}</span>
                  </p>

                  <button
                    onClick={() => handleCopy(account.accountNumber, index)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-islamic-emerald/5 hover:bg-islamic-emerald/15 text-islamic-emerald border border-gold-300 text-xs font-semibold transition-colors"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gold-600" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Physical Gift Box */}
            <div className="p-5 rounded-2xl bg-white/90 border border-gold-300/60 text-left shadow-sm">
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
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-islamic-emerald/5 hover:bg-islamic-emerald/15 text-islamic-emerald border border-gold-300 text-xs font-semibold transition-colors"
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
    </section>
  );
}
