"use client"

import Image from "next/image"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string | null
  technologies: string[]
  githubUrl: string | null
  liveUrl: string | null
  role: string | null
  year: number
  isFeatured: boolean
}

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  // If no projects in database, provide fallback projects for display
  const defaultProjects: Project[] = [
    {
      id: "seed-p1",
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description:
        "Full-stack e-commerce solution with dynamic product catalogs, secure checkout integration, and responsive cart management.",
      thumbnail: null,
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      role: "Full-stack Developer",
      year: 2024,
      isFeatured: true,
    },
    {
      id: "seed-p2",
      title: "Task Management App",
      slug: "task-management-app",
      description:
        "Collaborative task and workflow tracker built with real-time state synchronization, drag-and-drop interactions, and clean metrics.",
      thumbnail: null,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
      githubUrl: "https://github.com",
      liveUrl: null,
      role: "Frontend Developer",
      year: 2024,
      isFeatured: true,
    },
  ]

  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-space-md lg:px-margin w-full py-space-xl relative border-t border-outline-variant/30 scroll-mt-20"
    >
      <div className="flex flex-col gap-space-xl">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md mb-space-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-nav text-label-nav text-primary-container uppercase tracking-widest">
              02 // PROJECTS
            </span>
          </div>

          <h2 className="font-headline-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-tight mb-space-sm">
            Featured projects &amp;{" "}
            <span className="text-primary-container">digital solutions</span>
          </h2>

          <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
            Curated selection of frontend engineering, interaction design, and full-stack applications crafted with modern web technologies.
          </p>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-space-lg">
          {displayProjects.map((project, index) => (
            <div
              key={project.id || index}
              className="p-space-md sm:p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-sm border border-outline-variant/20 hover:border-primary-container/40 transition-all duration-300 flex flex-col lg:flex-row gap-space-md lg:gap-space-lg items-stretch group shadow-sm"
            >
              {/* Thumbnail / Graphic Preview */}
              <div className="lg:w-[45%] w-full aspect-[16/10] relative rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-high/40 shrink-0 flex items-center justify-center">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  /* Stylized Cyber-Romantic Mockup Placeholder */
                  <div className="w-full h-full relative p-5 flex flex-col justify-between bg-gradient-to-br from-surface-container-high/70 via-surface-container-low/80 to-surface-black overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary-container/15 blur-2xl pointer-events-none" />
                    
                    {/* Window Header */}
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted/60">
                        {project.slug || "project-preview"}
                      </span>
                    </div>

                    {/* Window Body Center Graphics */}
                    <div className="my-auto text-center z-10 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/40 shadow-inner group-hover:border-primary-container/50 transition-colors">
                        <span className="material-symbols-outlined text-primary-container text-2xl">
                          terminal
                        </span>
                      </div>
                      <span className="font-headline-sm text-sm font-semibold text-text-primary tracking-wide">
                        {project.title}
                      </span>
                    </div>

                    {/* Window Footer Tag */}
                    <div className="flex items-center justify-between z-10 text-[11px] text-text-muted/70 font-mono">
                      <span>v1.0.0</span>
                      <span className="text-primary-container font-semibold">Live Preview</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Title & Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-headline-sm text-xl sm:text-2xl text-text-primary font-bold group-hover:text-primary-container transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-primary-container border border-primary-container/20">
                        {project.year}
                      </span>
                      {project.role && (
                        <span className="text-xs text-text-muted hidden sm:inline-block">
                          · {project.role}
                        </span>
                      )}
                    </div>
                  </div>

                  {project.role && (
                    <p className="text-xs text-text-muted sm:hidden mb-2">
                      Role: {project.role}
                    </p>
                  )}

                  {/* Technologies Pills */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    {project.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-2.5 py-1 rounded-full bg-surface-container-high/80 text-[11px] font-semibold text-text-muted border border-outline-variant/30 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="font-body-md text-sm text-text-muted leading-relaxed line-clamp-3 mb-space-md">
                    {project.description}
                  </p>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-space-xs mt-auto">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary-container text-surface-black font-semibold text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary-container/20"
                    >
                      <span>View Live</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-surface-container-high/80 text-text-primary border border-outline-variant/30 font-semibold text-xs tracking-wider uppercase hover:border-primary-container/40 hover:text-primary-container hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>GitHub</span>
                      <span className="material-symbols-outlined text-[16px]">code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
