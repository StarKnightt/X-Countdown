"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor, Check } from "lucide-react"

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
    const [currentTheme, setCurrentTheme] = useState<Theme>('system')
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Get saved theme or default to system
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'system'
        setCurrentTheme(savedTheme)

        applyTheme(savedTheme)
    }, [])

    const applyTheme = (theme: Theme) => {
        if (theme === 'system') {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            if (systemDark) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    const handleThemeChange = (theme: Theme) => {
        setCurrentTheme(theme)
        localStorage.setItem('theme', theme)
        applyTheme(theme)
        setIsOpen(false)
        console.log('✅ Theme changed to:', theme)
    }

    const themes = [
        { id: 'light', label: 'Light', icon: Sun },
        { id: 'dark', label: 'Dark', icon: Moon },
        { id: 'system', label: 'System', icon: Monitor },
    ] as const

    const currentThemeData = themes.find(t => t.id === currentTheme)
    const CurrentIcon = currentThemeData?.icon || Monitor

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-lg bg-muted/50 animate-pulse" />
        )
    }

    return (
        <div className="relative">
            {/* Main Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-lg bg-card border border-border hover:bg-accent transition-all duration-200 flex items-center justify-center group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CurrentIcon className="w-4 h-4 text-foreground relative z-10" />

                {/* Active indicator */}
                <motion.div
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full"
                    initial={{ scale: 0, x: '-50%' }}
                    animate={{ scale: 1, x: '-50%' }}
                    transition={{ delay: 0.2 }}
                />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-12 right-0 z-50 min-w-[140px] bg-card border border-border rounded-lg shadow-lg backdrop-blur-md overflow-hidden"
                    >
                        {/* Background blur effect */}
                        <div className="absolute inset-0 bg-card/80 backdrop-blur-md" />

                        <div className="relative z-10 p-1">
                            {themes.map((theme, index) => {
                                const Icon = theme.icon
                                const isActive = currentTheme === theme.id

                                return (
                                    <motion.button
                                        key={theme.id}
                                        onClick={() => handleThemeChange(theme.id)}
                                        className={`
                      w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200 group
                      ${isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-accent text-foreground'
                                            }
                    `}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Icon with special effects */}
                                        <div className="relative">
                                            <Icon className={`w-4 h-4 transition-all duration-200 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                                                }`} />

                                            {/* Glow effect for active theme */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-current opacity-20 blur-sm"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            )}
                                        </div>

                                        <span className="flex-1 text-left font-medium">
                                            {theme.label}
                                        </span>

                                        {/* Check icon for active theme */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -90 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 90 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Check className="w-3 h-3" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Bottom gradient line */}
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}