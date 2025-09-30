import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { AttendanceMarkInput } from "../api-contracts";

export const attendanceRouter: any = router({
  mark: protectedProcedure.input(AttendanceMarkInput).mutation(async ({ ctx, input }) => {
    const { orgId, eventId, memberProfileId, status } = input;
    
    // Get the event to check teamId
    const event = await ctx.db.event.findUnique({
      where: { id: eventId },
      select: { teamId: true }
    });

    if (!event) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
    }

    // Get member profile to check teamId
    const memberProfile = await ctx.db.memberProfile.findUnique({
      where: { id: memberProfileId },
      select: { teamId: true }
    });

    if (!memberProfile) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Member profile not found' });
    }

    // RBAC: Only COACH/ADMIN/OWNER can mark attendance
    const canMarkAttendance = 
      // COACH: only for team members during team events
      (ctx.user.role === 'COACH' && event.teamId && ctx.user.teamIds.includes(event.teamId) && memberProfile.teamId === event.teamId) ||
      // ADMIN/OWNER: for everyone within org
      (ctx.user.role === 'ADMIN' || ctx.user.role === 'OWNER');

    if (!canMarkAttendance) {
      throw new TRPCError({ 
        code: 'FORBIDDEN', 
        message: 'Only coaches, admins, and owners can mark attendance' 
      });
    }
    
    return ctx.db.attendance.upsert({
      where: {
        eventId_memberProfileId: {
          eventId,
          memberProfileId
        }
      },
      update: { status },
      create: {
        orgId,
        eventId,
        memberProfileId,
        status
      }
    });
  }),

  listForEvent: protectedProcedure
    .input(z.object({ 
      orgId: z.string(),
      eventId: z.string()
    }))
    .query(async ({ ctx, input }) => {
      const { orgId, eventId } = input;
      
      // Get the event to check teamId
      const event = await ctx.db.event.findUnique({
        where: { id: eventId },
        select: { teamId: true }
      });

      if (!event) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
      }

      // RBAC: Only COACH/ADMIN/OWNER can list attendance
      const canListAttendance = 
        // COACH: only for team events
        (ctx.user.role === 'COACH' && event.teamId && ctx.user.teamIds.includes(event.teamId)) ||
        // ADMIN/OWNER: for all events
        (ctx.user.role === 'ADMIN' || ctx.user.role === 'OWNER');

      if (!canListAttendance) {
        throw new TRPCError({ 
          code: 'FORBIDDEN', 
          message: 'Only coaches, admins, and owners can view attendance' 
        });
      }
      
      return ctx.db.attendance.findMany({
        where: {
          orgId,
          eventId
        },
        include: {
          member: {
            select: {
              id: true,
              displayName: true,
              role: true
            }
          },
          event: {
            select: {
              id: true,
              title: true,
              startsAt: true
            }
          }
        }
      });
    })
});
