import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-center px-4">
        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Built with{" "}
          <span className="text-red-500">❤️</span> by{" "}
          <Link
            href="https://prasen.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground"
          >
            Prasenjit
          </Link>
        </p>
      </div>
    </footer>
  )
}