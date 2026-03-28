# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` branch | ✅ Yes |
| Older branches | ❌ No |

## Reporting a Vulnerability

If you discover a security vulnerability in FSA Elite, **please do not open a public GitHub issue**.

Instead, report it privately by emailing:

**📧 support@fsaeliteperformance.com**

Please include:
- A description of the vulnerability
- Steps to reproduce or a proof-of-concept
- The potential impact
- Any suggested fix (optional but appreciated)

We will acknowledge your report within **48 hours** and aim to provide a fix or mitigation within **14 days**, depending on severity.

## Scope

The following are **in scope** for security reports:

- Authentication or authorization bypass
- Stripe API key or secret key exposure
- Server-side injection vulnerabilities (SQL, command, etc.)
- Sensitive data leakage (environment variables, user data)
- Cross-site scripting (XSS) or cross-site request forgery (CSRF)

The following are **out of scope**:

- Denial of service (DoS) attacks
- Issues in third-party services (Stripe, Vercel, IONOS) — report those directly to them
- Spam or social engineering

## Responsible Disclosure

We follow a responsible disclosure process. Once a fix is deployed, we will:

1. Acknowledge the reporter (with permission)
2. Publish a summary of the issue in the repository's security advisories

Thank you for helping keep FSA Elite safe.
