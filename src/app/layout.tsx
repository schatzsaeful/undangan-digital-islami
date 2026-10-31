import type { Metadata, Viewport } from "next";
import "./globals.css";
import { invitationConfig } from "@/config/invitation";

export const viewport: Viewport = {
  themeColor: "#0B2B26",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: invitationConfig.meta.title,
  description: invitationConfig.meta.description,
  metadataBase: new URL(invitationConfig.meta.url),
  openGraph: {
    title: invitationConfig.meta.title,
    description: invitationConfig.meta.description,
    url: invitationConfig.meta.url,
    siteName: invitationConfig.meta.title,
    images: [
      {
        url: "/images/og-banner.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Walimatul 'Urs Heri & Asri",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: invitationConfig.meta.title,
    description: invitationConfig.meta.description,
    images: ["/images/og-banner.jpg"],
  },
  other: {
    "format-detection": "telephone=no, address=no, email=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-islamic-ivory text-islamic-emerald min-h-screen selection:bg-gold-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
