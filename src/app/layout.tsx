import type { Metadata } from "next";
import "./globals.css";
import { invitationConfig } from "@/config/invitation";

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
        url: invitationConfig.meta.ogImage,
        width: 1200,
        height: 630,
        alt: invitationConfig.meta.title,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: invitationConfig.meta.title,
    description: invitationConfig.meta.description,
    images: [invitationConfig.meta.ogImage],
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
