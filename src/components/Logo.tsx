export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-[#faf9f6] border border-[#ddc0ba]/40 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield background */}
        <path
          d="M50 12 C30 12 18 26 18 46 C18 68 40 84 50 90 C60 84 82 68 82 46 C82 26 70 12 50 12 Z"
          fill="#FAF9F6"
          stroke="#9F402D"
          strokeWidth="3.5"
        />
        {/* Compass Star Accents */}
        <path d="M50 20 L50 44" stroke="#006B5B" strokeWidth="3" strokeLinecap="round" />
        <path d="M28 46 L40 46" stroke="#006B5B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60 46 L72 46" stroke="#006B5B" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Teal Foliage / Canopy */}
        <path
          d="M28 36 C24 36 22 30 28 26 C32 20 44 20 48 24 C52 18 66 18 70 24 C78 28 76 36 72 36 C68 36 65 38 62 38 C56 38 52 35 50 35 C48 35 44 38 38 38 C35 38 32 36 28 36 Z"
          fill="#006B5B"
        />
        
        {/* Terracotta Baobab Trunk & Branches */}
        <path
          d="M45 42 L32 34 C30 32 34 30 38 33 L46 38 L46 72 C46 76 43 82 50 86 C57 82 54 76 54 72 L54 38 L62 33 C66 30 70 32 68 34 L55 42 L55 72 L45 72 Z"
          fill="#9F402D"
        />
        <path
          d="M50 40 L50 84"
          stroke="#E2725B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
