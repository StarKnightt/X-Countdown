"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"
import { Background } from "@/components/background"

const CountdownComponent = dynamic(() => import("@/components/countdown"), { 
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md animate-pulse">
      <div className="h-[200px] rounded-xl bg-muted"></div>
    </div>
  )
})

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted relative overflow-hidden flex flex-col">
      <Background />
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 flex-1">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              X Payout Countdown
            </h1>
            <p className="mb-12 max-w-[600px] text-lg text-muted-foreground">
              Track the time remaining until your next X (Twitter) creator payout. Never miss a payment date again.
            </p>
            <CountdownComponent />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

