"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNextPayoutDate } from "@/utils/payout-dates"
import dynamic from "next/dynamic"

const CountdownComponent = dynamic(() => import("@/components/countdown"), { ssr: false })

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container flex flex-col items-center justify-center px-4 py-10">
        <CountdownComponent />
      </main>
    </div>
  )
}

