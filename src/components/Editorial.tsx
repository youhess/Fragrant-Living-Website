/**
 * Editorial.tsx
 * File purpose: Centered editorial tagline block placed below the Hero section,
 * following the AUTUMN/WINTER 2025/2026 layout from the provided reference image.
 */

import React from "react";

/**
 * Editorial
 * Renders a three-line editorial text block:
 * 1. Small uppercase season label
 * 2. Large serif headline
 * 3. Supporting uppercase tagline
 */
const Editorial: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 hidden lg:block">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Season label */}
        <p
          className="mb-4 text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#555555]"
          style={{
            fontFamily: "Avenir, system-ui, -apple-system, sans-serif",
          }}
        >
          AUTUMN/WINTER 2025/2026
        </p>

        {/* Main headline */}
        <h2
          className="mb-4 text-3xl md:text-[40px] leading-snug text-[#333333] font-normal"
          style={{
            fontFamily: "FreightText Book, Georgia, 'Times New Roman', serif",
          }}
        >
          Ready for Autumn?
        </h2>

        {/* Supporting line */}
        <p
          className="mx-auto max-w-2xl text-[11px] md:text-[12px] tracking-[0.16em] uppercase text-[#444444] leading-relaxed"
          style={{
            fontFamily: "Avenir, system-ui, -apple-system, sans-serif",
          }}
        >
          Contemporary outerwear balancing sartorial elegance with everyday
          wearability
        </p>
      </div>
    </section>
  );
};

export default Editorial;
