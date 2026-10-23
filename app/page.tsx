import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { AboutMe } from "@/components/sections/about-me"
import { Projects } from "@/components/sections/projects"
import { Certifications } from "@/components/sections/certifications"
import { prisma } from "@/lib/db"
import { getPublishedCertificates, Certificate } from "@/lib/supabase"

export const dynamic = "force-dynamic"

async function getPortfolioData() {
  const userId = "seed-user-id"

  try {
    const [
      profile,
      socialLinks,
      focusAreas,
      techStack,
      academicHonors,
      educations,
      experiences,
      projects,
      prismaCerts,
      supabaseCerts,
    ] = await Promise.all([
      prisma.profile.findFirst({ where: { userId } }).catch(() => null),
      prisma.socialLink.findMany({
        where: { userId, isVisible: true },
        orderBy: { order: "asc" },
      }).catch(() => []),
      prisma.focusArea.findMany({ where: { userId }, orderBy: { order: "asc" } }).catch(() => []),
      prisma.techStack.findMany({ where: { userId }, orderBy: { order: "asc" } }).catch(() => []),
      prisma.academicHonor.findMany({ where: { userId }, orderBy: { order: "asc" } }).catch(() => []),
      prisma.education.findMany({ where: { userId }, orderBy: { order: "asc" } }).catch(() => []),
      prisma.experience.findMany({ where: { userId }, orderBy: { order: "asc" } }).catch(() => []),
      prisma.project.findMany({ where: { userId, isVisible: true }, orderBy: { order: "asc" } }).catch(() => []),
      prisma.certification.findMany({ where: { userId, isVisible: true }, orderBy: { order: "asc" } }).catch(() => []),
      getPublishedCertificates(),
    ])

    const defaultProfile = {
      name: "Valentiana Nugraheni Putri",
      headline: "BSIT Student",
      bio: "Passionate Information Technology student focused on web development, UI/UX design, and creating sleek digital experiences with modern web technologies.",
      availabilityStatus: "Available for internships",
      profileImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBK82TfwU5g1j1ColzhBecO5bMFc8ceyKhCKHt9P2X3w1VYoyn4XqhsNCFL3dmX8llagZ8xWsjoyiyfkvi4oMxtz-RJLk_nK7QRTwoXbBnXoa5tp03HrdHPMksgab2YyLu0TxHDpROXMNSjomTfNzU_qY-umeeafiR4NdSY6naD6gRKbeskcdUahxLcRUrrWb_MqEHdvff5815K1sbsiu6LJ7sWwmp12baHfN5PRVu0gN3Ei0e6-LT6",
      yearsCoding: 3,
      projectCount: 12,
      gpa: 4.0,
    }

    // Determine certifications: Prioritize dynamic Supabase published records
    let finalCertificates: Certificate[] = []
    if (supabaseCerts && supabaseCerts.length > 0) {
      finalCertificates = supabaseCerts
    } else if (prismaCerts && prismaCerts.length > 0) {
      finalCertificates = prismaCerts.map((c) => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        credential_id: null,
        credential_url: c.credentialUrl,
        image_path: c.icon,
        issued_at: c.issueDate ? new Date(c.issueDate).toISOString().split("T")[0] : null,
        description: c.description,
        skills: c.skills || [],
        is_published: c.isVisible,
        display_order: c.order,
      }))
    }

    return {
      profile: profile ?? defaultProfile,
      socialLinks: socialLinks || [],
      focusAreas: focusAreas || [],
      techStack: techStack || [],
      academicHonors: academicHonors || [],
      educations: educations || [],
      experiences: experiences || [],
      projects: projects || [],
      certifications: finalCertificates,
    }
  } catch (error) {
    console.error("Error in getPortfolioData:", error)
    return {
      profile: {
        name: "Valentiana Nugraheni Putri",
        headline: "BSIT Student",
        bio: "Passionate Information Technology student focused on web development, UI/UX design, and creating sleek digital experiences with modern web technologies.",
        availabilityStatus: "Available for internships",
        profileImage: null,
        yearsCoding: 3,
        projectCount: 12,
        gpa: 4.0,
      },
      socialLinks: [],
      focusAreas: [],
      techStack: [],
      academicHonors: [],
      educations: [],
      experiences: [],
      projects: [],
      certifications: [],
    }
  }
}

export default async function Home() {
  const {
    profile,
    socialLinks,
    focusAreas,
    techStack,
    academicHonors,
    educations,
    experiences,
    projects,
    certifications,
  } = await getPortfolioData()

  return (
    <div className="min-h-screen bg-surface-black flex flex-col font-body-md text-on-surface transition-colors duration-300">
      <Navbar />

      <main className="w-full pt-20 flex-1 max-w-7xl mx-auto px-margin bg-surface-black relative transition-colors duration-300">
        <div className="flex flex-col w-full relative">
          {/* Subtle cyber-romantic atmospheric background glow */}
          <div className="absolute -top-12 -left-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-[100px] pointer-events-none -z-10" />
          <div className="absolute top-1/2 right-10 w-[30rem] h-[30rem] rounded-full bg-primary-container/15 blur-[120px] pointer-events-none -z-10" />

          {/* Hero Section */}
          <Hero profile={profile} socialLinks={socialLinks} />

          {/* About Me Section (With Focus Areas, Skills, Education & Experience) */}
          <AboutMe
            focusAreas={focusAreas}
            techStack={techStack}
            academicHonors={academicHonors}
            educations={educations}
            experiences={experiences}
          />

          {/* Projects Section */}
          {projects && projects.length > 0 && <Projects projects={projects} />}

          {/* Certifications Section */}
          <Certifications certifications={certifications} />
        </div>
      </main>

      {/* Footer Component */}
      <Footer name={profile.name} />
    </div>
  )
}
