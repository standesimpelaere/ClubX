# API Afspraken
- tRPC routers in `packages/api`: events, rsvp, attendance, booking, member, org, team.
- Zod voor input/output; alle mutaties hebben RBAC check en fouten met TRPCError.
- Externe integraties via REST webhooks (payments later).
- IDs: UUID/cuid2/ulid toegestaan; `orgId` verplicht in servercontext.

# Naming
- `events.*`, `rsvp.*`, `attendance.*`, `booking.*`, `member.*`, `org.*`, `team.*`

# Testing
- Vitest voor routers: capacity/deadline/permission tests.
- Playwright E2E: RSVP en aanwezigheden scenario’s.
