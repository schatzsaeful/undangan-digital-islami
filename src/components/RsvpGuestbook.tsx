"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, MessageSquareHeart, User, Users, Cloud, Check } from "lucide-react";
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus("hadir")}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  status === "hadir"
                    ? "bg-emerald-700 text-white border-emerald-800 shadow-sm scale-[1.02]"
                    : "bg-white/80 text-islamic-forest border-gold-300/60 hover:bg-gold-50"
                }`}
              >
                {status === "hadir" && <Check className="w-3.5 h-3.5" />}
                <span>Insya Allah Hadir</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus("ragu")}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  status === "ragu"
                    ? "bg-amber-600 text-white border-amber-700 shadow-sm scale-[1.02]"
                    : "bg-white/80 text-islamic-forest border-gold-300/60 hover:bg-gold-50"
                }`}
              >
                {status === "ragu" && <Check className="w-3.5 h-3.5" />}
                <span>Masih Ragu</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus("tidak_hadir")}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  status === "tidak_hadir"
                    ? "bg-rose-700 text-white border-rose-800 shadow-sm scale-[1.02]"
                    : "bg-white/80 text-islamic-forest border-gold-300/60 hover:bg-gold-50"
                }`}
              >
                {status === "tidak_hadir" && <Check className="w-3.5 h-3.5" />}
                <span>Berhalangan</span>
              </button>
            </div>
          </div>

          {/* Number of Pax */}
          {status !== "tidak_hadir" && (
            <div>
              <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
                Jumlah Orang yang Hadir
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={pax}
                  onChange={(e) => setPax(parseInt(e.target.value) || 1)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold-300/80 bg-white/90 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm text-islamic-emerald shadow-sm transition-all"
                />
                <Users className="w-4 h-4 text-gold-600 absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          {/* Wishes Message */}
          <div>
            <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
              Untaian Doa &amp; Ucapan Selamat
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan untaian doa dan ucapan restu yang tulus untuk kedua mempelai..."
              className="w-full p-4 rounded-xl border border-gold-300/80 bg-white/90 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm text-islamic-emerald placeholder:text-islamic-forest/40 resize-none shadow-sm transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gold-gradient hover:bg-gold-gradient-shine text-islamic-emerald font-semibold text-sm tracking-wide shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95"
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
          {wishes.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white border border-gold-200 shadow-sm text-left transition-all hover:border-gold-400"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-500 to-islamic-forest text-white font-serif font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  {getInitials(item.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
                    <span className="font-serif font-bold text-sm text-islamic-emerald truncate">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {getStatusBadge(item.status)}
                      <span className="text-[10px] text-islamic-forest/60">{item.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-islamic-forest/90 leading-relaxed font-sans">
                    {item.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
