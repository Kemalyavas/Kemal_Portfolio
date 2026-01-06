import type { Locale } from '@/types'

export const translations = {
  en: {
    // Intro
    intro: {
      question1: 'Do you have a budget?',
      question2: 'Do you know what you want?',
      question3: 'Do you have a deadline?',
      yes: 'Yes, I do',
      notYet: 'Not yet',
      flexible: 'Flexible',
      figureOut: "Let's figure it out together",
      reject: 'Maybe another time',
      skip: 'Skip intro',
    },
    // Hero
    hero: {
      greeting: "Hey, I'm",
      name: 'Kemal Yavaş',
      title: 'Full Stack Developer',
      tagline: 'Building what others only talk about.',
      subtitle: 'React, Next.js, AI Integration',
      cta: "Let's Talk",
      viewProjects: 'View Projects',
    },
    // Stats
    stats: {
      projects: 'Projects',
      success: 'Success Rate',
      status: 'Top Rated',
    },
    // Projects
    projects: {
      title: 'Recent Work',
      viewProject: 'View Project',
    },
    // Skills
    skills: {
      title: 'Tech Stack',
    },
    // Contact
    contact: {
      title: 'Ready to work together?',
      subtitle: "Let's build something great.",
      upwork: 'Hire on Upwork',
      email: 'Send Email',
      linkedin: 'LinkedIn',
    },
  },
  tr: {
    // Intro
    intro: {
      question1: 'Bütçen belli mi?',
      question2: 'Ne istediğini biliyor musun?',
      question3: 'Deadline var mı?',
      yes: 'Evet',
      notYet: 'Henüz değil',
      flexible: 'Esnek',
      figureOut: 'Birlikte çözeriz',
      reject: 'Belki başka zaman',
      skip: 'Geç',
    },
    // Hero
    hero: {
      greeting: 'Merhaba, ben',
      name: 'Kemal Yavaş',
      title: 'Full Stack Developer',
      tagline: 'Başkalarının sadece hakkında konuşabildikleri projeleri yapıyorum.',
      subtitle: 'React, Next.js, AI Entegrasyonu',
      cta: 'İletişime Geç',
      viewProjects: 'Projeleri Gör',
    },
    // Stats
    stats: {
      projects: 'Proje',
      success: 'Başarı Oranı',
      status: 'Top Rated',
    },
    // Projects
    projects: {
      title: 'Son Çalışmalar',
      viewProject: 'Projeyi Gör',
    },
    // Skills
    skills: {
      title: 'Teknolojiler',
    },
    // Contact
    contact: {
      title: 'Birlikte çalışalım mı?',
      subtitle: 'Harika bir şey inşa edelim.',
      upwork: "Upwork'te İşe Al",
      email: 'Email Gönder',
      linkedin: 'LinkedIn',
    },
  },
} as const

export function t(locale: Locale, path: string): string {
  const keys = path.split('.')
  let value: unknown = translations[locale]

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      return path
    }
  }

  return typeof value === 'string' ? value : path
}
