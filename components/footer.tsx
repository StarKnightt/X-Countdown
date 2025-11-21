"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Twitter, Github } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 }}
            className="flex items-center space-x-1 text-sm text-muted-foreground"
          >
            <span>© {currentYear} Built with ❤️ by </span>
            <span><a href="http://prasenjit.com" target="_blank">Prasenjit</a> & <a href="https://manixh.dev" target="_blank">Manixh02</a></span>
          </motion.div>



        </div>
      </div>
    </motion.footer>
  )
}