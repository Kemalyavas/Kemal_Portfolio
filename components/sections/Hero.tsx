'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Container } from '@/components/ui'
import { t } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

interface HeroProps {
  locale: Locale
}

type Tab = 'about.md' | 'skills.json' | 'projects.ts' | 'contact.tsx'

const tabContents: Record<Locale, Record<Tab, { lines: string[]; language: string }>> = {
  en: {
    'about.md': {
      language: 'markdown',
      lines: [
        '# Kemal Yavaş',
        '',
        'Full Stack Developer from Kocaeli, Turkey.',
        '',
        'I build things that actually work.',
        'Currently available for freelance projects.',
      ],
    },
    'skills.json': {
      language: 'json',
      lines: [
        '{',
        '  "frontend": ["React", "Next.js", "TypeScript"],',
        '  "backend": ["Node.js", "Python"],',
        '  "ai": ["Claude API", "OpenAI"],',
        '  "tools": ["Git", "Vercel", "Supabase"]',
        '}',
      ],
    },
    'projects.ts': {
      language: 'typescript',
      lines: [
        'const projects = [',
        '  { name: "Home Inspection System", client: "US" },',
        '  { name: "NeoOne AI Chatbot", tech: "RAG" },',
        '  { name: "Duygu Evreni", tech: "Three.js" }',
        ']',
      ],
    },
    'contact.tsx': {
      language: 'tsx',
      lines: [
        '<Contact',
        '  email="kemalyavaass@gmail.com"',
        '  upwork="Top Rated"',
        '  linkedin="/in/kemalyavaas"',
        '  status="available"',
        '/>',
      ],
    },
  },
  tr: {
    'about.md': {
      language: 'markdown',
      lines: [
        '# Kemal Yavaş',
        '',
        'Kocaeli\'den Full Stack Developer.',
        '',
        'Gerçekten çalışan şeyler yapıyorum.',
        'Freelance projeler için müsaitim.',
      ],
    },
    'skills.json': {
      language: 'json',
      lines: [
        '{',
        '  "frontend": ["React", "Next.js", "TypeScript"],',
        '  "backend": ["Node.js", "Python"],',
        '  "ai": ["Claude API", "OpenAI"],',
        '  "araçlar": ["Git", "Vercel", "Supabase"]',
        '}',
      ],
    },
    'projects.ts': {
      language: 'typescript',
      lines: [
        'const projeler = [',
        '  { isim: "Home Inspection System", müşteri: "US" },',
        '  { isim: "NeoOne AI Chatbot", tech: "RAG" },',
        '  { isim: "Duygu Evreni", tech: "Three.js" }',
        ']',
      ],
    },
    'contact.tsx': {
      language: 'tsx',
      lines: [
        '<İletişim',
        '  email="kemalyavaass@gmail.com"',
        '  upwork="Top Rated"',
        '  linkedin="/in/kemalyavaas"',
        '  durum="müsait"',
        '/>',
      ],
    },
  },
}

function CodeEditor({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState<Tab>('about.md')
  const tabs: Tab[] = ['about.md', 'skills.json', 'projects.ts', 'contact.tsx']
  const content = tabContents[locale][activeTab]

  const getIcon = (tab: Tab) => {
    switch (tab) {
      case 'about.md':
        return <span className="text-blue-400">M↓</span>
      case 'skills.json':
        return <span className="text-yellow-400">{'{}'}</span>
      case 'projects.ts':
        return <span className="text-blue-500">TS</span>
      case 'contact.tsx':
        return <span className="text-blue-400">⚛</span>
    }
  }

  const renderLine = (line: string, language: string) => {
    if (language === 'markdown') {
      if (line.startsWith('# ')) {
        return <span className="text-blue-400 font-bold">{line}</span>
      }
      return <span className="text-foreground-muted">{line}</span>
    }

    if (language === 'json') {
      return (
        <span>
          {line.split(/(".*?")/).map((part, i) =>
            part.startsWith('"') ? (
              <span key={i} className={part.includes(':') ? 'text-blue-300' : 'text-green-400'}>
                {part}
              </span>
            ) : (
              <span key={i} className="text-foreground-muted">{part}</span>
            )
          )}
        </span>
      )
    }

    if (language === 'typescript' || language === 'tsx') {
      if (line.includes('const ')) {
        return (
          <span>
            <span className="text-purple-400">const</span>
            <span className="text-foreground-muted">{line.replace('const', '')}</span>
          </span>
        )
      }
      if (line.includes('<') && line.includes('>')) {
        return (
          <span>
            {line.split(/(<\/?[A-Z][a-zA-Z]*|[a-z]+="[^"]*"|\/?>)/g).map((part, i) => {
              if (part.match(/^<\/?[A-Z]/)) return <span key={i} className="text-green-400">{part}</span>
              if (part.match(/^[a-z]+="/)) return <span key={i} className="text-blue-300">{part}</span>
              if (part === '/>' || part === '>') return <span key={i} className="text-green-400">{part}</span>
              return <span key={i} className="text-orange-300">{part}</span>
            })}
          </span>
        )
      }
      return (
        <span>
          {line.split(/(".*?")/).map((part, i) =>
            part.startsWith('"') ? (
              <span key={i} className="text-orange-300">{part}</span>
            ) : (
              <span key={i} className="text-foreground-muted">{part}</span>
            )
          )}
        </span>
      )
    }

    return <span className="text-foreground-muted">{line}</span>
  }

  return (
    <div className="relative bg-[#1e1e1e] border border-border rounded-xl overflow-hidden shadow-2xl min-w-[520px]">
      {/* Tab bar */}
      <div className="flex bg-[#252526] border-b border-[#3c3c3c]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 text-xs font-mono border-r border-[#3c3c3c] transition-colors whitespace-nowrap',
              activeTab === tab
                ? 'bg-[#1e1e1e] text-foreground'
                : 'bg-[#2d2d2d] text-foreground-muted hover:bg-[#2a2a2a]'
            )}
          >
            {getIcon(tab)}
            <span>{tab}</span>
          </button>
        ))}
      </div>

      {/* Editor content */}
      <div className="p-5 font-mono text-sm">
        <table className="border-collapse">
          <tbody>
            {content.lines.map((line, index) => (
              <tr key={index} className="leading-6">
                <td className="pr-4 text-right text-foreground-muted/40 select-none w-8">
                  {index + 1}
                </td>
                <td className="whitespace-pre">
                  {renderLine(line, content.language) || <span>&nbsp;</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Hero({ locale }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-foreground-muted text-lg mb-2"
            >
              {t(locale, 'hero.greeting')}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-2"
            >
              {t(locale, 'hero.name')}
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-accent font-medium mb-6"
            >
              {t(locale, 'hero.title')}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-foreground-muted mb-4 max-w-xl"
            >
              {t(locale, 'hero.tagline')}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-foreground-muted mb-10"
            >
              {t(locale, 'hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t(locale, 'hero.cta')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t(locale, 'hero.viewProjects')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - VS Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl blur-xl" />
              <CodeEditor locale={locale} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
