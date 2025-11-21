import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "X Payout Countdown | Beautiful Timer for Next Payout",
  description: "A stunning dark-themed countdown timer for X (Twitter) creator payouts with smooth animations and real-time updates",
  keywords: ["X", "Twitter", "payout", "countdown", "timer", "creator"],
  authors: [{ name: "X Countdown Team" }],
  creator: "X Countdown",
  publisher: "X Countdown",
  robots: "index, follow",
  openGraph: {
    title: "X Payout Countdown",
    description: "Beautiful countdown timer for next X payout",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Payout Countdown",
    description: "Beautiful countdown timer for next X payout",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark') {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} overflow-hidden transition-colors duration-300`}>
        {children}
      </body>
    </html>
  )
}

