'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IntroFlow, LanguageToggle } from '@/components/intro'
import { Hero, Projects, Skills, Contact } from '@/components/sections'
import type { Locale } from '@/types'

export default function Home() {
  const [locale, setLocale] = useState<Locale>('en')
  const [showIntro, setShowIntro] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  // Prevent flash while loading
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroFlow
            key="intro"
            locale={locale}
            onComplete={handleIntroComplete}
          />
        ) : (
          <motion.main
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            {/* Language Toggle */}
            <div className="fixed top-6 right-6 z-40">
              <LanguageToggle locale={locale} onChange={setLocale} />
            </div>

            {/* Sections */}
            <Hero locale={locale} />
            <Projects locale={locale} />
            <Skills locale={locale} />
            <Contact locale={locale} />

            {/* Footer */}
            <footer className="py-8 text-center text-foreground-muted text-sm border-t border-border">
              <p>© {new Date().getFullYear()} Kemal Yavaş</p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
