# Copilot instructions for FSA Elite Sales Training

## Project layout
- Main product code lives in `next-app/` (Next.js pages router + TypeScript).
- Marketing fallback page lives at repository root in `index.html`.
- GitHub Pages workflow is in `.github/workflows/pages-deploy.yml`.

## Development workflow
- Install dependencies from `next-app/` with `npm install` or `npm ci`.
- Validate changes from `next-app/` with `npm run build`.
- There is currently no test script in `next-app/package.json`; rely on build validation.

## Environment and deployment
- Use variables from `next-app/.env.example` for local setup.
- Never hardcode secrets (Stripe keys, Firebase admin credentials) in source files.
- Keep `NEXT_PUBLIC_BASE_URL` on approved production domains only.

## Coding guidance
- Keep changes minimal and focused on the requested task.
- Follow existing inline-style patterns used in current React pages unless refactoring is requested.
- Preserve current checkout flow behavior (`/api/create-checkout-session`, `/success`, `/cancel`).
