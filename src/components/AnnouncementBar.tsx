/**
 * AnnouncementBar.tsx
 * File purpose: Lightweight top announcement bar used for global store notices.
 */

import React from "react";

/**
 * AnnouncementBarProps
 * Interface for AnnouncementBar component props (reserved for future extensions).
 */
interface AnnouncementBarProps {}

/**
 * AnnouncementBar
 * Renders a centered, accessible announcement strip that is fixed (sticky) at the top of the viewport.
 *
 * Behaviour / visual:
 * - Fixed at top: top: 0, full width (100%), z-index to sit above the NavBar.
 * - Height/min-height: 35px to match NavBar offset.
 * - Background color: #d0ded8
 * - Centered content within max-w-7xl container.
 * - Uppercase, bold, small text.
 * - Accessible attributes: role="region", aria-live, noscript fallback.
 *
 * @param _ props (unused currently)
 * @returns JSX.Element
 */
export default function AnnouncementBar(_: AnnouncementBarProps): JSX.Element {
  return (
    <div
      className="fixed top-0 left-0 right-0 w-full z-50"
      role="region"
      aria-label="Store notice"
      style={{
        backgroundColor: "#d0ded8",
        margin: 0,
        padding: "5px 15px",
        minHeight: 35,
        height: "auto",
        fontSize: "11px",
        lineHeight: "14px",
        color: "#000",
        fontWeight: 800,
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="woocommerce-store-notice__content w-full max-w-7xl mx-auto">
        <div
          className="nr-notice-wrap"
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: ".75rem", justifyContent: "center" }}
        >
          <div className="nr-rotator js-ready" role="region" aria-live="polite" aria-atomic="true">
            <span className="nr-rotator__slide is-active" data-relingo-block="true">
              <span>Worldwide shipping with DHL Express.</span>
            </span>
          </div>

          {/* noscript fallback */}
          <noscript>
            <span className="conditional-hide-country--JP">
              <a href="#" className="short-text membership-modal-trigger" style={{ marginLeft: 8 }}>
                GET MEMBERSHIP ACCESS - ARCHIVE SALES &amp; MORE
              </a>
              <a href="#" className="long-text membership-modal-trigger" style={{ marginLeft: 8 }}>
                GET MEMBERSHIP ACCESS - FUTURE ARCHIVE SALES, EXCLUSIVE DROPS AND MUCH MORE
              </a>
            </span>
            <span className="conditional-display-country--JP" style={{ marginLeft: 8 }}>
              <a href="/customer-service-jp/">DHL Expressによるエクスプレス配送。価格にはすべての税金および関税が含まれています。</a>
            </span>
          </noscript>
        </div>
      </div>
    </div>
  );
}
