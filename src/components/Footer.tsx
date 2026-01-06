/**
 * Footer.tsx
 * File purpose: Global site footer including the newsletter hero section,
 * the main navigation footer, and a floating help chat entry with popup.
 * Also exposes a location & currency drawer triggered from the footer
 * "Store preferences" button, matching the NavBar location drawer UX.
 */

import React from "react";
import { MessageCircle, X } from "lucide-react";

/**
 * Newsletter background image URL.
 */
const NEWSLETTER_BG =
  "https://norwegianrain.com/wp-content/uploads/2023/04/Join_the_community_gradient-2048x1052.jpg";

/**
 * LinkItem
 * Simple type for footer navigation entries.
 */
interface LinkItem {
  /** Display label for the navigation link. */
  label: string;
  /** Target URL for the navigation link. */
  href: string;
}

/**
 * Column configuration for the main footer navigation.
 */
const FOOTER_COLUMNS: {
  /** Column heading text. */
  title: string;
  /** Collection of navigation links in the column. */
  links: LinkItem[];
}[] = [
  {
    title: "About & Contact",
    links: [
      { label: "History", href: "https://norwegianrain.com/history/" },
      {
        label: "Sustainability",
        href: "https://norwegianrain.com/sustainability/",
      },
      {
        label: "Technology and features",
        href: "https://norwegianrain.com/technology-and-features/",
      },
      { label: "Contact us", href: "https://norwegianrain.com/contact-us/" },
    ],
  },
  {
    title: "Stores",
    links: [
      { label: "Paris", href: "https://norwegianrain.com/stores-old/paris/" },
      { label: "Tokyo", href: "https://norwegianrain.com/stores-old/tokyo/" },
      {
        label: "Oslobukta",
        href: "https://norwegianrain.com/stores-old/oslo/",
      },
      { label: "Bergen", href: "https://norwegianrain.com/stores-old/bergen/" },
    ],
  },
  {
    title: "Need help?",
    links: [
      {
        label: "Customer Service",
        href: "https://norwegianrain.com/customer-service/",
      },
      {
        label: "FAQ",
        href: "https://norwegianrain.com/customer-service/faq/",
      },
      {
        label: "Shipping information",
        href: "https://norwegianrain.com/shipping-information/",
      },
      {
        label: "Return Policy",
        href: "https://norwegianrain.com/return-policy/",
      },
      { label: "Warranty", href: "https://norwegianrain.com/warranty/" },
      {
        label: "Privacy Policy",
        href: "https://norwegianrain.com/privacy-policy/",
      },
    ],
  },
];

/**
 * LocationOption
 * Represents a location & currency option for the location drawer.
 */
interface LocationOption {
  /** Country or market name. */
  country: string;
  /** Currency code for the location. */
  currency: string;
  /** Marks the primary / pre-selected option. */
  isPopular?: boolean;
}

/**
 * POPULAR_LOCATIONS
 * Curated list for the location drawer (mirrors NavBar configuration).
 */
const POPULAR_LOCATIONS: LocationOption[] = [
  { country: "Austria", currency: "EUR" },
  { country: "Belgium", currency: "EUR" },
  { country: "Canada", currency: "USD" },
  { country: "Denmark", currency: "DKK" },
  { country: "Finland", currency: "EUR" },
  { country: "France", currency: "EUR" },
  { country: "Germany", currency: "EUR" },
  { country: "Japan", currency: "JPY" },
  { country: "Taiwan", currency: "EUR", isPopular: true },
  { country: "United States (US)", currency: "USD" },
];

/**
 * HelpChatPopupProps
 * Props for the floating help chat popup.
 */
interface HelpChatPopupProps {
  /** Controls visibility of the popup. */
  isOpen: boolean;
  /** Close handler passed from parent. */
  onClose: () => void;
}

/**
 * LocationDrawerProps
 * Props for the LocationDrawer component used by the footer.
 */
interface LocationDrawerProps {
  /** Whether the drawer is currently visible. */
  isOpen: boolean;
  /** Request to close the drawer. */
  onClose: () => void;
  /** List of popular location options. */
  popularLocations: LocationOption[];
}

/**
 * FooterMainProps
 * Props for FooterMain component controlling chat trigger behavior.
 */
interface FooterMainProps {
  /** Triggered when the floating chat icon is clicked. */
  onChatClick: () => void;
  /** Whether the chat popup is currently open (used to hide the icon). */
  isChatOpen: boolean;
  /** Triggered when the store preference button is clicked. */
  onStorePreferencesClick: () => void;
}

/**
 * StorePreferencesProps
 * Props for StorePreferences component.
 */
