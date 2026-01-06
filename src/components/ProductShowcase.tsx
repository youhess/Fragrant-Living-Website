/**
 * ProductShowcase.tsx
 * 目的：组合首页的产品展示区块（Editorial → 双入口 → Raincho Unisex → Popular products）
 * - 桌面端：Editorial / 双入口 / Raincho / Popular products 横向轮播
 * - 平板 & 小屏：只展示 Popular products，使用两列网格卡片布局
 */

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * OverlayButtonProps
 * 说明：覆盖在图片上的纸片风格 CTA 按钮 Props
 */
interface OverlayButtonProps {
  /** 按钮文字 */
  label: string
  /** 链接地址 */
  href: string
}

/**
 * OverlayButton
 * 说明：简洁的白底纸片 CTA，带 hover 交互（反色）
 */
function OverlayButton({ label, href }: OverlayButtonProps): JSX.Element {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-block bg-white text-gray-900 text-[12px] tracking-[0.20em] uppercase px-6 py-2 border border-gray-100 shadow-sm transition-all duration-200 ease-in-out hover:bg-gray-900 hover:text-white"
    >
      {label}
    </a>
  )
}

/**
 * DesktopCategoryTileProps
 * 说明：桌面入口图卡 Props
 */
interface DesktopCategoryTileProps {
  href: string
  label: string
  imageSrc: string
  objectPosition?: string
}

/**
 * DesktopCategoryTile
 * 说明：单个竖幅图卡（用于 Men / Women 双入口），支持轻微 hover 缩放与暗遮罩
 */
