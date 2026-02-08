# NeuroNum.ai — Brand & Developer Guide

## Brand Overview

**NeuroNum.ai** — Where Neurons Meet Numbers
AI-powered Science & Finance education for high school students.

- **Neuro** = Science (Biology, Chemistry, Physics)
- **Num** = Numbers (Finance, Markets, Budgeting)
- **AI** = Intelligent tutoring powered by AI

**Founded by:** Ambika & Saurabh Kaushik
**Style:** Cyberpunk Neon
**Target:** Gen Z high school students

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Use |
|------|-----|-----|-----|
| Neuron Mint | `#00FFC8` | 0, 255, 200 | Science side, CTAs, primary accents |
| Number Pink | `#FF3CAC` | 255, 60, 172 | Finance side, secondary accents |

### Extended Palette

| Name | Hex | Use |
|------|-----|-----|
| Neuron Light | `#66FFD9` | Hover states, highlights |
| Neuron Dark | `#00B38A` | Pressed states, text on light |
| Number Light | `#FF6EC7` | Hover states |
| Number Dark | `#CC2E8A` | Pressed states |
| Tutor Violet | `#A882FF` | AI Tutor sub-brand |

### Background Colors

| Name | Hex | Use |
|------|-----|-----|
| Void | `#050505` | Page background |
| Dark | `#0A0A0A` | Section backgrounds |
| Card | `#0E0E14` | Card surfaces |
| Cyberpunk Gradient | `#0A0A0A → #1A0A2E → #0A1A1A` | Hero sections, key backgrounds |

### Text Colors

| Name | Hex | Use |
|------|-----|-----|
| Primary | `#FFFFFF` | Headlines, primary text |
| Secondary | `#C0C4D0` | Body text |
| Muted | `#666666` | Captions, metadata |
| Dim | `#333333` | Subtle labels |

---

## Typography

### Font Stack

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Display / Wordmark | Fraunces | 700 | Georgia, serif |
| Body | Plus Jakarta Sans | 300–700 | -apple-system, sans-serif |
| Mono / Data | IBM Plex Mono | 400–600 | Courier New, monospace |

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,700;9..144,800&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 Hero | Fraunces | 64–80px | 700 |
| H2 Section | Fraunces | 36–48px | 700 |
| H3 Card | Plus Jakarta Sans | 20–24px | 700 |
| Body | Plus Jakarta Sans | 16–18px | 400 |
| Caption | Plus Jakarta Sans | 12–14px | 300 |
| Code/Data | IBM Plex Mono | 12–14px | 400 |
| Tag/Label | IBM Plex Mono | 10–11px | 500 |

---

## Logo System

### Files Included

| File | Format | Use |
|------|--------|-----|
| `logos/svg/logo-full-animated.svg` | SVG | Hero sections, splash — full logo with wordmark + all animations |
| `logos/svg/logo-horizontal-animated.svg` | SVG | Navbar, headers — compact with animations |
| `logos/svg/mark-only-animated.svg` | SVG | Large icon, splash screens — mark without wordmark |
| `logos/svg/app-icon-512.svg` | SVG | App store icon, PWA manifest |
| `logos/svg/favicon.svg` | SVG | Browser favicon |
| `logos/svg/logo-static.svg` | SVG | Print, email signatures — no animations |
| `logos/svg/logo-mono-white.svg` | SVG | Single-color use on dark backgrounds |

### Logo Construction

The logo mark consists of two halves in a circular frame:

**Left half (Neuron / Science):**
- Dendrite branches extending from a central cell body
- Synapse dots that pulse in sequence
- A nucleus that beats rhythmically
- Colors: `#00FFC8` (Neuron Mint)

**Right half (Chart / Finance):**
- Ascending bar chart that pulses like an equalizer
- Candlestick wicks that flicker
- Trend line with glow effect
- Data particles floating upward
- Pulsing $ watermark behind bars
- Colors: `#FF3CAC` (Number Pink)

**Bridge:**
- An animated signal line connects both halves
- Gradient transitions from Mint → Pink
- Represents the "2" in Neuron-to-Number

### Clear Space

Maintain padding around the logo equal to the height of the "N" character on all sides.

### Minimum Sizes

