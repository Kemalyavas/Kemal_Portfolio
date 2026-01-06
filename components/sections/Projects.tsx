'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, ProjectModal } from '@/components/ui'
import { projects } from '@/lib/constants'
import { t } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Locale, Project } from '@/types'

interface ProjectsProps {
  locale: Locale
}

export function Projects({ locale }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section id="projects" className="py-20 md:py-32">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            {t(locale, 'projects.title')}
          </motion.h2>

          <div className="grid gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => project.id !== 'inspection-system' && setSelectedProject(project)}
                className={cn(
                  'group relative p-6 md:p-8 rounded-2xl',
                  'bg-background-subtle border border-border',
                  'transition-all duration-300',
                  project.id === 'inspection-system'
                    ? 'cursor-default opacity-70'
                    : 'cursor-pointer hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:scale-[1.01]'
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Project Thumbnail */}
                  {project.id === 'inspection-system' ? (
                    <div className="w-full md:w-48 h-32 md:h-28 rounded-lg bg-border/50 overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                      <span className="text-foreground-muted text-sm font-medium">
                        {locale === 'en' ? 'Coming Soon' : 'Yakında'}
                      </span>
                    </div>
                  ) : project.images && project.images.length > 0 ? (
                    <div className={cn(
                      "w-full md:w-48 h-32 md:h-28 rounded-lg overflow-hidden flex-shrink-0 relative flex items-center justify-center",
                      (project.id === 'upwork-freelance' || project.id === 'neoone-chatbot')
                        ? 'bg-transparent p-2'
                        : 'bg-border/30'
                    )}>
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className={cn(
                          "transition-transform duration-300 group-hover:scale-105",
                          (project.id === 'upwork-freelance' || project.id === 'neoone-chatbot')
                            ? 'w-auto h-full object-contain'
                            : 'w-full h-full object-cover'
                        )}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-accent/80 px-3 py-1 rounded-full">
                          {locale === 'en' ? 'View Details' : 'Detayları Gör'}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground-muted mb-4 leading-relaxed line-clamp-2">
                      {project.description[locale]}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-border/50 text-foreground-muted rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="px-3 py-1 text-xs font-medium bg-border/50 text-foreground-muted rounded-full">
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-border/30 group-hover:bg-accent/20 transition-colors flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-foreground-muted group-hover:text-accent transition-colors"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        locale={locale}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
