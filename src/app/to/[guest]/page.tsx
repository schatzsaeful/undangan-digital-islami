import type { Metadata } from "next";
import { invitationConfig } from "@/config/invitation";
import { GuestPersonalInvitation } from "./GuestPersonalInvitation";

interface PageProps {
  params: Promise<{
    guest: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawName = resolvedParams.guest || "";
  const guestName = decodeURIComponent(rawName).replace(/-/g, " ");

  const title = `Undangan Walimatul 'Urs Heri & Asri - Khusus: ${guestName}`;
  const description = `Kepada Yth. ${guestName}. Tanpa mengurangi rasa hormat, kami mengundang Anda untuk menghadiri Walimatul 'Urs Syar'i Heri Rahmat Susanto & Asri Agustini • Sabtu, 12 Desember 2026.`;
  const url = `${invitationConfig.meta.url}/to/${resolvedParams.guest}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: invitationConfig.meta.title,
      images: [
        {
          url: "/images/og-banner.jpg",
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: `Undangan Walimatul 'Urs Heri & Asri untuk ${guestName}`,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-banner.jpg"],
    },
  };
}

export default async function GuestPersonalPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawName = resolvedParams.guest || "";
  const guestName = decodeURIComponent(rawName).replace(/-/g, " ");

  return <GuestPersonalInvitation guestName={guestName} />;
}
