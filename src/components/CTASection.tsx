/**
 * CTASection.tsx
 * File purpose: Implements the "Life in Bergen – the rainiest city of Europe."
 * call-to-action storytelling block with a collapsible long-form article.
 * The section shows a title, intro, and "Read more" pill; clicking expands
 * the full brand story, people grid, and flagship information.
 */

import React, { useState } from 'react'

/**
 * CTASection
 * Renders the Bergen story CTA section with expandable long-form content.
 * - Default: title + faded excerpt + "Read more" pill button.
 * - Expanded: reveals additional paragraphs, founders grid, long article,
 *   flagship stores intro, and a desktop-only cities row.
 */
export default function CTASection(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false)

  /**
   * Handles clicking the "Read more" button.
   * Only expands once; subsequent clicks have no further effect.
   */
  const handleReadMoreClick = (): void => {
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }

  return (
    <section
      className="bg-[#f5f2ef] py-16 md:py-20 lg:py-24"
      aria-labelledby="bergen-story-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        {/* Heading */}
        <h2
          id="bergen-story-heading"
          className="font-serif text-2xl md:text-3xl lg:text-[40px] leading-tight md:leading-snug text-gray-900"
        >
          Life in Bergen –{' '}
          <em className="italic">the rainiest city of Europe.</em>
        </h2>

        {/* Intro / faded excerpt */}
        <p className="mt-5 text-sm md:text-[15px] leading-relaxed md:leading-8 text-gray-600/80">
          Living in Bergen means a life in rain. You can hate it or love it, but
          no matter how you approach it, one thing is certain: It will rain
          tomorrow. Or the day after.
        </p>

        {/* Read more pill button – hidden once expanded */}
        {!isExpanded && (
          <button
            type="button"
            onClick={handleReadMoreClick}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-1.5 text-[10px] tracking-[0.18em] uppercase text-gray-800 shadow-sm transition-colors transition-shadow duration-200 hover:border-gray-400 hover:shadow-md"
            aria-expanded={isExpanded}
          >
            Read more
          </button>
        )}

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-9 space-y-10 md:space-y-12 animate-in fade-in-50 duration-500">
            {/* Additional paragraph */}
            <p className="text-sm md:text-[15px] leading-relaxed md:leading-8 text-gray-700">
              Founder and creative director Alexander Helle is born and raised
              in Bergen, a city on the west coast of Norway known for its heavy
              rain, underground music scene and the encapsulating 7 mountains
              that bring wild nature all the way into the city streets.
            </p>

            {/* Two-column people information */}
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="space-y-1">
                <h3 className="text-base md:text-lg font-medium text-gray-900">
                  Alexander Torgnes Helle
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Founder &amp; Creative Director
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-base md:text-lg font-medium text-gray-900">
                  T-Michael
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Head Designer &amp; Chief Strategist
                </p>
              </div>
            </div>

            {/* Long article + flagship intro */}
            <div className="mx-auto max-w-2xl space-y-6 text-sm md:text-[15px] leading-relaxed md:leading-8 text-gray-700">
              <p>
                It was however a sojourn in Milan that initiated the
                inspirational idea of merging tradition, technology and style.
                With dry living as motivation, he went home to join forces with
                local expertise. When Ghanaian born T-Michael came onboard as
                co-owner, head designer and chief strategist the project
                materialized. Michael’s 24 years of tailoring experience as
                owner and creative director of his eponymous label T-MICHAEL,
                balanced Alex’s degree in Master of Business and brought depth
                to ideas. A versatile duo full of contrasts was born.
              </p>
              <p>
                Drop by drop, the rain project has evolved into an award-winning
                label.
              </p>
              <p className="italic text-gray-800">
                “A sartorial take on 100% waterproof outerwear
                <br />
                inspired by Japanese sensibility &amp; life in the rainiest city
                of Europe – Bergen.”
              </p>

              <div className="pt-2 space-y-3">
                <h3 className="font-serif text-lg md:text-xl text-gray-900">
                  Flagship Stores
                </h3>
                <p className="font-serif italic text-sm md:text-base text-gray-800">
                  A Different Retail Experience
                </p>
                <p>
                  Catering for your sensory perceptions and the aesthetes out
                  there. Make it one of your stops on your travels. Drop by and
                  feel the space.
                </p>
              </div>
            </div>

            {/* Cities row – desktop / tablet only */}
            <div className="hidden md:block">
              <div className="mx-auto mt-4 grid max-w-xl grid-cols-4 gap-6 text-center text-sm md:text-base tracking-[0.08em] text-gray-800 uppercase">
                <div>Paris</div>
                <div>Tokyo</div>
                <div>Oslobukta</div>
                <div>Bergen</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