interface StorePreferencesProps {
  /** Callback when the store preferences button is clicked. */
  onClick: () => void;
}

/**
 * Footer
 * Combines the newsletter hero banner, the dark brown navigation footer,
 * the floating help chat trigger + popup, and a shared location drawer.
 */
const Footer: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = React.useState<boolean>(false);
  const [isLocationDrawerOpen, setIsLocationDrawerOpen] =
    React.useState<boolean>(false);

  return (
    <footer className="w-full">
      <FooterNewsletter />
      <FooterMain
        onChatClick={() => setIsChatOpen(true)}
        isChatOpen={isChatOpen}
        onStorePreferencesClick={() => setIsLocationDrawerOpen(true)}
      />
      <HelpChatPopup
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
      <LocationDrawer
        isOpen={isLocationDrawerOpen}
        onClose={() => setIsLocationDrawerOpen(false)}
        popularLocations={POPULAR_LOCATIONS}
      />
    </footer>
  );
};

/**
 * FooterNewsletter
 * Large visual hero encouraging users to join the email community.
 *
 * Uses a CSS background image (cover + center) to ensure reliable display.
 */
const FooterNewsletter: React.FC = () => {
  /**
   * Handle newsletter submit; here we only prevent default
   * since there is no backend in this environment.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      className="relative w-full text-white bg-cover bg-center"
      aria-labelledby="footer-newsletter-title"
      style={{
        backgroundImage: `url('${NEWSLETTER_BG}')`,
      }}
    >
      {/* Dark overlay on top of the background image */}
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-6xl flex-col px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-xl md:max-w-2xl lg:max-w-xl">
          <h2
            id="footer-newsletter-title"
            className="text-3xl sm:text-4xl md:text-5xl leading-tight font-normal"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Join the Norwegian
            <br />
            Rain community
          </h2>

          <p
            className="mt-5 max-w-xl text-base sm:text-lg text-white/85"
            style={{
              fontFamily:
                "Avenir, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Get early access to collection drops, first in line for limited
            edition pieces, exclusive pre-orders, collabs, event invites and
            more.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-xl space-y-3 sm:flex sm:space-y-0 sm:space-x-0"
            aria-label="Newsletter signup form"
          >
            <div className="w-full sm:flex-1">
              <label className="block" htmlFor="newsletter-email">
                <span className="sr-only">Email address</span>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="block h-[50px] w-full border border-black bg-white px-4 text-sm text-black outline-none ring-0 focus:border-black focus:ring-0"
                  style={{
                    borderRadius: 0,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                />
              </label>
            </div>
            <div className="w-full sm:w-auto sm:flex-none sm:pl-3">
              <button
                type="submit"
                className="inline-flex h-[54px] w-full items-center justify-center border border-white bg-black px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-150 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                style={{ borderRadius: 0 }}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

/**
 * NavColumn
 * Renders a single footer navigation column with heading and list of links.
 */
const NavColumn: React.FC<{ title: string; links: LinkItem[] }> = ({
  title,
  links,
}) => {
  return (
    <nav aria-label={title}>
      <h3 className="text-base font-medium tracking-wide text-[#E6D6C9]">
        {title}
      </h3>
      <ul className="mt-4 space-y-1.5 text-[11px] uppercase tracking-[0.14em]">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-block text-[#D9C7B8] transition hover:text-white hover:underline hover:underline-offset-2"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * StorePreferences
 * Compact store preference selector styled as a bordered pill.
 * Clicking the button opens the shared location drawer.
 */
const StorePreferences: React.FC<StorePreferencesProps> = ({ onClick }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium tracking-wide text-[#E6D6C9]">
        Store preferences
      </h3>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between border border-[#C7B3A5]/70 bg-transparent px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[#E6D6C9] transition hover:border-[#E6D6C9] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D6C9]/80"
      >
        <span>Taiwan / EUR</span>
        <span>&gt;</span>
      </button>
    </div>
  );
};

/**
 * FooterMain
 * Dark brown main footer with navigation columns and store preferences.
 */
const FooterMain: React.FC<FooterMainProps> = ({
  onChatClick,
  isChatOpen,
  onStorePreferencesClick,
}) => {
  return (
    <section
      className="relative w-full bg-[#2F1E1E] text-[#D9C7B8]"
      aria-label="Site footer navigation"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between md:py-16 lg:px-8">
        {/* Navigation columns */}
        <div className="grid w-full gap-10 text-sm md:grid-cols-3 md:gap-12">
          {FOOTER_COLUMNS.map((column) => (
            <NavColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
        {/* Store preferences sits on the left on desktop, on top on mobile */}
        <div className="w-full max-w-xs md:order-none">
          <StorePreferences onClick={onStorePreferencesClick} />
        </div>
      </div>

      {/* Floating chat icon */}
      {!isChatOpen && (
        <button
          type="button"
          aria-label="Open help chat"
          onClick={onChatClick}
          className="group fixed bottom-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6D6C9]/80 bg-[#2F1E1E] text-[#E6D6C9] shadow-md transition hover:bg-[#3A2626] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D6C9]/80"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
    </section>
  );
};

/**
 * HelpChatPopup
 * Floating help chat style popup that appears above the footer
 * when the floating chat icon is clicked.
 *
 * Layout follows the provided HTML:
 * - Dark header with main title + subtitle
 * - Light grey body with a white card "Send us an email"
 * - Primary button leading to the contact page
 * - Round close button at the bottom right
 */
const HelpChatPopup: React.FC<HelpChatPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[90] flex flex-col items-end sm:bottom-6 sm:right-6"
      aria-label="Help chat"
    >
      {/* Main panel */}
      <div className="w-[340px] sm:w-[380px] overflow-hidden rounded-md bg-[#f5f7f8] shadow-xl">
        {/* Header */}
        <div className="bg-[#3a2626] px-4 py-4 text-white">
          <div className="space-y-1">
            <p
              className="text-lg font-semibold"
              style={{
                fontFamily: "Avenir, system-ui, -apple-system, sans-serif",
              }}
            >
              Hi there 👋
            </p>
            <p className="text-sm text-white/90">
              Need a hand? Feel free to drop us a message.
            </p>
          </div>
        </div>

        {/* Body with card */}
        <div className="px-4 pb-5 pt-4">
          <div className="mx-auto -mt-8 rounded-md bg-white px-5 py-4 shadow-md">
            <p className="text-sm font-semibold text-[#111]">
              Send us an email
            </p>
            <p className="mt-2 text-sm text-[#555]">
              If you&apos;re in a hurry, send us a message and we will get back
              to you asap.
            </p>
            <a href="/contact" className="mt-4 inline-block">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm bg-[#3a2626] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#4a3131] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3a2626]"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-[2px] border border-white/60 text-[9px]">
                  {/* Simple play icon to echo original arrow button */}
                  ▶
                </span>
                <span>Send email</span>
              </button>
            </a>
          </div>

          {/* Empty light body area to mimic tall panel */}
          <div
            className="mt-6 h-64 rounded-md bg-transparent"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Close button */}
      <button
        type="button"
        aria-label="Close help chat"
        onClick={onClose}
        className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2F1E1E] text-white shadow-md transition hover:bg-[#3A2626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <span className="text-lg leading-none">×</span>
      </button>
    </div>
  );
};

/**
 * LocationDrawer
 * Slide-in drawer from the right for selecting location & currency.
 * Mirrors NavBar's LocationDrawer so the experience is consistent.
 */
const LocationDrawer: React.FC<LocationDrawerProps> = ({
  isOpen,
  onClose,
  popularLocations,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div
        className="absolute inset-0 bg-black/30 cursor-default"
        onClick={onClose}
        aria-label="Close location drawer backdrop"
        role="presentation"
      />
      <aside
        className="relative h-full w-full max-w-md bg-white shadow-[0_0_30px_rgba(0,0,0,0.18)] transform transition-transform duration-200 translate-x-0"
        aria-label="Location and currency"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px]">
              ●
            </span>
            <div>
              <p
                className="text-[11px] tracking-[0.24em] uppercase text-[#454545]"
                style={{
                  fontFamily:
                    "Avenir, system-ui, -apple-system, sans-serif",
                }}
              >
                Location and currency
              </p>
            </div>
          </div>
          <button
            type="button"
            className="p-1 text-black"
            onClick={onClose}
            aria-label="Close location drawer"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-5 pt-4 pb-6 border-b border-neutral-200">
          <p className="text-[12px] text-[#454545] leading-relaxed">
            Select your location to see the correct price, delivery time and
            shipping fee.
          </p>
        </div>

        <div className="px-5 py-4 h-[calc(100%-140px)] overflow-y-auto">
          <div className="space-y-2">
            {popularLocations.map((opt) => (
              <button
                key={opt.country}
                type="button"
                className={`flex w-full items-center justify-between border text-left px-3 py-2 text-[12px] ${
                  opt.isPopular
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 hover:border-black"
                }`}
              >
                <span>{opt.country}</span>
                <span className="text-[11px] tracking-[0.16em] uppercase">
                  {opt.currency}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 text-[11px] tracking-[0.18em] uppercase text-[#454545] hover:text-black"
          >
            + Show more shipping locations
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Footer;
