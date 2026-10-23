"use client"

import Image from "next/image"

interface HeroProps {
  profile: {
    name: string
    headline: string
    bio: string
    availabilityStatus: string
    profileImage: string | null
    yearsCoding: number
    projectCount: number
    gpa: number
  }
  socialLinks: Array<{
    platform: string
    url: string
    icon: string | null
  }>
}

export function Hero({ profile, socialLinks }: HeroProps) {
  const imageUrl =
    profile.profileImage ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBK82TfwU5g1j1ColzhBecO5bMFc8ceyKhCKHt9P2X3w1VYoyn4XqhsNCFL3dmX8llagZ8xWsjoyiyfkvi4oMxtz-RJLk_nK7QRTwoXbBnXoa5tp03HrdHPMksgab2YyLu0TxHDpROXMNSjomTfNzU_qY-umeeafiR4NdSY6naD6gRKbeskcdUahxLcRUrrWb_MqEHdvff5815K1sbsiu6LJ7sWwmp12baHfN5PRVu0gN3Ei0e6-LT6"

  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-space-md lg:px-margin min-h-[calc(100vh-80px)] flex flex-col justify-center relative w-full py-space-lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
        {/* Left Column (~60% width) */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Sub-badge / Overline */}
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md mb-space-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-nav text-label-nav text-on-surface-variant uppercase tracking-widest">
              {profile.availabilityStatus || "Available for internships"}
            </span>
          </div>

          {/* Greeting */}
          <p className="font-headline-sm text-headline-sm text-text-primary tracking-wide mb-space-xs">
            Hi, I&apos;m {profile.name}
          </p>

          {/* Bold Stacked Headline */}
          <h1 className="font-headline-display text-4xl sm:text-5xl lg:text-headline-display text-primary-container mb-space-md leading-none font-extrabold tracking-tight">
            {profile.headline}
          </h1>

          {/* Bio Description */}
          <p className="font-body-md text-body-md text-text-muted max-w-lg mb-space-lg leading-relaxed">
            {profile.bio}
          </p>

          {/* Action Cluster: CTAs & Socials */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md w-full sm:w-auto">
            {/* Button Group */}
            <div className="flex flex-wrap items-center gap-space-sm">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-label-button text-label-button bg-primary-container text-surface-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary-container/20 group font-semibold"
              >
                <span>View My Work</span>
                <span className="material-symbols-outlined text-sm ml-1.5 transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>
              <a
                href="#about-me"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-label-button text-label-button bg-surface-container-high/80 text-text-primary hover:bg-surface-container-highest hover:text-primary-container hover:scale-105 active:scale-95 transition-all duration-200 font-semibold"
              >
                Get in Touch
              </a>
            </div>

            <div className="hidden sm:block w-px h-8 bg-surface-container-highest mx-1" />

            {/* Social Media Icon Buttons */}
            <div className="flex items-center gap-space-xs">
              {/* Facebook */}
              <a
                href={socialLinks.find((l) => l.platform.toLowerCase().includes("facebook"))?.url || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="w-10 h-10 rounded-full bg-primary-container text-surface-black flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={socialLinks.find((l) => l.platform.toLowerCase().includes("instagram"))?.url || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-full bg-primary-container text-surface-black flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={socialLinks.find((l) => l.platform.toLowerCase().includes("tiktok"))?.url || "https://tiktok.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Profile"
                className="w-10 h-10 rounded-full bg-primary-container text-surface-black flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.66 1.26-.11 2.38-.93 2.75-2.13.18-.54.21-1.11.21-1.68V.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="mt-space-xl pt-space-md flex flex-wrap items-center gap-space-lg">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-display text-headline-sm text-primary-container font-extrabold">
                {profile.yearsCoding}+
              </span>
              <span className="font-label-nav text-label-nav text-on-surface-variant uppercase tracking-wider">
                Years Coding
              </span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-display text-headline-sm text-primary-container font-extrabold">
                {profile.projectCount}+
              </span>
              <span className="font-label-nav text-label-nav text-on-surface-variant uppercase tracking-wider">
                Web Projects
              </span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-display text-headline-sm text-primary-container font-extrabold">
                {profile.gpa.toFixed(1)}
              </span>
              <span className="font-label-nav text-label-nav text-on-surface-variant uppercase tracking-wider">
                Major GPA
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (~40% width): Portrait Presentation */}
        <div className="lg:col-span-5 relative flex items-center justify-center mt-space-lg lg:mt-0">
          {/* Ambient Diffused Backdrop Discs */}
          <div className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-secondary-container/40 blur-3xl -top-8 -right-4 pointer-events-none" />
          <div className="absolute w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-primary-container/30 blur-2xl bottom-4 -left-6 pointer-events-none" />

          {/* Sharp Geometric Accent Rings */}
          <div className="absolute w-80 h-80 lg:w-[26rem] lg:h-[26rem] rounded-full bg-gradient-to-tr from-secondary-container/30 to-transparent pointer-events-none" />
          <div className="absolute w-64 h-64 lg:w-72 lg:h-72 rounded-full bg-surface-container/60 backdrop-blur-sm pointer-events-none" />

          {/* Floating UI Accents */}
          <div
            className="absolute -top-4 -left-2 z-20 hidden sm:flex items-center gap-space-xs px-space-sm py-2 rounded-xl bg-surface-container-high/90 backdrop-blur-md shadow-xl animate-bounce"
            style={{ animationDuration: "4s" }}
          >
            <span className="material-symbols-outlined text-primary-container text-sm">terminal</span>
            <span className="font-label-nav text-label-nav text-text-primary tracking-wider">Frontend &amp; UI</span>
          </div>

          <div className="absolute -bottom-2 -right-4 z-20 hidden sm:flex items-center gap-space-xs px-space-sm py-2 rounded-xl bg-surface-container-high/90 backdrop-blur-md shadow-xl">
            <span className="material-symbols-outlined text-tertiary-container text-sm">verified</span>
            <span className="font-label-nav text-label-nav text-text-primary tracking-wider">Honors Scholar</span>
          </div>

          {/* Subject Portrait Cutout Container */}
          <div className="relative z-10 w-72 h-72 sm:w-88 sm:h-88 lg:w-[26rem] lg:h-[26rem] rounded-full overflow-hidden bg-gradient-to-b from-surface-container-high to-surface-black shadow-2xl flex items-end justify-center border border-white/5">
            <Image
              src={imageUrl}
              alt={`${profile.name} - ${profile.headline}`}
              fill
              unoptimized
              className="object-cover object-top scale-105 hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>

      {/* Pinned / Side Navigation Floating Controls Indicator */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-space-sm py-space-sm px-2 rounded-full bg-surface-black/75 backdrop-blur-xl shadow-2xl border border-white/10">
        <button
          aria-label="Scroll to top"
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
        </button>
        <div className="w-1.5 h-1.5 rounded-full bg-primary-container" />
        <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
        <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
        <button
          aria-label="Scroll down"
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-colors"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
        </button>
      </div>
    </section>
  )
}
