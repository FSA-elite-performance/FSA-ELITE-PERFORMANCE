# FSA Elite Performance

FSA Elite Performance is the market-facing brand of **Fontenot Sales Association LLC**. The business exists to help companies increase revenue through trained sales talent, stronger sales systems, and performance coaching.

This repository is the flagship product repo for the current FSA Elite Performance web experience at <https://fsaeliteperformance.com>.

## Current Product Story

FSA Elite Performance is being positioned as a phased sales-performance business:

1. **Phase One — Founding Access**
   - Public entry offer for the current AI roleplay, dashboard, and FSA Store experience
   - One-time checkout used to gather proof, usage, and customer feedback
2. **Phase Two — Team Training**
   - Recurring training, optimization, and coaching programs for small and mid-sized businesses
   - KPI visibility, manager support, and repeatable rep standards
3. **Phase Three — Enterprise System**
   - Software-enabled rollout of the proven sales method, recruiting standards, and performance infrastructure

The current live checkout supports **Phase One Founding Access**. Team and enterprise engagements are positioned as higher-touch follow-on offers until recurring product workflows are expanded.

## What the App Includes Today

- AI Roleplay Lab with five buyer personas
- Real-time score feedback across core sales skills
- OLIVE AI sales assistant
- Dashboard progress tracking
- FSA Store for rep-branding tools, business cards, and closer gear
- Stripe checkout, success flow, and access control for runtime deployments

## Pricing Direction

- **Founding Access** — `$12.99` one time for the current Phase One experience
- **Team Training** — recurring monthly engagement for coaching, standards, and rep development
- **Enterprise** — custom pricing for larger rollouts, leadership visibility, and system implementation

This keeps the business aligned around recurring revenue and measurable performance while the software continues to mature.

## Tech Stack

- Next.js 15 (Pages Router)
- React 18 + TypeScript
- Next.js API routes for Stripe, auth, and AI integrations
- Global CSS design system
- Vercel deployment with static export compatibility

## Project Structure

The active application lives at the repository root:

```text
components/
lib/
pages/
pages/api/
public/
styles/
middleware.ts
next.config.js
package.json
README.md
```

## Local Setup

Run all commands from the repository root:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The app runs at <http://localhost:3000>.

## Validation

Use both build modes before shipping changes:

```bash
npm run build
NEXT_EXPORT=1 npm run build
```

## Deployment Notes

- **Primary deployment:** Vercel
- **Secondary deployment:** static export hosting via `NEXT_EXPORT=1`
- API routes and middleware do not run in static export mode
- BotID protects sensitive runtime routes such as checkout and AI chat on server-backed deployments

See `DEPLOYMENT.md` and `SECURITY.md` for deployment and security guidance.

## Environment Variables

Create `.env.local` in the repository root and add the values documented in `.env.example`, including:

```env
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_BASE_URL=
OPENAI_API_KEY=
STRIPE_TRAINING_PRICE_ID=
MEMBERSHIP_SIGNING_SECRET=
OPENAI_PROMPT_ID=
NEXT_PUBLIC_ROLEPLAY_PUBLIC=
```

Never commit secrets. Use platform-managed environment variables for production.

## License

MIT License
