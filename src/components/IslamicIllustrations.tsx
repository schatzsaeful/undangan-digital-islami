import React from "react";

// Elegant Faceless Syar'i Groom Illustration
export function GroomIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="groomBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#163832" />
            <stop offset="100%" stopColor="#0B2B26" />
          </linearGradient>
          <linearGradient id="goldGroom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6EFCF" />
            <stop offset="50%" stopColor="#D5A438" />
            <stop offset="100%" stopColor="#996E14" />
          </linearGradient>
        </defs>

        {/* Circular Background */}
        <circle cx="120" cy="120" r="110" fill="url(#groomBg)" />
        <circle cx="120" cy="120" r="105" stroke="url(#goldGroom)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

        {/* Halo / Aura */}
        <circle cx="120" cy="90" r="42" fill="#D5A438" opacity="0.08" />

        {/* Kopiah / Peci */}
        <path
          d="M92 68 C92 56, 148 56, 148 68 L146 82 C146 84, 94 84, 94 82 Z"
          fill="#061713"
          stroke="url(#goldGroom)"
          strokeWidth="1.5"
        />
        {/* Peci Gold Band Accent */}
        <path d="M93 78 C110 80, 130 80, 147 78" stroke="url(#goldGroom)" strokeWidth="1.5" />

        {/* Faceless Head Silhouette */}
        <path
          d="M98 80 C98 106, 142 106, 142 80 C142 70, 98 70, 98 80 Z"
          fill="#FDFBF7"
          opacity="0.95"
        />

        {/* Neck */}
        <path d="M112 100 L112 114 L128 114 L128 100 Z" fill="#F4EFEA" />

        {/* Formal Suit / Baju Koko Syar'i */}
        <path
          d="M72 175 C72 135, 104 116, 120 116 C136 116, 168 135, 168 175 L168 210 C168 210, 150 220, 120 220 C90 220, 72 210, 72 210 Z"
          fill="#0B2B26"
          stroke="url(#goldGroom)"
          strokeWidth="1.5"
        />

        {/* Collar & Tie / Koko Placket */}
        <path d="M110 116 L120 134 L130 116" stroke="url(#goldGroom)" strokeWidth="2" fill="none" />
        <path d="M120 134 L120 190" stroke="url(#goldGroom)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Golden Buttons */}
        <circle cx="120" cy="144" r="2.5" fill="url(#goldGroom)" />
        <circle cx="120" cy="158" r="2.5" fill="url(#goldGroom)" />
        <circle cx="120" cy="172" r="2.5" fill="url(#goldGroom)" />

        {/* Decorative Gold Laurel Leaves Bottom */}
        <path
          d="M50 185 C65 170, 85 195, 95 210"
          stroke="url(#goldGroom)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M190 185 C175 170, 155 195, 145 210"
          stroke="url(#goldGroom)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

