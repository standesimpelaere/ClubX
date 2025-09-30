import { z } from "zod";

// ---------- Commons ----------
export const Id = z.string().min(1);
export const OrgScoped = z.object({ orgId: Id });

// ---------- Events ----------
export const EventCreateInput = z.object({
  orgId: Id,
  teamId: Id.optional(),
  title: z.string().min(3),
  description: z.string().max(2000).optional(),
  location: z.string().max(280).optional(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  capacity: z.number().int().positive().optional()
});

export const EventUpdateInput = EventCreateInput.extend({
  eventId: Id
});

export const EventListQuery = z.object({
  orgId: Id,
  teamId: Id.optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional()
});

// ---------- RSVP ----------
export const RSVPStatus = z.enum(["GOING","MAYBE","NOT_GOING"]);
export const RSVPUpsertInput = z.object({
  orgId: Id,
  eventId: Id,
  memberProfileId: Id,
  status: RSVPStatus,
  note: z.string().max(400).optional()
});

// ---------- Attendance ----------
export const AttendanceStatus = z.enum(["PRESENT","LATE","ABSENT"]);
export const AttendanceMarkInput = z.object({
  orgId: Id,
  eventId: Id,
  memberProfileId: Id,
  status: AttendanceStatus
});

// ---------- Booking (basis) ----------
export const BookingCreateInput = z.object({
  orgId: Id,
  facilityId: Id,
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime()
});
export const BookingCancelInput = z.object({
  orgId: Id,
  bookingId: Id
});

// ---------- Routers (namen) ----------
export type RouterNames =
  | "org" | "team" | "member"
  | "events" | "rsvp" | "attendance"
  | "facility" | "booking";
