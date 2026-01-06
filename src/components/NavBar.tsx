/**
 * NavBar.tsx
 * File purpose: Responsive site header with brand, primary navigation, mega menus, search bar,
 * and location / cart / wishlist drawers. This variant improves the SearchBar positioning so
 * the dropdown appears directly under the search icon, and ensures the CartDrawer z-index
 * matches the WishlistDrawer.
 */

import React, { useEffect, useRef, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";

/**
 * NavLink
 * Represents an individual text link inside a mega menu column.
 */
interface NavLink {
  /** Visible label of the link */
  label: string;
  /** Destination href (can be a real URL or placeholder) */
  href?: string;
}

/**
 * NavColumn
 * Represents a titled column in a mega menu.
 */
interface NavColumn {
  /** Column heading */
  heading: string;
  /** Links belonging to this column */
  links: NavLink[];
}

/**
 * NavImageTile
 * Represents an image tile shown on the right side of a mega menu.
 */
interface NavImageTile {
  /** Visible caption overlaying the image */
  label: string;
  /** Image URL */
  imageSrc: string;
  /** Optional link destination */
  href?: string;
}

/**
 * PrimaryNavItemId
 * Union of IDs for the top-level navigation items.
 */
type PrimaryNavItemId = "men" | "women" | "explore" | "sustainability" | "help";

/**
 * PrimaryNavItem
 * Configuration for each top-level nav item and its optional mega menu.
 */
interface PrimaryNavItem {
  id: PrimaryNavItemId;
  label: string;
  hasMegaMenu: boolean;
  columns?: NavColumn[];
  imageTiles?: NavImageTile[];
}

/**
 * NAV_ITEMS
 * Static configuration describing the primary navigation structure.
 */
const NAV_ITEMS: PrimaryNavItem[] = [
  {
    id: "men",
    label: "Men",
    hasMegaMenu: true,
    columns: [
      {
        heading: "Shop by type",
        links: [{ label: "Men’s Raincoats" }, { label: "Accessories" }, { label: "Archive sale" }],
      },
      {
        heading: "Shop by category",
        links: [{ label: "Formal & Classic" }, { label: "Signature Styles" }],
      },
      {
        heading: "Shop by season",
        links: [{ label: "All year" }, { label: "Winter" }, { label: "Summer" }],
      },
    ],
    imageTiles: [
      {
        label: "Signature Styles",
        imageSrc:
          "https://pub-cdn.sider.ai/u/U0R7HRXYJ5L/web-coder/6953c926f028f342ba3548f9/resource/419a1660-d1d0-4ca0-aac9-f18ef9aac5b1.jpg",
      },
      {
        label: "Formal & Classic",
        imageSrc:
          "https://pub-cdn.sider.ai/u/U0R7HRXYJ5L/web-coder/6953c926f028f342ba3548f9/resource/c223c13e-1365-47e3-aea7-9e9d2fad8418.jpg",
      },
    ],
  },
  {
    id: "women",
    label: "Women",
    hasMegaMenu: true,
    columns: [
      {
        heading: "Shop by type",
        links: [{ label: "Women’s Raincoats" }, { label: "Accessories" }, { label: "Archive sale" }],
      },
      {
        heading: "Shop by category",
        links: [{ label: "Formal & Classic" }, { label: "Signature Styles" }],
      },
      {
        heading: "Shop by season",
        links: [{ label: "All year" }, { label: "Winter" }, { label: "Summer" }],
      },
    ],
    imageTiles: [
      {
        label: "Signature Styles",
        imageSrc:
          "https://pub-cdn.sider.ai/u/U0R7HRXYJ5L/web-coder/6953c926f028f342ba3548f9/resource/41f9b6b2-833b-477f-9c4c-93316d210593.jpg",
      },
      {
        label: "Formal & Classic",
        imageSrc:
          "https://pub-cdn.sider.ai/u/U0R7HRXYJ5L/web-coder/6953c926f028f342ba3548f9/resource/0970f5d5-8bc7-4063-a38d-0d488770a976.jpg",
      },
    ],
  },
  {
    id: "explore",
    label: "Explore",
    hasMegaMenu: true,
    columns: [
      {
        heading: "About",
        links: [{ label: "History" }, { label: "Technology and features" }],
      },
      {
        heading: "Stores",
        links: [
          { label: "Bergen Flagship Store" },
          { label: "Oslobukta Flagship Store" },
          { label: "Paris Flagship Store" },
          { label: "Tokyo Flagship Store" },
        ],
      },
      { heading: "News", links: [{ label: "Latest stories" }] },
    ],
    imageTiles: [
      {
        label: "Sustainability",
        imageSrc:
          "https://pub-cdn.sider.ai/u/U0R7HRXYJ5L/web-coder/6953c926f028f342ba3548f9/resource/38eef172-2e0a-407d-85c6-f9aef9b7c643.jpg",
      },
      {
        label: "Technology and features",
        imageSrc:
          "https://pub-cdn.sider.ai/u/U0R7HRXYJ5L/web-coder/6953c926f028f342ba3548f9/resource/a90613a9-2b90-4367-9a95-ed19aa6a9073.jpg",
      },
    ],
  },
  { id: "sustainability", label: "Sustainability", hasMegaMenu: false },
  {
    id: "help",
    label: "Help",
    hasMegaMenu: true,
    columns: [
      {
        heading: "Customer Service",
        links: [
          { label: "Customer Service" },
          { label: "FAQ" },
          { label: "Shipping information" },
          { label: "Return Policy" },
          { label: "Warranty" },
          { label: "Contact us" },
        ],
      },
    ],
  },
];

/**
 * LocationOption
 * Represents a location & currency option.
 */
interface LocationOption {
  country: string;
  currency: string;
  isPopular?: boolean;
}

/**
 * POPULAR_LOCATIONS
 * Curated list for the location drawer.
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
 * NavBar
 * Main header component.
 *
 * Behaviour:
 * - AnnouncementBar (35px) sits at top; NavBar sits directly below.
 * - Both are fixed/sticky: AnnouncementBar top:0; NavBar top:35px.
 * - When page is at top (window.scrollY <= 8), NavBar background keeps transparent and text/icons are white.
 * - When NavBar is hovered OR page scrolled away from top OR mega menu open, NavBar transitions to solid white and dark text/icons.
 * - A unified hover zone wraps primary nav + mega menu, so moving cursor between them will not instantly close the menu.
 * - Clicking the Search icon toggles a search panel positioned directly under the search icon.
 */
const NavBar: React.FC = () => {
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<PrimaryNavItemId | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLocationDrawerOpen, setIsLocationDrawerOpen] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState<boolean>(false);

  /** Search bar open state (desktop only UI) */
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);

  /** Pointer hover state over header (for background style only) */
  const [isHovered, setIsHovered] = useState<boolean>(false);

  /** Whether page is at top (small tolerance for mobile chrome) */
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  /**
   * Refs used to position the SearchBar directly under the search icon.
   * wrapperRef: the fixed container that wraps header + mega menu (positioning context).
   * headerRef: the header element (to compute vertical offset).
   * searchButtonRef: the search icon button (to compute horizontal offset).
   */
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);

  /**
   * searchBarStyle stores computed inline CSS (left/top/width) to position the SearchBar.
   * It is null when the SearchBar is closed.
   */
  const [searchBarStyle, setSearchBarStyle] = useState<React.CSSProperties | null>(null);

  /**
   * Ref to store closing timeout for desktop mega menu.
   * 使用 timeout + ref：实现「离开 hover 区域稍后再关」，避免从一级到二级时闪烁。
   */
  const megaMenuCloseTimeoutRef =
    useRef<ReturnType<typeof window.setTimeout> | null>(null);

  /**
   * Update isAtTop on scroll.
   */
  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY <= 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Clear any scheduled mega menu close timeout.
   */
  const clearMegaMenuCloseTimeout = (): void => {
    if (megaMenuCloseTimeoutRef.current !== null) {
      window.clearTimeout(megaMenuCloseTimeoutRef.current);
      megaMenuCloseTimeoutRef.current = null;
    }
  };

  /**
   * Schedule closing of mega menu with a slight delay.
   * 说明：在鼠标离开「导航+二级菜单整体区域」后延时关闭，
   * 如果期间又重新进入，则会通过 clearMegaMenuCloseTimeout 取消关闭。
   */
  const scheduleMegaMenuClose = (): void => {
    clearMegaMenuCloseTimeout();
    megaMenuCloseTimeoutRef.current = window.setTimeout(() => {
      setActiveDesktopMenu(null);
      megaMenuCloseTimeoutRef.current = null;
    }, 140);
  };

  /**
   * Toggle mega menu on desktop hover (open immediately, cancel any close timer).
   * @param id PrimaryNavItemId | null
   */
  const handleDesktopItemHover = (id: PrimaryNavItemId | null): void => {
    if (id) {
      clearMegaMenuCloseTimeout();
      setActiveDesktopMenu(id);
    } else {
      setActiveDesktopMenu(null);
    }
  };

  const openLocationDrawer = () => {
    setIsLocationDrawerOpen(true);
  };

  const closeLocationDrawer = () => {
    setIsLocationDrawerOpen(false);
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openCartDrawer = () => {
    setIsCartDrawerOpen(true);
    // Ensure wishlist drawer is closed when cart opens
    setIsWishlistDrawerOpen(false);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  const openWishlistDrawer = () => {
    setIsWishlistDrawerOpen(true);
    // Ensure cart drawer is closed when wishlist opens
    setIsCartDrawerOpen(false);
  };

  const closeWishlistDrawer = () => {
    setIsWishlistDrawerOpen(false);
  };

  useEffect(() => {
    // 清理：组件卸载时清除未执行完的 timeout
    return () => {
      clearMegaMenuCloseTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentMegaItem = activeDesktopMenu
    ? NAV_ITEMS.find((i) => i.id === activeDesktopMenu && i.hasMegaMenu)
    : undefined;

  /**
   * showSolid 为 true 时，NavBar 背景为白色。
   * 增加 `!!currentMegaItem`，保证二级菜单打开期间导航保持白底，视觉稳定。
   */
  const showSolid = !isAtTop || isHovered || !!currentMegaItem;

  /**
   * handleSearchToggle
   * Compute positioning when opening the SearchBar so it appears directly under the search icon.
   */
  const handleSearchToggle = (): void => {
    // Close any open mega menu
    setActiveDesktopMenu(null);

    if (isSearchBarOpen) {
      // Close
      setIsSearchBarOpen(false);
      setSearchBarStyle(null);
      return;
    }

    // Open and compute position
    const btn = searchButtonRef.current;
    const hdr = headerRef.current;
    const wrap = wrapperRef.current;
    if (!btn || !hdr || !wrap) {
      // fallback to centered small search bar
      setIsSearchBarOpen(true);
      setSearchBarStyle(null);
      return;
    }

    // Desired width for search box (responsive)
    const computedWidth = Math.min(800, Math.max(320, Math.floor(window.innerWidth * 0.44)));
    const btnRect = btn.getBoundingClientRect();
    const hdrRect = hdr.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();

    // Compute left so the search box is centered under the search icon.
    let left = btnRect.left + btnRect.width / 2 - computedWidth / 2;
    // Keep within viewport with 12px padding
    left = Math.max(12, Math.min(left, window.innerWidth - computedWidth - 12));

    // top relative to wrapper (wrapper is fixed)
    const top = Math.max(0, hdrRect.bottom - wrapRect.top + 8);

    setSearchBarStyle({
      position: "absolute",
      left,
      top,
      width: computedWidth,
      zIndex: 72,
    });
    setIsSearchBarOpen(true);
  };

  return (
    <div>
      {/* Hover zone: wraps header + desktop mega menu + search bar. */}
      <div
        ref={wrapperRef}
        className="fixed left-0 right-0 top-[35px] z-[60]"
        onMouseEnter={clearMegaMenuCloseTimeout}
        onMouseLeave={scheduleMegaMenuClose}
      >
        {/* Nav positioned under announcement bar (announcement height = 35px) */}
        <header
          ref={headerRef}
          aria-label="Primary site navigation"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full transition-colors duration-300 ${
            showSolid
              ? "bg-white border-b border-neutral-200 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          {/* content container keeps centered content while header BG spans full width */}
          <div className="max-w-10xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-[auto_1fr_auto] items-center py-3 md:py-4 gap-4 rounded-b-sm">
              {/* Left: hamburger + desktop nav */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
                  onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                  className={`inline-flex md:hidden items-center justify-center w-9 h-9 border transition-colors ${
                    showSolid ? "border-black/70 text-black hover:bg-black hover:text-white" : "border-white/40 text-white hover:bg-white/10"
                  }`}
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Menu className="w-4 h-4" strokeWidth={1.5} />}
                </button>

                <nav className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.28em] uppercase" aria-label="Primary">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => (item.hasMegaMenu ? handleDesktopItemHover(item.id) : handleDesktopItemHover(null))}
                      aria-haspopup={item.hasMegaMenu ? "true" : undefined}
                      aria-expanded={item.hasMegaMenu && activeDesktopMenu === item.id ? "true" : "false"}
                      className={`relative transition-colors ${showSolid ? "text-[#454545] hover:text-black" : "text-white hover:text-white/80"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Center: brand */}
              <div className="flex items-center justify-center">
                <a href="#" aria-label="Norwegian Rain - Home" className="flex flex-col items-center text-center select-none">
                  <span
                    className={`text-[13px] leading-tight transition-colors ${showSolid ? "text-[#111]" : "text-white"}`}
                    style={{
                      fontFamily: "FreightText Book, Georgia, 'Times New Roman', serif",
                      letterSpacing: "0.12em",
                    }}
                  >
                    Norwegian Rain
                  </span>
                  <span
                    className={`mt-0.5 text-[8px] tracking-[0.32em] uppercase transition-colors ${showSolid ? "text-[#777]" : "text-white/90"}`}
                    style={{
                      fontFamily: "Avenir, system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Bergen
                  </span>
                </a>
              </div>

              {/* Right: location + icons */}
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={openLocationDrawer}
                  className={`text-[10px] tracking-[0.28em] uppercase transition-colors ${showSolid ? "text-[#454545]" : "text-white"}`}
                >
                  TW / EUR
                </button>

                {/* Desktop search icon – toggles search bar under the icon */}
                <button
                  type="button"
                  aria-label="Search"
                  ref={searchButtonRef}
                  onClick={handleSearchToggle}
                  className={`hidden md:inline-flex items-center justify-center w-6 h-6 transition-colors ${showSolid ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                  aria-pressed={isSearchBarOpen ? "true" : "false"}
                >
                  <Search className="w-4 h-4" strokeWidth={1.5} />
                </button>

                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={openWishlistDrawer}
                  className={`inline-flex items-center justify-center w-6 h-6 transition-colors ${showSolid ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                >
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                </button>

                <button
                  aria-label="Cart"
                  onClick={openCartDrawer}
                  className={`relative inline-flex items-center justify-center w-6 h-6 transition-colors ${showSolid ? "text-black hover:text-black/70" : "text-white hover:text-white/80"}`}
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  <span className="absolute -right-2 -top-1 inline-flex items-center justify-center rounded-full text-white text-[9px] w-4 h-4 bg-[#a89b7c]">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* SearchBar: absolutely positioned under the search icon when open */}
        {isSearchBarOpen && (
          <SearchBar style={searchBarStyle ?? undefined} />
        )}

        {/* Desktop mega menu (hover) – inside the same hover zone as the header. */}
        {currentMegaItem && !isSearchBarOpen && <DesktopMegaMenu item={currentMegaItem} />}
      </div>

      {/* Mobile navigation drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} items={NAV_ITEMS} />

      {/* Location drawer */}
      <LocationDrawer isOpen={isLocationDrawerOpen} onClose={closeLocationDrawer} popularLocations={POPULAR_LOCATIONS} />

      {/* Cart drawer (right side). z-index raised to match WishlistDrawer so it appears above NavBar. */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} />

      {/* Wishlist drawer (right side) */}
      <WishlistDrawer isOpen={isWishlistDrawerOpen} onClose={closeWishlistDrawer} />
    </div>
  );
};

/**
 * DesktopMegaMenuProps
 * Props for DesktopMegaMenu component.
 */
interface DesktopMegaMenuProps {
  item: PrimaryNavItem;
}

/**
 * DesktopMegaMenu
 * Renders full-width dropdown mega menu under the header on desktop.
 * 说明：不再自行处理 onMouseLeave，交由父层 hover zone 统一管理，避免闪烁。
 */
const DesktopMegaMenu: React.FC<DesktopMegaMenuProps> = ({ item }) => {
  if (!item.columns || item.columns.length === 0) return null;

  return (
    <div className="hidden md:block border-t border-neutral-200 bg-white shadow-[0_18px_30px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-[2fr_1.3fr_1.3fr] gap-8">
        <div className="grid grid-cols-3 gap-8">
          {item.columns.map((col) => (
            <div key={col.heading}>
              <h3
                className="mb-3 text-[11px] tracking-[0.24em] uppercase text-[#454545]"
                style={{
                  fontFamily: "Avenir, system-ui, -apple-system, sans-serif",
                }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-1.5 text-[12px] text-[#454545]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href ?? "#"} className="hover:underline underline-offset-4">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {item.imageTiles?.[0] && <MegaMenuImageTile tile={item.imageTiles[0]} />}
        {item.imageTiles?.[1] && <MegaMenuImageTile tile={item.imageTiles[1]} />}
      </div>
    </div>
  );
};

/**
 * MegaMenuImageTileProps
 * Props for MegaMenuImageTile component.
 */
interface MegaMenuImageTileProps {
  tile: NavImageTile;
}

/**
 * MegaMenuImageTile
 * Visual tile used on the right side of the mega menu with an image background and centered text.
 */
const MegaMenuImageTile: React.FC<MegaMenuImageTileProps> = ({ tile }) => {
  return (
    <a href={tile.href ?? "#"} className="relative group overflow-hidden h-64 bg-black" aria-label={tile.label}>
      <img src={tile.imageSrc} alt={tile.label} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <span
        className="absolute inset-0 flex items-center justify-center text-white text-sm tracking-[0.22em] uppercase"
        style={{
          fontFamily: "Avenir, system-ui, -apple-system, sans-serif",
        }}
      >
        {tile.label}
      </span>
    </a>
  );
};

/**
 * SearchBarProps
 * Accepts an optional inline style so the parent can position it under the search icon.
 */
interface SearchBarProps {
  style?: React.CSSProperties;
}

/**
 * SearchBar
 * 下拉搜索条（触发自 NavBar 的 Search 图标）。
 * 可通过 style 属性控制绝对定位（left/top/width）以确保它位于搜索图标正下方。
 */
const SearchBar: React.FC<SearchBarProps> = ({ style }) => {
  return (
    <div
      // Position absolute inside the NavBar wrapper so we can place it right under the search icon.
      className="absolute"
      style={{
        left: style?.left ?? undefined,
        top: style?.top ?? undefined,
        width: style?.width ?? undefined,
        zIndex: style?.zIndex ?? 72,
      }}
    >
      <form className="w-full" role="search" action="https://norwegianrain.com/" method="get">
        {/* 外层白色盒子 + 黑色描边，对应截图中整块白色矩形 */}
        <div className="border border-black bg-white px-1.5 py-1.5">
          {/* 内层为浅灰背景的搜索区域 */}
          <div className="relative flex items-center bg-[#efefef] px-4 py-2 md:py-3">
            <Search className="w-4 h-4 text-gray-500 mr-3" strokeWidth={1.5} />
            <label className="sr-only" htmlFor="search-products-input">
              Products search
            </label>
            <input
              id="search-products-input"
              type="search"
              name="s"
              autoComplete="off"
              placeholder="Search for products"
              className="flex-1 bg-transparent text-[13px] text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />

            <div className="dgwt-wcas-preloader" style={{ right: 33 }} />
            <div className="dgwt-wcas-voice-search" />

            <button type="submit" aria-label="Search" className="ml-3 inline-flex items-center justify-center p-1 text-gray-600 hover:text-gray-900">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
                <path d=" M 16.722523,17.901412 C 16.572585,17.825208 15.36088,16.670476 14.029846,15.33534 L 11.609782,12.907819 11.01926,13.29667 C 8.7613237,14.783493 5.6172703,14.768302 3.332423,13.259528 -0.07366363,11.010358 -1.0146502,6.5989684 1.1898146,3.2148776
                          1.5505179,2.6611594 2.4056498,1.7447266 2.9644271,1.3130497 3.4423015,0.94387379 4.3921825,0.48568469 5.1732652,0.2475835 5.886299,0.03022609 6.1341883,0 7.2037391,0 8.2732897,0 8.521179,0.03022609 9.234213,0.2475835 c 0.781083,0.23810119 1.730962,0.69629029 2.208837,1.0654662
                          0.532501,0.4113763 1.39922,1.3400096 1.760153,1.8858877 1.520655,2.2998531 1.599025,5.3023778 0.199549,7.6451086 -0.208076,0.348322 -0.393306,0.668209 -0.411622,0.710863 -0.01831,0.04265 1.065556,1.18264 2.408603,2.533307 1.343046,1.350666 2.486621,2.574792 2.541278,2.720279 0.282475,0.7519
                          -0.503089,1.456506 -1.218488,1.092917 z M 8.4027892,12.475062 C 9.434946,12.25579 10.131043,11.855461 10.99416,10.984753 11.554519,10.419467 11.842507,10.042366 12.062078,9.5863882 12.794223,8.0659672 12.793657,6.2652398 12.060578,4.756293 11.680383,3.9737304 10.453587,2.7178427
                          9.730569,2.3710306 8.6921295,1.8729196 8.3992147,1.807606 7.2037567,1.807606 6.0082984,1.807606 5.7153841,1.87292 4.6769446,2.3710306 3.9539263,2.7178427 2.7271301,3.9737304 2.3469352,4.756293 1.6138384,6.2652398 1.6132726,8.0659672 2.3454252,9.5863882 c 0.4167354,0.8654208 1.5978784,2.0575608
                          2.4443766,2.4671358 1.0971012,0.530827 2.3890403,0.681561 3.6130134,0.421538 z"></path>
              </svg>
            </button>

            <input type="hidden" name="post_type" value="product" />
            <input type="hidden" name="dgwt_wcas" value="1" />
          </div>
        </div>
      </form>
    </div>
  );
};

/**
 * MobileMenuProps
 * Props for MobileMenu component.
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: PrimaryNavItem[];
}

/**
 * MobileMenu
 * Slide-in panel from the left for mobile navigation.
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, items }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 cursor-default" onClick={onClose} aria-label="Close menu backdrop" role="presentation" />
      <nav className="relative h-full w-72 max-w-full bg-white border-r border-neutral-200 shadow-xl transform transition-transform duration-200 translate-x-0" aria-label="Mobile primary">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
          <span className="text-[11px] tracking-[0.28em] uppercase text-[#454545]" style={{ fontFamily: "Avenir, system-ui, -apple-system, sans-serif" }}>
            Menu
          </span>
          <button type="button" className="p-1 text-black" onClick={onClose} aria-label="Close navigation">
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-4 py-4 space-y-4 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id}>
              <a href="#" className="block text-[11px] tracking-[0.28em] uppercase text-[#454545] hover:text-black" style={{ fontFamily: "Avenir, system-ui, -apple-system, sans-serif" }}>
                {item.label}
              </a>
              {item.hasMegaMenu && item.columns && (
                <div className="mt-2 ml-3 space-y-3">
                  {item.columns.map((col) => (
                    <div key={col.heading}>
                      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#777]">{col.heading}</p>
                      <ul className="mt-1 space-y-1 text-[12px]">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <a href={link.href ?? "#"} className="text-[#454545] hover:underline underline-offset-4">
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

/**
 * LocationDrawerProps
 * Props for LocationDrawer component.
 */
interface LocationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  popularLocations: LocationOption[];
}

/**
 * LocationDrawer
 * Slide-in drawer from the right for selecting location & currency.
 */
const LocationDrawer: React.FC<LocationDrawerProps> = ({ isOpen, onClose, popularLocations }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-black/30 cursor-default" onClick={onClose} aria-label="Close location drawer backdrop" role="presentation" />
      <aside className="relative h-full w-full max-w-md bg-white shadow-[0_0_30px_rgba(0,0,0,0.18)] transform transition-transform duration-200 translate-x-0" aria-label="Location and currency">
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px]">●</span>
            <div>
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#454545]" style={{ fontFamily: "Avenir, system-ui, -apple-system, sans-serif" }}>
                Location and currency
              </p>
            </div>
          </div>
          <button type="button" className="p-1 text-black" onClick={onClose} aria-label="Close location drawer">
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-5 pt-4 pb-6 border-b border-neutral-200">
          <p className="text-[12px] text-[#454545] leading-relaxed">Select your location to see the correct price, delivery time and shipping fee.</p>
        </div>

        <div className="px-5 py-4 h-[calc(100%-140px)] overflow-y-auto">
          <div className="space-y-2">
            {popularLocations.map((opt) => (
              <button
                key={opt.country}
                type="button"
                className={`flex w-full items-center justify-between border text-left px-3 py-2 text-[12px] ${
                  opt.isPopular ? "border-black bg-black text-white" : "border-neutral-300 hover:border-black"
                }`}
              >
                <span>{opt.country}</span>
                <span className="text-[11px] tracking-[0.16em] uppercase">{opt.currency}</span>
              </button>
            ))}
          </div>
          <button type="button" className="mt-4 text-[11px] tracking-[0.18em] uppercase text-[#454545] hover:text-black">
            + Show more shipping locations
          </button>
        </div>
      </aside>
    </div>
  );
};

/**
 * WishlistDrawerProps
 * Props for WishlistDrawer component.
 */
interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * WishlistDrawer
 * Right-side slide-in drawer for displaying wishlist-style product content.
 */
const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <div className="absolute inset-0 bg-black/20 cursor-default" onClick={onClose} aria-label="Close wishlist drawer backdrop" role="presentation" />

      <aside className="relative h-full w-full max-w-md bg-white shadow-[0_0_30px_rgba(0,0,0,0.18)] animate-in slide-in-from-right duration-200" aria-label="Wishlist">
        <button type="button" className="absolute right-5 top-4 p-1 text-black" onClick={onClose} aria-label="Close wishlist drawer">
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="h-full flex flex-col">
          <header className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-neutral-200">
            <Heart className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#454545]" style={{ fontFamily: "Avenir, system-ui, -apple-system, sans-serif" }}>
              Wishlist
            </span>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="wishlist-content">
              <ul className="products">
                <li className="product wishlist-item-active">
                  <a href="https://norwegianrain.com/product/harmattan-unisex-cropped-lightweight-houndstooth-black-on-her/" className="woocommerce-LoopProduct-link woocommerce-loop-product__link block max-w-xs">
                    <div className="relative mb-3 e-con-full imagewrapper">
                      <img src="https://norwegianrain.com/wp-content/uploads/2023/06/Harmattan-Unisex-W-Cropped-Mixed-black_2062-1200x1600.jpg" alt="Harmattan Unisex Cropped in Houndstooth Black" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail wp-post-image w-full object-cover" />
                      <div className="product-wishlist-icon active absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/85">
                        <Heart className="w-4 h-4" strokeWidth={1.3} />
                      </div>
                    </div>

                    <h2 className="woocommerce-loop-product__title text-[11px] tracking-[0.16em] uppercase text-[#111]">Harmattan Unisex Cropped</h2>
                    <div className="woocommerce-loop-product__colour mt-1 text-[12px] text-[#777]">Houndstooth Black</div>
                    <span className="price mt-1 block text-[12px] text-[#111]">
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          <span className="woocommerce-Price-currencySymbol">€</span>
                          770,00
                        </bdi>
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

/**
 * CartDrawerProps
 * Props for CartDrawer component.
 */
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * CartDrawer
 * Right-side slide-in drawer for the mini cart.
 * z-index 与 WishlistDrawer 保持一致，避免被 NavBar 遮挡。
 */
const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <div className="absolute inset-0 bg-black/20 cursor-default" onClick={onClose} aria-label="Close cart drawer backdrop" role="presentation" />
      <aside className="relative h-full w-full max-w-md bg-white shadow-[0_0_30px_rgba(0,0,0,0.18)] transform transition-transform duration-200 translate-x-0" aria-label="Shopping cart">
        <button type="button" className="absolute right-5 top-4 p-1 text-black" onClick={onClose} aria-label="Close cart drawer">
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="widget woocommerce widget_shopping_cart h-full flex">
          <div className="widget_shopping_cart_content flex-1 flex flex-col">
            <div className="woocommerce-mini-cart__empty-state flex-1 flex items-center justify-center px-6">
              <div className="text-center">
                <p className="woocommerce-mini-cart__empty-message mb-5 text-[15px] text-[#333]" style={{ fontFamily: "FreightText Book, Georgia, 'Times New Roman', serif" }}>
                  Your cart is empty
                </p>
                <button type="button" onClick={onClose} className="woocommerce-mini-cart__empty-button button inline-flex items-center justify-center px-10 py-3 bg-black text-white text-[11px] tracking-[0.2em] uppercase hover:bg-black/85">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NavBar;
