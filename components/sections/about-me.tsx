"use client"

interface AboutMeProps {
  focusAreas?: Array<{ title: string; description: string | null }>
  techStack?: Array<{ name: string }>
  academicHonors?: Array<{ title: string; description: string | null }>
  educations?: Array<{
    institution: string
    degree: string
    startDate: Date
    endDate: Date | null
    status: string
    achievement: string | null
    description: string | null
  }>
  experiences?: Array<{
    position: string
    company: string
    startDate: Date
    endDate: Date | null
    isCurrent: boolean
    description: string
  }>
}

function formatYear(date: Date) {
  return new Date(date).getFullYear()
}

function formatDateRange(start: Date, end: Date | null, isCurrent?: boolean, status?: string) {
  const startYear = formatYear(start)
  if (isCurrent) return `${startYear} — PRESENT`
  if (status === "In Progress" || status?.toLowerCase().includes("expected")) {
    return `${startYear} — EXPECTED ${end ? formatYear(end) : "2025"}`
  }
  if (!end) return `${startYear}`
  return `${startYear} — ${formatYear(end)}`
}

export function AboutMe({
  focusAreas = [],
  techStack = [],
  academicHonors = [],
  educations = [],
  experiences = [],
}: AboutMeProps) {
  // Default values matching user design reference
  const defaultEducations = [
    {
      period: "2021 — EXPECTED 2025",
      degree: "BS in Information Technology",
      institution: "Institute of Technology · 4.0 Major GPA",
      description:
        "Specialization in Web Systems and HCI. Key coursework includes Advanced Web Architectures, Database Management Systems, UI/UX Interaction Design, and Distributed Cloud Computing.",
    },
    {
      period: "2019 — 2021",
      degree: "Senior High School — STEM Strand",
      institution: "Graduated with High Honors · Tech & Innovation Excellence Award",
      description:
        "Founded the high school coding circle, represented the institution in regional robotics, and completed capstone research in accessible web design.",
    },
  ]

  const defaultExperiences = [
    {
      period: "2023 — PRESENT",
      position: "Frontend Developer Intern & UI Engineer",
      company: "Freelance & Agency Collaborations",
      isHighlightCompany: true,
      description:
        "Engineered component systems and landing experiences with Next.js, TypeScript, and Tailwind CSS. Implemented accessible animations and responsive design standards for web clients.",
    },
    {
      period: "2022 — 2023",
      position: "Student Tech Organization Lead & UI Designer",
      company: "BSIT Student Council Tech Committee",
      isHighlightCompany: false,
      description:
        "Spearheaded the redesign of the student organization portal, mentored 40+ junior developers in Git and front-end tooling, and co-organized the annual university hackathon.",
    },
    {
      period: "2021 — 2022",
      position: "Peer Tutor in Web Development",
      company: "Academic Tutoring Center",
      isHighlightCompany: false,
      description:
        "Delivered hands-on tutoring sessions in HTML, CSS, JavaScript fundamentals, and basic algorithmic problem solving to incoming freshmen.",
    },
  ]

  const displayEducations =
    educations.length > 0
      ? educations.map((e) => ({
          period: formatDateRange(e.startDate, e.endDate, false, e.status),
          degree: e.degree,
          institution: `${e.institution}${e.achievement ? ` · ${e.achievement}` : ""}`,
          description: e.description || "",
        }))
      : defaultEducations

  const displayExperiences =
    experiences.length > 0
      ? experiences.map((e, index) => ({
          period: formatDateRange(e.startDate, e.endDate, e.isCurrent),
          position: e.position,
          company: e.company,
          isHighlightCompany: index === 0 || e.isCurrent,
          description: e.description,
        }))
      : defaultExperiences

  // Dynamic texts for the 3 overview cards (with graceful fallbacks)
  const focusAreasText =
    focusAreas.length > 0
      ? focusAreas.map((f) => f.title).join(", ")
      : "UI/UX Engineering, Responsive Frontend Development, Micro-interactions & Scalable Design Systems."

  const coreStackText =
    techStack.length > 0
      ? `${techStack.map((t) => t.name).join(", ")}, modern state management, and semantic accessible HTML/CSS.`
      : "React, Next.js, TypeScript, Tailwind CSS, modern state management, and semantic accessible HTML/CSS."

  const academicHonorsText =
    academicHonors.length > 0
      ? academicHonors.map((h) => h.title).join(", ")
      : "Consistent Dean's Lister, 4.0 Major GPA, Technology Innovation Scholar & Active Student Community Lead."

  return (
    <section
      id="about-me"
      className="max-w-7xl mx-auto px-space-md lg:px-margin w-full py-space-xl relative border-t border-outline-variant/30 scroll-mt-20"
    >
      <div className="flex flex-col gap-space-xl">
        {/* Section Header with Floating Controls on the right */}
        <div className="flex items-start justify-between gap-6 w-full">
          <div className="flex flex-col items-start max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md mb-space-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-nav text-label-nav text-primary-container uppercase tracking-widest">
                01 // ABOUT ME
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-headline-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-tight mb-space-sm">
              Crafting intuitive digital experiences through{" "}
              <span className="text-primary-container">code &amp; design</span>
            </h2>

            {/* Bio Paragraph */}
            <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
              Third-year BS Information Technology scholar specializing in front-end architecture, interaction design, and
              modern web applications. Driven by the harmony between technical rigor and cyber-romantic minimalism,
              crafting accessible, elegant interfaces that feel fluid and alive.
            </p>
          </div>

          {/* Vertical Page Indicator (as seen in design reference) */}
          <div className="hidden xl:flex flex-col items-center gap-3 py-3 px-2 rounded-full bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 shadow-xl self-start mt-2">
            <button
              aria-label="Scroll to top"
              className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-primary-container hover:bg-surface-container transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
            </button>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_6px_rgba(252,192,204,0.6)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
            <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
            <button
              aria-label="Scroll down"
              className="w-7 h-7 rounded-full flex items-center justify-center text-text-muted hover:text-primary-container hover:bg-surface-container transition-colors"
              onClick={() => {
                const el = document.getElementById("projects")
                el?.scrollIntoView({ behavior: "smooth" })
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
            </button>
          </div>
        </div>

        {/* Anchor for SKILLS navigation */}
        <div id="skills" className="scroll-mt-28" />

        {/* 3 Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Focus Areas Card */}
          <div className="p-space-md rounded-2xl bg-surface-container-low/90 backdrop-blur-sm border border-outline-variant/20 hover:border-primary-container/40 transition-all duration-300 flex flex-col gap-space-xs group shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high/90 border border-outline-variant/30 flex items-center justify-center text-primary-container mb-space-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">design_services</span>
            </div>
            <h3 className="font-headline-sm text-text-primary font-bold text-base">Focus Areas</h3>
            <p className="font-body-md text-text-muted text-sm leading-relaxed">
              {focusAreasText}
            </p>
          </div>

          {/* Core Stack Card */}
          <div className="p-space-md rounded-2xl bg-surface-container-low/90 backdrop-blur-sm border border-outline-variant/20 hover:border-primary-container/40 transition-all duration-300 flex flex-col gap-space-xs group shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high/90 border border-outline-variant/30 flex items-center justify-center text-secondary mb-space-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">code</span>
            </div>
            <h3 className="font-headline-sm text-text-primary font-bold text-base">Core Stack</h3>
            <p className="font-body-md text-text-muted text-sm leading-relaxed">
              {coreStackText}
            </p>
          </div>

          {/* Academic Honors Card */}
          <div className="p-space-md rounded-2xl bg-surface-container-low/90 backdrop-blur-sm border border-outline-variant/20 hover:border-primary-container/40 transition-all duration-300 flex flex-col gap-space-xs group shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high/90 border border-outline-variant/30 flex items-center justify-center text-tertiary mb-space-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
            </div>
            <h3 className="font-headline-sm text-text-primary font-bold text-base">Academic Honors</h3>
            <p className="font-body-md text-text-muted text-sm leading-relaxed">
              {academicHonorsText}
            </p>
          </div>
        </div>

        {/* Timelines: Education & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg lg:gap-space-xl pt-space-md">
          {/* Education Column */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-space-xs mb-space-md">
              <span className="material-symbols-outlined text-primary-container text-[22px]">school</span>
              <h3 className="font-headline-sm text-lg sm:text-xl text-text-primary font-bold tracking-tight">
                Education
              </h3>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 lg:pl-8 border-l border-outline-variant/30 flex flex-col gap-space-lg ml-2">
              {displayEducations.map((edu, i) => {
                const isFirst = i === 0
                return (
                  <div key={i} className="relative group">
                    {/* Ring Indicator */}
                    <span
                      className={`absolute -left-[31px] lg:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface-black border-2 transition-colors ${
                        isFirst
                          ? "border-primary-container shadow-[0_0_8px_rgba(252,192,204,0.5)]"
                          : "border-outline-variant/70 group-hover:border-primary-container"
                      }`}
                    />

                    {/* Period Date */}
                    <span
                      className={`font-label-nav text-xs uppercase font-bold tracking-wider ${
                        isFirst ? "text-text-primary" : "text-text-muted"
                      }`}
                    >
                      {edu.period}
                    </span>

                    {/* Degree */}
                    <h4 className="font-headline-sm text-base text-text-primary font-bold mt-1">
                      {edu.degree}
                    </h4>

                    {/* Institution */}
                    <p className="text-sm font-medium text-text-muted mt-0.5">
                      {edu.institution}
                    </p>

                    {/* Description */}
                    {edu.description && (
                      <p className="font-body-md text-sm text-text-muted mt-2 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Experience & Leadership Column */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-space-xs mb-space-md">
              <span className="material-symbols-outlined text-secondary text-[22px]">work</span>
              <h3 className="font-headline-sm text-lg sm:text-xl text-text-primary font-bold tracking-tight">
                Experience &amp; Leadership
              </h3>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 lg:pl-8 border-l border-outline-variant/30 flex flex-col gap-space-lg ml-2">
              {displayExperiences.map((exp, i) => {
                const isFirst = i === 0
                return (
                  <div key={i} className="relative group">
                    {/* Ring Indicator */}
                    <span
                      className={`absolute -left-[31px] lg:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface-black border-2 transition-colors ${
                        isFirst
                          ? "border-primary-container shadow-[0_0_8px_rgba(252,192,204,0.5)]"
                          : "border-outline-variant/70 group-hover:border-secondary"
                      }`}
                    />

                    {/* Period Date */}
                    <span
                      className={`font-label-nav text-xs uppercase font-bold tracking-wider ${
                        isFirst ? "text-text-primary" : "text-text-muted"
                      }`}
                    >
                      {exp.period}
                    </span>

                    {/* Position */}
                    <h4 className="font-headline-sm text-base text-text-primary font-bold mt-1">
                      {exp.position}
                    </h4>

                    {/* Company */}
                    <p
                      className={`text-sm font-medium mt-0.5 ${
                        exp.isHighlightCompany ? "text-primary-container font-semibold" : "text-text-muted"
                      }`}
                    >
                      {exp.company}
                    </p>

                    {/* Description */}
                    <p className="font-body-md text-sm text-text-muted mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
