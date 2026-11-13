"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Check,
  Palette,
  ExternalLink,
  Copy,
  Share2,
  Heart,
  CheckCircle2,
  Layers,
  Smartphone,
  Music,
  MapPin,
  Calendar,
  Gift,
  MessageSquare,
} from "lucide-react";

export default function TemplateKatalogPage() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (url: string, id: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const shareWhatsAppMessage = `Assalamu'alaikum Warahmatullahi Wabarakatuh ✨

Hai calon mempelai berbahagia! Berikut adalah 2 pilihan konsep desain website undangan pernikahan digital yang telah kami siapkan khusus untuk kalian:

🏛️ *Pilihan 1: Royal Emerald & Gold (Klasik Islami & Megah)*
Link Demo: ${typeof window !== "undefined" ? window.location.origin : ""}/template/emerald-gold

🌿 *Pilihan 2: Sage Botanical & Romantic Editorial (Alam Lembut & Modern)*
Link Demo: ${typeof window !== "undefined" ? window.location.origin : ""}/template/sage-botanical

Silakan buka masing-masing link di atas lewat HP kalian, nikmati alunan musik, dan rasakan perbedaannya. Beritahu kami ya mana tema yang paling kalian sukai! 🙏✨`;

  const handleCopyWaMessage = () => {
    navigator.clipboard.writeText(shareWhatsAppMessage);
    setCopiedLink("wa-msg");
    setTimeout(() => setCopiedLink(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Banner */}
      <header className="relative bg-gradient-to-b from-[#0B2B26] via-[#163832] to-[#0B2B26] text-white py-14 sm:py-20 px-4 text-center overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#E1B85D_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase Desain Undangan Digital</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white">
            Pilihan Konsep &amp; Tema Undangan
          </h1>

          <p className="text-sm sm:text-base text-slate-200/90 max-w-xl mx-auto leading-relaxed">
            Pilih estetika yang paling mewakili kisah cinta Anda. Setiap template dirancang responsif, interaktif, elegan, dan siap digunakan di hari bahagia.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyWaMessage}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              {copiedLink === "wa-msg" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-900" />
                  <span>Pesan WhatsApp Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Salin Teks Rekomendasi untuk Calon Mempelai</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Comparison Section */}
      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* TEMA 1: ROYAL EMERALD & GOLD */}
          <div className="group rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            {/* Header Visual Bar */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0B2B26] to-[#163832] text-white relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full">
                  Tema Klasik &amp; Syar&apos;i
                </span>
                <span className="text-xs text-slate-300 font-mono">Template 01</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                Royal Emerald &amp; Gold
              </h2>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Suasana megah, formal, dan berwibawa dengan ornamen islami geometris khas Walimatul &apos;Urs.
              </p>

              {/* Color Swatches */}
              <div className="flex items-center gap-2 mt-5">
                <span className="text-[11px] text-slate-300 font-medium mr-1">Palet:</span>
                <div className="w-6 h-6 rounded-full bg-[#0B2B26] border border-white/40 shadow-xs" title="Deep Emerald (#0B2B26)" />
                <div className="w-6 h-6 rounded-full bg-[#163832] border border-white/40 shadow-xs" title="Islamic Forest (#163832)" />
                <div className="w-6 h-6 rounded-full bg-[#C59325] border border-white/40 shadow-xs" title="Rich Gold (#C59325)" />
                <div className="w-6 h-6 rounded-full bg-[#FDFBF7] border border-white/40 shadow-xs" title="Ivory Cream (#FDFBF7)" />
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Karakteristik Desain:
                  </h3>
                  <ul className="mt-2 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ornamen bintang segi delapan <strong>(Rub El Hizb)</strong> &amp; kaligrafi islami</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Gradasi emas metalik <em>(Gold metallic shine)</em> yang mewah</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kartu glassmorphism elegan berlatar hijau tua botol</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sangat ideal untuk resepsi gedung, ballroom, atau masjid agung</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F3EB] border border-amber-200/60 text-xs text-slate-700">
                  <p className="font-semibold text-[#0B2B26]">Kesan yang didapatkan:</p>
                  <p className="mt-0.5 text-slate-600">
                    &ldquo;Khidmat, agung, formal, dan sarat dengan nilai-nilai islami yang berkelas.&rdquo;
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <Link
                  href="/template/emerald-gold"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0B2B26] hover:bg-[#163832] text-white font-bold text-xs tracking-wide shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Buka Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleCopy("/template/emerald-gold", "emerald")}
                  className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  {copiedLink === "emerald" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* TEMA 2: SAGE BOTANICAL & ROMANTIC EDITORIAL */}
          <div className="group rounded-3xl bg-white border-2 border-emerald-500/40 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between relative">
            {/* Best Match Badge */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              ✨ Desain Terbaru
            </div>

            {/* Header Visual Bar */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#4A6354] via-[#5C7A68] to-[#253B30] text-white relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 bg-white/15 border border-white/20 px-3 py-1 rounded-full">
                  Tema Modern &amp; Alam
                </span>
                <span className="text-xs text-slate-200 font-mono">Template 02</span>
              </div>

              <h2 className="font-serif italic text-2xl sm:text-3xl font-extrabold text-white">
                Sage Botanical Editorial
              </h2>
              <p className="text-xs text-emerald-100 mt-1.5 leading-relaxed">
                Sentuhan dedaunan eucalyptus dan zaitun yang teduh, tipografi editorial majalah, dan stempel lilin romantis.
              </p>

              {/* Color Swatches */}
              <div className="flex items-center gap-2 mt-5">
                <span className="text-[11px] text-emerald-100 font-medium mr-1">Palet:</span>
                <div className="w-6 h-6 rounded-full bg-[#4A6354] border border-white/40 shadow-xs" title="Deep Sage Olive (#4A6354)" />
                <div className="w-6 h-6 rounded-full bg-[#7D9D8B] border border-white/40 shadow-xs" title="Soft Eucalyptus (#7D9D8B)" />
                <div className="w-6 h-6 rounded-full bg-[#B57E70] border border-white/40 shadow-xs" title="Dusty Rose (#B57E70)" />
                <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-white/40 shadow-xs" title="Linen Alabaster (#FAF7F2)" />
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Karakteristik Desain:
                  </h3>
                  <ul className="mt-2 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ornamen sulur daun zaitun &amp; eucalyptus minimalis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Cover amplop surat berserat linen dengan <strong>Wax Seal Monogram</strong> timbul</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kombinasi warna sage green, dusty rose, dan latar cream hangat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sangat serasi untuk pernikahan modern, semi-outdoor, intimate, maupun garden party</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#E8EFE9]/60 border border-emerald-200 text-xs text-slate-700">
                  <p className="font-semibold text-[#253B30]">Kesan yang didapatkan:</p>
                  <p className="mt-0.5 text-slate-600">
                    &ldquo;Sejuk, romantis, estetik, minimalis modern, dan nyaman di mata para tamu undangan.&rdquo;
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <Link
                  href="/template/sage-botanical"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#4A6354] hover:bg-[#394E42] text-white font-bold text-xs tracking-wide shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Buka Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleCopy("/template/sage-botanical", "sage")}
                  className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  {copiedLink === "sage" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Fitur Lengkap di Kedua Template
            </h3>
            <p className="text-xs text-slate-500">
              Semua fitur interaktif penting telah disematkan secara optimal di kedua pilihan desain:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { icon: Music, title: "Musik Latar Otomatis", desc: "Putar lagu dengan tombol floating audio" },
              { icon: Calendar, title: "Countdown & Kalender", desc: "Hitung mundur & add to Google Calendar" },
              { icon: MapPin, title: "Integrasi Google Maps", desc: "Titik lokasi akurat & petunjuk arah" },
              { icon: Gift, title: "Amplop Digital 1-Klik", desc: "Salin nomor rekening & kirim kado" },
              { icon: MessageSquare, title: "RSVP & Buku Tamu", desc: "Konfirmasi kehadiran & ucapan realtime" },
              { icon: Smartphone, title: "100% Mobile Responsive", desc: "Sempurna di layar iPhone & Android" },
              { icon: Share2, title: "Generator Nama Tamu", desc: "Link khusus per nama tamu undangan" },
              { icon: Sparkles, title: "Efek Confetti Buka Amplop", desc: "Animasi meriah saat membuka undangan" },
            ].map((f, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <f.icon className="w-5 h-5 text-emerald-700" />
                <h4 className="font-bold text-xs text-slate-900">{f.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guidance Box for the Bride & Groom */}
        <section className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border border-amber-300/60 p-6 sm:p-8 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-800 flex items-center justify-center mx-auto">
            <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
            Cara Menentukan &amp; Mengaktifkan Pilihan Anda
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Kalian berdua bisa berdiskusi santai sambil mencoba membuka kedua link demo di atas. Setelah menemukan tema yang paling pas di hati, cukup beri tahu kami dan data asli kalian (nama, foto, acara, rekening) akan langsung dipasang pada template tersebut.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <p>Al-Husna Digital Wedding Studio • Didesain dengan penuh kehangatan &amp; doa.</p>
      </footer>
    </div>
  );
}

