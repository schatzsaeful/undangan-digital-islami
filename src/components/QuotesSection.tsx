import React from "react";
import { Sparkles, HeartHandshake, Sun } from "lucide-react";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";
import { ScrollReveal } from "./ScrollReveal";

const ISLAMIC_QUOTES = [
  {
    icon: Sparkles,
    arabic: "إِذَا تَزَوَّجَ الْعَبْدُ فَقَدِ اسْتَكْمَلَ نِصْفَ الدِّينِ، فَلْيَتَّقِ اللَّهَ فِي النِّصْفِ الْبَاقِي",
    translation:
      "“Jika seorang hamba telah menikah, maka ia telah menyempurnakan separuh dari agamanya. Maka hendaklah ia bertakwa kepada Allah untuk separuh yang tersisa.”",
    source: "HR. Baihaqi dalam Syu'abul Iman (Hadits Shahih)",
  },
  {
    icon: Sun,
    arabic: "الدُّنْيَا مَتَاعٌ، وَخَيْرُ مَتَاعِ الدُّنْيَا الْمَرْأَةُ الصَّالِحَةُ",
    translation:
      "“Dunia ini adalah perhiasan, dan sebaik-baik perhiasan dunia adalah wanita yang shalihah.”",
    source: "HR. Muslim no. 1467",
  },
  {
    icon: HeartHandshake,
    arabic: "خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ، وَأَنَا خَيْرُكُمْ لِأَهْلِي",
    translation:
      "“Sebaik-baik kalian adalah yang paling baik terhadap keluarganya (istrinya), dan aku adalah orang yang paling baik terhadap keluargaku.”",
    source: "HR. Tirmidzi no. 3895",
  },
];

export function QuotesSection() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="nasihat">
      <ScrollReveal animation="fade-up">
        <SectionDivider
          title="Mutiara Sunnah & Doa"
          subtitle="Untaian kalam nubuwah dalam membina mahligai rumah tangga sakinah"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {ISLAMIC_QUOTES.map((item, index) => {
          const Icon = item.icon;
          return (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={index * 150}
              className="w-full h-full flex flex-col"
            >
              <div className="p-6 rounded-3xl glass-card ornate-border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group h-full">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-gold-100/70 border border-gold-300 flex items-center justify-center text-gold-700 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <p className="font-arabic text-lg leading-loose text-islamic-emerald font-semibold text-right mb-4">
                    {item.arabic}
                  </p>

                  <p className="text-xs sm:text-sm text-islamic-forest/90 leading-relaxed font-sans italic mb-4">
                    {item.translation}
                  </p>
                </div>

                <div className="pt-3 border-t border-gold-200/60 flex items-center gap-2">
                  <RubElHizb className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span className="text-[11px] font-semibold text-gold-700 tracking-wide font-sans">
                    {item.source}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

