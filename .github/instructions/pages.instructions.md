---
applyTo: "next-app/pages/*.tsx"
---

# Page Component Review Instructions

When reviewing page components, check the following:

- Pages must be functional React components exported as the default export — no class components.
- Each page should include a `<Head>` component with a descriptive `<title>` tag.
- Inline styles should reference CSS design tokens (`var(--color-primary)`, `var(--color-bg)`, `var(--color-surface)`, `var(--color-muted)`) rather than hard-coded hex values.
- Pages must not import server-only modules (e.g., `stripe`, `openai`) directly — these belong in API routes under `pages/api/`.
- Ensure the page works under static export (`NEXT_EXPORT=1`); avoid `getServerSideProps` and dynamic server features.
- Use TypeScript types for all props, state, and event handlers. Avoid the `any` type.
