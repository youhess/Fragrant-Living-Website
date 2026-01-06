/**
 * Community.tsx
 * File purpose: Community section showing men/women campaign banners, press quote,
 * and Instagram community call-to-action.
 */

import React from "react";
import { Instagram } from "lucide-react";

/**
 * serifHeadingStyle
 * Shared serif font stack for headings to stay consistent with the rest of the page.
 */
const serifHeadingStyle: React.CSSProperties = {
  fontFamily: "FreightText Book, Georgia, 'Times New Roman', serif",
};

/**
 * sansCapsStyle
 * Shared sans-serif font stack used for small caps / meta text.
 */
const sansCapsStyle: React.CSSProperties = {
  fontFamily: "Avenir, system-ui, -apple-system, system-ui, sans-serif",
};

/**
 * CommunityCardProps
 * Props for a single community banner card.
 */
interface CommunityCardProps {
  /** Label for the small kicker text, e.g. "MENS" */
  label: string;
  /** Main title like "Formal & Classic" */
  title: string;
  /** Link target for the card */
  href: string;
  /** Background image URL */
  imageSrc: string;
  /** Accessible alt text describing the visual */
  imageAlt: string;
}

/**
 * CommunityCard
 * Single hero card with background image, centered text and pill Explore button.
 */
const CommunityCard: React.FC<CommunityCardProps> = ({
  label,
  title,
  href,
  imageSrc,
  imageAlt,
}) => {
  return (
    <a
      href={href}
      className="group relative block aspect-[16/9] overflow-hidden rounded-[2px] bg-neutral-900"
    >
      {/* Background image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Soft dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/18 transition-colors duration-500 group-hover:bg-black/30" />

      {/* Centered content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <span
          className="mb-1 text-[10px] tracking-[0.32em] text-white/85"
          style={sansCapsStyle}
        >
          {label}
        </span>

        <h3
          className="text-xl md:text-2xl font-normal leading-snug"
          style={serifHeadingStyle}
        >
          {title}
        </h3>

        <button
          type="button"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-white/80 bg-white/10 px-6 py-1.5 text-[10px] tracking-[0.28em] uppercase text-white shadow-sm transition-all duration-200 group-hover:bg-white group-hover:text-black group-hover:shadow-md"
          style={sansCapsStyle}
        >
          Explore
        </button>
      </div>
    </a>
  );
};

/**
 * CommunityQuote
 * Central quote block highlighting product praise and The Times logo.
 */
const CommunityQuote: React.FC = () => {
  return (
    <section className="px-4 text-center">
      <p
        className="text-base md:text-lg lg:text-xl italic text-neutral-900"
        style={serifHeadingStyle}
      >
        “I cannot fault this parka – it has everything!”
      </p>

      <p
        className="mt-3 text-[11px] md:text-[12px] uppercase tracking-[0.32em] text-neutral-600"
        style={sansCapsStyle}
      >
        Anna Murphy,&nbsp;Fashion Editor
      </p>

      <div className="mt-6">
        <img
          src="https://pub-cdn.sider.ai/u/U0R7HRXYJ5L/web-coder/6953c926f028f342ba3548f9/resource/61f08fc5-dc9a-445f-b3e6-14a68ff4a8b4.jpg"
          alt="The Times"
          className="mx-auto h-7 w-auto object-contain"
        />
      </div>
    </section>
  );
};

/**
 * CommunityInstagram
 * Instagram call-to-action with title, copy and circular Instagram button.
 */
const CommunityInstagram: React.FC = () => {
  return (
    <section className="px-4 text-center">
      <h2
        className="text-2xl md:text-3xl lg:text-[32px] font-normal tracking-tight text-neutral-900"
        style={serifHeadingStyle}
      >
        Norwegian Rain <em className="italic">on you</em>
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-[13px] md:text-sm leading-relaxed text-neutral-600">
        Use #norwegianrain on Instagram to share how you wear your coat. Follow
        @norwegianrain and tag us for a chance to be featured in our channels.
      </p>

      <a
        href="https://instagram.com/norwegianrain"
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex items-center justify-center gap-3 rounded-full border border-neutral-900 bg-neutral-900 px-5 py-2 text-[11px] tracking-[0.22em] uppercase text-white transition-colors duration-200 hover:bg-black"
        style={sansCapsStyle}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900">
          <Instagram className="h-4 w-4" aria-hidden="true" />
        </span>
        <span>@norwegianrain</span>
      </a>
    </section>
  );
};

/**
 * Community
 * Full community section composed of two banner rows, a quote, and Instagram CTA.
 */
const Community: React.FC = () => {
  // First row images: Formal & Classic
  const formalClassicImages = {
    men: "https://norwegianrain.com/wp-content/uploads/2023/09/Mens-Formal-Classic-600x400.jpg",
    women:
      "https://norwegianrain.com/wp-content/uploads/2023/09/Womens-Formal-Classic-600x400.jpg",
  };

  // Second row images: Signature Pieces
  const signatureImages = {
    men: "https://norwegianrain.com/wp-content/uploads/2023/09/Mens-Signature-600x800.jpg",
    women:
      "https://norwegianrain.com/wp-content/uploads/2023/09/Womens-Signature.jpg",
  };

  return (
    <section
      className="w-full bg-white py-14 md:py-16 lg:py-20"
      aria-label="Norwegian Rain community"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 md:px-6 lg:gap-20">
        {/* Row 1: Formal & Classic */}
        <div className="grid gap-4 md:grid-cols-2">
          <CommunityCard
            label="MENS"
            title="Formal &amp; Classic"
            href="https://norwegianrain.com/products/men/"
            imageSrc={formalClassicImages.men}
            imageAlt="Formal and classic mens raincoat editorial"
          />
          <CommunityCard
            label="WOMENS"
            title="Formal &amp; Classic"
            href="https://norwegianrain.com/products/women/"
            imageSrc={formalClassicImages.women}
            imageAlt="Formal and classic womens raincoat editorial"
          />
        </div>

        {/* Quote block */}
        <CommunityQuote />

        {/* Row 2: Signature Pieces */}
        <div className="grid gap-4 md:grid-cols-2">
          <CommunityCard
            label="MENS"
            title="Signature Pieces"
            href="https://norwegianrain.com/products/men/"
            imageSrc={signatureImages.men}
            imageAlt="Signature mens raincoat pieces in the rain"
          />
          <CommunityCard
            label="WOMENS"
            title="Signature Pieces"
            href="https://norwegianrain.com/products/women/"
            imageSrc={signatureImages.women}
            imageAlt="Signature womens raincoat pieces in nature"
          />
        </div>

        {/* Instagram CTA */}
        <CommunityInstagram />
      </div>
    </section>
  );
};

export default Community;
