import React from "react";
import { StoryItem } from "@/config/invitation";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";

interface LoveStorySectionProps {
  stories: StoryItem[];
}

export function LoveStorySection({ stories }: LoveStorySectionProps) {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto" id="cerita">
      <SectionDivider
        title="Kisah Kasih & Ta'aruf"
        subtitle="Sebuah perjalanan yang diawali dengan niat suci beribadah"
      />

      <div className="relative mt-12 pl-6 sm:pl-8 border-l-2 border-gold-300/60 space-y-12">
        {stories.map((story, index) => (
          <div key={index} className="relative group">
            {/* Timeline Star Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-islamic-ivory border-2 border-gold-500 flex items-center justify-center text-gold-600 shadow-sm transition-transform group-hover:scale-125">
              <RubElHizb className="w-3.5 h-3.5" />
            </div>

            <div className="p-6 rounded-2xl glass-card border border-gold-300/40 hover:border-gold-400 transition-all shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold font-sans tracking-wider mb-2">
                {story.year}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-islamic-emerald mb-2">
                {story.title}
              </h3>
              <p className="text-xs sm:text-sm text-islamic-forest/85 leading-relaxed font-sans">
                {story.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

