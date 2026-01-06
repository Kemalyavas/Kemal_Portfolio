'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui'
import { stats } from '@/lib/constants'
import type { Locale } from '@/types'

interface StatsProps {
  locale: Locale
}

export function Stats({ locale }: StatsProps) {
  return (
    <section className="py-8 border-y border-border">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label.en}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <span className="text-3xl md:text-4xl font-bold text-accent">
                {stat.value}
              </span>
              <span className="ml-2 text-foreground-muted">
                {stat.label[locale]}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
