/**
 * BrandStory.tsx
 * File purpose: Render the brand story section composed of a top quote bar
 * and a full-width hero image with overlaid copy describing the brand history.
 */

import React, { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * useInViewObserver
 * Purpose: Lightweight IntersectionObserver hook to trigger a fade-in animation
 * when the target element enters the viewport.
 *
 * @param threshold - IntersectionObserver threshold
 */
function useInViewObserver(
  threshold: number = 0.2,
): { ref: React.RefObject<HTMLElement>; isVisible: boolean } {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

/**
 * QuoteBar
 * Description: Renders the top quote block on a clean white background,
 * used as a subtle section intro above the story hero.
 */
const QuoteBar: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-[15px] md:text-[17px] leading-relaxed text-gray-800 italic">
          “the label has redefined functional fashion”
        </p>
        <p className="mt-3 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-gray-600">
          Icon Magazine
        </p>
      </div>
    </section>
  )
}

/**
 * StoryHero
 * Description: Full-width background image hero with centered overlay copy
 * describing the brand history (Our history + main heading).
 */
const StoryHero: React.FC = () => {
  const { ref, isVisible } = useInViewObserver(0.25)

  const heroBackgroundStyle: CSSProperties = {
    backgroundImage:
      'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url("https://norwegianrain.com/wp-content/uploads/2023/03/our-history-hero-section.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  }

  return (
    <section
      ref={ref}
      className={`relative w-full text-white transition-opacity duration-400 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={heroBackgroundStyle}
      aria-labelledby="brand-story-heading"
    >
      <div className="flex min-h-[420px] items-center justify-center px-6 py-16 md:min-h-[520px] lg:min-h-[620px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] md:text-[12px] tracking-[0.24em] uppercase text-gray-100">
            Our history
          </p>
          <h2
            id="brand-story-heading"
            className="mt-4 font-serif text-[26px] leading-snug md:text-[34px] md:leading-snug lg:text-[44px] lg:leading-tight"
          >
            How creating the best raincoat in the world became our mission.
          </h2>
        </div>
      </div>
    </section>
  )
}

/**
 * BrandStory
 * Description: Public component that composes the quote bar and story hero
 * into a single brand storytelling section.
 */
const BrandStory: React.FC = () => {
  return (
    <section aria-label="Brand story">
      <QuoteBar />
      <StoryHero />
    </section>
  )
}

export default BrandStory
