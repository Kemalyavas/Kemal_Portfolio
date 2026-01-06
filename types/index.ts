export type Locale = 'en' | 'tr'

export interface Question {
  id: string
  text: {
    en: string
    tr: string
  }
  options: QuestionOption[]
}

export interface QuestionOption {
  label: {
    en: string
    tr: string
  }
  value: string
  isPositive: boolean
  message?: {
    en: string
    tr: string
  }
}

export interface Project {
  id: string
  title: string
  description: {
    en: string
    tr: string
  }
  tags: string[]
  images?: string[]
  link?: string
  github?: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'ai'
  level?: number // 0-100
}

export interface Stat {
  value: string
  label: {
    en: string
    tr: string
  }
}
