-- ==============================================================================
-- SUPABASE MIGRATION: CERTIFICATES TABLE, STORAGE BUCKET, AND RLS POLICIES
-- ==============================================================================
-- Run this script in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Create the certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  credential_id TEXT,
  credential_url TEXT,
  image_path TEXT,
  issued_at DATE,
  description TEXT,
  skills TEXT[] DEFAULT '{}'::TEXT[],
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_certificates_updated_at ON public.certificates;
CREATE TRIGGER set_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- 4. Policies for public.certificates
-- 4.1. Public Visitors: Read-only access ONLY for published certificates
DROP POLICY IF EXISTS "Public can view published certificates" ON public.certificates;
CREATE POLICY "Public can view published certificates"
ON public.certificates
FOR SELECT
TO public
USING (is_published = true);

-- 4.2. Authenticated Admin: Full access (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admins have full access to certificates" ON public.certificates;
CREATE POLICY "Admins have full access to certificates"
ON public.certificates
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Setup Storage Bucket for Certificate Images
-- Create 'certificates' bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 6. Storage Policies for 'certificates' bucket
-- 6.1. Public can view/read any certificate image
DROP POLICY IF EXISTS "Public can view certificate images" ON storage.objects;
CREATE POLICY "Public can view certificate images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'certificates');

-- 6.2. Authenticated Admin can upload certificate images
DROP POLICY IF EXISTS "Admins can upload certificate images" ON storage.objects;
CREATE POLICY "Admins can upload certificate images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certificates');

-- 6.3. Authenticated Admin can update certificate images
DROP POLICY IF EXISTS "Admins can update certificate images" ON storage.objects;
CREATE POLICY "Admins can update certificate images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'certificates');

-- 6.4. Authenticated Admin can delete certificate images
DROP POLICY IF EXISTS "Admins can delete certificate images" ON storage.objects;
CREATE POLICY "Admins can delete certificate images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'certificates');

-- 7. Initial Seed Data (Optional for testing)
INSERT INTO public.certificates (
  title,
  issuer,
  credential_id,
  credential_url,
  issued_at,
  description,
  skills,
  is_published,
  display_order
) VALUES 
(
  'Meta Frontend Developer Professional Certificate',
  'Meta (Coursera)',
  'META-FE-984210',
  'https://coursera.org/verify/professional-cert/meta-frontend',
  '2024-01-15',
  'Program sertifikasi profesional tingkat lanjut yang mencakup arsitektur modern web aplikasi, state management, responsivitas UI, dan pengujian otomatis.',
  ARRAY['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS'],
  true,
  0
),
(
  'Google Professional UX Design & Web Interaction',
  'Google',
  'GGL-UX-772914',
  'https://coursera.org/verify/google-ux-design',
  '2023-10-10',
  'Sertifikasi komprehensif desain pengalaman pengguna berbasis riset empiris, pembuatan prototipe interaktif high-fidelity, dan perancangan sistem desain.',
  ARRAY['UI/UX Design', 'Figma', 'Design Systems', 'Usability Testing', 'Wireframing'],
  true,
  1
),
(
  'Microsoft Certified: TypeScript & Web Architect',
  'Microsoft Learn',
  'MS-TS-441092',
  'https://learn.microsoft.com/verify',
  '2023-11-20',
  'Pendalaman arsitektur pemrograman berbasis TypeScript, generic type engineering, skalabilitas clean code, dan performa web skala enterprise.',
  ARRAY['TypeScript', 'Type Safety', 'Clean Architecture', 'Generics'],
  true,
  2
)
ON CONFLICT DO NOTHING;
