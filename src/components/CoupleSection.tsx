import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { RubElHizb, SectionDivider } from "./IslamicOrnaments";
import { ScrollReveal } from "./ScrollReveal";
import { InvitationConfig } from "@/config/invitation";

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

interface CoupleSectionProps {
  groom: InvitationConfig["groom"];
  bride: InvitationConfig["bride"];
  quranVerse: InvitationConfig["quranVerse"];
}

export function CoupleSection({ groom, bride, quranVerse }: CoupleSectionProps) {
  return (
    <section className="relative py-16 px-4 max-w-4xl mx-auto text-center" id="mempelai">
      {/* Quranic Verse Box */}
      <ScrollReveal animation="fade-up" duration={700}>
        <div className="mb-16 p-6 sm:p-10 rounded-3xl glass-card ornate-border shadow-md max-w-3xl mx-auto">
          <RubElHizb className="w-6 h-6 text-gold-500 mx-auto mb-4 animate-pulse-subtle" />
          <p className="font-arabic text-xl sm:text-2xl text-islamic-emerald leading-loose sm:leading-[2.5rem] font-medium mb-6 px-2">
            {quranVerse.arabic}
          </p>
          <p className="font-sans text-xs sm:text-sm text-islamic-deep/85 italic leading-relaxed max-w-2xl mx-auto mb-3">
            {quranVerse.translation}
          </p>
          <span className="inline-block text-xs font-semibold text-gold-700 bg-gold-100/90 px-3.5 py-1 rounded-full border border-gold-300/60 shadow-sm">
            {quranVerse.surah}
          </span>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={100}>
        <SectionDivider
          title="Kedua Mempelai"
          subtitle="Maha Suci Allah yang telah menciptakan hamba-Nya berpasang-pasangan"
        />

        {/* Polite Islamic Greeting */}
        <div className="max-w-2xl mx-auto mb-12 space-y-3">
          <p className="font-arabic text-2xl text-gold-600 font-semibold">
            السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </p>
          <p className="text-xs sm:text-sm text-islamic-forest/90 leading-relaxed font-sans">
            Dengan memohon rahmat, taufiq, dan ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud
            menyelenggarakan ikatan suci pernikahan putra-putri kami:
          </p>
        </div>
      </ScrollReveal>

      {/* Groom & Bride Grid with Separate Syar'i Illustration Avatars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
        {/* Groom Card */}
        <ScrollReveal animation="fade-up" delay={150} className="w-full h-full flex flex-col">
          <div className="flex flex-col items-center justify-between p-8 rounded-3xl glass-card ornate-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
            <div className="flex flex-col items-center w-full">
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 p-1.5 rounded-full bg-gradient-to-tr from-gold-500 via-gold-200 to-islamic-forest shadow-lg mb-6 transition-transform duration-500 group-hover:scale-105">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/90 bg-gradient-to-b from-[#eaf2ee] via-[#f7f5ef] to-[#efe9dc]">
                  <Image
                    src="/images/groom-avatar.png"
                    alt={groom.fullName}
                    fill
                    sizes="(max-width: 640px) 176px, 192px"
                    className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-2 -right-1 bg-islamic-emerald text-gold-300 p-2.5 rounded-full border border-gold-400 shadow-md">
                  <RubElHizb className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-islamic-emerald group-hover:text-gold-700 transition-colors">
                {groom.fullName}
              </h3>
              <p className="text-xs uppercase tracking-widest text-gold-600 font-semibold my-1 font-sans">
                ({groom.nickName})
              </p>
              <p className="text-xs sm:text-sm text-islamic-forest/80 font-sans mt-2">
                {groom.orderInFamily}:
              </p>
              <p className="text-sm font-semibold text-islamic-emerald mt-0.5">
                Bpk. {groom.fatherName}
                <br />&amp; Ibu {groom.motherName}
              </p>
            </div>

            {groom.instagram && (
              <a
                href={groom.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-xs text-gold-800 hover:text-gold-950 bg-gold-50 hover:bg-gold-100 border border-gold-300 px-4 py-1.5 rounded-full transition-colors font-medium shadow-sm active:scale-95"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </ScrollReveal>

        {/* Bride Card */}
        <ScrollReveal animation="fade-up" delay={300} className="w-full h-full flex flex-col">
          <div className="flex flex-col items-center justify-between p-8 rounded-3xl glass-card ornate-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
            <div className="flex flex-col items-center w-full">
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 p-1.5 rounded-full bg-gradient-to-tr from-gold-500 via-gold-200 to-islamic-forest shadow-lg mb-6 transition-transform duration-500 group-hover:scale-105">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/90 bg-gradient-to-b from-[#eaf2ee] via-[#f7f5ef] to-[#efe9dc]">
                  <Image
                    src="/images/bride-avatar.png"
                    alt={bride.fullName}
                    fill
                    sizes="(max-width: 640px) 176px, 192px"
                    className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-2 -right-1 bg-islamic-emerald text-gold-300 p-2.5 rounded-full border border-gold-400 shadow-md">
                  <Heart className="w-4 h-4 fill-gold-300" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-islamic-emerald group-hover:text-gold-700 transition-colors">
                {bride.fullName}
              </h3>
              <p className="text-xs uppercase tracking-widest text-gold-600 font-semibold my-1 font-sans">
                ({bride.nickName})
              </p>
              <p className="text-xs sm:text-sm text-islamic-forest/80 font-sans mt-2">
                {bride.orderInFamily}:
              </p>
              <p className="text-sm font-semibold text-islamic-emerald mt-0.5">
                Bpk. {bride.fatherName}
                <br />&amp; Ibu {bride.motherName}
              </p>
            </div>

            {bride.instagram && (
              <a
                href={bride.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-xs text-gold-800 hover:text-gold-950 bg-gold-50 hover:bg-gold-100 border border-gold-300 px-4 py-1.5 rounded-full transition-colors font-medium shadow-sm active:scale-95"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
