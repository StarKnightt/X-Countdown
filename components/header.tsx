import { Twitter, Github, Coffee } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Twitter className="h-5 w-5" />
          <span className="font-semibold hidden sm:inline">X Payout Countdown</span>
          <span className="font-semibold sm:hidden">X Payout</span>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          <a
            href="https://buymeacoffee.com/prasen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-lg bg-[#FFDD00] px-2 sm:px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#FFDD00]/90"
          >
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline">Buy me a coffee</span>
            <span className="sm:hidden">Coffee</span>
          </a>
          <a
            href="https://github.com/StarKnightt/X-Countdown"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-lg bg-primary px-2 sm:px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="sm:hidden">Star</span>
          </a>
        </div>
      </div>
    </header>
  )
}