| Format | Min Width |
|--------|-----------|
| Full logo | 200px |
| Horizontal | 140px |
| Mark only | 32px |
| Favicon | 16px |

---

## Animations Reference

### Neuron Side

| Animation | Duration | Timing |
|-----------|----------|--------|
| Synapse Fire | 2.2s | Sequential (0s, 0.5s, 1s, 1.5s stagger) |
| Dendrite Pulse | 2.2s | Matches synapse stagger |
| Nucleus Beat | 1.8s | Continuous heartbeat |
| Signal Travel | 1.5s | Linear dash movement |

### Finance Side

| Animation | Duration | Timing |
|-----------|----------|--------|
| Bar Pulse | 3.5s | Sequential (0s, 0.3s, 0.6s, 0.9s stagger) |
| Trend Glow | 2.0s | Continuous glow/fade |
| Candle Flicker | 1.5s | 0.5s stagger between wicks |
| Data Particles | 2.0s | 0.7s stagger, float upward |
| Dollar Pulse | 3.0s | Slow background fade |
| Ticker Scroll | 4.0s | Horizontal text scroll |

---

## Sub-Brands

| Sub-Brand | Color | Hex | Use |
|-----------|-------|-----|-----|
| NeuroNum Science | Neuron Mint | `#00FFC8` | Biology, Chemistry, Physics content |
| NeuroNum Finance | Number Pink | `#FF3CAC` | Markets, Budgeting, Investing content |
| NeuroNum Tutor | Tutor Violet | `#A882FF` | AI Chat / Study assistant |

---

## UI Components

### Cards
- Background: `rgba(255, 255, 255, 0.02)`
- Border: `1px solid rgba(255, 255, 255, 0.04)`
- Border radius: `24px`
- Hover: border lightens to `rgba(255, 255, 255, 0.08)`

### Buttons — Primary
- Background: gradient `#00FFC8 → #FF3CAC`
- Text: `#000000`, weight 700
- Border radius: `8px`
- Hover: lift `translateY(-2px)` + dual glow shadow

### Buttons — Outline
- Background: transparent
- Border: `1px solid rgba(255, 255, 255, 0.04)`
- Text: `#FFFFFF`
- Hover: border turns `#00FFC8`

### Glassmorphism
- Background: `rgba(255, 255, 255, 0.06)`
- Backdrop filter: `blur(16px)`
- Border: `1px solid rgba(255, 255, 255, 0.04)`

---

## Spacing & Layout

- Max content width: `1140px`
- Section padding: `80px 0` (desktop), `48px 0` (mobile)
- Card gap: `24px`
- Component padding: `24px`

---

## Implementation Notes

1. **All SVG logos are self-contained** — animations are embedded via `<style>` tags, no external CSS needed
2. **Use `brand.css`** for website development — it contains all CSS variables, animations, and utility classes
3. **Fonts:** Import Google Fonts link in `<head>` — Fraunces, Plus Jakarta Sans, IBM Plex Mono
4. **Dark theme only** — this brand does not have a light mode. The cyberpunk aesthetic requires dark backgrounds.
5. **SVG inline preferred** — for animations to work, embed SVGs inline rather than as `<img>` tags
6. **Gradient text:** Use `.nn-gradient-text` class or the CSS `background-clip: text` technique

---

## File Structure

```
neuronum-website-assets/
├── logos/
│   └── svg/
│       ├── logo-full-animated.svg      ← Hero / splash
│       ├── logo-horizontal-animated.svg ← Navbar
│       ├── mark-only-animated.svg      ← Icon / large format
│       ├── app-icon-512.svg            ← App stores
│       ├── favicon.svg                 ← Browser tab
│       ├── logo-static.svg             ← Print / email
│       └── logo-mono-white.svg         ← Single color
├── css/
│   └── brand.css                       ← Variables, animations, utilities
├── brand-guide/
│   └── BRAND-GUIDE.md                  ← This file
└── reference/
    ├── neuronum_cyberpunk_interactive.html  ← Interactive logo preview
    ├── neuronum_genz_vibes.html            ← 12 color variations
    └── neuronum_logo_concepts.html         ← Original 4 concepts
```

---

© 2026 NeuroNum.ai — Ambika & Saurabh Kaushik
