"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNextPayoutDate } from "@/utils/payout-dates"

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
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
  }

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Next Payout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="flex flex-col">
            <span className="text-3xl font-bold tabular-nums">{timeLeft.days}</span>
            <span className="text-xs text-muted-foreground">Days</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold tabular-nums">{timeLeft.hours}</span>
            <span className="text-xs text-muted-foreground">Hours</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold tabular-nums">{timeLeft.minutes}</span>
            <span className="text-xs text-muted-foreground">Minutes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold tabular-nums">{timeLeft.seconds}</span>
            <span className="text-xs text-muted-foreground">Seconds</span>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Next payout on {nextPayout.toLocaleDateString("en-GB")}
        </p>
      </CardContent>
    </Card>
  )
}

