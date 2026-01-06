'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

interface IntroFlowProps {
  locale: Locale
  onComplete: () => void
}

type Step = 'purpose' | 'budget' | 'budget-amount' | 'fun-fact' | 'deadline'

const texts = {
  en: {
    purpose: {
      question: 'What brings you here?',
      option1: 'Looking to hire',
      option2: 'Just exploring',
    },
    budget: {
      question: 'Do you have a budget in mind?',
      option1: 'Yes, I do',
      option2: 'Not yet',
    },
    budgetAmount: {
      question: "What's your budget range?",
      placeholder: 'Enter amount (e.g. $5,000)',
      continue: 'Continue',
    },
    funFact: {
      text: "Fun fact: That number wasn't actually saved to any database. So yeah, relax.",
      continue: 'Continue',
    },
    deadline: {
      question: 'Do you have a deadline?',
      option1: 'Yes',
      option2: 'Flexible',
    },
  },
  tr: {
    purpose: {
      question: 'Seni buraya getiren ne?',
      option1: 'Birini aramak',
      option2: 'Sadece bakıyorum',
    },
    budget: {
      question: 'Aklında bir bütçe var mı?',
      option1: 'Evet, var',
      option2: 'Henüz yok',
    },
    budgetAmount: {
      question: 'Bütçe aralığın ne?',
      placeholder: 'Miktar gir (ör. $5,000)',
      continue: 'Devam',
    },
    funFact: {
      text: 'Fun fact: O numara aslında hiçbir veritabanına kaydedilmedi. Yani rahat ol.',
      continue: 'Devam',
    },
    deadline: {
      question: 'Deadline var mı?',
      option1: 'Evet',
      option2: 'Esnek',
    },
  },
}

const stepOrder: Step[] = ['purpose', 'budget', 'budget-amount', 'fun-fact', 'deadline']

export function IntroFlow({ locale, onComplete }: IntroFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('purpose')
  const [budgetValue, setBudgetValue] = useState('')
  const [isExiting, setIsExiting] = useState(false)

  const t = texts[locale]
  const currentStepIndex = stepOrder.indexOf(currentStep)
  const totalSteps = stepOrder.length

  const goToPortfolio = () => {
    setIsExiting(true)
    setTimeout(onComplete, 500)
  }

  const handlePurposeSelect = (isHiring: boolean) => {
    if (isHiring) {
      setCurrentStep('budget')
    } else {
      goToPortfolio()
    }
  }

  const handleBudgetSelect = (hasBudget: boolean) => {
    if (hasBudget) {
      setCurrentStep('budget-amount')
    } else {
      goToPortfolio()
    }
  }

  const handleBudgetAmountSubmit = () => {
    setCurrentStep('fun-fact')
  }

  const handleFunFactContinue = () => {
    setCurrentStep('deadline')
  }

  // Auto-advance from fun fact after 5.5 seconds
  useEffect(() => {
    if (currentStep === 'fun-fact') {
      const timer = setTimeout(() => {
        setCurrentStep('deadline')
      }, 5500)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const handleDeadlineSelect = () => {
    goToPortfolio()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'purpose':
        return (
          <motion.div
            key="purpose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center px-6 max-w-xl"
          >
            <p className="text-foreground-muted text-sm mb-4">1 / {totalSteps}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
              {t.purpose.question}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <OptionButton onClick={() => handlePurposeSelect(true)}>
                {t.purpose.option1}
              </OptionButton>
              <OptionButton onClick={() => handlePurposeSelect(false)}>
                {t.purpose.option2}
              </OptionButton>
            </div>
          </motion.div>
        )

      case 'budget':
        return (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center px-6 max-w-xl"
          >
            <p className="text-foreground-muted text-sm mb-4">2 / {totalSteps}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
              {t.budget.question}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <OptionButton onClick={() => handleBudgetSelect(true)}>
                {t.budget.option1}
              </OptionButton>
              <OptionButton onClick={() => handleBudgetSelect(false)}>
                {t.budget.option2}
              </OptionButton>
            </div>
          </motion.div>
        )

      case 'budget-amount':
        return (
          <motion.div
            key="budget-amount"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center px-6 max-w-xl"
          >
            <p className="text-foreground-muted text-sm mb-4">3 / {totalSteps}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
              {t.budgetAmount.question}
            </h2>
            <div className="flex flex-col gap-4 items-center">
              <input
                type="text"
                value={budgetValue}
                onChange={(e) => setBudgetValue(e.target.value)}
                placeholder={t.budgetAmount.placeholder}
                className={cn(
                  'w-full max-w-xs px-6 py-4 rounded-xl text-lg font-medium',
                  'bg-background-subtle border border-border',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
                  'placeholder:text-foreground-muted/50 text-center'
                )}
                autoFocus
              />
              <OptionButton
                onClick={handleBudgetAmountSubmit}
                disabled={!budgetValue.trim()}
              >
                {t.budgetAmount.continue}
              </OptionButton>
            </div>
          </motion.div>
        )

      case 'fun-fact':
        return (
          <motion.div
            key="fun-fact"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center px-6 max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-foreground-muted leading-relaxed">
                {t.funFact.text}
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleFunFactContinue}
                className="mt-8 text-accent hover:text-accent-hover transition-colors"
              >
                {t.funFact.continue} →
              </motion.button>
            </motion.div>
          </motion.div>
        )

      case 'deadline':
        return (
          <motion.div
            key="deadline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center px-6 max-w-xl"
          >
            <p className="text-foreground-muted text-sm mb-4">5 / {totalSteps}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
              {t.deadline.question}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <OptionButton onClick={handleDeadlineSelect}>
                {t.deadline.option1}
              </OptionButton>
              <OptionButton onClick={handleDeadlineSelect}>
                {t.deadline.option2}
              </OptionButton>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Progress Dots */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
        {stepOrder.map((step, index) => (
          <div
            key={step}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentStepIndex
                ? 'bg-accent w-6'
                : index < currentStepIndex
                ? 'bg-accent'
                : 'bg-border'
            )}
          />
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>

      {/* Decorative Element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground-muted/30 text-xs">
        kemal.dev
      </div>
    </motion.div>
  )
}

function OptionButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200',
        'border border-border hover:border-accent',
        'hover:bg-accent/10 hover:text-accent',
        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background',
        disabled && 'opacity-50 cursor-not-allowed hover:border-border hover:bg-transparent hover:text-foreground'
      )}
    >
      {children}
    </motion.button>
  )
}
