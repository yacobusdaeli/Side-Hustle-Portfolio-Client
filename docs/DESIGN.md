---
name: Cyber-Romantic Minimal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d4c2c4'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#9d8d8f'
  outline-variant: '#504446'
  surface-tint: '#f2b7c3'
  primary: '#ffe6e9'
  on-primary: '#4b252e'
  primary-container: '#fcc0cc'
  on-primary-container: '#794b56'
  inverse-primary: '#80515c'
  secondary: '#ffb0cb'
  on-secondary: '#571934'
  secondary-container: '#76324d'
  on-secondary-container: '#f89ebd'
  tertiary: '#d1f6d1'
  on-tertiary: '#18371e'
  tertiary-container: '#b5d9b6'
  on-tertiary-container: '#406044'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9e0'
  primary-fixed-dim: '#f2b7c3'
  on-primary-fixed: '#32101a'
  on-primary-fixed-variant: '#653a44'
  secondary-fixed: '#ffd9e3'
  secondary-fixed-dim: '#ffb0cb'
  on-secondary-fixed: '#3c031f'
  on-secondary-fixed-variant: '#73304b'
  tertiary-fixed: '#c7ecc8'
  tertiary-fixed-dim: '#acd0ad'
  on-tertiary-fixed: '#02210b'
  on-tertiary-fixed-variant: '#2f4e33'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
  text-primary: '#FFFFFF'
  text-muted: '#D4D4D8'
  surface-black: '#000000'
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 3.75rem
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.025em
  headline-display-mobile:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.5rem
  label-nav:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.15em
  label-button:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 2rem
  margin: 2rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2rem
  space-xl: 3rem
---

Build a modern dark-mode personal portfolio hero section using Next.js, React, and Tailwind CSS.
Follow a high-contrast cyber-romantic minimalist aesthetic with soft blush pink accents.

LAYOUT & SPACING:
- Container: max-w-7xl, mx-auto, px-8, min-h-screen, flex flex-col justify-between.
- Grid: 2-column layout (left 60% copy/actions, right 40% portrait image with backdrop shapes).
- Padding: py-8 px-8.

TYPOGRAPHY & COLORS:
- Font: Poppins or Inter sans-serif.
- Background: bg-black (#000000).
- Primary Headings: text-white and text-[#FCC0CC] (soft blush pink).
- Secondary Text: text-zinc-300.
- Buttons: Primary fill bg-[#FCC0CC] text-black; Secondary outline border-white text-white.

COMPONENTS:
1. Header Navbar: Flex row with logo icon on left and uppercase nav links (HOME, ABOUT ME, SKILLS, PROJECT) on right with text-xs tracking-widest.
2. Hero Left Content:
   - Greeting: "Hi, I'm Alyanna Grace" (text-lg text-white).
   - Headline: "BSIT Student" in bold stacked text (text-6xl font-extrabold text-[#FCC0CC]).
   - Bio: Max 2 sentences (text-sm text-zinc-300 max-w-md).
   - Action Cluster: Two pill-shaped buttons ("View My Work" solid pink, "Get in Touch" white border) followed by a row of 3 circular pink social media icon buttons (Facebook, Instagram, TikTok).
3. Hero Right Content:
   - Subject photo cutout over overlapping rounded pink backdrop circles (bg-[#CC7997] and bg-[#FCC0CC] with ambient blur).
4. Fixed Side Control: Pinned right-side vertical stack with chevron up/down icons.

ANIMATION:
- Add subtle hover:scale-105 transition to the primary CTA and social icons.
- Add hover:text-[#FCC0CC] transition to header navigation items.
