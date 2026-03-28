# FSA ELITE Performance — v0 Master Brief

> Single source of truth for building and extending the FSA ELITE platform in v0.dev.

---

## Business Identity

| Field | Value |
|-------|-------|
| Legal Name | Fontenots Sales Association LLC |
| Brand Name | FSA ELITE |
| Domain | fsaeliteperformance.com |
| Store Domain | fsaeliteperformance.store |
| Support Email | fsaeliteperformance@gmail.com |
| Support Phone | +1 (337) 336-2635 |
| Address | 213 Caribbean Boulevard, Sunset, LA 70584 |

**What FSA ELITE Does:**
FSA ELITE is a third-party B2B sales training company that helps businesses sharpen their salespeople — getting every rep ready for the phones and every customer interaction. Managers and business owners send their teams to FSA ELITE for AI-powered training and self-promoting tools that elevate rep performance and professional image.

**Industries Served:** Automotive, real estate, insurance, solar, retail, service, and B2B.

---

## Membership & Pricing

- **One-time $12.99 lifetime membership** — no subscriptions
- Unlocks: AI Roleplay Lab, full Member Store access, all future training content

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (Pages Router) |
| Styling | Custom CSS design system (dark-first) |
| Auth | Firebase Authentication |
| Payments | Stripe Checkout |
| AI | OpenAI GPT-4o / GPT-4o Realtime |
| Deployment | Vercel |

---

## Core Features

### 1. AI Roleplay Lab (`/roleplay`)

Practice live objection handling against 5 AI buyer personas with real-time scoring.

**Personas:**
| ID | Name | Difficulty | Core Challenge |
|----|------|------------|----------------|
| budget-brian | Budget Brian | Standard | Price-sensitive, trust issues with dealers |
| trade-trap-tina | Trade Trap Tina | Standard | Negative equity, emotional pressure |
| payment-patty | Payment Patty | Standard | Hard monthly payment target |
| authority-alex | Authority Alex | Boss | Cannot decide alone, needs transferable case |
| skeptic-sam | Skeptic Sam | Boss | High skepticism, evidence-heavy |

**Scoring Dimensions:**
- Frame Control
- Discovery Depth
- Objection Isolation
- Value Building
- Next-Step Close
- Composure

**Boss Unlock:** Score 75+ to unlock Authority Alex and Skeptic Sam.

---

### 2. OLIVE — AI Sales Intelligence

Site-wide AI assistant with three operational modes.

**Modes:**

| Mode | Purpose | Behavior |
|------|---------|----------|
| General | Platform help & sales advice | Answers questions, gives coaching tips |
| Coach | Objection breakdown | User pastes objection, OLIVE explains rebuttal + psychology |
| Battle | Live objection drill | OLIVE throws objections, user responds, OLIVE scores |

**Voice Mode:**
- Real-time voice conversations using OpenAI Realtime API
- WebSocket connection with ephemeral token auth
- 24kHz PCM16 audio streaming
- Status states: idle, connecting, connected, listening, speaking, error

**Personality:**
- Sharp, quick-witted, effortlessly confident
- Cool, calm, direct — like an elite closer who reads, travels, and wins deals for fun
- Supportive without being soft — "iron sharpens iron" energy
- No corporate fluff, no motivational-poster cliches

**Page Contexts:**
OLIVE adapts responses based on current page: home, store, checkout-preview, roleplay, success, cancel.

---

### 3. Member Store (`/store`)

17+ products across 6 categories:

| Category | Products |
|----------|----------|
| Clothing | Closer Uniform Hoodie |
| Headwear | FSA ELITE Cap Series, Closer Snapback, Branded Beanie |
| Creator Kit | Self-Promo Brand Kit, Custom Merch Design Request |
| Business Cards | Premium Business Cards (250ct), Digital Business Card (NFC) |
| Desk Gear | Leather Portfolio, Custom Notepads, Desk Nameplate, Executive Pen Set, Pencil Pack, Signature Closer Pen |
| Promo Tools | Presentation Folders, Branded USB Drives, Phone/Tablet Stand, Sales Professional Tote |

---

## File Structure

```
/
├── pages/
│   ├── index.tsx          # Landing page
│   ├── roleplay.tsx       # AI Roleplay Lab
│   ├── store.tsx          # Member Store
│   ├── welcome.tsx        # Dashboard
│   ├── login.tsx          # Auth
│   ├── register.tsx       # Auth
│   ├── checkout-preview.tsx
│   ├── success.tsx
│   ├── cancel.tsx
│   └── api/
│       ├── ai-chat.ts           # Roleplay AI
│       ├── olive-chat.ts        # OLIVE widget
│       ├── realtime-session.ts  # Voice mode tokens
│       ├── create-checkout-session.ts
│       ├── create-merch-checkout-session.ts
│       └── auth/
├── components/
│   ├── AppLayout.tsx      # Main layout wrapper
│   ├── Sidebar.tsx        # Navigation
│   ├── OliveWidget.tsx    # OLIVE chat widget
│   └── ThemeToggle.tsx
├── lib/
│   ├── businessDetails.ts      # Brand constants
│   ├── merchCatalog.ts         # Store products
│   ├── subscriptionPlan.ts     # Membership config
│   ├── roleplayIntelligence.ts # Persona & scoring logic
│   ├── olivePersona.ts         # OLIVE system prompts
│   ├── useRealtimeVoice.ts     # Voice mode hook
│   ├── firebaseClient.ts       # Firebase client
│   ├── firebaseAdmin.ts        # Firebase admin
│   └── sessionAuth.ts          # Session management
├── styles/
│   └── globals.css        # Full design system
└── public/
    ├── logo.png
    ├── og-image.jpg
    └── favicon.ico
```

---

## Design System

**Color Palette:**
- Primary: Gold accent (`#c9a227` / `#d4af37`)
- Background: Deep black/charcoal
- Text: White/off-white
- Cards: Dark gray with subtle borders

**Typography:**
- Clean, modern sans-serif
- Bold headings, readable body text

**Components:**
- Dark-first design
- Card-based layouts
- Subtle gold accents for CTAs and highlights
- Mobile-responsive

---

## Environment Variables

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# OpenAI
OPENAI_API_KEY=
```

---

## Repository Structure

**Branches:**
| Branch | Purpose |
|--------|---------|
| FSA-SALES-APP | Default/production — single source of truth |
| staging | Active development |

**Deprecated branches (safe to delete):**
- main
- fsa-elite-performance
- feat/ui-improvements-and-ci
- copilot/* (~70 branches)

---

## Key Rules for v0

1. **Domain:** Always use `fsaeliteperformance.com` as the canonical domain
2. **Auth:** Use Firebase Authentication (already configured)
3. **Payments:** Use Stripe Checkout (already integrated)
4. **AI:** Use OpenAI via existing API routes (`/api/ai-chat`, `/api/olive-chat`, `/api/realtime-session`)
5. **Styling:** Follow the existing dark-first design system in `globals.css`
6. **OLIVE:** Maintain personality — sharp, confident, no corporate fluff
7. **Store:** Products are in `lib/merchCatalog.ts` — extend there for new items
8. **Personas:** Roleplay personas are in `lib/roleplayIntelligence.ts`

---

## Quick Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

*Last updated: March 2026*
