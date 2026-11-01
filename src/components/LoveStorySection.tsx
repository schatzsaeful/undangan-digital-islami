import React from "react";
import { StoryItem } from "@/config/invitation";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";
import { ScrollReveal } from "./ScrollReveal";

interface LoveStorySectionProps {
  stories: StoryItem[];
}

export function LoveStorySection({ stories }: LoveStorySectionProps) {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto" id="cerita">
      <ScrollReveal animation="fade-up">
        <SectionDivider
          title="Kisah Kasih & Ta'aruf"
          subtitle="Sebuah perjalanan yang diawali dengan niat suci beribadah"
        />
      </ScrollReveal>

      <div className="relative mt-12 space-y-10">
        {/* Continuous Timeline Center Line */}
        <div className="absolute top-3 bottom-3 left-4 sm:left-6 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold-400 via-gold-300 to-gold-400/30" />

        {stories.map((story, index) => (
          <ScrollReveal
            key={index}
            animation="fade-up"
            delay={index * 150}
            className="w-full"
          >
            <div className="relative pl-11 sm:pl-16 group">
              {/* Timeline Star Marker - Pixel-Perfect Centered with -translate-x-1/2 */}
              <div className="absolute left-4 sm:left-6 -translate-x-1/2 top-4 w-7 h-7 rounded-full bg-islamic-ivory border-2 border-gold-500 flex items-center justify-center text-gold-600 shadow-sm transition-all duration-300 group-hover:scale-125 group-hover:border-gold-600 group-hover:shadow-[0_0_10px_rgba(213,164,56,0.6)] z-10">
                <RubElHizb className="w-3.5 h-3.5" />
              </div>

              <div className="p-6 rounded-2xl glass-card border border-gold-300/40 hover:border-gold-400 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold font-sans tracking-wider mb-2 border border-gold-200">
                  {story.year}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-islamic-emerald mb-2 group-hover:text-gold-700 transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-islamic-forest/85 leading-relaxed font-sans">
                  {story.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

