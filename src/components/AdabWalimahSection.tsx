import React from "react";
import {
  HeartHandshake,
  Shirt,
  Utensils,
  Users,
  CameraOff,
  ShieldCheck,
  Compass,
  Sparkles,
} from "lucide-react";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";
import { ScrollReveal } from "./ScrollReveal";
import { InvitationConfig } from "@/config/invitation";

const iconMap: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-gold-500" />,
  Shirt: <Shirt className="w-6 h-6 text-gold-500" />,
  Utensils: <Utensils className="w-6 h-6 text-gold-500" />,
  Users: <Users className="w-6 h-6 text-gold-500" />,
};

interface AdabWalimahProps {
  items: InvitationConfig["adabWalimah"];
}

export function AdabWalimahSection({ items }: AdabWalimahProps) {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="adab">
      <ScrollReveal animation="fade-up">
        <SectionDivider
          title="Adab & Protokol Walimah Syar'i"
          subtitle="Mempererat ukhuwah dan menggapai keberkahan sunnah Rasulullah SAW"
        />
      </ScrollReveal>

      {/* Featured Syar'i Notice Box */}
      <ScrollReveal animation="scale-up" delay={100} duration={800} className="w-full my-8">
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-islamic-deep via-islamic-emerald to-[#061713] text-islamic-ivory border-2 border-gold-400/60 shadow-xl">
          {/* Subtle Decorative Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-islamic-sage/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/50 text-gold-300 text-xs tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>Ketentuan Walimatul &apos;Urs Syar&apos;i</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-gradient tracking-wide mb-3">
              Kenyamanan &amp; Kesucian Syariat
            </h3>

            <p className="text-xs sm:text-sm text-gold-100/90 leading-relaxed font-sans mb-8">
              Tanpa mengurangi rasa hormat, demi menjaga kemurnian syariat Islam dan kenyamanan bersama, acara ini diselenggarakan dengan ketentuan syar&apos;i sebagai berikut:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left w-full">
              {/* Pillar 1: Pemisahan Tamu */}
              <div className="p-4 rounded-2xl bg-white/5 border border-gold-400/30 flex flex-col items-start gap-3 hover:bg-white/10 transition-colors">
                <div className="p-2.5 rounded-xl bg-gold-500/20 text-gold-300 border border-gold-400/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gold-200 mb-1">
                    Pemisahan Tempat (Infishol)
                  </h4>
                  <p className="text-xs text-islamic-sage leading-relaxed font-sans">
                    Majelis dan area jamuan makan dipisahkan dengan sekat (hijab) antara tamu ikhwan (pria) dan akhwat (wanita).
                  </p>
                </div>
              </div>

              {/* Pillar 2: Privasi Dokumentasi */}
              <div className="p-4 rounded-2xl bg-white/5 border border-gold-400/30 flex flex-col items-start gap-3 hover:bg-white/10 transition-colors">
                <div className="p-2.5 rounded-xl bg-gold-500/20 text-gold-300 border border-gold-400/30">
                  <CameraOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gold-200 mb-1">
                    Privasi Area Akhwat
                  </h4>
                  <p className="text-xs text-islamic-sage leading-relaxed font-sans">
                    Mohon untuk tidak mengambil foto maupun merekam video di area khusus akhwat demi menjaga aurat dan kehormatan muslimah.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Fasilitas Sholat & Wudhu */}
              <div className="p-4 rounded-2xl bg-white/5 border border-gold-400/30 flex flex-col items-start gap-3 hover:bg-white/10 transition-colors">
                <div className="p-2.5 rounded-xl bg-gold-500/20 text-gold-300 border border-gold-400/30">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-gold-200 mb-1">
                    Fasilitas Sholat &amp; Wudhu
                  </h4>
                  <p className="text-xs text-islamic-sage leading-relaxed font-sans">
                    Tersedia musholla dan tempat wudhu terpisah yang bersih dan memadai di venue agar dapat menunaikan ibadah sholat tepat waktu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Adab Menghadiri Walimah Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 items-stretch">
        {items.map((item, index) => (
          <ScrollReveal
            key={index}
            animation="fade-up"
            delay={index * 120}
            className="w-full h-full flex flex-col"
          >
            <div className="flex items-start gap-4 p-5 rounded-2xl glass-card border border-gold-300/40 hover:border-gold-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 h-full group">
              <div className="p-3 rounded-2xl bg-islamic-emerald/10 border border-gold-400/40 shrink-0 group-hover:scale-110 transition-transform">
                {iconMap[item.icon] || <RubElHizb className="w-6 h-6 text-gold-500" />}
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-islamic-emerald mb-1 group-hover:text-gold-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-islamic-forest/80 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
