import React from "react";
import { HeartHandshake, Shirt, Utensils, Users } from "lucide-react";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";
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
      <SectionDivider
        title="Adab Menghadiri Walimah"
        subtitle="Mempererat ukhuwah dan menggapai keberkahan sunnah Rasulullah SAW"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-5 rounded-2xl glass-card border border-gold-300/40 hover:border-gold-400 transition-all shadow-sm"
          >
            <div className="p-3 rounded-2xl bg-islamic-emerald/10 border border-gold-400/40 shrink-0">
              {iconMap[item.icon] || <RubElHizb className="w-6 h-6 text-gold-500" />}
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-islamic-emerald mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-islamic-forest/80 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
