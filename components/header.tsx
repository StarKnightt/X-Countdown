import { Twitter, Github } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Twitter className="h-5 w-5" />
          <span className="font-semibold">X Payout Countdown</span>
        </div>
        
        <a
          href="https://github.com/StarKnightt/X-Countdown"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          <Github className="h-4 w-4" />
          <span>Give a Star ⭐</span>
        </a>
      </div>
    </header>
  )
}
