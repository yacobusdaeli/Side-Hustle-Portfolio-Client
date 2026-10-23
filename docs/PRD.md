# Product Requirements Document (PRD)
## Personal Portfolio & Profile Management System

> PRD disusun berdasarkan desain HTML yang diberikan dan kebutuhan bahwa konten portfolio seperti experience dan certification dapat dikelola secara dinamis melalui backend.

---

## 1. Product Overview

Produk ini merupakan **personal portfolio website** yang digunakan untuk menampilkan identitas profesional, pengalaman, pendidikan, skill, sertifikasi, project, dan informasi kontak pemilik portfolio.

Website menggunakan konsep **dark cyber-romantic minimalism** dengan fokus pada visual modern, responsif, dan interaktif. Halaman publik menampilkan informasi portfolio kepada recruiter, client, atau pengunjung, sementara konten tertentu dapat dikelola secara dinamis melalui backend.

Desain utama terdiri dari navigation bar, hero section, about/profile section, education, experience, certifications, dan footer.

---

## 2. Product Goals

### Primary Goals

1. Menyediakan platform portfolio profesional yang merepresentasikan identitas dan kompetensi pemilik.
2. Menampilkan pengalaman, pendidikan, skill, project, dan sertifikasi secara terstruktur.
3. Memungkinkan konten portfolio tertentu dikelola secara dinamis melalui backend.
4. Menyediakan pengalaman pengguna yang responsif pada desktop maupun mobile.
5. Memberikan akses cepat ke social media, project, dan credential verification.

### Business/User Goals

- Mempermudah recruiter melihat profil kandidat.
- Mempermudah client melihat pengalaman dan kemampuan pemilik portfolio.
- Memungkinkan pemilik portfolio memperbarui informasi tanpa mengubah source code.
- Menyediakan satu tempat terpusat untuk informasi profesional.

---

## 3. Target Users

### Primary User — Portfolio Owner

Pemilik portfolio yang dapat:

- Mengelola profile.
- Menambahkan pengalaman.
- Menambahkan pendidikan.
- Menambahkan sertifikasi.
- Mengelola project.
- Mengubah social media.
- Mengubah informasi profesional.

### Secondary User — Visitor

Pengunjung yang dapat:

- Melihat profile.
- Melihat experience.
- Melihat education.
- Melihat skills.
- Melihat projects.
- Melihat certifications.
- Membuka social media.
- Membuka credential verification.
- Menghubungi portfolio owner.

---

# 4. Public Website Requirements

## 4.1 Navigation

Navigation bar menyediakan akses menuju section utama:

- HOME
- ABOUT ME
- SKILLS
- PROJECT

### Requirements

- Fixed navigation.
- Responsive navigation.
- Active navigation indicator.
- Smooth navigation antar section.
- Profile/avatar icon.
- Mobile-friendly navigation.

---

## 5. Hero Section

Hero section menjadi bagian pertama yang dilihat visitor.

Konten utama:

- Availability status.
- Nama.
- Professional title.
- Short professional description.
- Profile image.
- Social media links.
- Statistics/highlights.
- CTA menuju project.
- CTA menuju contact.

### Contoh struktur

```text
Available for internships

Hi, I'm [Name]

[Professional Title]

[Short Professional Description]

[View My Work] [Get in Touch]

Social Media

3+ Years Coding
12+ Web Projects
4.0 Major GPA
```

### Dynamic Data

Data berikut sebaiknya berasal dari database:

```text
name
headline
bio
availability_status
profile_image
years_coding
project_count
gpa
social_links
```

---

# 6. About Me

Section About Me memberikan informasi lebih detail mengenai pemilik portfolio.

Konten:

- Professional introduction.
- Focus areas.
- Core technology stack.
- Academic honors.
- Education.
- Experience & leadership.

### Focus Areas

Contoh:

- UI/UX Engineering
- Responsive Frontend Development
- Micro-interactions
- Scalable Design Systems

### Core Stack

Contoh:

- React
- Next.js
- TypeScript
- Tailwind CSS
- HTML/CSS

### Academic Honors

Contoh:

- Dean's List
- Major GPA
- Technology Innovation Scholar
- Student Community Lead

Ketiga kategori tersebut dapat dikelola melalui backend apabila client ingin mengubahnya secara berkala.

---

# 7. Education Management

Website menampilkan riwayat pendidikan dalam bentuk timeline.

### Education Fields

```text
institution
degree
start_date
end_date
status
achievement
description
```

### Contoh

