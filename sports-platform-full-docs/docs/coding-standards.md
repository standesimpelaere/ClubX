# Coding Standards
- TypeScript strict, `noImplicitAny=true`; absolute imports via tsconfig paths.
- Error handling: TRPCError met user-vriendelijke messages.
- Commits: conventional (feat:, fix:, chore:); 1 feature per PR.
- Tests: Vitest unit voor routers; Playwright E2E voor RSVP/attendance.
- Observability: Sentry voor errors, OpenTelemetry voor traces (later).
