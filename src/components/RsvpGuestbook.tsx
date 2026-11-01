"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, MessageSquareHeart, User, Users, Cloud, Check, Sparkles } from "lucide-react";
import { SectionDivider, RubElHizb } from "./IslamicOrnaments";
import { ScrollReveal } from "./ScrollReveal";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export interface GuestWish {
  id: string;
  name: string;
  status: "hadir" | "ragu" | "tidak_hadir";
  pax: number;
  message: string;
  timestamp: string;
}

const QUICK_DOA_PRESETS = [
  {
    label: "🤲 Doa Sunnah Walimah",
    text: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir. Semoga sakinah mawaddah warahmah.",
  },
  {
    label: "🌸 Sakinah Mawaddah",
    text: "Semoga Allah menganugerahkan keluarga yang sakinah, mawaddah, wa rahmah serta keturunan yang sholeh & sholehah.",
  },
  {
    label: "💐 Selamat Hidup Baru",
    text: "Selamat menempuh hidup baru Heri & Asri! Semoga langgeng hingga jannah dan selalu diberkahi Allah.",
  },
  {
    label: "🤍 Masya Allah",
    text: "Masya Allah tabarakallah, ikut berbahagia untuk kalian berdua! Bahagia selalu dunia & akhirat.",
  },
];

const INITIAL_WISHES: GuestWish[] = [
  {
    id: "1",
    name: "Ustadz Hilman Fauzi & Keluarga",
    status: "hadir",
    pax: 2,
    message:
      "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Heri & Asri. Semoga sakinah mawaddah warahmah.",
    timestamp: "Baru saja",
  },
  {
    id: "2",
    name: "Keluarga Besar dr. Farhan",
    status: "hadir",
    pax: 2,
    message:
      "Selamat berbahagia untuk kedua mempelai dan keluarga besar. Semoga Allah melimpahkan rezeki berkah dan keturunan yang sholeh/sholehah.",
    timestamp: "1 jam lalu",
  },
  {
    id: "3",
    name: "Sahabat Kuliah",
    status: "hadir",
    pax: 1,
    message:
      "Masya Allah tabarakallah Teh Asri & Mas Heri! Terharu dan bahagia sekali. Doa terbaik untuk pernikahan kalian berdua ya!",
    timestamp: "3 jam lalu",
  },
];

interface RsvpGuestbookProps {
  initialGuestName?: string;
}

