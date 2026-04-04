# FSA Platform Consolidation Plan

## Objective
Consolidate all active FSA Elite Performance repositories into a single GitHub organization and one primary monorepo with shared architecture, CI/CD, permissions, issue tracking, and deployments.

## Goals
- Create one GitHub organization for all platform work
- Create one main monorepo as the source of truth
- Merge core apps into one system
- Extract shared packages for auth, UI, config, and utils
- Standardize CI/CD, repo governance, and deployments
- Close, migrate, and archive outdated or duplicate repositories
- Create one team structure and one contributor workflow

## Repository Inventory

### Core repositories to migrate
- `FSA-ELITE-PERFORMANCE-STORE`
- `FSA-ELITE-SALES-TRAINING`
- `v0-elite-performance-academy`
- `chatbot`
- `express-js-on-vercel`
- `fsaelite`

### Starter/template/experimental repositories to extract or archive
- `vite-react`
- `vercel-ai-gateway-demo`
- `kubiks-next-js-starter`
- `nextjs-boilerplate`
- `fsa-kubikslive`
- `v0-b-f93-suw-t-nphc-1774520952924`

## Target End State
- 1 GitHub organization
- 1 primary monorepo
- 1 team structure
- 1 shared CI/CD system
- 1 shared auth strategy
- 1 shared UI/design system
- 1 shared deployment strategy
- Legacy repositories archived after migration

## Recommended Organization Setup

### Organization names (choose one)
- `fsaeliteperformance`
- `fsaelite`
- `fsa-elite-performance`

### Teams
- `admins`
- `core`
- `frontend`
- `backend`
- `ops-deploy`

If only one operator exists today, still create `admins` and `core` first.

## Recommended Monorepo Naming
- `platform`
- `fsa-platform`
- `fsa-monorepo`

## Monorepo Structure
```text
/apps
  /apps/web
  /apps/store
  /apps/training
  /apps/academy
  /apps/chatbot
  /apps/api

/packages
  /packages/ui
  /packages/auth
  /packages/database
  /packages/config
  /packages/types
  /packages/utils

/content
  /content/training
  /content/academy

/docs

/.github
  /.github/workflows
```

## Technical Standardization
- Use TypeScript across all apps/packages
- Use `pnpm` workspaces for dependency management
- Use Turborepo task pipelines (`build`, `lint`, `test`, `typecheck`)
- Consolidate auth into a shared package (`@fsa/auth`)
- Consolidate UI into a shared design system (`@fsa/ui`)
- Consolidate runtime config/env typing into `@fsa/config`
- Use shared `@fsa/utils` and `@fsa/types`

## CI/CD Standardization
- One reusable workflow strategy in `.github/workflows`
- Required checks on PRs: lint, typecheck, unit tests, build
- Conventional branch protection on `main`
- Shared preview + production deployment workflows
- Shared dependency and security scanning (CodeQL + secret scan)

## Migration Waves

### Wave 0: Foundation
1. Create target GitHub organization
2. Create teams and baseline permissions
3. Create monorepo with `pnpm` workspaces + turbo
4. Add base CI templates, CODEOWNERS, branch protections

### Wave 1: Core Application Migration
1. Migrate `FSA-ELITE-SALES-TRAINING` into `/apps/training` (or `/apps/web` if it remains unified)
2. Migrate `FSA-ELITE-PERFORMANCE-STORE` into `/apps/store`
3. Migrate academy/chatbot/api repos into `/apps/academy`, `/apps/chatbot`, `/apps/api`
4. Keep adapters/shims during transition only where required

### Wave 2: Shared Package Extraction
1. Extract duplicated UI into `/packages/ui`
2. Extract auth/session logic into `/packages/auth`
3. Extract configuration and env parsing into `/packages/config`
4. Extract common utilities/types into `/packages/utils` and `/packages/types`

### Wave 3: Deployment and Cutover
1. Point environments and domains to monorepo deployments
2. Validate production parity (auth, checkout, AI roleplay, content delivery)
3. Freeze writes on legacy repos
4. Archive legacy repos after successful cutover window

## Archive Criteria
A legacy repository can be archived only when all of the following are true:
1. Code has been fully migrated to monorepo
2. CI is disabled or redirected
3. README points to monorepo replacement
4. Open issues/PRs are closed or migrated
5. Repository is set to read-only/archive mode

## Governance Defaults
- Use one issue tracker in the monorepo
- Use labels for domain ownership (`app:web`, `app:store`, `pkg:ui`, `ops`, etc.)
- Require PR templates and CODEOWNERS review for sensitive areas
- Keep architecture decision records in `/docs`

## Execution Checklist
- [ ] Choose org name and create org
- [ ] Choose monorepo name and initialize workspace
- [ ] Configure teams/permissions
- [ ] Migrate core repos (wave 1)
- [ ] Extract shared packages (wave 2)
- [ ] Standardize CI/CD and branch protections
- [ ] Complete cutover and archive legacy repos (wave 3)
