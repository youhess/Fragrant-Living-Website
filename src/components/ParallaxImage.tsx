/**
 * ParallaxImage component
 * Purpose: Render a full-width parallax-backed image with controlled depth.
 */

import React, { useEffect, useRef } from 'react'

interface ParallaxProps {
  src: string
  depth?: number
  className?: string
  alt?: string
}

/**
 * ParallaxImage
 * Purpose: Provide a background image that moves slower than scroll to create depth.
 * @param src - image URL or smart placeholder
 * @param depth - factor controlling parallax intensity (0.1 - 0.6)
 */
export default function ParallaxImage({
  src,
  depth = 0.25,
  className = '',
  alt = '',
}: ParallaxProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let rafId = 0

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const winH = window.innerHeight
      // When component enters viewport, compute translate
      const visible = rect.top < winH && rect.bottom > 0
      if (!visible) return
      const progress = Math.min(Math.max((winH - rect.top) / (winH + rect.height), 0), 1)
      const translate = (progress - 0.5) * depth * 100
      el.style.transform = `translate3d(0, ${translate}px, 0)`
    }

    function loop() {
      onScroll()
      rafId = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [depth])

  return (
    <div
      ref={ref}
      className={`absolute inset-0 bg-center bg-cover will-change-transform ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        transform: 'translate3d(0,0,0)',
      }}
      role="img"
      aria-label={alt}
    />
  )
}