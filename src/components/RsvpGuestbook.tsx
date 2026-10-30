"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, MessageSquareHeart, User, Users, Cloud } from "lucide-react";
import { SectionDivider } from "./IslamicOrnaments";
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
      "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Fathur & Aisyah. Semoga sakinah mawaddah warahmah.",
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
    name: "Sahabat Kuliah Farmasi UI",
    status: "hadir",
    pax: 1,
    message:
      "Masya Allah tabarakallah Kak Aisyah! Terharu dan bahagia sekali. Doa terbaik untuk pernikahan kalian berdua ya!",
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
                name: data.name || "Tamu",
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
      // Local storage fallback
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

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto" id="rsvp">
      <SectionDivider
        title="Konfirmasi Kehadiran & Doa Restu"
        subtitle="Buku Tamu Digital & Ucapan Selamat"
      />

      {/* RSVP Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-gold-300/60 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
              Nama Anda
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Abdullah & Keluarga"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-300/80 bg-white/80 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm text-islamic-emerald placeholder:text-islamic-forest/40"
              />
              <User className="w-4 h-4 text-gold-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
                Konfirmasi Kehadiran
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-300/80 bg-white/80 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm text-islamic-emerald"
              >
                <option value="hadir">Insya Allah Hadir</option>
                <option value="ragu">Masih Ragu / Menyesuaikan</option>
                <option value="tidak_hadir">Mohon Maaf Berhalangan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
                Jumlah Hadir (Orang)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={pax}
                  onChange={(e) => setPax(parseInt(e.target.value) || 1)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-300/80 bg-white/80 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm text-islamic-emerald"
                />
                <Users className="w-4 h-4 text-gold-500 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
              Doa &amp; Ucapan Selamat
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan untaian doa dan ucapan restu yang tulus untuk kedua mempelai..."
              className="w-full p-4 rounded-xl border border-gold-300/80 bg-white/80 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm text-islamic-emerald placeholder:text-islamic-forest/40 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-islamic-emerald hover:bg-islamic-deep text-gold-300 hover:text-white font-semibold text-sm tracking-wide border border-gold-400 shadow-md transition-all duration-200 active:scale-95"
          >
            <Send className="w-4 h-4 text-gold-400" />
            <span>Kirim Konfirmasi &amp; Doa Restu</span>
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-2.5 text-xs text-emerald-800 font-medium animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Jazakallahu khairan! Doa dan konfirmasi Anda telah tersimpan dengan baik.</span>
          </div>
        )}
      </div>

      {/* Wishes List */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700">
            <MessageSquareHeart className="w-4 h-4 text-gold-600" />
            <span>Untaian Doa Tamu ({wishes.length})</span>
          </div>
          {isUsingFirebase && (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <Cloud className="w-3 h-3 text-emerald-600" />
              <span>Realtime Cloud</span>
            </span>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white/85 border border-gold-200 shadow-sm text-left transition-all hover:bg-white"
            >
              <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                <span className="font-serif font-bold text-sm text-islamic-emerald">
                  {item.name}
                </span>
                <div className="flex items-center gap-2">
                  {getStatusBadge(item.status)}
                  <span className="text-[10px] text-islamic-forest/60">{item.timestamp}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-islamic-forest/90 leading-relaxed font-sans">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
