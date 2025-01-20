import { Twitter } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center space-x-2">
          <Twitter className="h-5 w-5" />
          <span className="font-semibold">X Payout Countdown</span>
        </div>
      </div>
    </header>
  )
}

