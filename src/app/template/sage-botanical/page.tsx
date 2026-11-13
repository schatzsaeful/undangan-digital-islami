"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SageBotanicalInvitation } from "@/components/templates/sage-botanical/SageBotanicalInvitation";
import { ThemePreviewBar } from "@/components/theme/ThemePreviewBar";

function SageBotanicalContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || searchParams.get("tamu") || searchParams.get("u") || "";

  return (
    <div className="relative min-h-screen">
      {/* Interactive Floating Theme Switcher */}
      <ThemePreviewBar currentTheme="sage-botanical" />

      {/* Main Sage Botanical Theme Component */}
      <SageBotanicalInvitation guestName={guestName} />
    </div>
  );
}

export default function SageBotanicalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] text-[#4A6354] flex items-center justify-center">Memuat template...</div>}>
      <SageBotanicalContent />
    </Suspense>
  );
}

