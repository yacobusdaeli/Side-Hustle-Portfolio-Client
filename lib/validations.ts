import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().min(1),
  availabilityStatus: z.string().min(1),
  profileImage: z.string().url().optional().nullable(),
  yearsCoding: z.number().int().min(0),
  projectCount: z.number().int().min(0),
  gpa: z.number().min(0).max(4),
})

export const experienceSchema = z.object({
  position: z.string().min(1),
  company: z.string().min(1),
  employmentType: z.string().min(1),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(1),
  order: z.number().int().min(0).default(0),
})

export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  status: z.string().min(1),
  achievement: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  order: z.number().int().min(0).default(0),
})

export const certificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string().or(z.date()),
  expirationDate: z.string().or(z.date()).optional().nullable(),
  description: z.string().optional().nullable(),
  skills: z.array(z.string()).default([]),
  credentialUrl: z.string().url().optional().nullable(),
  icon: z.string().optional().nullable(),
  isVisible: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().url().optional().nullable(),
  technologies: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  role: z.string().optional().nullable(),
  year: z.number().int().min(1900).max(2100),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export const socialLinkSchema = z.object({
  platform: z.string().min(1),
  username: z.string().min(1),
  url: z.string().url(),
  icon: z.string().optional().nullable(),
  isVisible: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export const focusAreaSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  order: z.number().int().min(0).default(0),
})

export const techStackSchema = z.object({
  name: z.string().min(1),
  order: z.number().int().min(0).default(0),
})

export const academicHonorSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  order: z.number().int().min(0).default(0),
})