```text
2021 — Expected 2025

BS in Information Technology

Institute of Technology
4.0 Major GPA

Description...
```

Data pendidikan dibuat dynamic agar client dapat menambahkan lebih dari satu riwayat pendidikan.

---

# 8. Experience & Leadership

Experience merupakan bagian utama yang dibuat **dynamic dari backend**.

### Experience Fields

```text
position
company
employment_type
start_date
end_date
is_current
description
```

### Contoh

```text
Frontend Developer Intern & UI Engineer

Freelance & Agency Collaborations

2023 — Present

Description...
```

### Admin Requirements

Portfolio owner dapat:

- Create experience.
- Read experience.
- Update experience.
- Delete experience.
- Set current position.
- Mengatur urutan experience.

---

# 9. Certifications

Section certification menampilkan credential yang dimiliki portfolio owner.

### Certification Fields

```text
title
issuer
issue_date
expiration_date
description
skills/tags
credential_url
icon
```

### Functional Requirements

Portfolio owner dapat:

- Menambahkan certification.
- Mengubah certification.
- Menghapus certification.
- Menambahkan credential URL.
- Menambahkan skill/tag.
- Menentukan issue date.
- Menentukan expiration date.
- Mengatur visibility.

Visitor dapat:

- Melihat certification.
- Melihat issuer.
- Melihat skill terkait.
- Membuka credential verification.

---

# 10. Projects

Navigation dan CTA pada hero menyediakan akses menuju project. Project sebaiknya dibuat dynamic karena merupakan bagian penting dari portfolio.

### Project Fields

```text
title
slug
description
thumbnail
technologies
github_url
live_url
role
year
is_featured
is_visible
```

### Admin Operations

- Create
- Read
- Update
- Delete
- Publish / Unpublish
- Set Featured

---

# 11. Social Media

Hero menyediakan social media links.

### Social Link Fields

```text
platform
username
url
icon
is_visible
```

Client dapat menambahkan:

- LinkedIn
- GitHub
- Facebook
- Instagram
- TikTok
- YouTube

tanpa mengubah source code.

---

# 12. Contact

Hero menyediakan CTA **Get in Touch**.

Detail contact form belum terdapat pada source HTML yang diberikan, sehingga implementasinya perlu ditentukan pada tahap pengembangan.

Jika digunakan, form dapat memiliki:

```text
Name
Email
Subject
Message
Submit
```

Pesan dapat dikirim ke email owner atau disimpan sebagai contact submission.

---

# 13. Portfolio Admin / CMS

Karena client perlu menambahkan experience dan certification secara dinamis, sistem menggunakan **Admin Dashboard / CMS**.

```text
/admin
│
├── Dashboard
├── Profile
├── Experience
├── Education
├── Skills
├── Projects
├── Certifications
└── Social Links
```

### CRUD Requirements

| Module | Create | Read | Update | Delete |
|---|---:|---:|---:|---:|
| Profile | — | ✓ | ✓ | — |
| Experience | ✓ | ✓ | ✓ | ✓ |
| Education | ✓ | ✓ | ✓ | ✓ |
| Skills | ✓ | ✓ | ✓ | ✓ |
| Projects | ✓ | ✓ | ✓ | ✓ |
| Certifications | ✓ | ✓ | ✓ | ✓ |
| Social Links | ✓ | ✓ | ✓ | ✓ |

---

# 14. Authentication

Admin dashboard harus dilindungi authentication.

### Authentication Flow

```text
Admin
  ↓
Login
  ↓
Authentication
  ↓
Admin Dashboard
  ↓
CRUD Content
```

Visitor tidak memiliki akses terhadap dashboard management.

---

# 15. Suggested Database

Struktur database awal:

```text
users
profiles
experiences
educations
skills
projects
certifications
social_links
```

### Relasi

```text
User
 │
 ├── Profile
 ├── Experiences
 ├── Educations
 ├── Skills
 ├── Projects
 ├── Certifications
 └── Social Links
```

Struktur ini juga memungkinkan sistem dikembangkan menjadi **multi-user portfolio CMS** di kemudian hari.

---

# 16. Technical Requirements

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js Route Handlers
- RESTful API

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- Supabase Auth

## Storage

- Supabase Storage

## Validation

- Zod

## Deployment

- Vercel

### Architecture

