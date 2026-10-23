# Portfolio - Personal Portfolio & Profile Management System

Modern personal portfolio website with dynamic content management. Built with Next.js, React, TypeScript, and glassmorphism design.

## Features

### Public Website
- Hero section with profile, stats, social links
- About Me with focus areas, tech stack, academic honors
- Education timeline
- Experience showcase
- Certifications with credential verification
- Projects portfolio
- Responsive design with dark/light mode toggle
- Glassmorphism UI with pink theme

### Admin Dashboard (Coming Soon)
- Secure authentication
- Profile management
- CRUD for experiences, education, certifications, projects
- Social links management
- File upload for images

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 with custom glassmorphism tokens
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Validation:** Zod
- **Deployment:** Vercel

## Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Supabase account (for auth & storage)

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/porto_valentiana"
NEXT_PUBLIC_SUPABASE_URL="your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

3. Run database migrations:
```bash
npx prisma migrate dev --name init
```

4. Seed the database:
```bash
npx prisma db seed
```

5. Start development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NEXT_PUBLIC_APP_URL` | App URL for production |

## Database Schema

- **User** - Authentication (Supabase)
- **Profile** - Name, headline, bio, stats, availability
- **Experience** - Work history with descriptions
- **Education** - Academic background
- **Skill** - Technical skills categorized
- **Project** - Portfolio projects with technologies
- **Certification** - Professional certifications
- **SocialLink** - Social media profiles
- **FocusArea** - Areas of expertise
- **TechStack** - Core technologies
- **AcademicHonor** - Academic achievements

## Project Structure

```
porto-valentiana/
├── app/
│   ├── layout.tsx          # Root layout with theme
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (navbar)
│   ├── sections/           # Page sections (hero)
│   ├── theme-provider.tsx  # Theme context
│   └── theme-toggle.tsx    # Dark/light toggle
├── lib/
│   ├── db.ts              # Prisma client
│   ├── supabase.ts        # Supabase clients
│   ├── validations.ts     # Zod schemas
│   └── utils.ts           # Utility functions
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
└── docs/                  # Original design files
```

## What's Implemented

✅ **Foundation**
- Next.js project with TypeScript strict mode
- Tailwind CSS with glassmorphism design tokens
- Dark/light theme toggle
- Database schema with Prisma
- Seed data for development

✅ **Public Site - Vertical Slice**
- Responsive navbar with smooth scroll
- Hero section with profile data
- Live database integration
- Social links with icons
- Stats display
- Glassmorphism effects
- Mobile-responsive layout

## What's Next (Phase 2)

- [ ] About Me section component
- [ ] Education timeline component
- [ ] Experience cards component
- [ ] Certifications grid component
- [ ] Projects showcase component
- [ ] Footer component
- [ ] Admin authentication
- [ ] Admin dashboard layout
- [ ] Profile management UI
- [ ] Experience CRUD UI
- [ ] Education CRUD UI
- [ ] Certification CRUD UI
- [ ] Project CRUD UI
- [ ] Social links management UI
- [ ] Image upload integration
- [ ] API routes for all resources
- [ ] Form validation & error handling
- [ ] Contact form

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio
npx prisma db seed   # Seed database
```

## Design System

Theme uses cyber-romantic minimalist aesthetic with glassmorphism:
- Primary: Soft blush pink (#FCC0CC)
- Background: Deep black (#131313)
- Surface: Semi-transparent containers with backdrop blur
- Typography: Inter font family
- Spacing: 8px base grid
- Borders: Rounded (1rem default, 2rem large)

## Notes

- Single-user MVP (multi-user support ready in schema)
- Profile image uses placeholder, upload via admin later
- Focus areas, tech stack, and honors use separate tables for flexibility
- All CRUD operations validated server-side with Zod
- Mobile-first responsive approach

## License

Private portfolio project
