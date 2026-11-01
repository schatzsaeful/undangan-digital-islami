"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
  Users,
  MessageCircle,
  Sparkles,
  Trash2,
  Share2,
  CheckCircle2,
  HelpCircle,
  XCircle,
  UserCheck,
  RefreshCw,
  Search,
} from "lucide-react";
import { invitationConfig } from "@/config/invitation";
import { RubElHizb } from "@/components/IslamicOrnaments";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface SavedGuest {
  id: string;
  name: string;
  phone: string;
  url: string;
  createdAt: string;
  sent: boolean;
}

interface FirestoreWish {
  id: string;
  name: string;
  status: "hadir" | "ragu" | "tidak_hadir";
  pax: number;
  message: string;
  timestamp: string;
}

export default function MempelaiPortalPage() {
  const [activeTab, setActiveTab] = useState<"generator" | "rsvp">("generator");

  // Generator State
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [salutation, setSalutation] = useState("Yth. Bapak/Ibu/Saudara/i:");
  const [tone, setTone] = useState<"formal" | "friendly">("formal");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [history, setHistory] = useState<SavedGuest[]>([]);
  const [baseUrl, setBaseUrl] = useState("https://walimatulurs-heri-asri.vercel.app");

  // RSVP Recap State
  const [wishes, setWishes] = useState<FirestoreWish[]>([]);
  const [isLoadingRsvp, setIsLoadingRsvp] = useState(true);
  const [rsvpFilter, setRsvpFilter] = useState<"all" | "hadir" | "ragu" | "tidak_hadir">("all");
  const [searchRsvp, setSearchRsvp] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
      try {
        const saved = localStorage.getItem("walimah_guest_history");
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    }

    // Connect to Firestore real-time for RSVP Recap
    if (db) {
      try {
        const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const list: FirestoreWish[] = snapshot.docs.map((doc) => {
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
            setWishes(list);
            setIsLoadingRsvp(false);
          },
          (error) => {
            console.warn("Firestore listener error in portal:", error);
            setIsLoadingRsvp(false);
          }
        );
        return () => unsubscribe();
      } catch (err) {
        console.error("Error setting up Firestore listener:", err);
        setIsLoadingRsvp(false);
      }
    } else {
      setIsLoadingRsvp(false);
    }
  }, []);

  const saveHistoryToStorage = (updated: SavedGuest[]) => {
    setHistory(updated);
    try {
      localStorage.setItem("walimah_guest_history", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const generateSlug = (name: string) => {
    return name
      .trim()
      .replace(/&/g, "dan")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const slug = guestName.trim() ? generateSlug(guestName) : "Nama-Tamu";
  const invitationUrl = `${baseUrl}/to/${slug}`;

  const generateMessage = () => {
    const formattedGuest = guestName.trim() || "[Nama Tamu]";

    if (tone === "friendly") {
      return `Assalamu'alaikum Warahmatullahi Wabarakatuh ✨

Halo *${formattedGuest}*,

Alhamdulillah, dengan memohon ridho dan berkah Allah SWT, kami bermaksud menyelenggarakan acara pernikahan kami (Walimatul 'Urs):

*${invitationConfig.groom.fullName}*
&
*${invitationConfig.bride.fullName}*

🗓️ *Hari/Tgl:* Sabtu, 12 Desember 2026
⏰ *Waktu:* 08.00 WIB s/d Selesai
📍 *Lokasi:* ${invitationConfig.events.akad.locationName}

Detail acara, petunjuk arah lokasi, serta konfirmasi kehadiran (RSVP) dapat dilihat melalui tautan undangan berikut:
👉 ${invitationUrl}

Kehadiran serta doa restumu sangat bermakna dan menjadi kebahagiaan bagi kami. Terima kasih banyak ya! 🙏

Wassalamu'alaikum Warahmatullahi Wabarakatuh.

Salam hangat,
*${invitationConfig.groom.nickName} & ${invitationConfig.bride.nickName}*`;
    }

    return `Assalamu'alaikum Warahmatullahi Wabarakatuh

${salutation}
*${formattedGuest}*

Tanpa mengurangi rasa hormat, dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Walimatul 'Urs putra-putri kami:

*${invitationConfig.groom.fullName}*
&
*${invitationConfig.bride.fullName}*

Insya Allah acara akan diselenggarakan pada:
🗓️ *Hari/Tanggal:* Sabtu, 12 Desember 2026
⏰ *Waktu:* 08.00 WIB s/d Selesai
📍 *Tempat:* ${invitationConfig.events.akad.locationName} (${invitationConfig.events.akad.address})

Informasi detail mengenai rangkaian acara, denah lokasi, serta konfirmasi kehadiran (RSVP) dapat diakses melalui tautan undangan digital berikut:
👉 ${invitationUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kedua mempelai.

Semoga Allah Subhanahu Wa Ta'ala meridhoi niat suci ini dan membalas segala kebaikan Bapak/Ibu/Saudara/i. Aamiin Ya Rabbal 'Alamin.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.

Kami yang berbahagia,
*Keluarga Besar Bpk. ${invitationConfig.groom.fatherName} & Bpk. ${invitationConfig.bride.fatherName}*
*${invitationConfig.groom.nickName} & ${invitationConfig.bride.nickName}*`;
  };

  const messageText = generateMessage();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopiedLink(true);
    recordToHistory(false);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(messageText);
    setCopiedText(true);
    recordToHistory(false);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const recordToHistory = (markSent: boolean) => {
    if (!guestName.trim()) return;

    const existingIndex = history.findIndex((h) => h.url === invitationUrl);
    if (existingIndex >= 0) {
      if (markSent) {
        const updated = [...history];
        updated[existingIndex].sent = true;
        saveHistoryToStorage(updated);
      }
      return;
    }

    const newGuest: SavedGuest = {
      id: Date.now().toString(),
      name: guestName.trim(),
      phone: phone.trim(),
      url: invitationUrl,
      createdAt: new Intl.DateTimeFormat("id-ID", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date()),
      sent: markSent,
    };

    saveHistoryToStorage([newGuest, ...history]);
  };

  const handleSendWhatsApp = () => {
    recordToHistory(true);
    const encoded = encodeURIComponent(messageText);

    let cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "62" + cleanPhone.slice(1);
    }

    let url = "";
    if (cleanPhone) {
      url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    } else {
      url = `https://api.whatsapp.com/send?text=${encoded}`;
    }

    window.open(url, "_blank");
  };

  const handleDeleteHistory = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    saveHistoryToStorage(updated);
  };

  const toggleSentStatus = (id: string) => {
    const updated = history.map((item) =>
      item.id === id ? { ...item, sent: !item.sent } : item
    );
    saveHistoryToStorage(updated);
  };

  // RSVP Statistics Calculations
  const totalRsvp = wishes.length;
  const hadirList = wishes.filter((w) => w.status === "hadir");
  const raguList = wishes.filter((w) => w.status === "ragu");
  const tidakHadirList = wishes.filter((w) => w.status === "tidak_hadir");

  const totalHadirCount = hadirList.length;
  const totalHadirPax = hadirList.reduce((acc, curr) => acc + (curr.pax || 1), 0);
  const totalRaguCount = raguList.length;
  const totalRaguPax = raguList.reduce((acc, curr) => acc + (curr.pax || 1), 0);
  const totalTidakHadirCount = tidakHadirList.length;

  const filteredWishes = wishes.filter((w) => {
    const matchesFilter = rsvpFilter === "all" || w.status === rsvpFilter;
    const matchesSearch =
      !searchRsvp.trim() ||
      w.name.toLowerCase().includes(searchRsvp.toLowerCase()) ||
      w.message.toLowerCase().includes(searchRsvp.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-islamic-ivory text-islamic-emerald p-4 sm:p-8 islamic-pattern">
      <div className="max-w-5xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-islamic-emerald hover:text-gold-700 bg-white/90 hover:bg-white border border-gold-300 px-4 py-2 rounded-full shadow-sm transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Lihat Halaman Tamu</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-gradient text-islamic-emerald text-xs font-bold border border-gold-400 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-islamic-emerald animate-pulse" />
            <span>Portal Khusus Mempelai</span>
          </div>
        </div>

        {/* Portal Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card ornate-border text-center mb-8 shadow-md">
          <RubElHizb className="w-8 h-8 text-gold-500 mx-auto mb-3" />
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-islamic-emerald mb-2">
            Portal Mempelai: Heri &amp; Asri
          </h1>
          <p className="text-xs sm:text-sm text-islamic-forest/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Halaman internal khusus calon pengantin untuk mengelola penyebaran tautan undangan tamu ke WhatsApp serta memantau data konfirmasi kehadiran tamu secara langsung.
          </p>

          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab("generator")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === "generator"
                  ? "bg-islamic-emerald text-gold-200 border border-gold-400 scale-105"
                  : "bg-white/80 text-islamic-forest border border-gold-300 hover:bg-white"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Generator Link Tamu</span>
            </button>

            <button
              onClick={() => setActiveTab("rsvp")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === "rsvp"
                  ? "bg-islamic-emerald text-gold-200 border border-gold-400 scale-105"
                  : "bg-white/80 text-islamic-forest border border-gold-300 hover:bg-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Rekapitulasi RSVP ({totalRsvp})</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: GENERATOR ================= */}
        {activeTab === "generator" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-up">
            {/* Left Column: Input Form */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl glass-card border border-gold-300 shadow-sm space-y-5">
                <h2 className="font-serif text-lg font-bold text-islamic-emerald flex items-center gap-2 border-b border-gold-200 pb-3">
                  <Users className="w-5 h-5 text-gold-600" />
                  <span>Data Tamu Undangan</span>
                </h2>

                {/* Guest Name Input */}
                <div>
                  <label className="block text-xs font-bold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
                    Nama Tamu / Keluarga <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Contoh: Bapak H. Ahmad &amp; Keluarga"
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
                  />
                  <p className="text-[11px] text-islamic-forest/60 mt-1 italic">
                    Nama ini otomatis tertera pada kartu sampul dan formulir buku tamu mereka.
                  </p>
                </div>

                {/* Salutation Selector */}
                <div>
                  <label className="block text-xs font-bold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
                    Sapaan Penghormatan
                  </label>
                  <select
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
                  >
                    <option value="Yth. Bapak/Ibu/Saudara/i:">Yth. Bapak/Ibu/Saudara/i:</option>
                    <option value="Yth. Ustadz/Ustadzah:">Yth. Ustadz/Ustadzah:</option>
                    <option value="Yth. Guru Kami:">Yth. Guru Kami:</option>
                    <option value="Kepada Sahabatku:">Kepada Sahabatku:</option>
                    <option value="Yth. Rekan Kerja:">Yth. Rekan Kerja:</option>
                    <option value="Yth. Keluarga Besar:">Yth. Keluarga Besar:</option>
                  </select>
                </div>

                {/* Optional Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
                    Nomor WhatsApp Tamu (Opsional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
                  />
                  <p className="text-[11px] text-islamic-forest/60 mt-1 italic">
                    Bila diisi, tombol kirim akan langsung membuka obrolan ke nomor tersebut.
                  </p>
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-xs font-bold text-islamic-emerald uppercase tracking-wider mb-1.5 font-sans">
                    Gaya Bahasa Pesan
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTone("formal")}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        tone === "formal"
                          ? "bg-islamic-emerald text-white border-islamic-emerald shadow-sm"
                          : "bg-white text-islamic-forest border-gold-300 hover:bg-gold-50"
                      }`}
                    >
                      Resmi / Santun
                    </button>
                    <button
                      type="button"
                      onClick={() => setTone("friendly")}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        tone === "friendly"
                          ? "bg-islamic-emerald text-white border-islamic-emerald shadow-sm"
                          : "bg-white text-islamic-forest border-gold-300 hover:bg-gold-50"
                      }`}
                    >
                      Akrab / Sahabat
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Link Info Box */}
              <div className="p-5 rounded-2xl bg-gold-500/10 border border-gold-300">
                <p className="text-xs font-bold text-islamic-emerald uppercase tracking-wider mb-1">
                  Tautan Khusus Tamu:
                </p>
                <div className="flex items-center gap-2 overflow-hidden bg-white px-3 py-2 rounded-xl border border-gold-300/80">
                  <span className="font-mono text-xs text-gold-800 truncate flex-1 select-all">
                    {invitationUrl}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="shrink-0 p-1.5 rounded-lg bg-gold-100 hover:bg-gold-200 text-gold-800 transition-colors"
                    title="Salin Tautan"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-gold-50 border border-gold-300 text-xs font-semibold text-islamic-emerald shadow-sm transition-all"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Link Tersalin!" : "Salin Link"}</span>
                  </button>

                  <a
                    href={invitationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-gold-50 border border-gold-300 text-xs font-semibold text-islamic-emerald shadow-sm transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Pratinjau</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: WhatsApp Live Preview & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl glass-card border border-gold-300 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-gold-200 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <span className="font-serif font-bold text-lg text-islamic-emerald">
                      Pratinjau Pesan WhatsApp
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-gold-700 bg-gold-100 px-2.5 py-0.5 rounded-full border border-gold-300">
                    {tone === "formal" ? "Format Resmi" : "Format Akrab"}
                  </span>
                </div>

                {/* WhatsApp Chat Preview Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#EFEAE2] border border-[#D1D7DB] text-left relative overflow-hidden shadow-inner font-sans mb-5">
                  <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm text-xs sm:text-sm text-gray-800 whitespace-pre-line leading-relaxed max-w-xl">
                    {messageText}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gold-gradient hover:bg-gold-gradient-shine text-islamic-emerald font-bold text-sm tracking-wide shadow-md shadow-gold-500/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Teks Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-islamic-emerald" />
                        <span>Salin Semua Teks</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Guest Management / History Table */}
              <div className="p-6 rounded-3xl glass-card border border-gold-300 shadow-sm">
                <div className="flex items-center justify-between border-b border-gold-200 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold-600" />
                    <span className="font-serif font-bold text-lg text-islamic-emerald">
                      Daftar Tamu Dibuat ({history.length})
                    </span>
                  </div>

                  {history.length > 0 && (
                    <button
                      onClick={() => saveHistoryToStorage([])}
                      className="text-[11px] text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus Semua</span>
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="py-8 text-center text-xs text-islamic-forest/60">
                    <p>Belum ada riwayat undangan yang dibuat.</p>
                    <p className="mt-1">Ketik nama tamu di samping untuk mulai membuat tautan.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white border border-gold-200 flex items-center justify-between gap-3 text-xs shadow-sm hover:border-gold-300 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            type="button"
                            onClick={() => toggleSentStatus(item.id)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                              item.sent
                                ? "bg-emerald-500 border-emerald-600 text-white"
                                : "border-gray-300 text-transparent hover:border-emerald-400"
                            }`}
                            title={item.sent ? "Tandai Belum Terkirim" : "Tandai Sudah Terkirim"}
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <div className="min-w-0">
                            <p
                              className={`font-semibold truncate ${
                                item.sent ? "text-gray-500 line-through" : "text-islamic-emerald"
                              }`}
                            >
                              {item.name}
                            </p>
                            <p className="text-[10px] text-islamic-forest/60 truncate">
                              {item.phone ? `${item.phone} • ` : ""}
                              {item.createdAt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gold-100 text-gray-700 hover:text-gold-800 transition-colors"
                            title="Buka Undangan"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setGuestName(item.name);
                              if (item.phone) setPhone(item.phone);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-gold-100 hover:bg-gold-200 text-gold-900 font-medium text-[11px] transition-colors"
                          >
                            Pilih
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteHistory(item.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: RSVP RECAP ================= */}
        {activeTab === "rsvp" && (
          <div className="space-y-6 animate-fade-up">
            {/* 4 Summary Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Total Responses */}
              <div className="p-5 rounded-2xl glass-card border border-gold-300 text-center shadow-sm">
                <p className="text-xs text-islamic-forest font-semibold uppercase tracking-wider">
                  Total Respons
                </p>
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-islamic-emerald my-1">
                  {totalRsvp}
                </p>
                <p className="text-[11px] text-islamic-forest/60">Tamu Mengisi</p>
              </div>

              {/* Pasti Hadir */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1 text-emerald-800 mb-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Insya Allah Hadir</span>
                </div>
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-900 my-1">
                  {totalHadirCount}
                </p>
                <p className="text-[11px] font-semibold text-emerald-800">
                  {totalHadirPax} Porsi / Pax
                </p>
              </div>

              {/* Ragu-Ragu */}
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1 text-amber-800 mb-0.5">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Masih Ragu</span>
                </div>
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-900 my-1">
                  {totalRaguCount}
                </p>
                <p className="text-[11px] font-semibold text-amber-800">
                  {totalRaguPax} Estimasi Pax
                </p>
              </div>

              {/* Berhalangan */}
              <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-300 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1 text-rose-800 mb-0.5">
                  <XCircle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Berhalangan</span>
                </div>
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-rose-900 my-1">
                  {totalTidakHadirCount}
                </p>
                <p className="text-[11px] text-rose-700/70">Kirim Doa</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-5 rounded-2xl glass-card border border-gold-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setRsvpFilter("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    rsvpFilter === "all"
                      ? "bg-islamic-emerald text-white shadow-sm"
                      : "bg-white text-islamic-forest border border-gold-300 hover:bg-gold-50"
                  }`}
                >
                  Semua ({totalRsvp})
                </button>
                <button
                  onClick={() => setRsvpFilter("hadir")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    rsvpFilter === "hadir"
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  Hadir ({totalHadirCount})
                </button>
                <button
                  onClick={() => setRsvpFilter("ragu")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    rsvpFilter === "ragu"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-white text-amber-800 border border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  Ragu ({totalRaguCount})
                </button>
                <button
                  onClick={() => setRsvpFilter("tidak_hadir")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    rsvpFilter === "tidak_hadir"
                      ? "bg-rose-700 text-white shadow-sm"
                      : "bg-white text-rose-800 border border-rose-300 hover:bg-rose-50"
                  }`}
                >
                  Berhalangan ({totalTidakHadirCount})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchRsvp}
                  onChange={(e) => setSearchRsvp(e.target.value)}
                  placeholder="Cari nama atau ucapan..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gold-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
                />
                <Search className="w-3.5 h-3.5 text-gold-600 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* List of RSVP Guest Messages */}
            <div className="space-y-3">
              {isLoadingRsvp ? (
                <div className="py-12 text-center text-xs text-islamic-forest/60">
                  <RefreshCw className="w-5 h-5 mx-auto mb-2 animate-spin text-gold-600" />
                  <p>Memuat rekapitulasi data RSVP dari Firestore...</p>
                </div>
              ) : filteredWishes.length === 0 ? (
                <div className="py-12 text-center text-xs text-islamic-forest/60 glass-card rounded-2xl border border-gold-200">
                  <p>Tidak ada data konfirmasi kehadiran yang sesuai filter.</p>
                </div>
              ) : (
                filteredWishes.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-gold-200 shadow-sm hover:border-gold-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-islamic-emerald">
                          {item.name}
                        </span>
                        {item.status === "hadir" && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-300">
                            Insya Allah Hadir ({item.pax} Orang)
                          </span>
                        )}
                        {item.status === "ragu" && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full border border-amber-300">
                            Masih Ragu ({item.pax} Orang)
                          </span>
                        )}
                        {item.status === "tidak_hadir" && (
                          <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2.5 py-0.5 rounded-full border border-rose-300">
                            Berhalangan Hadir
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-islamic-forest/85 italic leading-relaxed font-sans">
                        &ldquo;{item.message}&rdquo;
                      </p>

                      <p className="text-[10px] text-islamic-forest/50 font-sans">
                        Diterima: {item.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

