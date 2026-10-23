"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "../theme-toggle"

const navLinks = [
  { label: "HOME", section: "home" },
  { label: "ABOUT ME", section: "about-me" },
  { label: "SKILLS", section: "skills" },
  { label: "PROJECT", section: "projects" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      const projects = document.getElementById("projects")
      const skills = document.getElementById("skills")
      const aboutMe = document.getElementById("about-me")

      if (projects && scrollPosition >= projects.offsetTop) {
        setActiveSection("projects")
      } else if (skills && scrollPosition >= skills.offsetTop) {
        setActiveSection("skills")
      } else if (aboutMe && scrollPosition >= aboutMe.offsetTop) {
        setActiveSection("about-me")
      } else {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-black/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)] transition-colors duration-300">
      <div className="h-20 max-w-7xl mx-auto px-margin flex items-center justify-between">
        {/* Monogram / Brand */}
        <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => scrollToSection("home")}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
            <span className="font-extrabold text-sm text-on-primary">V</span>
          </div>
          <span className="font-headline-sm text-headline-sm text-text-primary tracking-tight font-medium">
            Valentiana Nugraheni Putri
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-space-lg">
          <nav className="hidden md:flex items-center gap-space-lg">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`font-label-nav text-label-nav uppercase tracking-widest transition-colors ${
                  activeSection === link.section
                    ? "text-primary-container font-semibold"
                    : "text-on-surface-variant hover:text-primary-container"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Dark / Light Mode Toggle Button (Replaced Person Icon) */}
          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-text-primary hover:text-primary-container transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <span className="material-symbols-outlined text-xl">close</span>
            ) : (
              <span className="material-symbols-outlined text-xl">menu</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-surface-container-low/95 backdrop-blur-xl border-t border-outline-variant/30">
          <div className="flex flex-col px-space-md py-space-sm gap-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`font-label-nav text-label-nav uppercase tracking-widest transition-colors text-left py-2.5 ${
                  activeSection === link.section
                    ? "text-primary-container font-semibold"
                    : "text-on-surface-variant hover:text-primary-container"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
