"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { SectionDivider } from "./IslamicOrnaments";

interface GalleryItem {
  url: string;
  caption: string;
}

interface GallerySectionProps {
  galleries: GalleryItem[];
}

export function GallerySection({ galleries }: GallerySectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="galeri">
      <SectionDivider
        title="Galeri Memori"
        subtitle="Momen berharga dan penuh syukur dalam menyambut hari suci"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-10">
        {galleries.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedPhoto(item)}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-gold-300/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <Image
              src={item.url}
              alt={item.caption}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-islamic-emerald/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
              <ZoomIn className="w-5 h-5 text-gold-300 mb-1" />
              <p className="text-xs sm:text-sm font-medium line-clamp-2">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            aria-label="Tutup foto"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-gold-400/40">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="text-white text-sm sm:text-base text-center mt-3 font-medium">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
