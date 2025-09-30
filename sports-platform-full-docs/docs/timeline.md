# Timeline — iteratief
## Sprint 0 — Skeleton (2–3 dagen)
- Monorepo (Turborepo), apps/web + packages/api|db|ui.
- Prisma schema v0 (Org, User, MemberProfile, Event, RSVP, Facility, Booking).
- tRPC routers (stubs): org, member, events, rsvp, facility, booking.
- Auth stub (Auth.js/Clerk), docs & rules.

## Sprint 1 — Kalender & RSVPs (1–1.5 week)
- Event CRUD, lijst/maandweergave, RSVP + aanwezigheden.
- RBAC v1. E2E tests.

## Sprint 2 — Ledenbeheer + Verhuur basis (1–1.5 week)
- Profielen (ouder-kind), resource catalogus, availability & booking, notificaties, iCal export.

## Sprint 3 — Betaalde events + Explore (1–1.5 week)
- Payments (Mollie/Stripe) + webhooks.
- Explore: stad → clubs zoeken → join/follow.
- Admin basics + observability.

## Fase 2 (na MVP)
- Privélessen-matching, carpool, realtime chat, POS-koppelingen, analytics.
