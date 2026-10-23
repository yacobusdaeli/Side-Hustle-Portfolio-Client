import { createClient } from "@supabase/supabase-js"

export interface Certificate {
  id: string
  title: string
  issuer: string
  credential_id: string | null
  credential_url: string | null
  image_path: string | null
  issued_at: string | null
  description: string | null
  skills: string[]
  is_published: boolean
  display_order: number
  created_at?: string
  updated_at?: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"

// Client-safe instance (uses anon key, respects Row Level Security)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Server-only admin instance (never expose in client components)
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for admin server operations")
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Helper to resolve public URL for certificate image from Supabase Storage
export function getCertificateImageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null
  // If it's already a full HTTP(S) URL, return directly
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }
  // Otherwise resolve from 'certificates' public bucket
  const { data } = supabase.storage.from("certificates").getPublicUrl(imagePath)
  return data?.publicUrl || null
}

// Helper for fetching published certificates with graceful fallback
export async function getPublishedCertificates(): Promise<Certificate[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return []
    }

    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })

    if (error) {
      console.warn("Notice: Supabase certificates fetch returned:", error.message)
      return []
    }

    return (data as Certificate[]) || []
  } catch (err) {
    console.warn("Notice: Failed to fetch certificates from Supabase:", err)
    return []
  }
}
