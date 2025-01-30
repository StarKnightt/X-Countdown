import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://x-countdown.vercel.app/'),
  title: "X Payout Countdown | Track Your Next Twitter/X Creator Payment",
  description: "Real-time countdown tracker for X (Twitter) creator payouts. Never miss your next payment date. Simple, accurate, and always up-to-date.",
  keywords: "X payout, Twitter payout, creator payout, X creator payment, Twitter creator earnings, X earnings date, Twitter payment schedule",
  verification: {
    google: "YbwqflKeFVNWu9aIE8BTmKex8F5eILiuixVzqyRAk2A",
  },
  openGraph: {
    title: "X Payout Countdown | Track Your Next Payment",
    description: "Real-time countdown tracker for X (Twitter) creator payouts",
    type: "website",
    url: "https://x-countdown.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Payout Countdown",
    description: "Track your next X (Twitter) creator payout in real-time",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.className} antialiased min-h-screen bg-background`}
        suppressHydrationWarning
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="x-payout-theme"
          themes={["light", "dark", "system"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

