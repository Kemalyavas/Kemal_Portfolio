'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Project, Locale } from '@/types'

interface ProjectModalProps {
  project: Project | null
  locale: Locale
  onClose: () => void
}

// Helper to check if media is a video
function isVideo(src: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov']
  return videoExtensions.some(ext => src.toLowerCase().endsWith(ext))
}

export function ProjectModal({ project, locale, onClose }: ProjectModalProps) {
  const [selectedMedia, setSelectedMedia] = useState(0)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  // Reset selected media when project changes
  useEffect(() => {
    setSelectedMedia(0)
  }, [project])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  // Handle scroll wheel on main media to change selected media
  const handleWheel = (e: React.WheelEvent) => {
    if (!project?.images || project.images.length <= 1) return

    e.preventDefault()
    const images = project.images

    if (e.deltaY > 0) {
      // Scroll down - next image
      setSelectedMedia((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    } else {
      // Scroll up - previous image
      setSelectedMedia((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }
  }

  if (!project) return null

  const media = project.images || []
  const hasMedia = media.length > 0
  const currentMedia = media[selectedMedia]

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'relative w-full max-w-6xl max-h-[90vh]',
              'bg-background-subtle border border-border rounded-2xl shadow-2xl',
              'flex flex-col overflow-hidden'
            )}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background text-foreground-muted hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
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
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Side - Thumbnail Gallery */}
              {hasMedia && media.length > 1 && (
                <div
                  ref={thumbnailContainerRef}
                  className="hidden md:flex flex-col gap-2 p-3 border-r border-border bg-background/30 overflow-y-auto w-24 flex-shrink-0"
                  style={{ maxHeight: 'calc(90vh - 200px)' }}
                >
                  {media.map((src, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMedia(index)}
                      className={cn(
                        'w-full aspect-video rounded-lg overflow-hidden border-2 transition-all flex-shrink-0',
                        selectedMedia === index
                          ? 'border-accent ring-2 ring-accent/30'
                          : 'border-border/50 hover:border-foreground-muted opacity-60 hover:opacity-100'
                      )}
                    >
                      {isVideo(src) ? (
                        <div className="w-full h-full bg-background flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      ) : (
                        <img
                          src={src}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Right Side - Main Media Display */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Main Media */}
                {hasMedia && (
                  <div
                    className="relative flex-1 min-h-[250px] md:min-h-[400px] bg-black/40 flex items-center justify-center"
                    onWheel={handleWheel}
                  >
                    <AnimatePresence mode="wait">
                      {isVideo(currentMedia) ? (
                        <motion.video
                          key={selectedMedia}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          src={currentMedia}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-contain max-h-[50vh]"
                        />
                      ) : (
                        <motion.img
                          key={selectedMedia}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          src={currentMedia}
                          alt={`${project.title} screenshot`}
                          className="w-full h-full object-contain max-h-[50vh]"
                        />
                      )}
                    </AnimatePresence>

                    {/* Image Counter */}
                    {media.length > 1 && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 rounded-md text-xs text-foreground-muted">
                        {selectedMedia + 1} / {media.length}
                      </div>
                    )}

                    {/* Arrow Navigation */}
                    {media.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedMedia((prev) => (prev === 0 ? media.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background text-foreground-muted hover:text-foreground transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedMedia((prev) => (prev === media.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background text-foreground-muted hover:text-foreground transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Mobile Dots Navigation */}
                    {media.length > 1 && (
                      <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {media.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedMedia(index)}
                            className={cn(
                              'w-2 h-2 rounded-full transition-all',
                              selectedMedia === index
                                ? 'bg-accent w-6'
                                : 'bg-foreground-muted/50'
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Project Info - Scrollable */}
                <div className="p-6 border-t border-border bg-background-subtle overflow-y-auto max-h-[40vh]">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-foreground-muted mb-4 leading-relaxed whitespace-pre-line">
                    {project.description[locale]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-border/50 text-foreground-muted rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        {project.id === 'upwork-freelance'
                          ? (locale === 'en' ? 'Visit Profile' : 'Profili Ziyaret Et')
                          : (locale === 'en' ? 'Visit Project' : 'Projeyi Ziyaret Et')
                        }
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground-muted rounded-lg font-medium transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
