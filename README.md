# 💍 Undangan Digital Islami Modern & Elegan

Aplikasi web undangan pernikahan digital berbasis **Next.js 15 (App Router)** dan **Tailwind CSS** dengan nuansa Islami yang mewah, santun, dan modern (*Emerald Green & Royal Gold*).

---

## ✨ Fitur Utama

1. **Cover / Sampul Interaktif**:
   - Deteksi nama tamu otomatis via parameter URL (`?to=Nama+Tamu` atau `?tamu=Fulan`).
   - Tombol **"Buka Undangan"** dengan animasi smooth + efek *confetti* perayaan.
   - Otomatis memutar musik latar saat sampul dibuka.

2. **Nuansa Islami & Sopan**:
   - Kaligrafi Basmalah & ornamen geometris Islam (*Rub el Hizb* 8-point star).
   - Ayat suci Al-Qur'an (QS. Ar-Rum: 21) lengkap dengan teks Arab harakat, terjemahan, dan tafsir singkat.
   - Salam pembuka dan penutup penuh doa dan tata krama Islami.
   - Doa pengantin sunnah: *Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir*.
   - **Adab Walimah**: Panduan adab menghadiri pesta pernikahan sesuai syariat Islam (berbusana sopan, adab makan/minum duduk tangan kanan, mendoakan mempelai).

3. **Detail Mempelai & Acara**:
   - Profil Mempelai Pria & Wanita (nama lengkap bergelar, putra/putri dari Bapak & Ibu, akun media sosial).
   - Countdown Timer *realtime* menuju hari H (Hari, Jam, Menit, Detik).
   - Jadwal Akad Nikah & Walimatul 'Urs lengkap dengan tombol **"Petunjuk Arah (Google Maps)"** dan **"Simpan ke Google Calendar"**.

4. **Kisah Cinta & Galeri**:
   - Timeline perjalanan ta'aruf, khitbah, hingga jenjang pernikahan yang santun.
   - Galeri foto kenangan dengan fitur *lightbox preview*.

5. **Amplop Digital & Kado Fisik**:
   - Nomor rekening Bank Syariah (BSI), BCA, Mandiri dengan tombol **"Salin No. Rekening"** (clipboard feedback).
   - Alamat pengiriman kado fisik beserta tombol salin alamat.

6. **Buku Tamu (RSVP) & Doa Restu**:
   - Form konfirmasi kehadiran (Insya Allah Hadir / Ragu / Berhalangan, Jumlah Orang).
   - Kolom pesan doa restu yang tersimpan dan langsung tampil di daftar ucapan.

7. **Floating Audio Player**:
   - Tombol pengontrol musik terapung di sudut layar dengan animasi piringan berputar, dapat di-pause dan di-play kapan saja.

---

## ⚙️ Cara Mengubah Data (Nama, Tanggal, Rekening, dll)

Semua konten dapat diubah hanya dengan mengedit satu file konfigurasi:
👉 **`src/config/invitation.ts`**

Contoh bagian yang bisa diedit:
```typescript
groom: {
  fullName: "Muhammad Fathurrahman, S.T.",
  nickName: "Fathur",
  fatherName: "H. Abdullah Rahman, M.Pd.",
  motherName: "Hj. Siti Aminah",
  // ...
},
bride: {
  fullName: "Siti Aisyah Azzahra, S.Farm.",
  nickName: "Aisyah",
  fatherName: "H. Rahmat Hidayat",
  motherName: "Hj. Nurul Khadijah",
  // ...
},
events: {
  akad: {
    date: "Sabtu, 12 Desember 2026",
    time: "08.00 - 10.00 WIB",
    locationName: "Masjid Agung Al-Barkah",
    // ...
  }
}
```

---

## 🚀 Cara Menghubungkan ke Vercel dengan Domain Tidak Random

Agar nama link undangan Anda rapi dan tidak acak (misal: `undangan-fathur-aisyah.vercel.app` atau domain sendiri `wedding.domainanda.com`), ikuti salah satu cara berikut:

### Opsi 1: Menggunakan Vercel Dashboard (Paling Mudah)

1. **Upload / Push ke GitHub**:
   - Buat repository baru di GitHub dengan nama sesuai keinginan, misal: `undangan-fathur-aisyah`.
   - Push kode dari komputer Anda:
     ```bash
     git remote add origin https://github.com/USERNAME/undangan-fathur-aisyah.git
     git branch -M main
     git push -u origin main
     ```

2. **Import ke Vercel**:
   - Buka [vercel.com](https://vercel.com) dan login.
   - Klik **"Add New..."** -> **"Project"**.
   - Pilih repository GitHub Anda tadi.
   - Pada kolom **"Project Name"**, **Ketik nama yang Anda inginkan**!
     > *Contoh:* Jika Anda mengetik `undangan-fathur-aisyah`, maka domain default Anda akan otomatis menjadi:  
     > **`https://undangan-fathur-aisyah.vercel.app`** (bukan hash acak!).
   - Klik **"Deploy"**.

3. **Mengatur / Mengganti Nama Domain di Vercel Kapan Saja**:
   - Buka project Anda di dashboard Vercel -> klik tab **"Settings"** -> pilih **"Domains"**.
   - Di sini Anda bisa:
     - **Ubah Subdomain Vercel**: Tambahkan nama baru seperti `nikahan-fathur-aisyah.vercel.app`.
     - **Gunakan Custom Domain Sendiri**: Masukkan domain Anda sendiri (misal: `undangan.keluarga-fathur.com` atau `fathurdanaisyah.id`).
     - Vercel akan otomatis memberikan petunjuk DNS (CNAME / A record) dan sertifikat SSL gratis (HTTPS).

---

### Opsi 2: Menggunakan Vercel CLI (Lewat Terminal)

Anda sudah memiliki Vercel CLI terpasang. Cukup jalankan perintah berikut di terminal:

```bash
vercel
```

Saat muncul pertanyaan:
- `Set up and deploy?`: Ketik **Y**
- `Which scope?`: Pilih akun Vercel Anda
- `Link to existing project?`: Ketik **N**
- `What’s your project’s name?`: **Ketik nama domain yang Anda inginkan** (misal: `undangan-fathur-aisyah`)
- `In which directory is your code located?`: Tekan **Enter** (default `./`)
- Vercel akan langsung membuat domain: **`https://nama-pilihan-anda.vercel.app`**

Untuk deploy ke production:
```bash
vercel --prod
```

---

## 💌 Cara Membagikan Link ke Tamu Undangan

Untuk membuat undangan personal dengan nama tamu tercetak di sampul depan:
Cukup tambahkan `?to=Nama+Tamu` di akhir URL:

- `https://undangan-fathur-aisyah.vercel.app/?to=Bapak+Haji+Ahmad`
- `https://undangan-fathur-aisyah.vercel.app/?to=dr.+Farhan+dan+Keluarga`
- `https://undangan-fathur-aisyah.vercel.app/?to=Sahabat+Alumni+SMA+1`

Nama tamu akan otomatis tampil di kartu sampul depan dengan sangat elegan dan sopan!

---

## 💻 Menjalankan di Komputer Lokal

```bash
# Jalankan server development
npm run dev

# Buka di browser
# http://localhost:3000
```
