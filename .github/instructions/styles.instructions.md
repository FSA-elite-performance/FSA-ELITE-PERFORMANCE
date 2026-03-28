---
applyTo: "next-app/styles/**"
---

# CSS Review Instructions

When reviewing CSS changes, check the following:

- Use the design token custom properties defined in `:root` (e.g., `--color-primary`, `--color-bg`, `--color-surface`, `--radius`) instead of hard-coded values.
- Maintain the existing dark theme — background colors should remain dark and text should remain light.
- Use responsive units (`clamp()`, `rem`, `%`) rather than fixed `px` values for layout and typography where possible.
- Ensure new class names follow the existing flat naming convention (`.btn-primary`, `.container`) rather than introducing a BEM or CSS Modules pattern.
