"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNextPayoutDate } from "@/utils/payout-dates"
import { AnimatedBorder } from "@/components/animated-border"

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
  }, [targetDate])

  return timeLeft
}

export default function CountdownComponent() {
  const [nextPayout, setNextPayout] = useState<Date | null>(null)
  const timeLeft = useCountdown(nextPayout || new Date())

  useEffect(() => {
    setNextPayout(getNextPayoutDate())
  }, [])

  if (!nextPayout) {
    return null
  }

  return (
    <AnimatedBorder>
      <Card className="w-full max-w-[90vw] sm:max-w-md backdrop-blur-sm bg-background/95">
        <CardHeader>
          <CardTitle className="text-center text-lg sm:text-xl">Next Payout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="flex flex-col p-2 sm:p-3">
              <span className="text-xl sm:text-3xl font-bold tabular-nums">{timeLeft.days}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Days</span>
            </div>
            <div className="flex flex-col p-2 sm:p-3">
              <span className="text-xl sm:text-3xl font-bold tabular-nums">{timeLeft.hours}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Hours</span>
            </div>
            <div className="flex flex-col p-2 sm:p-3">
              <span className="text-xl sm:text-3xl font-bold tabular-nums">{timeLeft.minutes}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Minutes</span>
            </div>
            <div className="flex flex-col p-2 sm:p-3">
              <span className="text-xl sm:text-3xl font-bold tabular-nums">{timeLeft.seconds}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Seconds</span>
            </div>
          </div>
          <p className="mt-4 text-center text-xs sm:text-sm text-muted-foreground">
            Next payout on {nextPayout.toLocaleDateString("en-GB")}
          </p>
        </CardContent>
      </Card>
    </AnimatedBorder>
  )
}

