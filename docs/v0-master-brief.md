# FSA ELITE — v0 Master Brief

> **How to use this file:** Copy the relevant section into [v0.dev](https://v0.dev) when generating each page or component. v0 works best with focused prompts — paste the **Global Design System** section first, then the specific page section. You can also paste the full file for a holistic generation.

---

## CURRENT PRODUCTION STATE

**Live URL:** https://fsaeliteperformance.com
**Repo:** https://github.com/fsaeliteperformance-arch/FSA-ELITE-SALES-TRAINING
**Production Branch:** `FSA-SALES-APP` ← use this for v0 context and deploys
**Dev Branch:** `staging` ← all new work goes here first

### What's Built & Live
- ✅ Full Next.js 15 app (pages router, TypeScript)
- ✅ Landing page, auth (login/register/reset), dashboard, roleplay lab, store, checkout, success, legal pages
- ✅ Firebase email/password auth with HMAC session cookies
- ✅ Stripe one-time $12.99 membership checkout + merch cart checkout
- ✅ AI Roleplay Lab — 5 personas, real-time 6-skill scoring, patience meter, progress tracking
- ✅ Voice mode in Roleplay Lab — OpenAI Realtime API WebRTC (VAD, live transcript)
- ✅ OLIVE AI widget — 3 modes (General / Coach / Battle), per-mode history, mode tabs
- ✅ Member store — 15+ products, category filters, bundle offers, Stripe checkout
- ✅ Dark-first design system with light mode toggle
- ✅ BotID bot protection on all AI and auth endpoints
- ✅ Vercel deployment — both Vercel and static export builds passing
- ✅ Mobile cross-device fixes (touch targets, iOS zoom, overflow)

### For v0.dev
Use `FSA-SALES-APP` branch as your code reference. When generating new UI:
1. Paste the **Global Design System** section first
2. Then paste the specific page spec
3. Always specify: "Next.js Pages Router, TypeScript, no Tailwind, use CSS custom properties"

---

## BRAND IDENTITY

- **Brand:** FSA ELITE (FSA Elite Performance)
- **Company:** Fontenots Sales Association LLC
- **Tagline:** "Built for Closers"
- **Domains:** fsaeliteperformance.com (store) · fsaelite.org (training)
- **Contact:** fsaeliteperformance@gmail.com · +1 (337) 336-2635
- **Address:** 213 Caribbean Boulevard, Sunset, LA 70584, US
- **Logo:** Gold shield/crest on dark background (see /public/ for assets)

---

## GLOBAL DESIGN SYSTEM

### Color Tokens (Dark-first, with light mode)

```
Dark (default):
  Background:      #0b0b0f
  Background Soft:  #111116
  Background Panel: #16161c
  Surface:          #1a1a22
  Surface Hover:    #22222c
  Border:           #2a2a35
  Border Strong:    #3a3a48
  Text:             #e8e8ed
  Text Heading:     #ffffff
  Text Muted:       #6b6b80
  Accent (Blue):    #3b82f6
  Accent Hover:     #2563eb
  Success:          #22c55e
  Warning:          #f59e0b
  Danger:           #ef4444
  Purple:           #8b5cf6
  Pink:             #ec4899
  Cyan:             #06b6d4

Light:
  Background:       #fafafa
  Surface:          #ffffff
  Border:           #e5e5e5
  Text:             #171717
  Accent:           #2563eb
```

### Typography
- **Primary Font:** Inter (system-ui fallback)
- **Mono Font:** JetBrains Mono / Fira Code
- **Body:** 1.6 line-height, antialiased
- **Eyebrow:** Uppercase, 0.72rem, 700 weight, letter-spacing 0.14em, accent color
- **Section Title:** clamp(1.4rem, 3vw, 2rem), 700 weight, tight tracking
- **Section Copy:** Muted color, max-width 52ch

### Layout
- **Max Width:** 1080px
- **Sidebar Width:** 240px (fixed left, dark panel, navigation links)
- **Border Radius:** 6px (default), 10px (lg), 14px (xl)
- **App Layout:** Sidebar + main content (flex, min-height 100vh)

### Buttons
- **Primary:** Blue (#3b82f6), white text, 600 weight, subtle shadow, hover lifts -2px
- **Secondary:** Transparent, border, hover shows accent soft bg
- **Ghost:** Transparent, muted text, hover shows surface bg
- **Sizes:** sm (0.45rem 0.9rem), default (0.65rem 1.4rem), lg (0.8rem 1.8rem)

### Animations
- fadeInUp, fadeIn, pulseDot, shimmer, subtleFloat
- Transitions: 0.12s–0.15s ease on hovers/transforms

### Style Rules
- Dark-first SaaS aesthetic — minimal, sharp, professional
- NO Tailwind — custom CSS variables only
- Gold accent (#b8962e) used sparingly for premium feel in branding/logos
- Blue accent (#3b82f6) for interactive elements
- Cards: surface bg, 1px border, radius-lg, subtle hover lift

---

## TECH STACK

- **Framework:** Next.js 15 (Pages Router — NOT App Router)
- **Language:** TypeScript
- **Auth:** Firebase Authentication (email/password)
- **Payments:** Stripe Checkout (one-time $12.99 membership + merch cart)
- **AI:** OpenAI GPT-4o (roleplay), compatible LLM endpoint (coaching)
- **Voice:** OpenAI Realtime API (WebRTC)
- **Bot Protection:** BotID on sensitive endpoints
- **Deployment:** Vercel
- **State:** React hooks + localStorage (no external state library)

---

## MONETIZATION

### Founding Access
- **Price:** $12.99 one-time for the current Phase One experience
- **Includes:** AI Roleplay Lab, dashboard access, the 15+ product FSA Store, and rep-branding tools
- **Stripe Product:** prod_UC3ZdA1h6sSp3g

### FSA Store (access-controlled)
- 15+ branded products across 6 categories
- Separate Stripe checkout for merch
- See PRODUCT CATALOG section below

---

## PAGE-BY-PAGE SPECIFICATIONS

### 1. Landing Page (`/`)
**Purpose:** Convert visitors to members

**Hero Section:**
- Headline: "Built for Closers" or similar elite sales positioning
- Subheadline emphasizing AI-powered sales training
- CTA: "Join FSA ELITE — $12.99" (blue primary button)
- Trust signals below hero

**4 Pillars Section:**
1. AI Roleplay Lab — Practice against realistic buyer personas
2. Sales Promo Tools — Branded materials for field reps
3. Business Cards — Premium + digital NFC cards
4. Closer Gear — Branded apparel and desk items

**Featured Drops:** Carousel/grid of 3-4 top merch products

**Onboarding Steps:** Visual 3-step flow (Sign Up → Get Access → Start Training)

**FAQ Section:** Accordion with common questions

**Footer:** Links to legal pages, contact info, social

---

### 2. Welcome / Dashboard (`/welcome`)
**Purpose:** Post-login home — show progress, motivate daily use

**Layout:** Sidebar navigation + main content

**Content Blocks:**
- **Greeting:** "Welcome back, [Name]" with motivational subtext
- **Roleplay Progress Card:**
  - Sessions completed (count)
  - Total turns practiced
  - Daily drills remaining (3/day limit)
- **Skill Scores Grid (6 skills):**
  - Frame Control (0-99)
  - Discovery Depth (0-99)
  - Objection Isolation (0-99)
  - Value Building (0-99)
  - Next-Step Close (0-99)
  - Composure (0-99)
  - Color-coded: green (70+), yellow (40-69), red (<40)
  - Weakest skill highlighted with coaching tip
- **Quick Actions:** "Start a Drill" → /roleplay, "Browse Store" → /store

**Data Source:** localStorage (no backend DB for progress yet)

---

### 3. Roleplay Lab (`/roleplay`)
**Purpose:** AI-powered sales roleplay training — the core product

**Layout:** Chat interface, full-width within sidebar layout

**Features:**
- **Persona Selection:** 5 buyer personas (3 standard, 2 boss-level locked at 75+ score)
- **Chat Interface:** Message bubbles (user = right/blue, persona = left/surface)
- **Live Scoring:** After each user turn, display 3 scores:
  - Frame Control (0-99)
  - Discovery Depth (0-99)
  - Conversion (0-99)
- **Skill Tags:** 6 tags scored per turn (frame_control, discovery_depth, objection_isolation, value_building, next_step_close, composure)
- **Patience Meter:** Visual bar showing persona's remaining patience (decreases on weak turns, increases on strong ones)
- **Voice Mode Toggle:** Switch between text and voice input (WebRTC via OpenAI Realtime API)
  - Hold-to-talk or toggle-on mic button
  - Voice status indicator: idle → connecting → listening → speaking
  - Live transcript displayed in chat alongside text messages
  - API: `POST /api/realtime-session` returns ephemeral `clientSecret` for WebSocket
  - Model: `gpt-4o-realtime-preview-2025-06-03`, voice: `ash`
  - Hook: `lib/useRealtimeVoice.ts` (WebRTC, ScriptProcessorNode, VAD)
- **Daily Limit:** 3 drills per day, counter visible
- **Help Command:** `/help` breaks character, OLIVE gives coaching tips

**Personas:**

| Name | Type | Opener | Budget | Patience |
|------|------|--------|--------|----------|
| Budget Brian | Standard | "I've been to three dealerships this week..." | $350-425/mo | 62 |
| Trade Trap Tina | Standard | "I owe way more than my car is worth..." | $420-520/mo | 66 |
| Payment Patty | Standard | "I have a number in my head..." | Under $400/mo | 64 |
| Authority Alex | Boss | "My partner makes the final call..." | $450-600/mo | 55 |
| Skeptic Sam | Boss | "I've read every review..." | $500-700/mo | 52 |

Each persona has: Goal, Fear, Constraint, Trigger phrases, Decision style, Hidden variables

---

### 4. Store (`/store`)
**Purpose:** Member-exclusive merchandise shop

**Layout:** Category filter tabs + product grid + cart sidebar

**Categories:** clothing, headwear, business-cards, desk-gear, promo-tools, creator-kit

**Features:**
- Category tab filtering
- Product cards: image, name, price, "Add to Cart" button
- Cart drawer/sidebar: items, quantities, total, "Checkout" button
- Bundle offers highlighted (Starter Presence Kit, Closer Daily Kit)
- Member-only gate (must be authenticated + have membership)

**See PRODUCT CATALOG section for full inventory**

---

### 5. Checkout Preview (`/checkout-preview`)
**Purpose:** Founding Access purchase decision page

**Layout:** Clean, focused conversion page

**Content:**
- Access name: "FSA ELITE Founding Access"
- Price: $12.99 (one-time, Phase One access)
- Full feature checklist with checkmarks
- Payment method indicator (Stripe)
- "Complete Purchase" CTA button
- Support contact info visible
- Money-back / satisfaction messaging

---

### 6. Success (`/success`)
**Purpose:** Post-purchase confirmation

**Content:**
- Confirmation message ("You're in!")
- Order summary (membership or merch details)
- Membership activation trigger (automatic)
- Next steps: "Go to Dashboard" / "Start Your First Drill"

---

### 7. Cancel (`/cancel`)
**Purpose:** Checkout cancellation — non-punitive

**Content:**
- Friendly message ("No pressure")
- "Try Again" button back to checkout-preview
- Browse other options

---

### 8. Login (`/login`)
**Purpose:** Firebase email/password authentication

**Layout:** Centered card, minimal

**Fields:** Email, Password
**Actions:** "Sign In" button, "Forgot Password?" link, "Create Account" link
**Behavior:** Redirects to /welcome (or ?next= param)

---

### 9. Register (`/register`)
**Purpose:** New user sign-up

**Layout:** Centered card

**Fields:** Full Name, Email, Password (min 8 chars), Confirm Password
**Actions:** "Create Account" button, "Already have an account?" link
**Behavior:** Creates Firebase user, sends verification email, redirects

---

### 10. Forgot Password (`/forgot-password`)
**Purpose:** Password reset request

**Layout:** Centered card, single field
**Fields:** Email
**Behavior:** Sends Firebase reset email, confirms without leaking user existence

---

### 11. Reset Password (`/reset-password`)
**Purpose:** Process Firebase OOB reset code

**Layout:** Centered card
**Fields:** New Password, Confirm Password
**Behavior:** Validates OOB code from email link, sets new password

---

### 12. Legal Hub (`/legal`)
**Purpose:** Index page linking to all policies

**Links to:** Privacy Policy, Terms of Service, Refund Policy

---

### 13. Privacy Policy (`/privacy-policy`)
Standard privacy policy covering: data collection, cookies/localStorage, Stripe payment handling, third-party services, contact info

---

### 14. Terms of Service (`/terms`)
Covers: no earnings guarantee, IP protection, account access control, prohibited use

---

### 15. Refund Policy (`/refund-policy`)
Covers: digital access (non-refundable after delivery), merchandise orders, support request process

---

## PRODUCT CATALOG (Merch Store)

### Clothing
| Product | Price | Description |
|---------|-------|-------------|
| Closer Uniform Hoodie | $79 | Heavyweight black hoodie, FSA ELITE chest mark |
| Self-Promo Brand Kit | $119 | Gear bundle + digital brand assets |

### Headwear
| Product | Price | Description |
|---------|-------|-------------|
| FSA ELITE Cap Series | $42 | Structured cap, creator-ready |
| Closer Snapback | $38 | Flat-brim with name branding |
| FSA ELITE Branded Beanie | $28 | Knit beanie with embroidered logo |

### Business Cards
| Product | Price | Description |
|---------|-------|-------------|
| Premium Business Cards (250ct) | $49 | Matte stock, QR code included |
| Digital Business Card | $29 | NFC tap-to-share, no app needed |

### Desk Gear
| Product | Price | Description |
|---------|-------|-------------|
| Branded Leather Portfolio | $39 | A4 size, embossed logo |
| Custom Branded Notepad Pack | $24 | 50-sheet sets with logo header |
| Desk Nameplate & Stand | $19 | Custom engraving, metal frame |
| Executive Pen Set | $22 | 5 pens with custom engraving |
| Custom Branded Pencil Pack | $16 | 12ct with imprint |
| Signature Closer Pen | $12 | Single premium pen with box |

### Promo Tools
| Product | Price | Description |
|---------|-------|-------------|
| Custom Presentation Folder | $32 | Full-color print, card pocket |
| Branded USB Drive Pack | $35 | 10ct, pre-load option |
| Branded Phone & Tablet Stand | $28 | Adjustable, logo engraving |
| Sales Professional Tote | $34 | Canvas, laptop pocket |

### Creator Kit
| Product | Price | Description |
|---------|-------|-------------|
| Custom Merch Design Request | $0 | Custom order submission form |

### Bundles
- **Starter Presence Kit:** Digital Business Card + Premium Business Cards (250ct)
- **Closer Daily Kit:** FSA ELITE Cap Series + Closer Uniform Hoodie

---

## AI SYSTEM — OLIVE

### Identity
- **Name:** OLIVE
- **Role:** FSA ELITE AI Sales Intelligence
- **Greeting:** "What's good — I'm OLIVE, your AI sales coach..."
- **Tone:** Sharp, calm, confident — no corporate fluff, no filler
- **Visual:** Floating widget (bottom-right), expandable chat panel

### Modes (switchable via tab bar inside the widget)
1. **General** (default) — Page-context aware, answers platform questions, guides users. Greeting: "What's good — I'm OLIVE..."
2. **Coach** — User pastes a real objection word-for-word. OLIVE returns: (1) exact field-ready rebuttal, (2) 1–2 sentences on the psychology behind it. Greeting prompts user to paste the objection.
3. **Battle** — OLIVE plays a tough prospect. Throws a realistic objection. User responds. OLIVE scores in 1–2 sentences (what landed, what missed), then throws the next one immediately. Rotates: price, timing, competition, need, authority.

Each mode has:
- Its own localStorage history (per-mode persistence)
- Its own greeting message and input placeholder
- Separate clear history (only clears that mode's history)
- Mode preference saved to localStorage, restored on next visit

### OLIVE Widget UI
- Floating button (bottom-right), "O" icon with pulse animation
- Opens panel: header (blue accent) → mode tabs (General | Coach | Battle) → messages → input
- Mode tabs: pill buttons, active = accent color + bold + bottom border
- `OLIVE_NAME`, `OLIVE_TAGLINE` from `lib/olivePersona.ts`
- Context-aware (general mode only): adapts based on current page

### OLIVE API Route (`/api/olive-chat`)
- Accepts: `messages[]`, `pageContext`, `mode` ('general' | 'coach' | 'battle')
- Mode 'general': uses `OLIVE_GENERAL_SYSTEM_PROMPT` + page context injection
- Mode 'coach': `OLIVE_COACH_SYSTEM_PROMPT` — sharp closer coaching, no page context
- Mode 'battle': `OLIVE_BATTLE_SYSTEM_PROMPT` — prospect simulation, fast-paced scoring
- BotID protected, max 20 messages per request

---

## SALES FRAMEWORK (Intelligence Layer)

### 6 Pillars
1. **Frame Control** — Set agenda, set next step early, stay calm
2. **Discovery** — Pain, impact, timeline, decision-process questions
3. **Value Build** — Tie features to prospect's pain, use proof + story
4. **Objection Handling** — Identify root cause (money/trust/timing/authority)
5. **Close** — Advance to concrete next commitment (not just "buy now")
6. **Post-Close** — Set expectations, ask for referral/review

### Kaygun Sales OS (Operating System)
**Daily Loop:**
- Morning: Who can I move? What's rotting? What money's waiting?
- Midday: What's moving? What's dead? Who's lying?
- Night: Who advanced? Who stalled? Who committed?

**Core Tenets:**
- Certainty > charm
- Movement > comfort
- Pressure > polish
- Results > reputation

---

## SIDEBAR NAVIGATION (Authenticated Users)

**Brand Section:**
- FSA ELITE logo + "ELITE PERFORMANCE" subtitle

**Nav Links:**
- Dashboard → /welcome
- Roleplay Lab → /roleplay
- Store → /store
- Legal → /legal

**Bottom:**
- Theme toggle (dark/light)
- Logout button

---

## ROUTE ALIASES (SEO/Convenience)
- /fsa → /
- /fsa-elite → /
- /fsaelite → /
- /shop → /store
- /lab → /roleplay
- /dashboard → /welcome

---

## API ROUTES SUMMARY

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/create-checkout-session | POST | Membership Stripe checkout |
| /api/create-merch-checkout-session | POST | Merch cart Stripe checkout |
| /api/activate-membership | POST/GET | Verify payment, set membership cookie |
| /api/membership-status | GET | Check active membership |
| /api/ai-chat | POST | Roleplay AI responses |
| /api/olive-chat | POST | OLIVE coaching (3 modes) |
| /api/realtime-session | POST | Voice practice WebRTC session |
| /api/auth/login | POST | Firebase session cookie |
| /api/auth/logout | POST | Clear session |
| /api/auth/session | GET | Check session state |
| /api/system-status | GET | Health check |

---

## v0 PROMPT TIPS

When pasting into v0.dev:

1. **Start with the design system** — paste the color tokens, typography, and button styles so v0 establishes the visual language first.

2. **One page at a time** — generate each page separately. Start with the landing page, then dashboard, then roleplay, then store.

3. **Reference this file** — say "Use these exact colors and design tokens: [paste tokens]" to keep consistency.

4. **For the roleplay page** — emphasize the chat interface, scoring panel, persona selector, and patience meter. This is the most complex UI.

5. **For the store** — provide the full product catalog table so v0 can generate realistic product cards.

6. **Specify "Pages Router"** — always tell v0 "Next.js Pages Router, NOT App Router" to avoid wrong patterns.

7. **Say "no Tailwind"** — if you want to match the existing CSS variable system, explicitly tell v0 to use CSS custom properties.

8. **Iterate** — use v0's edit feature to refine. Start broad, then polish individual sections.

### Example v0 Prompt (Landing Page):
```
Build a dark-themed SaaS landing page for "FSA ELITE" — an AI-powered sales training platform.

Design system:
- Background: #0b0b0f, Surface: #1a1a22, Text: #e8e8ed, Accent: #3b82f6
- Font: Inter, border-radius: 6px
- Buttons: blue with hover lift effect

Sections:
1. Hero with "Built for Closers" headline, $12.99 membership CTA
2. 4-pillar feature grid (AI Roleplay, Sales Tools, Business Cards, Closer Gear)
3. Featured product drops (3-4 merch items with prices)
4. 3-step onboarding flow
5. FAQ accordion
6. Footer with legal links

Use Next.js Pages Router, TypeScript, no Tailwind — use CSS custom properties.
```
