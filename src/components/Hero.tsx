/**
 * Hero.tsx
 * File purpose: Editorial landing hero with a responsive background video and central quote content.
 */

import React, { useEffect, useRef, useState } from "react";

/**
 * Hero
 * Full-viewport hero section with responsive background video, editorial quote,
 * CTA buttons and a subtle footer link.
 *
 * Behaviour:
 * - Uses different video sources for desktop (>= 1024px) and mobile (< 1024px) via matchMedia.
 * - Autoplays, loops, muted, playsInline on supported devices.
 * - On mobile low-power mode where autoplay fails, the first click/touchstart on body
 *   will try to play all videos on the page.
 */
const Hero: React.FC = () => {
  /** Hosted background video sources for desktop and mobile. */
  const DESKTOP_VIDEO_SRC = "https://norwegianrain.com/wp-content/uploads/2023/09/Landingpage-AW23-Desktop.mp4";
  const MOBILE_VIDEO_SRC = "https://norwegianrain.com/wp-content/uploads/2023/09/Landingpage-AW23-Desktop.mp4";

  /** Ref to the main hero background video element. */
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /** Track whether the page is currently considered desktop-sized. */
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true,
  );

  /**
   * attemptPlay
   * Wrapper around video.play with error swallowing, used for autoplay and fallback.
   */
  const attemptPlay = (video: HTMLVideoElement | null) => {
    if (!video) return;
    try {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Autoplay might be blocked; we silently ignore and rely on the global click/touch fallback.
        });
      }
    } catch {
      // Ignore play errors.
    }
  };

  /**
   * Sync video src with current breakpoint (desktop / mobile).
   * This effect also listens to viewport width changes.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateVideoSource = () => {
      setIsDesktop(mediaQuery.matches);
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const desiredSrc = mediaQuery.matches ? DESKTOP_VIDEO_SRC : MOBILE_VIDEO_SRC;

      // Only update when different to avoid flicker.
      if (videoElement.getAttribute("src") !== desiredSrc) {
        videoElement.setAttribute("src", desiredSrc);
        // Ensure the new source is loaded before play.
        videoElement.load();
      }

      attemptPlay(videoElement);
    };

    updateVideoSource();
    mediaQuery.addEventListener("change", updateVideoSource);

    return () => {
      mediaQuery.removeEventListener("change", updateVideoSource);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Global user-interaction fallback:
   * On the first click/touchstart on body, iterate all video elements in the document
   * and play any that are not currently playing.
   */
  useEffect(() => {
    if (typeof document === "undefined") return;

    const playVideoOnLowPower = () => {
      try {
        const videoElements = document.querySelectorAll<HTMLVideoElement>("video");

        videoElements.forEach((video) => {
          const isPlaying =
            video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
          if (!isPlaying) {
            attemptPlay(video);
          }
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      } finally {
        // Only need to run once; then we can remove listeners.
        document.body.removeEventListener("click", playVideoOnLowPower);
        document.body.removeEventListener("touchstart", playVideoOnLowPower);
      }
    };

    document.body.addEventListener("click", playVideoOnLowPower);
    document.body.addEventListener("touchstart", playVideoOnLowPower, { passive: true });

    return () => {
      document.body.removeEventListener("click", playVideoOnLowPower);
      document.body.removeEventListener("touchstart", playVideoOnLowPower);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="relative w-full md:h-[720px] overflow-hidden bg-black text-white animate-in fade-in-0 duration-700"
      aria-labelledby="hero-quote-title"
    >
      {/* Background video container */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 md:px-8">
        {/* Central quote block */}
        <div className="max-w-3xl text-center space-y-6 md:space-y-8">
          <h1
            id="hero-quote-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed md:leading-relaxed font-normal italic drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]"
            style={{
              fontFamily: "FreightText Book, Georgia, 'Times New Roman', serif",
            }}
          >
            “Could this be the best raincoat in the world?”
          </h1>

          <p
            className="mt-4 text-[11px] tracking-[0.32em] uppercase text-white/80"
            style={{ fontFamily: "Avenir, system-ui, -apple-system, sans-serif" }}
          >
            Anna Murphy
          </p>

          <div className="mt-4">
            <img
              src="https://norwegianrain.com/wp-content/uploads/2025/11/The_Times_logo_white_white.png"
              alt="The Times"
              className="mx-auto h-8 md:h-9 w-auto object-contain"
            />
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://norwegianrain.com/products/men/"
            className="inline-flex items-center justify-center px-6 py-2 text-[11px] tracking-[0.2em] uppercase bg-white text-black border border-white/90 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-white/95"
            style={{ fontFamily: "Avenir, system-ui, -apple-system, sans-serif" }}
          >
            Shop Men
          </a>
          <a
            href="https://norwegianrain.com/products/women/"
            className="inline-flex items-center justify-center px-6 py-2 text-[11px] tracking-[0.2em] uppercase bg-white text-black border border-white/90 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-white/95"
            style={{ fontFamily: "Avenir, system-ui, -apple-system, sans-serif" }}
          >
            Shop Women
          </a>
        </div>

        {/* Bottom secondary CTA */}
        <div className="mt-10 md:mt-16 mb-6 md:mb-10 text-center text-[11px] text-white/80">
          <span className="underline underline-offset-4 decoration-white/70 hover:decoration-white cursor-pointer">
            Watch the movie
          </span>{" "}
          “Our Rain” <span className="hidden md:inline">directed </span>by @Nanaasihene
        </div>
      </div>
    </section>
  );
};

export default Hero;