export function RsvpGuestbook({ initialGuestName = "" }: RsvpGuestbookProps) {
  const [name, setName] = useState(initialGuestName);
  const [status, setStatus] = useState<"hadir" | "ragu" | "tidak_hadir">("hadir");
  const [pax, setPax] = useState<number>(1);
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<GuestWish[]>(INITIAL_WISHES);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUsingFirebase, setIsUsingFirebase] = useState(false);

  useEffect(() => {
    if (initialGuestName) {
      setName(initialGuestName);
    }
  }, [initialGuestName]);

  // If Firebase is configured, listen to Firestore in real-time
  useEffect(() => {
    if (db) {
      setIsUsingFirebase(true);
      try {
        const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const list: GuestWish[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                name: data.name || "Tamu Undangan",
                status: data.status || "hadir",
                pax: data.pax || 1,
                message: data.message || "",
                timestamp: data.createdAt?.toDate
                  ? new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(data.createdAt.toDate())
                  : "Baru saja",
              };
            });
            if (list.length > 0) {
              setWishes(list);
            }
          },
          (error) => {
            console.warn("Firestore onSnapshot error, falling back to local:", error);
            setIsUsingFirebase(false);
          }
        );
        return () => unsubscribe();
      } catch (err) {
        console.warn("Failed to attach Firestore listener:", err);
      }
    } else {
      try {
        const saved = localStorage.getItem("walimah_wishes");
        if (saved) {
          setWishes(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    if (db) {
      try {
        await addDoc(collection(db, "wishes"), {
          name: name.trim(),
          status,
          pax,
          message: message.trim(),
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error("Error adding wish to Firebase:", err);
      }
    } else {
      const newWish: GuestWish = {
        id: Date.now().toString(),
        name: name.trim(),
        status,
        pax,
        message: message.trim(),
        timestamp: "Baru saja",
      };
      const updated = [newWish, ...wishes];
      setWishes(updated);
      try {
        localStorage.setItem("walimah_wishes", JSON.stringify(updated));
      } catch {
        // ignore
      }
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#C59325", "#8EB69B", "#DAF1DE"],
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    setMessage("");
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const getStatusBadge = (s: GuestWish["status"]) => {
    switch (s) {
      case "hadir":
        return (
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-300">
            Insya Allah Hadir
          </span>
        );
      case "ragu":
        return (
          <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-300">
            Masih Ragu
          </span>
        );
      case "tidak_hadir":
        return (
          <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded-full border border-rose-300">
            Berhalangan
          </span>
        );
    }
  };

  const getInitials = (n: string) => {
    return n
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto pb-28" id="rsvp">
      <ScrollReveal animation="fade-up">
        <SectionDivider
          title="Konfirmasi Kehadiran & Doa Restu"
          subtitle="Buku Tamu Digital & Untaian Doa Kebahagiaan"
        />
      </ScrollReveal>

      {/* RSVP Form Card */}
      <ScrollReveal animation="fade-up" delay={150}>
        <div className="p-6 sm:p-8 rounded-3xl glass-card ornate-border shadow-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Guest Name */}
          <div>
            <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
              Nama Lengkap
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Abdullah & Keluarga"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold-300/80 bg-white/90 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm text-islamic-emerald placeholder:text-islamic-forest/40 transition-all shadow-sm"
              />
              <User className="w-4 h-4 text-gold-600 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Attendance Selection Pills */}
          <div>
            <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-2 font-sans">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setStatus("hadir")}
                className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  status === "hadir"
                    ? "bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/30"
                    : "bg-white/80 text-islamic-forest border-gold-300/60 hover:bg-gold-50 hover:border-gold-400"
                }`}
              >
                {status === "hadir" && <Check className="w-3.5 h-3.5" />}
                <span>Insya Allah Hadir</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus("ragu")}
                className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  status === "ragu"
                    ? "bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-500/30"
                    : "bg-white/80 text-islamic-forest border-gold-300/60 hover:bg-gold-50 hover:border-gold-400"
                }`}
              >
                {status === "ragu" && <Check className="w-3.5 h-3.5" />}
                <span>Masih Ragu</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus("tidak_hadir")}
                className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  status === "tidak_hadir"
                    ? "bg-rose-700 text-white border-rose-800 shadow-md ring-2 ring-rose-500/30"
                    : "bg-white/80 text-islamic-forest border-gold-300/60 hover:bg-gold-50 hover:border-gold-400"
                }`}
              >
                {status === "tidak_hadir" && <Check className="w-3.5 h-3.5" />}
                <span>Berhalangan</span>
              </button>
            </div>
          </div>

          {/* Number of Pax (Custom Stepper + Quick Pills) */}
          {status !== "tidak_hadir" && (
            <div>
              <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-2 font-sans">
                Jumlah Orang yang Hadir
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Stepper Control */}
                <div className="inline-flex items-center justify-between sm:justify-start rounded-xl border border-gold-300/80 bg-white/95 shadow-sm p-1">
                  <button
                    type="button"
                    onClick={() => setPax(Math.max(1, pax - 1))}
                    disabled={pax <= 1}
                    aria-label="Kurangi jumlah orang"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-islamic-emerald hover:bg-gold-100 active:bg-gold-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-lg"
                  >
                    −
                  </button>
                  <div className="px-4 text-center min-w-[5.5rem]">
                    <span className="font-serif font-bold text-base text-islamic-emerald tabular-nums">
                      {pax}
                    </span>
                    <span className="text-xs text-islamic-forest/70 ml-1.5 font-sans">Orang</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPax(Math.min(6, pax + 1))}
                    disabled={pax >= 6}
                    aria-label="Tambah jumlah orang"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-islamic-emerald hover:bg-gold-100 active:bg-gold-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Quick Pax Selection Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPax(num)}
                      className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                        pax === num
                          ? "bg-islamic-emerald text-gold-200 border-islamic-deep shadow-sm"
                          : "bg-white/80 text-islamic-forest/80 border-gold-300/60 hover:bg-gold-50 hover:border-gold-400"
                      }`}
                    >
                      {num} {num >= 4 ? "+ Orang" : "Orang"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wishes Message & Quick Doa Chips */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider font-sans">
                Untaian Doa &amp; Ucapan Selamat
              </label>
              <span className="text-[11px] text-gold-700/80 font-medium hidden sm:inline">
                Pilih doa cepat di bawah
              </span>
            </div>

            {/* Quick Doa Chips */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {QUICK_DOA_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setMessage((prev) =>
                      prev.trim() ? `${prev.trim()}\n\n${preset.text}` : preset.text
                    );
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] bg-gold-50/90 hover:bg-gold-100 text-gold-800 border border-gold-300/70 transition-all hover:scale-[1.02] active:scale-95 text-left"
                >
                  <Sparkles className="w-2.5 h-2.5 text-gold-600 shrink-0" />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>

            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan untaian doa dan ucapan restu yang tulus untuk kedua mempelai..."
              className="w-full p-4 rounded-xl border border-gold-300/80 bg-white/90 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-sm text-islamic-emerald placeholder:text-islamic-forest/40 resize-none shadow-sm transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gold-gradient hover:bg-gold-gradient-shine text-islamic-emerald font-semibold text-sm tracking-wide shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95 shimmer-btn"
          >
            <Send className="w-4 h-4 text-islamic-emerald" />
            <span>Kirim Doa Restu &amp; Konfirmasi</span>
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-2.5 text-xs text-emerald-800 font-medium animate-fade-in shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Jazakallahu khairan! Doa dan konfirmasi kehadiran Anda telah tersimpan dengan aman.</span>
          </div>
        )}
      </div>
      </ScrollReveal>

      {/* Wishes List with Avatars */}
      <ScrollReveal animation="fade-up" delay={250}>
        <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700">
            <MessageSquareHeart className="w-4 h-4 text-gold-600" />
            <span>Untaian Doa Tamu ({wishes.length})</span>
          </div>
          {isUsingFirebase && (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <Cloud className="w-3 h-3 text-emerald-600" />
              <span>Realtime Cloud</span>
            </span>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
          {wishes.map((item) => {
            const statusBorder =
              item.status === "hadir"
                ? "border-l-4 border-l-emerald-600"
                : item.status === "ragu"
                ? "border-l-4 border-l-amber-500"
                : "border-l-4 border-l-rose-500";

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl bg-white/95 border border-gold-200/90 shadow-sm text-left transition-all duration-200 hover:border-gold-400 hover:shadow-md ${statusBorder}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-500 to-islamic-forest text-white font-serif font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                    {getInitials(item.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-islamic-emerald truncate">
                          {item.name}
                        </span>
                        {item.status === "hadir" && item.pax > 1 && (
                          <span className="text-[10px] bg-gold-100 text-gold-800 font-semibold px-2 py-0.5 rounded-full border border-gold-300">
                            {item.pax} Orang
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {getStatusBadge(item.status)}
                        <span className="text-[10px] text-islamic-forest/60">{item.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-islamic-forest/90 leading-relaxed font-sans whitespace-pre-line">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
