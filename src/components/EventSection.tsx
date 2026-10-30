import React from "react";
import { MapPin, Calendar, Clock, Navigation, ExternalLink } from "lucide-react";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";
import { EventDetail } from "@/config/invitation";

interface EventSectionProps {
  akad: EventDetail;
  resepsi: EventDetail;
}

export function EventSection({ akad, resepsi }: EventSectionProps) {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="acara">
      <SectionDivider
        title="Agenda & Waktu Acara"
        subtitle="Insya Allah rangkaian acara akan diselenggarakan pada:"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Akad Nikah */}
        <div className="relative p-6 sm:p-8 rounded-3xl glass-card border border-gold-300/60 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300">
          <div className="absolute top-4 right-4 bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-gold-300">
            Khidmat &amp; Sakral
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-islamic-emerald/10 border border-gold-400 flex items-center justify-center text-gold-600 mb-5">
              <RubElHizb className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-islamic-emerald mb-4">
              {akad.title}
            </h3>

            <div className="space-y-3 text-sm text-islamic-forest">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-islamic-emerald">{akad.date}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span>{akad.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-islamic-emerald">{akad.locationName}</p>
                  <p className="text-xs text-islamic-forest/75 mt-0.5 leading-relaxed">
                    {akad.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-8 pt-5 border-t border-gold-200">
            <a
              href={akad.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-islamic-emerald hover:bg-islamic-deep text-gold-200 hover:text-white text-xs font-medium transition-all shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Arah</span>
            </a>
            <a
              href={akad.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-gold-50 hover:bg-gold-100 text-gold-800 border border-gold-300 text-xs font-medium transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Kalender</span>
            </a>
          </div>
        </div>

        {/* Resepsi / Walimatul 'Urs */}
        <div className="relative p-6 sm:p-8 rounded-3xl glass-card border border-gold-300/60 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300">
          <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-gold-400">
            Walimatul &apos;Urs
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-gold-100 border border-gold-400 flex items-center justify-center text-gold-600 mb-5">
              <Calendar className="w-6 h-6 text-gold-600" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-islamic-emerald mb-4">
              {resepsi.title}
            </h3>

            <div className="space-y-3 text-sm text-islamic-forest">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-islamic-emerald">{resepsi.date}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span>{resepsi.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-islamic-emerald">{resepsi.locationName}</p>
                  <p className="text-xs text-islamic-forest/75 mt-0.5 leading-relaxed">
                    {resepsi.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-8 pt-5 border-t border-gold-200">
            <a
              href={resepsi.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-islamic-emerald hover:bg-islamic-deep text-gold-200 hover:text-white text-xs font-medium transition-all shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Arah</span>
            </a>
            <a
              href={resepsi.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-gold-50 hover:bg-gold-100 text-gold-800 border border-gold-300 text-xs font-medium transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Kalender</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