function DesktopCategoryTile({
  href,
  label,
  imageSrc,
  objectPosition = 'center',
}: DesktopCategoryTileProps): JSX.Element {
  return (
    <a
      href={href}
      aria-label={label}
      className="group relative block overflow-hidden bg-neutral-50 aspect-[3/4]"
    >
      {/* 背景图 */}
      <img
        src={imageSrc}
        alt={label}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        style={{ objectPosition }}
      />

      {/* hover 暗遮罩，增强按钮可读性 */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

      {/* 中央纸片按钮（大致放在人物腹部位置） */}
      <div className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-auto">
          <OverlayButton label={label} href={href} />
        </div>
      </div>
    </a>
  )
}

/**
 * DesktopCategoryEntry
 * 说明：桌面端双入口区（Men / Women），仅 lg 及以上可见
 */
function DesktopCategoryEntry(): JSX.Element {
  const leftImage =
    'https://norwegianrain.com/wp-content/uploads/2025/09/Raincho-LW-H-grey-on-him-768x1024.jpg'
  const rightImage =
    'https://norwegianrain.com/wp-content/uploads/2025/09/NR_Maiwald-4_C-1024x1536.jpg'

  return (
    <section
      className="bg-white hidden lg:block"
      aria-labelledby="shop-entrances"
    >
      <div className="mx-auto max-w-5xl px-4 py-20">
        <div id="shop-entrances" className="grid grid-cols-2 gap-8">
          <DesktopCategoryTile
            href="/products/men"
            label="SHOP MEN"
            imageSrc={leftImage}
          />
          <DesktopCategoryTile
            href="/products/women"
            label="SHOP WOMEN"
            imageSrc={rightImage}
          />
        </div>
      </div>
    </section>
  )
}

/**
 * RainchoSellingLine
 * 说明：横幅上方的品牌宣言文本（两行），独立于图片外
 */
function RainchoSellingLine(): JSX.Element {
  return (
    <div className="mb-12 text-center">
      <p className="text-[13px] md:text-[13px] font-medium tracking-[0.28em] uppercase leading-relaxed text-gray-700">
        PREMIUM WATERPROOF OUTERWEAR SINCE 2010.
        <br />
        100% WATERPROOF, BREATHABLE, RECYCLED.
      </p>
    </div>
  )
}

/**
 * RainchoDesktopBanner
 * 说明：桌面端黑白 split 横幅（居中容器、背景图 + 中央叠加内容），仅 lg 显示
 */
function RainchoDesktopBanner(): JSX.Element {
  const bannerImage =
    'https://norwegianrain.com/wp-content/uploads/2025/01/RAINCHO-HIGHLIGHT-FRONT-DESKTOP.jpg'

  return (
    <div className="hidden lg:block">
      <div className="relative w-full overflow-hidden aspect-[2.3/1] bg-neutral-900">
        {/* 背景大图（黑白） */}
        <img
          src={bannerImage}
          alt="Raincho Unisex"
          className="absolute inset-0 h-full w-full object-cover object-center grayscale"
        />

        {/* 轻微暗色覆盖，提升对比度 */}
        <div className="absolute inset-0 bg-black/30" />

        {/* 叠加内容 */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="text-[56px] leading-[1.02] font-serif font-light">
            Raincho Unisex
          </h1>

          <p className="mt-4 max-w-3xl text-[12px] tracking-[0.22em] uppercase leading-tight text-gray-100">
            MEET THE ICONIC RAINCHO – OUR ALL-TIME BESTSELLER AND ALL-YEAR
            WARDROBE STAPLE
          </p>

          <div className="mt-6 flex items-center gap-4">
            <OverlayButton
              label="SHOP WOMEN"
              href="/products/men/raincho-unisex-on-her/"
            />
            <OverlayButton
              label="SHOP MEN"
              href="/products/men/raincho-unisex-on-him/"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Editorial
 * 说明：嵌入式 Editorial 文案区块（居中两列布局），仅桌面端展示
 */
const Editorial: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 hidden lg:block">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Season label */}
        <p
          className="mb-4 text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#555555]"
          style={{
            fontFamily: 'Avenir, system-ui, -apple-system, sans-serif',
          }}
        >
          AUTUMN/WINTER 2025/2026
        </p>

        {/* Main headline */}
        <h2
          className="mb-4 text-3xl md:text-[40px] leading-snug text-[#333333] font-normal"
          style={{
            fontFamily:
              "FreightText Book, Georgia, 'Times New Roman', serif",
          }}
        >
          Ready for Autumn?
        </h2>

        {/* Supporting line */}
        <p
          className="mx-auto max-w-2xl text-[11px] md:text-[12px] tracking-[0.16em] uppercase text-[#444444] leading-relaxed"
          style={{
            fontFamily: 'Avenir, system-ui, -apple-system, sans-serif',
          }}
        >
          Contemporary outerwear balancing sartorial elegance with everyday
          wearability
        </p>
      </div>
    </section>
  )
}

/**
 * PopularProduct
 * 说明：Popular products 卡片数据结构
 */
interface PopularProduct {
  id: string
  name: string
  color: string
  price: string
  href: string
  imageSrc: string
}

/**
 * Popular products – Men 分组数据（5 个）
 */
const POPULAR_PRODUCTS_MEN: PopularProduct[] = [
  {
    id: 'arctic-homme',
    name: 'ARCTIC HOMME',
    color: 'Mixed Black + natural shearling',
    price: '€1.160,00',
    href: 'https://norwegianrain.com/product/arctic-homme-mixed-black-w-natural-shearling/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2023/07/297ed05d-565b-47d0-841d-c05d8639278f.jpg',
  },
  {
    id: 'raincho-unisex-men',
    name: 'RAINCHO UNISEX',
    color: 'Mixed Black',
    price: '€740,00',
    href: 'https://norwegianrain.com/product/raincho-unisex-mixed-black/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2020/12/Raincho-Unisex-M-Mixed-Black_0667-1920x2560.jpg',
  },
  {
    id: 'walker-homme',
    name: 'WALKER HOMME MID LENGTH',
    color: 'Mixed Dark Navy',
    price: '€780,00',
    href: 'https://norwegianrain.com/product/walker-homme-mid-length-mixed-dark-navy/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2023/03/Walker-Homme-Mid-Mixed-Dark-Navy_0360-1920x2560.jpg',
  },
  {
    id: 'raincho-unisex-men-2',
    name: 'RAINCHO UNISEX',
    color: 'Mixed Black',
    price: '€740,00',
    href: 'https://norwegianrain.com/product/raincho-unisex-mixed-black/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2020/12/Moscow-Homme-Mixed-Army-Green_5-scaled-1536x2048.jpg',
  },
  {
    id: 'arctic-homme-2',
    name: 'ARCTIC HOMME',
    color: 'Mixed Black + natural shearling',
    price: '€1.160,00',
    href: 'https://norwegianrain.com/product/arctic-homme-mixed-black-w-natural-shearling/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2024/10/Padded-Raincho-Unisex-M-SLW-Black_0611-scaled-1536x2048.jpg',
  },
]

/**
 * Popular products – Women 分组数据（4 个）
 */
const POPULAR_PRODUCTS_WOMEN: PopularProduct[] = [
  {
    id: 'raincho-unisex-women',
    name: 'RAINCHO UNISEX',
    color: 'Mixed Black',
    price: '€740,00',
    href: 'https://norwegianrain.com/product/raincho-unisex-mixed-black/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2020/12/Raincho-Unisex-W-Mixed-Black_0997-scaled-1920x2560.jpg',
  },
  {
    id: 'elin-femme',
    name: 'ELIN FEMME',
    color: 'Mixed Army Green',
    price: '€980,00',
    href: 'https://norwegianrain.com/product/elin-femme-mixed-army-green/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2023/03/Elin-Femme-Mixed-Army-Green_0242-1920x2560.jpg',
  },
  {
    id: 'harmattan-unisex',
    name: 'HARMATTAN UNISEX CROPPED',
    color: 'Moundcloth Black',
    price: '€770,00',
    href: 'https://norwegianrain.com/product/harmattan-unisex-cropped-moundcloth-black/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2023/06/Harmattan-Unisex-W-Cropped-Mixed-black_2062-1920x2560.jpg',
  },
  {
    id: 'raincho-unisex-women-2',
    name: 'RAINCHO UNISEX',
    color: 'Mixed Black',
    price: '€740,00',
    href: 'https://norwegianrain.com/product/raincho-unisex-mixed-black/?v=255a5cac7685',
    imageSrc:
      'https://norwegianrain.com/wp-content/uploads/2020/12/Noir-Femme-Mixed-black_0059-1536x2048.jpg',
  },
]

/**
 * PopularProductCardProps
 * 说明：单个 Popular product 卡片 Props（桌面轮播用）
 */
interface PopularProductCardProps {
  /** 产品实体数据 */
  product: PopularProduct
}

/**
 * PopularProductCard
 * 说明：桌面端横向轮播中的产品卡片
 */
function PopularProductCard({ product }: PopularProductCardProps): JSX.Element {
  return (
    <a
      href={product.href}
      className="group relative block min-w-[320px] max-w-[360px] flex-shrink-0 cursor-pointer"
    >
      {/* 心形收藏图标（右上角） */}
      <div className="absolute right-4 top-4 z-10">
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 14"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="transition-colors duration-200 group-hover:stroke-gray-900"
        >
          <path
            d="M7.46447 1.667C5.98563 0.111001 3.58796 0.111001 2.10913 1.667C0.630291 3.22299 0.630291 5.74576 2.10913 7.30176L8 13.5L13.8909 7.30176C15.3697 5.74576 15.3697 3.22299 13.8909 1.667C12.412 0.111001 10.0144 0.111001 8.53553 1.667L8 2.23047L7.46447 1.667Z"
            stroke="#000"
            strokeLinejoin="bevel"
          />
        </svg>
      </div>

      {/* 图片区域 */}
      <div className="bg-[#f7f4f1]">
        <div className="aspect-[3/4] flex items-end justify-center">
          <img
            src={product.imageSrc}
            alt={product.name}
            className="h-[88%] w-auto object-contain transition-transform duration-300 group-hover:translate-y-[-2px]"
          />
        </div>
      </div>

      {/* 文本信息 */}
      <div className="mt-3 text-left">
        <h3 className="text-[12px] font-medium tracking-[0.08em] text-gray-900 uppercase">
          {product.name}
        </h3>
        <div className="mt-1 text-[11px] text-gray-600">
          <div className="woocommerce-loop-product__colour">{product.color}</div>
          <div className="mt-0.5 text-[12px] text-gray-800">{product.price}</div>
        </div>
      </div>
    </a>
  )
}

/**
 * PopularProductCardGridProps
 * 说明：平板/小屏网格视图下的产品卡片 Props
 */
interface PopularProductCardGridProps {
  /** 产品实体数据 */
  product: PopularProduct
}

/**
 * PopularProductCardGrid
 * 说明：平板/小屏使用的「两列网格」电商卡片版本
 * - 上图下文结构
 * - 图片区域内右上角心形收藏
 * - 下方三行文本：系列名 / 副标题 / 价格
 */
const PopularProductCardGrid: React.FC<PopularProductCardGridProps> = ({
  product,
}) => {
  return (
    <a
      href={product.href}
      className="group relative flex flex-col cursor-pointer"
      aria-label={product.name}
    >
      {/* 图片区域，浅灰棚拍背景 */}
      <div className="relative bg-[#f7f4f1] overflow-hidden">
        <div className="aspect-[3/4] flex items-end justify-center">
          <img
            src={product.imageSrc}
            alt={product.name}
            className="h-[90%] w-auto object-contain transition-transform duration-300 group-hover:translate-y-[-4px]"
          />
        </div>

        {/* 收藏心形图标（图片右上角） */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform duration-150 hover:-translate-y-0.5"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 14"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M7.46447 1.667C5.98563 0.111001 3.58796 0.111001 2.10913 1.667C0.630291 3.22299 0.630291 5.74576 2.10913 7.30176L8 13.5L13.8909 7.30176C15.3697 5.74576 15.3697 3.22299 13.8909 1.667C12.412 0.111001 10.0144 0.111001 8.53553 1.667L8 2.23047L7.46447 1.667Z"
              stroke="#111827"
              strokeWidth="1"
              strokeLinejoin="bevel"
            />
          </svg>
        </button>
      </div>

      {/* 信息区：三行文本 */}
      <div className="mt-3 text-left">
        <p className="text-[11px] tracking-[0.16em] uppercase text-gray-800">
          {product.name}
        </p>
        <p className="mt-1 text-[11px] text-gray-500">{product.color}</p>
        <p className="mt-1 text-[12px] font-medium text-gray-900">
          {product.price}
        </p>
      </div>
    </a>
  )
}

/**
 * PopularProductsCarouselRowProps
 * 说明：单行横向轮播 Props（桌面端）
 */
interface PopularProductsCarouselRowProps {
  /** 该行的产品列表 */
  products: PopularProduct[]
  /** ARIA 标签，用于辅助说明该轮播内容 */
  ariaLabel: string
}

/**
 * PopularProductsCarouselRow
 * 说明：实现「3列可见 + 横向滑动」的轻量轮播，含左右箭头与底部进度条
 * - 左右箭头每次精确移动一个卡片宽度（含间距）
 */
function PopularProductsCarouselRow({
  products,
  ariaLabel,
}: PopularProductsCarouselRowProps): JSX.Element {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  /**
   * 更新左右箭头可用状态与进度条宽度
   */
  const updateScrollState = (): void => {
    const node = trackRef.current
    if (!node) return
    const { scrollLeft, scrollWidth, clientWidth } = node
    const maxScroll = scrollWidth - clientWidth

    setCanScrollPrev(scrollLeft > 0)
    setCanScrollNext(scrollLeft < maxScroll - 1)

    if (maxScroll <= 0) {
      setScrollProgress(100)
    } else {
      setScrollProgress((scrollLeft / maxScroll) * 100)
    }
  }

  /**
   * 处理点击左右箭头时的滚动逻辑
   * @param direction -1 表示向左，1 表示向右
   */
  const handleArrowClick = (direction: -1 | 1): void => {
    const node = trackRef.current
    if (!node) return

    // 使用首个子元素宽度 + gap 作为单步位移，保证一次移动一个卡片
    const firstChild = node.firstElementChild as HTMLElement | null
    const GAP_PX = 20 // Tailwind gap-5 对应的水平间距
    const step =
      (firstChild?.offsetWidth ?? node.clientWidth * 0.8) +
      (firstChild ? GAP_PX : 0)

    node.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  useEffect(() => {
    updateScrollState()
  }, [])

  return (
    <div className="relative" aria-label={ariaLabel}>
      {/* 横向滚动容器 */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-hidden scroll-smooth"
        onScroll={updateScrollState}
      >
        {products.map((product) => (
          <PopularProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 左箭头 */}
      <button
        type="button"
        aria-label="Previous products"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/80 p-1 text-gray-500 shadow-sm transition-opacity hover:text-gray-900 disabled:opacity-0"
        disabled={!canScrollPrev}
        onClick={() => handleArrowClick(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* 右箭头 */}
      <button
        type="button"
        aria-label="Next products"
        className="absolute right-0 top-1/2 translate-y-[-50%] translate-x-1/2 rounded-full bg-white/80 p-1 text-gray-500 shadow-sm transition-opacity hover:text-gray-900 disabled:opacity-30"
        disabled={!canScrollNext}
        onClick={() => handleArrowClick(1)}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* 底部滚动条（细线进度） */}
      <div className="mt-6 h-[1px] w-full bg-gray-200">
        <div
          className="h-[2px] bg-gray-500 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  )
}

/**
 * PopularProductsSection
 * 说明：桌面端 Popular products 区块（标题 + Shop Men / Shop Women + 两行轮播）
 * - 仅桌面端可见（hidden lg:block）
 */
function PopularProductsSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
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
      { threshold: 0.15 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`bg-white hidden lg:block transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-labelledby="popular-products-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-24">
        {/* 标题 + CTA 按钮 */}
        <header className="mb-12 text-center">
          <h2
            id="popular-products-heading"
            className="font-serif text-[36px] md:text-[42px] leading-tight font-light text-gray-900"
          >
            Popular products
          </h2>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="https://norwegianrain.com/products/men/?v=255a5cac7685"
              className="inline-flex items-center justify-center bg-black px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-white hover:text-black border border-black"
            >
              Shop Men
            </a>
            <a
              href="https://norwegianrain.com/products/women/?v=255a5cac7685"
              className="inline-flex items-center justify-center bg-black px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-white hover:text-black border border-black"
            >
              Shop Women
            </a>
          </div>
        </header>

        {/* 两行轮播：Men / Women */}
        <div className="space-y-12">
          <PopularProductsCarouselRow
            products={POPULAR_PRODUCTS_MEN}
            ariaLabel="Popular products for men"
          />
          <PopularProductsCarouselRow
            products={POPULAR_PRODUCTS_WOMEN}
            ariaLabel="Popular products for women"
          />
        </div>
      </div>
    </section>
  )
}

/**
 * TabletPopularProductsSection
 * 说明：平板 & 小屏下的 Popular products 区块
 * - 顶部标题居中 + 两个 CTA 并排
 * - 下方两列网格卡片（更大、更“海报感”）
 * - 在 lg 以上隐藏（由桌面版组件接管）
 */
function TabletPopularProductsSection(): JSX.Element {
  const allProducts: PopularProduct[] = [
    ...POPULAR_PRODUCTS_MEN,
    ...POPULAR_PRODUCTS_WOMEN,
  ]

  return (
    <section
      className="bg-white block lg:hidden"
      aria-labelledby="popular-products-heading-tablet"
    >
      <div className="mx-auto max-w-5xl px-4 py-16">
        {/* 顶部信息区：标题 + CTA */}
        <header className="text-center">
          <h2
            id="popular-products-heading-tablet"
            className="font-serif text-[26px] md:text-[30px] leading-tight font-light text-gray-900"
          >
            Popular products
          </h2>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://norwegianrain.com/products/men/?v=255a5cac7685"
              className="inline-flex h-9 items-center justify-center rounded-none border border-black bg-black px-5 text-[10px] uppercase tracking-[0.20em] text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              Shop Men
            </a>
            <a
              href="https://norwegianrain.com/products/women/?v=255a5cac7685"
              className="inline-flex h-9 items-center justify-center rounded-none border border-black bg-black px-5 text-[10px] uppercase tracking-[0.20em] text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              Shop Women
            </a>
          </div>
        </header>

        {/* 商品网格：两列布局，卡片更大 */}
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {allProducts.map((product) => (
            <PopularProductCardGrid key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * ProductShowcase
 * 说明：组合所有子块（Editorial → Desktop 双入口 → Raincho Unisex → Popular products）
 * - 桌面端：展示全部区块并使用横向轮播
 * - 平板/小屏：只展示 Popular products，两列网格布局
 */
export default function ProductShowcase(): JSX.Element {
  return (
    <div>
      {/* Editorial 文字（Desktop only） */}
      <Editorial />

      {/* Desktop 双入口（Men / Women） */}
      <DesktopCategoryEntry />

      {/* Raincho Unisex 区块（含顶部宣言，Desktop only） */}
      <section className="bg-white hidden lg:block">
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-24">
          <RainchoSellingLine />
          <RainchoDesktopBanner />
        </div>
      </section>

      {/* Popular products – Tablet & Small screen（两列网格） */}
      <TabletPopularProductsSection />

      {/* Popular products – Desktop（横向轮播） */}
      <PopularProductsSection />
    </div>
  )
}
