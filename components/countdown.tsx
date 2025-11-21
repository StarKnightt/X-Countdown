"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { getNextPayoutDate } from "@/utils/payout-dates"
import { motion, AnimatePresence } from "framer-motion"

// --- 1. Helper Hook ---
function useCountdown(targetDate: Date) {
  const calculateTimeLeft = useCallback(() => {
    const difference = targetDate.getTime() - new Date().getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      if (Object.values(newTimeLeft).every((v) => v === 0)) {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  return timeLeft
}

// --- 2. Animated Number Component ---
function AnimatedTimeUnit({ value, label, index }: { value: number; label: string; index: number }) {
  const formattedValue = useMemo(() => value.toString().padStart(2, "0"), [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="relative flex h-16 w-12 xs:h-18 xs:w-14 sm:h-20 sm:w-16 md:h-24 md:w-20 items-center justify-center overflow-hidden rounded-lg sm:rounded-xl bg-card border-2 border-border transition-all duration-500 group">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedValue}
            initial={{ y: "120%", opacity: 0, scale: 0.8, rotateX: 90 }}
            animate={{ y: "0%", opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ y: "-120%", opacity: 0, scale: 0.8, rotateX: -90 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.6
            }}
            className="absolute inset-0 flex items-center justify-center text-xl xs:text-2xl sm:text-3xl md:text-4xl font-mono font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>

        {/* Enhanced glow effect */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
        />

        {/* Shimmer effect */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent transform skew-x-12"
        />

        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-primary/30 rounded-tl"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-primary/30 rounded-br"></div>
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.1 }}
        className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

// --- 3. Floating Particles Background ---
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-foreground rounded-full opacity-20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            ],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// --- 4. Main Component ---
export default function CountdownComponent() {
  const [nextPayout, setNextPayout] = useState<Date | null>(null)
  const timeLeft = useCountdown(nextPayout || new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setNextPayout(getNextPayoutDate())
    setMounted(true)
  }, [])

  if (!mounted || !nextPayout) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-muted-foreground border-t-foreground rounded-full"
        />
      </div>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto text-foreground flex flex-col items-center justify-center p-4 relative">
      <FloatingParticles />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="text-center space-y-8 md:space-y-12 relative z-10 max-w-6xl mx-auto"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
            NEXT PAYOUT
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Track the time remaining until your next X (Twitter) creator payout.
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-foreground to-transparent mx-auto"
          />
        </motion.div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 lg:gap-12">
          {timeUnits.map((unit, index) => (
            <AnimatedTimeUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              index={index}
            />
          ))}
        </div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-muted-foreground text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"
          />
          <span className="text-base sm:text-lg md:text-xl font-light tracking-wide text-center leading-relaxed max-w-sm sm:max-w-none">
            Next payout on {nextPayout.toLocaleDateString("en-GB", {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </span>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-border"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-border"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-border"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-border"
      />
    </div>
  )
}