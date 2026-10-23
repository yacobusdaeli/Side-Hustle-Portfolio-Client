"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Certificate, getCertificateImageUrl } from "@/lib/supabase"

interface CertificationsProps {
  certifications?: Certificate[]
}

// Fallback demo data ONLY if database has 0 records or is not yet configured
const DEMO_FALLBACK_CERTIFICATIONS: Certificate[] = [
  {
    id: "demo-cert-1",
    title: "Meta Certified Frontend Developer Professional",
    issuer: "Meta (Coursera)",
    credential_id: "META-FE-984210",
    credential_url: "https://coursera.org/verify/professional-cert/meta-frontend",
    image_path: null,
    issued_at: "2024-01-15",
    description:
      "Program sertifikasi profesional tingkat lanjut yang mencakup arsitektur modern web aplikasi, state management tingkat enterprise, UI responsiveness, dan pengujian otomatis.",
    skills: ["React", "TypeScript", "Next.js", "Redux Toolkit", "Tailwind CSS"],
    is_published: true,
    display_order: 0,
  },
  {
    id: "demo-cert-2",
    title: "Google Professional UX Design & Web Interaction",
    issuer: "Google Career Certificates",
    credential_id: "GGL-UX-772914",
    credential_url: "https://coursera.org/verify/google-ux-design",
    image_path: null,
    issued_at: "2023-10-10",
    description:
      "Sertifikasi komprehensif desain pengalaman pengguna berbasis riset empiris, pembuatan prototipe interaktif high-fidelity, dan perancangan sistem desain.",
    skills: ["UI/UX Design", "Figma", "Design Systems", "Usability Testing", "Wireframing"],
    is_published: true,
    display_order: 1,
  },
  {
    id: "demo-cert-3",
    title: "Microsoft Certified: TypeScript & Web Application Architect",
    issuer: "Microsoft Learn",
    credential_id: "MS-TS-441092",
    credential_url: "https://learn.microsoft.com/verify",
    image_path: null,
    issued_at: "2023-11-20",
    description:
      "Pendalaman arsitektur pemrograman berbasis TypeScript, generic type engineering, pencegahan runtime bugs, dan skalabilitas clean code pada ekosistem web.",
    skills: ["TypeScript", "Type Safety", "Software Architecture", "Clean Code"],
    is_published: true,
    display_order: 2,
  },
]

