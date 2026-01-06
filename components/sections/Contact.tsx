'use client'

import { motion } from 'framer-motion'
import { Button, Container } from '@/components/ui'
import { links } from '@/lib/constants'
import { t } from '@/lib/i18n'
import type { Locale } from '@/types'

interface ContactProps {
  locale: Locale
}

export function Contact({ locale }: ContactProps) {
  return (
    <section id="contact" className="py-20 md:py-32 border-t border-border">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t(locale, 'contact.title')}
          </h2>
          <p className="text-foreground-muted text-lg mb-10">
            {t(locale, 'contact.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => window.open(links.upwork, '_blank')}
            >
              {t(locale, 'contact.upwork')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(links.email, '_blank')}
            >
              {t(locale, 'contact.email')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(links.linkedin, '_blank')}
            >
              {t(locale, 'contact.linkedin')}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
