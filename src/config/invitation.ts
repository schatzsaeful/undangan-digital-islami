export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logo?: string;
  qrCodeUrl?: string;
}

export interface StoryItem {
  year: string;
  title: string;
  description: string;
}

export interface EventDetail {
  title: string;
  date: string; // e.g. "Ahad, 12 Desember 2026"
  isoDate: string; // ISO format for countdown "2026-12-12T08:00:00"
  time: string; // "08.00 - 10.00 WIB"
  locationName: string;
  address: string;
  mapsUrl: string;
  calendarUrl: string;
}

export interface InvitationConfig {
  meta: {
    title: string;
    description: string;
    ogImage: string;
    url: string;
  };
  audio: {
    src: string;
    title: string;
    artist: string;
  };
  quranVerse: {
    arabic: string;
    translation: string;
    surah: string;
  };
  groom: {
    fullName: string;
    nickName: string;
    fatherName: string;
    motherName: string;
    orderInFamily: string; // "Putra pertama dari"
    photo: string;
    instagram?: string;
  };
  bride: {
    fullName: string;
    nickName: string;
    fatherName: string;
    motherName: string;
    orderInFamily: string; // "Putri kedua dari"
    photo: string;
    instagram?: string;
  };
  events: {
    akad: EventDetail;
    resepsi: EventDetail;
  };
  mainDate: string; // Target ISO date for countdown
  stories: StoryItem[];
  galleries: {
    url: string;
    caption: string;
  }[];
  bankAccounts: BankAccount[];
  physicalGiftAddress: {
    recipient: string;
    phone: string;
    address: string;
  };
  adabWalimah: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const invitationConfig: InvitationConfig = {
  meta: {
    title: "Walimatul 'Urs | Heri & Asri",
    description: "Undangan Pernikahan Islami Modern & Elegan - Heri Rahmat Susanto & Asri Agustini",
    ogImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    url: "https://walimatulurs-heri-asri.vercel.app",
  },
  audio: {
    // Royalty-free peaceful instrumental acoustic melody served directly from public folder
    src: "/audio/backsound.mp3",
    title: "Kisah Kasih Menuju Ridho Ilahi",
    artist: "Harmoni Cinta Islami",
  },
  quranVerse: {
    arabic: "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
    translation:
      "\"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.\"",
    surah: "QS. Ar-Rum: 21",
  },
  groom: {
    fullName: "Heri Rahmat Susanto",
    nickName: "Heri",
    fatherName: "H. Susanto",
    motherName: "Hj. Rahmawati",
    orderInFamily: "Putra pertama dari",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    instagram: "https://instagram.com",
  },
  bride: {
    fullName: "Asri Agustini",
    nickName: "Asri",
    fatherName: "H. Agusti",
    motherName: "Hj. Nurhayati",
    orderInFamily: "Putri kedua dari",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    instagram: "https://instagram.com",
  },
  mainDate: "2026-12-12T08:00:00",
  events: {
    akad: {
      title: "Akad Nikah",
      date: "Sabtu, 12 Desember 2026",
      isoDate: "2026-12-12T08:00:00",
      time: "08.00 - 10.00 WIB",
      locationName: "Masjid Agung Al-Barkah",
      address: "Jl. Veteran No. 45, Kebayoran Baru, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=Masjid+Agung+Al-Barkah",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Heri+%26+Asri&dates=20261212T010000Z/20261212T030000Z&details=Akad+Nikah+Heri+Rahmat+Susanto+%26+Asri+Agustini&location=Masjid+Agung+Al-Barkah",
    },
    resepsi: {
      title: "Walimatul 'Urs (Resepsi)",
      date: "Sabtu, 12 Desember 2026",
      isoDate: "2026-12-12T11:00:00",
      time: "11.00 - 14.00 WIB",
      locationName: "Grand Ballroom Al-Jazeera Convention Hall",
      address: "Jl. Raden Saleh No. 88, Menteng, Jakarta Pusat",
      mapsUrl: "https://maps.google.com/?q=Jakarta+Ballroom",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Walimatul+'Urs+Heri+%26+Asri&dates=20261212T040000Z/20261212T070000Z&details=Resepsi+Pernikahan+Heri+Rahmat+Susanto+%26+Asri+Agustini&location=Grand+Ballroom+Al-Jazeera",
    },
  },
  stories: [
    {
      year: "2024",
      title: "Awal Pertemuan (Ta'aruf)",
      description:
        "Dengan niat tulus beribadah menyempurnakan separuh agama, perantara keluarga memperkenalkan kami dalam proses ta'aruf yang santun dan syar'i.",
    },
    {
      year: "2025",
      title: "Khitbah & Pertemuan Dua Keluarga",
      description:
        "Didampingi keluarga besar, pihak keluarga pria menyampaikan maksud baik untuk meminang sang pujaan hati. Restu dan doa kedua orang tua mengiringi langkah kami.",
    },
    {
      year: "2026",
      title: "Menuju Ikatan Suci",
      description:
        "Insya Allah, ikatan suci pernikahan diikrarkan di hadapan Allah SWT. Menyatukan dua insan dalam mahligai rumah tangga sakinah, mawaddah, warahmah.",
    },
  ],
  galleries: [
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      caption: "Momen Ta'aruf & Silaturahmi",
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: "Cincin Khitbah & Amanah",
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: "Dekorasi Nuansa Elegan & Suci",
    },
    {
      url: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80",
      caption: "Doa Bersama Keluarga Tercinta",
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
      caption: "Langkah Menuju Hari Bahagia",
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      caption: "Mengharapkan Ridho dan Keberkahan-Nya",
    },
  ],
  bankAccounts: [
    {
      bankName: "Bank Syariah Indonesia (BSI)",
      accountNumber: "7123456789",
      accountHolder: "Heri Rahmat Susanto",
      logo: "BSI",
    },
    {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "8820123456",
      accountHolder: "Asri Agustini",
      logo: "BCA",
    },
    {
      bankName: "Bank Mandiri",
      accountNumber: "1230009876543",
      accountHolder: "Heri Rahmat Susanto",
      logo: "MANDIRI",
    },
  ],
  physicalGiftAddress: {
    recipient: "Keluarga Heri & Asri",
    phone: "+62 812-3456-7890",
    address: "Perumahan Griya Sakinah Asri Blok B No. 12, Kebayoran Baru, Jakarta Selatan, 12150",
  },
  adabWalimah: [
    {
      title: "Mendoakan Pengantin",
      description: "Mendoakan keberkahan: 'Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir.'",
      icon: "HeartHandshake",
    },
    {
      title: "Berbusana Menutup Aurat",
      description: "Mengenakan busana yang sopan, rapi, dan menutup aurat sesuai syariat Islam.",
      icon: "Shirt",
    },
    {
      title: "Adab Makan & Minum",
      description: "Makan dan minum sambil duduk, menggunakan tangan kanan, serta tidak berlebihan (mubazir).",
      icon: "Utensils",
    },
    {
      title: "Menjaga Pandangan & Adab",
      description: "Menjaga sopan santun serta menghormati sesama tamu undangan dengan penuh ukhuwah.",
      icon: "Users",
    },
  ],
};

