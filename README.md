# Sports Platform

A comprehensive sports club management platform built with TypeScript, Next.js, Prisma, and tRPC.

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your database URL and other settings
```

3. Set up the database:
```bash
# Generate Prisma client
pnpm run db:generate

# Push schema to database
pnpm run db:push

# Seed with test data
pnpm run db:seed
```

4. Start the development servers:
```bash
# Start all services
pnpm run dev

# Or start individually:
pnpm run dev --filter=@sports-platform/web
pnpm run dev --filter=@sports-platform/api
```

### Available Scripts

- `pnpm run dev` - Start all development servers
- `pnpm run build` - Build all packages
- `pnpm run typecheck` - Run TypeScript checks
- `pnpm run lint` - Run ESLint
- `pnpm run test` - Run unit tests
- `pnpm run test:e2e` - Run E2E tests with Playwright

### Project Structure

```
apps/
  web/                 # Next.js web application
packages/
  api/                 # tRPC API server
  db/                  # Prisma database package
  ui/                  # Shared UI components
```

### Features Implemented

- ✅ Monorepo setup with Turborepo
- ✅ Database schema with Prisma
- ✅ tRPC API with RBAC (CASL)
- ✅ Events management (CRUD)
- ✅ RSVP system with capacity validation
- ✅ Basic web UI with Tailwind CSS
- ✅ Unit tests (Vitest)
- ✅ E2E tests (Playwright)

### API Endpoints

- `GET /api/events` - List events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `POST /api/rsvp` - Create/update RSVP
- `GET /api/rsvp` - List RSVPs

### RBAC Roles

- **MEMBER**: Can RSVP to events, view own profile
- **PARENT**: Can RSVP for children, view child profiles
- **COACH**: Can create/manage team events, mark attendance
- **ADMIN**: Full access within organization
- **OWNER**: Full access to all resources

### Testing

Run unit tests:
```bash
pnpm run test
```

Run E2E tests:
```bash
pnpm run test:e2e
```

### Development

The project follows these coding standards:
- TypeScript strict mode
- Conventional commits
- Error handling with TRPCError
- Contract-first API design with Zod schemas
- RBAC authorization on all endpoints

### Database

The database includes the following main entities:
- Organizations (clubs)
- Teams
- Members (with roles)
- Events
- RSVPs
- Attendance records
- Facilities and bookings

See `packages/db/schema.prisma` for the complete schema.
