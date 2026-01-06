'use client'

import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

interface LanguageToggleProps {
  locale: Locale
  onChange: (locale: Locale) => void
  className?: string
}

export function LanguageToggle({ locale, onChange, className }: LanguageToggleProps) {
  return (
    <div className={cn('flex items-center gap-1 text-sm', className)}>
      <button
        onClick={() => onChange('en')}
        className={cn(
          'px-2 py-1 rounded transition-all duration-200',
          locale === 'en'
            ? 'text-foreground bg-background-subtle'
            : 'text-foreground-muted hover:text-foreground'
        )}
      >
        EN
      </button>
      <span className="text-border">|</span>
      <button
        onClick={() => onChange('tr')}
        className={cn(
          'px-2 py-1 rounded transition-all duration-200',
          locale === 'tr'
            ? 'text-foreground bg-background-subtle'
            : 'text-foreground-muted hover:text-foreground'
        )}
      >
        TR
      </button>
    </div>
  )
}
