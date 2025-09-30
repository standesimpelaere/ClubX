# Scope
- Multitenant sportplatform: org/club → teams → events/RSVP → basisverhuur.
- Stack: TypeScript, Next.js (App Router), tRPC, Prisma (Postgres), Tailwind + shadcn/ui.
- Data-isolatie per orgId. EU/GDPR-first.

# Architectuur
- Contract-first: Zod schema’s in `packages/api` zijn single source of truth.
- tRPC voor interne client–server calls (type-safe). REST + webhooks voor extern.
- RBAC/ABAC via server-side guards; client gebruikt alleen gates voor weergave.
- Geen businesslogica in UI components—alle mutaties via tRPC procedures.
- Background jobs met BullMQ (Redis). Files via S3-compat storage met presigned uploads.

# Cursor instructies
- Maak eerst Zod types + unit tests, dán implementatie.
- Respecteer `.cursor/rules/*` en `/docs/*` en verwijs ernaar in PR-beschrijvingen.
- Edge-cases (capaciteit, deadlines, permissies) hebben vitest-cases.
- Gebruik duidelijke commit-slices: API + UI + tests per feature.
