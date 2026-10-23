import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ponytail: single user seed, expand for multi-user
  const userId = 'seed-user-id'

  // Clean existing data
  await prisma.user.deleteMany({})

  // Create user
  const user = await prisma.user.create({
    data: {
      id: userId,
      email: 'admin@portfolio.com',
    },
  })

  // Create profile
  await prisma.profile.create({
    data: {
      userId: user.id,
      name: 'Valentiana Nugraheni Putri',
      headline: 'BSIT Student',
      bio: 'Passionate Information Technology student focused on web development, UI/UX design, and creating sleek digital experiences with modern web technologies.',
      availabilityStatus: 'Available for internships',
      profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK82TfwU5g1j1ColzhBecO5bMFc8ceyKhCKHt9P2X3w1VYoyn4XqhsNCFL3dmX8llagZ8xWsjoyiyfkvi4oMxtz-RJLk_nK7QRTwoXbBnXoa5tp03HrdHPMksgab2YyLu0TxHDpROXMNSjomTfNzU_qY-umeeafiR4NdSY6naD6gRKbeskcdUahxLcRUrrWb_MqEHdvff5815K1sbsiu6LJ7sWwmp12baHfN5PRVu0gN3Ei0e6-LT6',
      yearsCoding: 3,
      projectCount: 12,
      gpa: 4.0,
    },
  })

  // Social links
  await prisma.socialLink.createMany({
    data: [
      {
        userId: user.id,
        platform: 'Facebook',
        username: 'valentiana.nugraheni',
        url: 'https://facebook.com',
        order: 0,
      },
      {
        userId: user.id,
        platform: 'Instagram',
        username: 'valentiana.nugraheni',
        url: 'https://instagram.com',
        order: 1,
      },
      {
        userId: user.id,
        platform: 'TikTok',
        username: 'valentiana.nugraheni',
        url: 'https://tiktok.com',
        order: 2,
      },
    ],
  })

  // Focus areas
  await prisma.focusArea.createMany({
    data: [
      {
        userId: user.id,
        title: 'UI/UX Engineering',
        description: 'Creating intuitive and beautiful user interfaces',
        order: 0,
      },
      {
        userId: user.id,
        title: 'Responsive Frontend Development',
        description: 'Building mobile-first, accessible web applications',
        order: 1,
      },
      {
        userId: user.id,
        title: 'Micro-interactions',
        description: 'Crafting delightful user experiences through animation',
        order: 2,
      },
      {
        userId: user.id,
        title: 'Scalable Design Systems',
        description: 'Developing consistent, maintainable component libraries',
        order: 3,
      },
    ],
  })

  // Tech stack
  await prisma.techStack.createMany({
    data: [
      { userId: user.id, name: 'React', order: 0 },
      { userId: user.id, name: 'Next.js', order: 1 },
      { userId: user.id, name: 'TypeScript', order: 2 },
      { userId: user.id, name: 'Tailwind CSS', order: 3 },
      { userId: user.id, name: 'HTML/CSS', order: 4 },
    ],
  })

  // Academic honors
  await prisma.academicHonor.createMany({
    data: [
      {
        userId: user.id,
        title: "Dean's List",
        description: 'Consistent academic excellence across all semesters',
        order: 0,
      },
      {
        userId: user.id,
        title: '4.0 Major GPA',
        description: 'Perfect GPA in major courses',
        order: 1,
      },
      {
        userId: user.id,
        title: 'Technology Innovation Scholar',
        description: 'Recognized for innovative project work',
        order: 2,
      },
      {
        userId: user.id,
        title: 'Student Community Lead',
        description: 'Leading tech community initiatives on campus',
        order: 3,
      },
    ],
  })

  // Education
  await prisma.education.createMany({
    data: [
      {
        userId: user.id,
        institution: 'Institute of Technology',
        degree: 'BS in Information Technology',
        startDate: new Date('2021-09-01'),
        endDate: new Date('2025-06-01'),
        status: 'In Progress',
        achievement: '4.0 Major GPA',
        description:
          'Specialization in Web Systems and HCI. Key coursework includes Advanced Web Architectures, Database Management Systems, UI/UX Interaction Design, and Distributed Cloud Computing.',
        order: 0,
      },
      {
        userId: user.id,
        institution: 'Graduated with High Honors',
        degree: 'Senior High School — STEM Strand',
        startDate: new Date('2019-09-01'),
        endDate: new Date('2021-06-01'),
        status: 'Completed',
        achievement: 'Tech & Innovation Excellence Award',
        description:
          'Founded the high school coding circle, represented the institution in regional robotics, and completed capstone research in accessible web design.',
        order: 1,
      },
    ],
  })

  // Experience
  await prisma.experience.createMany({
    data: [
      {
        userId: user.id,
        position: 'Frontend Developer Intern & UI Engineer',
        company: 'Freelance & Agency Collaborations',
        employmentType: 'Freelance',
        startDate: new Date('2023-01-01'),
        isCurrent: true,
        description:
          'Engineered component systems and landing experiences with Next.js, TypeScript, and Tailwind CSS. Implemented accessible animations and responsive design standards for web clients.',
        order: 0,
      },
      {
        userId: user.id,
        position: 'Student Tech Organization Lead & UI Designer',
        company: 'BSIT Student Council Tech Committee',
        employmentType: 'Leadership',
        startDate: new Date('2022-01-01'),
        endDate: new Date('2023-12-31'),
        isCurrent: false,
        description:
          'Spearheaded the redesign of the student organization portal, mentored 40+ junior developers in Git and front-end tooling, and co-organized the annual university hackathon.',
        order: 1,
      },
      {
        userId: user.id,
        position: 'Peer Tutor in Web Development',
        company: 'Academic Tutoring Center',
        employmentType: 'Part-time',
        startDate: new Date('2021-09-01'),
        endDate: new Date('2022-06-01'),
        isCurrent: false,
        description:
          'Delivered hands-on tutoring sessions in HTML, CSS, JavaScript fundamentals, and basic algorithmic problem solving to incoming freshmen.',
        order: 2,
      },
    ],
  })

  // Projects
  await prisma.project.createMany({
    data: [
      {
        userId: user.id,
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Full-stack e-commerce solution with product management, cart, and checkout functionality.',
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.com',
        role: 'Full-stack Developer',
        year: 2024,
        isFeatured: true,
        order: 0,
      },
      {
        userId: user.id,
        title: 'Task Management App',
        slug: 'task-management-app',
        description: 'Collaborative task management tool with real-time updates and team features.',
        technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
        githubUrl: 'https://github.com',
        role: 'Frontend Developer',
        year: 2024,
        isFeatured: true,
        order: 1,
      },
    ],
  })

  // Certifications
  await prisma.certification.createMany({
    data: [
      {
        userId: user.id,
        title: 'Frontend Development Professional',
        issuer: 'Meta',
        issueDate: new Date('2024-01-15'),
        description: 'Advanced React development and modern frontend practices',
        skills: ['React', 'JavaScript', 'UI/UX', 'Testing'],
        credentialUrl: 'https://coursera.org/verify',
        order: 0,
      },
      {
        userId: user.id,
        title: 'TypeScript Developer',
        issuer: 'Microsoft',
        issueDate: new Date('2023-11-20'),
        description: 'TypeScript fundamentals and advanced type systems',
        skills: ['TypeScript', 'Type Safety', 'Generics'],
        credentialUrl: 'https://learn.microsoft.com/verify',
        order: 1,
      },
    ],
  })

  console.log('✅ Seed data created successfully')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
