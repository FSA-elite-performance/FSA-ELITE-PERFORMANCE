# Copilot Instructions for FSA Elite Sales Training

## Scope

- Make product code changes in `next-app/`.
- This repo uses Next.js 15 with the pages router. Do not introduce App Router patterns.
- Keep the domain split intact: `fsaeliteperformance.com` is the store surface, and `fsaelite.org` is the training platform surface.

## Build And Validation

- Run commands from `next-app/`.
- Install dependencies with `npm ci`.
- Use `npm run dev` for local development.
- Use `npm run build` as the primary validation step.
- Also run `NEXT_EXPORT=1 npm run build` after changes that affect pages, routing, API usage from pages, or static-export compatibility.

## Architecture

- Keep pages in `next-app/pages/`, API routes in `next-app/pages/api/`, shared logic in `next-app/lib/`, reusable UI in `next-app/components/`, and global styling in `next-app/styles/`.
- Pages must stay static-export safe: do not import server-only modules such as Stripe or OpenAI into page components.
- Put payment, auth, and AI integrations behind API routes or server-only library code.
- Reuse existing shared modules before adding new abstractions, especially for membership, checkout, roleplay, and bot-protection logic.

## Conventions

- Use TypeScript for new code and avoid `any`.
- Keep pages and components functional.
- Use `async/await` instead of promise chains.
- Match existing naming: lowercase hyphenated page files and PascalCase component files.
- Follow the existing manual formatting style: 2-space indentation and imports grouped React/Next, then third-party, then local.
- Never commit secrets. Read runtime credentials from `process.env`, and document any new environment variables in `next-app/.env.example`.
- Do not disable or weaken existing CI or security workflows.

## Linked Guidance

- See `README.md` for the high-level product and setup overview.
- See `next-app/DEPLOYMENT.md` for Vercel, domain, and environment-variable deployment guidance.
- See `SECURITY.md` for the change checklist and security reporting process.
- See `.github/instructions/pages.instructions.md` for page-specific constraints.
- See `.github/instructions/api-routes.instructions.md` for API route requirements.
- See `.github/instructions/styles.instructions.md` for style-system and CSS rules.