```text
                 ┌─────────────────┐
                 │ Public Visitor  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   Next.js App   │
                 │   React + UI    │
                 └────────┬────────┘
                          │
                    RESTful API
                          │
                          ▼
                 ┌─────────────────┐
                 │  Business Logic │
                 └────────┬────────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
       ┌─────────────┐        ┌─────────────┐
       │ PostgreSQL  │        │   Storage   │
       │   Prisma    │        │    Files    │
       └─────────────┘        └─────────────┘
```

---

# 17. Non-Functional Requirements

## Responsive

Website harus dapat digunakan pada:

- Desktop
- Tablet
- Mobile

## Performance

- Optimized image loading.
- Server-side data fetching untuk konten yang sesuai.
- Lazy loading untuk asset yang tidak langsung diperlukan.
- Minimalkan client-side JavaScript.

## Accessibility

- Semantic HTML.
- Alt text untuk images.
- Accessible buttons.
- Accessible navigation.
- Keyboard navigation.

## Security

- Authentication untuk admin.
- Authorization untuk CRUD.
- Server-side validation.
- Input sanitization.
- Secure file upload.
- Protected API endpoints.

---

# 18. Analytics

Fitur **Visitor Analytics** dapat ditambahkan untuk mengetahui performa portfolio.

### Metrics

```text
Total Visitors
Today's Visitors
Weekly Visitors
Monthly Visitors
Page Views
Top Pages
Traffic Sources
Device
Country
```

### Contoh Dashboard

```text
Analytics

Total Visitors       1,245
This Month             382
Today                    24

Most Visited
1. Home
2. Projects
3. About
4. Certificates
```

Untuk MVP, analytics dapat ditunda sampai fitur CMS utama selesai.

---

# 19. MVP Scope

## Public Website

- [x] Home
- [x] About
- [x] Education
- [x] Experience
- [x] Certifications
- [x] Projects
- [x] Social links
- [x] Responsive design

## Admin

- [x] Login
- [x] Profile management
- [x] Experience CRUD
- [x] Education CRUD
- [x] Certification CRUD
- [x] Project CRUD
- [x] Social links management

## Backend

- [x] REST API
- [x] Database
- [x] Authentication
- [x] Validation
- [x] File storage

## Phase 2

- [ ] Visitor analytics
- [ ] Contact form
- [ ] SEO management
- [ ] Multi-user support
- [ ] Custom domain
- [ ] Advanced dashboard

---

# 20. Success Criteria

Project dianggap berhasil apabila:

1. Visitor dapat melihat seluruh informasi portfolio tanpa login.
2. Portfolio responsive pada desktop dan mobile.
3. Admin dapat login ke dashboard.
4. Admin dapat menambahkan experience tanpa mengubah source code.
5. Admin dapat menambahkan certification tanpa mengubah source code.
6. Data baru yang ditambahkan melalui dashboard otomatis tampil pada public portfolio.
7. Admin dapat mengedit dan menghapus data.
8. Credential URL dapat dibuka oleh visitor.
9. Image/document dapat di-upload melalui dashboard.
10. Data admin dan endpoint CRUD tidak dapat diakses oleh visitor yang tidak terautentikasi.

---

# 21. Recommended Development Sequence

Urutan implementasi yang direkomendasikan:

```text
1. Finalize UI/UX
        ↓
2. Setup Next.js Project
        ↓
3. Setup Database & Prisma
        ↓
4. Design Database Schema
        ↓
5. Setup Authentication
        ↓
6. Build Public Portfolio
        ↓
7. Build REST API
        ↓
8. Build Admin Dashboard
        ↓
9. Implement CRUD
        ↓
10. Implement File Storage
        ↓
11. Validation & Security
        ↓
12. Responsive & Performance Testing
        ↓
13. Analytics (Optional)
        ↓
14. Deployment
```

---

## Final Product Architecture

```text
                         ┌──────────────────┐
                         │     Visitor      │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Public Portfolio │
                         │ Next.js + React  │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   RESTful API    │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
             ┌─────────────┐              ┌─────────────┐
             │ PostgreSQL  │              │   Storage   │
             │   Prisma    │              │    Assets   │
             └─────────────┘              └─────────────┘
                    ▲
                    │
             ┌──────┴───────┐
             │ Authenticated│
             │     Admin    │
             └──────────────┘
```

## Product Positioning

Produk akhir bukan hanya website portfolio statis, tetapi **dynamic personal portfolio dengan CMS/admin management**. Struktur ini memungkinkan portfolio owner mengelola pengalaman, pendidikan, project, sertifikasi, skill, dan informasi profesional tanpa perlu melakukan perubahan langsung pada source code.
