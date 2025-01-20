import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "X Payout Countdown",
  description: "Countdown to the next X payout",
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