// Elegant Faceless Syar'i Bride Illustration
export function BrideIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="brideBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#163832" />
            <stop offset="100%" stopColor="#0B2B26" />
          </linearGradient>
          <linearGradient id="goldBride" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6EFCF" />
            <stop offset="50%" stopColor="#D5A438" />
            <stop offset="100%" stopColor="#996E14" />
          </linearGradient>
        </defs>

        {/* Circular Background */}
        <circle cx="120" cy="120" r="110" fill="url(#brideBg)" />
        <circle cx="120" cy="120" r="105" stroke="url(#goldBride)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

        {/* Halo / Aura */}
        <circle cx="120" cy="90" r="45" fill="#D5A438" opacity="0.08" />

        {/* Flowing Veil / Selendang Syar'i (Back Layer) */}
        <path
          d="M75 95 C65 140, 70 190, 80 220 C100 225, 140 225, 160 220 C170 190, 175 140, 165 95 Z"
          fill="#1C443C"
          opacity="0.6"
        />

        {/* Elegant Khimar / Hijab Syar'i */}
        <path
          d="M86 85 C86 52, 154 52, 154 85 C154 110, 164 140, 172 185 C155 195, 85 195, 68 185 C76 140, 86 110, 86 85 Z"
          fill="#FDFBF7"
          stroke="url(#goldBride)"
          strokeWidth="1.5"
        />

        {/* Hijab Drape Layer */}
        <path
          d="M86 85 C98 96, 142 96, 154 85 C154 115, 145 155, 120 170 C95 155, 86 115, 86 85 Z"
          fill="#F7F3EB"
        />

        {/* Faceless Face Silhouette */}
        <path
          d="M102 76 C102 98, 138 98, 138 76 C138 64, 102 64, 102 76 Z"
          fill="#FFFDF9"
        />

        {/* Elegant Gold Tiara / Mahkota Pengantin Syar'i */}
        <path
          d="M104 63 L110 57 L116 63 L120 54 L124 63 L130 57 L136 63"
          stroke="url(#goldBride)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="120" cy="52" r="2" fill="url(#goldBride)" />
        <circle cx="110" cy="55" r="1.5" fill="url(#goldBride)" />
        <circle cx="130" cy="55" r="1.5" fill="url(#goldBride)" />

        {/* Syar'i Wedding Gown (Bottom Body) */}
        <path
          d="M65 185 C70 180, 105 170, 120 170 C135 170, 170 180, 175 185 L180 220 C160 226, 80 226, 60 220 Z"
          fill="#FDFBF7"
          stroke="url(#goldBride)"
          strokeWidth="1.5"
        />

        {/* Lace / Brocade Details on Gown */}
        <path d="M100 185 C110 190, 130 190, 140 185" stroke="url(#goldBride)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M90 200 C110 208, 130 208, 150 200" stroke="url(#goldBride)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Floral Olive Leaves */}
        <path
          d="M50 185 C65 170, 85 195, 95 210"
          stroke="url(#goldBride)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M190 185 C175 170, 155 195, 145 210"
          stroke="url(#goldBride)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

// Royal Islamic Monogram Crest (H & A)
export function CoupleMonogramCrest({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6EFCF" />
            <stop offset="35%" stopColor="#D5A438" />
            <stop offset="70%" stopColor="#E5C158" />
            <stop offset="100%" stopColor="#996E14" />
          </linearGradient>
          <linearGradient id="crestEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#163832" />
            <stop offset="100%" stopColor="#0B2B26" />
          </linearGradient>
        </defs>

        {/* Outer 8-point Islamic Star / Rub el Hizb Medallion */}
        <rect
          x="65"
          y="65"
          width="170"
          height="170"
          rx="18"
          fill="url(#crestEmerald)"
          stroke="url(#crestGold)"
          strokeWidth="2"
          transform="rotate(0 150 150)"
        />
        <rect
          x="65"
          y="65"
          width="170"
          height="170"
          rx="18"
          fill="url(#crestEmerald)"
          stroke="url(#crestGold)"
          strokeWidth="2"
          transform="rotate(45 150 150)"
        />

        {/* Inner Golden Ring */}
        <circle cx="150" cy="150" r="82" stroke="url(#crestGold)" strokeWidth="1.5" strokeDasharray="5 3" />
        <circle cx="150" cy="150" r="76" stroke="url(#crestGold)" strokeWidth="0.75" />

        {/* Arabesque Laurel Wreath */}
        <path
          d="M95 150 C95 185, 120 215, 150 215 C180 215, 205 185, 205 150"
          stroke="url(#crestGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M95 150 C95 115, 120 85, 150 85 C180 85, 205 115, 205 150"
          stroke="url(#crestGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 4"
        />

        {/* Monogram Typography H & A */}
        <text
          x="115"
          y="162"
          fontFamily="serif"
          fontSize="48"
          fontWeight="bold"
          fill="url(#crestGold)"
          textAnchor="middle"
        >
          H
        </text>
        <text
          x="150"
          y="155"
          fontFamily="serif"
          fontSize="24"
          fontWeight="300"
          fill="#ECD99A"
          textAnchor="middle"
        >
          &amp;
        </text>
        <text
          x="185"
          y="162"
          fontFamily="serif"
          fontSize="48"
          fontWeight="bold"
          fill="url(#crestGold)"
          textAnchor="middle"
        >
          A
        </text>

        {/* Small Islamic 8-Point Star at Top & Bottom */}
        <circle cx="150" cy="85" r="4" fill="url(#crestGold)" />
        <circle cx="150" cy="215" r="4" fill="url(#crestGold)" />
      </svg>
    </div>
  );
}
