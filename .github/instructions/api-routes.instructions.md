---
applyTo: "next-app/pages/api/**"
---

# API Route Review Instructions

When reviewing API routes, check the following:

- The handler must validate the HTTP method (e.g., `POST`) and return `405 Method Not Allowed` for unsupported methods.
- All user-supplied input must be validated and sanitized before use. Enforce length limits and type checks.
- Secrets such as `STRIPE_SECRET_KEY` and `OPENAI_API_KEY` must be read from `process.env` at runtime — never hard-coded or embedded in client bundles.
- Return descriptive JSON error responses with appropriate HTTP status codes (400 for bad input, 401 for auth failures, 500 for unexpected errors).
- Avoid leaking internal error details to the client; log them server-side instead.
- Use `async/await` for asynchronous operations rather than raw promise chains.
- Third-party SDK clients (Stripe, OpenAI) should be instantiated once outside the handler for warm-start reuse in serverless environments.
