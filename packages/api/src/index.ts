import { router } from './trpc';
import { eventsRouter } from './routers/events';
import { rsvpRouter } from './routers/rsvp';
import { attendanceRouter } from './routers/attendance';
import { memberRouter } from './routers/member';

export const appRouter: any = router({
  events: eventsRouter,
  rsvp: rsvpRouter,
  attendance: attendanceRouter,
  member: memberRouter
});

export type AppRouter = typeof appRouter;
