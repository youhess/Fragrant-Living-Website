/**
 * Home page entry: assembles the full landing experience.
 * Purpose: Provide a single-page, immersive narrative experience that composes
 * the AnnouncementBar, NavBar, Hero, ProductShowcase (with Editorial / dual entry /
 * Raincho / Popular products), Community subscription and Footer.
 */

import React from 'react'
import AnnouncementBar from '../components/AnnouncementBar'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import BrandStory from '../components/BrandStory'
import CTASection from '../components/CTASection'
import Community from '../components/Community'
import Footer from '../components/Footer'

/**
 * HomePage component
 * Purpose: Page-level composition for the landing experience.
 */
export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter antialiased">
      <AnnouncementBar />
      <NavBar />
      <main className="w-full">
        <Hero />
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <ProductShowcase />
          <BrandStory />
          <CTASection />
          <Community />
        </section>
      </main>
      <Footer />
    </div>
  )
}