export function Certifications({ certifications }: CertificationsProps) {
  // Use passed database records if available (even 1 or 2); fallback only if completely empty/undefined
  const list =
    certifications && certifications.length > 0
      ? certifications
      : DEMO_FALLBACK_CERTIFICATIONS

  const [activeIndex, setActiveIndex] = useState(0)
  const [trackOffset, setTrackOffset] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const total = list.length

  const nextSlide = useCallback(() => {
    if (total <= 1) return
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const prevSlide = useCallback(() => {
    if (total <= 1) return
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Center active card precisely in the container
  const updatePosition = useCallback(() => {
    if (!containerRef.current) return
    const activeCard = cardRefs.current[activeIndex]
    if (!activeCard) return

    const containerWidth = containerRef.current.offsetWidth
    const containerCenter = containerWidth / 2
    const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2

    setTrackOffset(containerCenter - cardCenter)
  }, [activeIndex])

  // Calculate position on mount and window resize
  useEffect(() => {
    // Small timeout to allow browser layout & font rendering
    const timer = setTimeout(() => {
      updatePosition()
    }, 20)

    const handleResize = () => {
      updatePosition()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
    }
  }, [updatePosition])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Touch swipe support for mobile devices
  const minSwipeDistance = 45

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Handle empty state
  if (!list || list.length === 0) {
    return (
      <section
        id="certifications"
        className="max-w-7xl mx-auto px-space-md lg:px-margin w-full py-space-xl relative border-t border-outline-variant/30 scroll-mt-20"
      >
        <div className="flex flex-col items-center text-center max-w-xl mx-auto p-8 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20">
          <span className="material-symbols-outlined text-4xl text-primary-container mb-2">workspace_premium</span>
          <h3 className="font-headline-sm text-lg font-bold text-text-primary">Sertifikasi &amp; Lisensi</h3>
          <p className="font-body-md text-sm text-text-muted mt-1">
            Belum ada sertifikasi yang dipublikasikan saat ini.
          </p>
        </div>
      </section>
    )
  }

  const activeCert = list[activeIndex] || list[0]

  return (
    <section
      id="certifications"
      className="max-w-7xl mx-auto px-space-md lg:px-margin w-full py-space-xl relative border-t border-outline-variant/30 scroll-mt-20 overflow-hidden"
    >
      <div className="flex flex-col gap-space-xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md mb-space-sm shadow-xs border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-nav text-label-nav text-primary-container uppercase tracking-widest">
              03 // CERTIFICATIONS &amp; CREDENTIALS
            </span>
          </div>

          <h2 className="font-headline-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-tight mb-space-sm">
            Professional licenses &amp;{" "}
            <span className="text-primary-container">certifications</span>
          </h2>

          <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl">
            Sertifikasi terakreditasi dalam rekayasa perangkat lunak, sistem desain antarmuka, dan arsitektur web modern.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto py-2 select-none overflow-hidden"
          onTouchStart={onTouchStartHandler}
          onTouchMove={onTouchMoveHandler}
          onTouchEnd={onTouchEndHandler}
        >
          {/* Navigation Arrows for desktop (hidden if only 1 item) */}
          {total > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous Certification"
                className="hidden md:flex absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/40 items-center justify-center text-text-primary hover:text-primary-container hover:border-primary-container/60 hover:scale-105 active:scale-95 transition-all shadow-md shadow-black/30 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Certification"
                className="hidden md:flex absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/40 items-center justify-center text-text-primary hover:text-primary-container hover:border-primary-container/60 hover:scale-105 active:scale-95 transition-all shadow-md shadow-black/30 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Sliding Track: Clean centering, no heavy blurry shadows, side cards peek smoothly */}
          <div
            className={`flex items-center py-4 ${
              trackOffset !== null ? "transition-transform duration-500 ease-out" : "opacity-0"
            }`}
            style={{
              transform: trackOffset !== null ? `translateX(${trackOffset}px)` : "none",
            }}
          >
            {list.map((cert, index) => {
              const isActive = index === activeIndex
              const imageUrl = getCertificateImageUrl(cert.image_path)
              const hasImage = !!imageUrl && !imgErrors[cert.id]

              return (
                <div
                  key={cert.id || index}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index)
                  }}
                  className={`flex-shrink-0 w-[82vw] max-w-[340px] sm:w-[460px] sm:max-w-[460px] md:w-[520px] md:max-w-[520px] lg:w-[580px] lg:max-w-[580px] aspect-[16/10] mr-4 sm:mr-6 last:mr-0 transition-all duration-500 origin-center ${
                    isActive
                      ? "scale-100 opacity-100 z-10 cursor-default"
                      : "scale-[0.93] opacity-60 hover:opacity-85 z-0 cursor-pointer"
                  }`}
                >
                  {/* Clean Card Frame — Free from heavy neon blur or suffocating dark overlays */}
                  <div
                    className={`w-full h-full rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
                      isActive
                        ? "border-primary-container/60 bg-surface-container-high/90 shadow-lg shadow-black/30"
                        : "border-outline-variant/30 bg-surface-container-low/80 shadow-xs"
                    } backdrop-blur-md p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden relative group`}
                  >
                    {/* Top Bar */}
                    <div className="flex items-center justify-between z-10 w-full gap-2">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest/90 border border-outline-variant/40 flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-primary-container"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-text-primary truncate">
                            {cert.issuer}
                          </span>
                          <span className="text-[10px] font-mono text-text-muted truncate">
                            {cert.credential_id || "VERIFIED CREDENTIAL"}
                          </span>
                        </div>
                      </div>

                      <div className="px-2.5 py-0.5 rounded-full bg-surface-container-highest/80 border border-outline-variant/30 text-[10px] font-mono font-bold uppercase tracking-wider text-primary-container shrink-0">
                        VERIFIED
                      </div>
                    </div>

                    {/* Card Center: If uploaded image exists, showcase it nicely; otherwise render sleek typographic layout */}
                    {hasImage && imageUrl ? (
                      <div className="relative w-full h-32 sm:h-36 my-auto rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-container-lowest/50">
                        <Image
                          src={imageUrl}
                          alt={cert.title}
                          fill
                          className="object-contain p-1"
                          onError={() => {
                            setImgErrors((prev) => ({ ...prev, [cert.id]: true }))
                          }}
                        />
                      </div>
                    ) : (
                      <div className="my-auto text-center z-10 flex flex-col items-center justify-center px-2 sm:px-4 py-2">
                        <div className="inline-block mb-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest/70 text-[10px] font-mono uppercase tracking-widest text-text-muted">
                          Official Certificate
                        </div>
                        <h4 className="font-headline-display text-sm sm:text-base md:text-lg font-bold text-text-primary tracking-tight leading-snug line-clamp-2 max-w-md mb-2">
                          {cert.title}
                        </h4>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-[10px] sm:text-xs font-medium text-primary-container">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                          <span>Kredensial Terverifikasi</span>
                        </div>
                      </div>
                    )}

                    {/* Bottom Meta Bar */}
                    <div className="flex items-center justify-between z-10 pt-2 border-t border-outline-variant/20 text-[11px] font-mono text-text-muted">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {cert.issued_at
                            ? new Date(cert.issued_at).toLocaleDateString("id-ID", {
                                month: "short",
                                year: "numeric",
                              })
                            : "Terakreditasi"}
                        </span>
                      </span>

                      <span className="text-primary-container font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>Lihat Detail</span>
                        <span>&rarr;</span>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Controls: Arrows and Dots Indicator Bar */}
          {total > 1 && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-5">
              <button
                onClick={prevSlide}
                aria-label="Previous Certification"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-high/90 border border-outline-variant/40 flex items-center justify-center text-text-primary hover:text-primary-container hover:border-primary-container/60 hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots Pagination Indicator */}
              <div className="flex items-center gap-2">
                {list.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveIndex(dotIdx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      dotIdx === activeIndex
                        ? "w-7 sm:w-9 h-2 bg-primary-container shadow-xs"
                        : "w-2 h-2 bg-surface-container-highest/70 hover:bg-on-surface-variant/70"
                    }`}
                    aria-label={`Pilih sertifikasi ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                aria-label="Next Certification"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-high/90 border border-outline-variant/40 flex items-center justify-center text-text-primary hover:text-primary-container hover:border-primary-container/60 hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Certificate Details Section below active card */}
        <div className="flex flex-col items-center max-w-3xl mx-auto w-full text-center px-space-xs mt-1 transition-all duration-500">
          {/* Skills Pills */}
          {activeCert.skills && activeCert.skills.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3">
              {activeCert.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-surface-container-high/80 text-xs font-medium text-text-primary border border-outline-variant/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-headline-display text-xl sm:text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight leading-tight mb-2 max-w-2xl">
            {activeCert.title}
          </h3>

          {/* Subtitle / Issuer & Date */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <span className="text-primary-container">{activeCert.issuer}</span>
            {activeCert.issued_at && (
              <>
                <span className="text-text-muted/60">&bull;</span>
                <span className="text-text-muted">
                  {new Date(activeCert.issued_at).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {activeCert.description && (
            <p className="font-body-md text-sm text-text-muted leading-relaxed max-w-xl mx-auto mb-4">
              {activeCert.description}
            </p>
          )}

          {/* Action CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {activeCert.credential_url ? (
              <a
                href={activeCert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-surface-black font-semibold text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-sm group"
              >
                <span>Lihat Kredensial Asli</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-high text-text-muted text-xs font-semibold uppercase tracking-wider">
                <span>Kredensial Terverifikasi</span>
              </div>
            )}

            {activeCert.credential_id && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-high/80 text-text-primary border border-outline-variant/30 text-xs font-mono">
                <span className="text-text-muted">ID:</span>
                <span className="font-semibold text-primary-container">{activeCert.credential_id}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
