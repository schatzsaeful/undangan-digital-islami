import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { RubElHizb } from "./IslamicOrnaments";
import { ScrollReveal } from "./ScrollReveal";
import { InvitationConfig } from "@/config/invitation";

interface ClosingSectionProps {
  groom: InvitationConfig["groom"];
  bride: InvitationConfig["bride"];
}

export function ClosingSection({ groom, bride }: ClosingSectionProps) {
  return (
    <footer className="relative py-20 px-4 bg-islamic-emerald text-islamic-ivory text-center overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        <ScrollReveal animation="fade-up">
          <RubElHizb className="w-8 h-8 text-gold-400 mx-auto animate-pulse" />

          {/* Sunnah Wedding Prayer */}
          <div className="p-6 rounded-3xl border border-gold-400/30 glass-card-dark max-w-lg mx-auto my-6">
            <p className="font-arabic text-2xl sm:text-3xl text-gold-300 leading-relaxed font-bold mb-3">
              بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>
            <p className="text-xs sm:text-sm text-gold-200/90 italic font-sans mb-1">
              &ldquo;Barakallahu laka wa baraka &lsquo;alaika wa jama&lsquo;a bainakuma fii khoir&rdquo;
            </p>
            <p className="text-[11px] sm:text-xs text-islamic-sage leading-relaxed">
              &ldquo;Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu susah, serta
              mengumpulkan kalian berdua dalam kebaikan.&rdquo;
              <br />
              <span className="text-gold-400/80 font-medium">(HR. Abu Dawud)</span>
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <p className="text-sm sm:text-base text-gold-100/90 leading-relaxed max-w-lg mx-auto font-sans pt-2">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
            hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>

          <p className="font-arabic text-xl text-gold-400 pt-3">
            وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </p>
        </ScrollReveal>

        {/* Signature & Families */}
        <ScrollReveal animation="fade-up" delay={250}>
          <div className="pt-8 border-t border-gold-400/20">
            <p className="text-xs uppercase tracking-widest text-gold-300/80 mb-2 font-sans">
              Kami Yang Berbahagia
            </p>
            <h4 className="font-serif text-3xl font-bold text-gold-gradient py-1">
              {groom.nickName} &amp; {bride.nickName}
            </h4>
            <p className="text-xs text-islamic-sage mt-2">
              Beserta segenap keluarga besar kedua mempelai
            </p>
          </div>

          <div className="pt-10 text-[11px] text-gold-200/40">
            <p>Walimatul &apos;Urs Digital Invitation</p>
            <p className="mt-1">Dibuat dengan penuh rasa syukur &amp; ketulusan</p>
          </div>

          <div className="pt-6">
            <Link
              href="/generator"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-300/80 hover:text-gold-200 border border-gold-400/20 text-[11px] font-sans tracking-wide transition-all shadow-sm active:scale-95"
            >
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Khusus Pengantin: Buat Link Tamu &amp; WhatsApp</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}

