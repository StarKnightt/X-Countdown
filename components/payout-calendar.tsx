"use client"

import { useState } from 'react'
import Calendar from 'react-calendar'
import { PAYOUT_DATES } from '@/utils/payout-dates'
import 'react-calendar/dist/Calendar.css'

export function PayoutCalendar() {
  const [date, setDate] = useState<Date>(new Date())

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isPayoutDate = PAYOUT_DATES.some(payoutDate => 
        payoutDate.getDate() === date.getDate() &&
        payoutDate.getMonth() === date.getMonth() &&
        payoutDate.getFullYear() === date.getFullYear()
      )
      return isPayoutDate ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' : ''
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-4 rounded-xl bg-card text-card-foreground shadow-sm">
        <Calendar 
          onChange={(value: any) => {
            if (value instanceof Date) {
              setDate(value)
            }
          }}
          value={date}
          tileClassName={tileClassName}
          minDetail="month"
          className="border-none"
          next2Label={null}
          prev2Label={null}
          navigationLabel={({ date, label }) => (
            <span className="text-foreground font-medium">{label}</span>
          )}
        />
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <p className="text-sm text-muted-foreground">
            Payout days (2nd and 4th Saturdays)
          </p>
        </div>
      </div>
    </div>
  )
}