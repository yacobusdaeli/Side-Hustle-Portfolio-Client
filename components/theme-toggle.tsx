"use client"

import { useTheme } from "./theme-provider"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 opacity-80">
        <span className="material-symbols-outlined text-on-primary text-[18px]">dark_mode</span>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center shrink-0 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      {theme === "dark" ? (
        <span className="material-symbols-outlined text-on-primary text-[18px]">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-on-primary text-[18px]">dark_mode</span>
      )}
    </button>
  )
}
