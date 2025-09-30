import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { RSVPUpsertInput } from "../api-contracts";

export const rsvpRouter: any = router({
  upsert: protectedProcedure.input(RSVPUpsertInput).mutation(async ({ ctx, input }) => {
    const { orgId, eventId, memberProfileId, status, note } = input;
    
    // Get the event to check capacity and timing
    const event = await ctx.db.event.findUnique({
      where: { id: eventId },
      include: {
        rsvps: {
          where: { status: 'GOING' },
          select: { id: true }
        }
      }
    });

    if (!event) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' });
    }

    // RBAC: Check if user can RSVP for this member
    const memberProfile = await ctx.db.memberProfile.findUnique({
      where: { id: memberProfileId },
      select: { userId: true, parentUserId: true, teamId: true }
    });

    if (!memberProfile) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Member profile not found' });
    }

    // Check RBAC permissions
    const canRSVP = 
      // MEMBER: for own memberProfileId
      (ctx.user.role === 'MEMBER' && memberProfile.userId === ctx.user.id) ||
      // PARENT: for child (check via parentUserId)
      (ctx.user.role === 'PARENT' && memberProfile.parentUserId === ctx.user.id) ||
      // COACH: for team members during team events
      (ctx.user.role === 'COACH' && event.teamId && ctx.user.teamIds.includes(event.teamId) && memberProfile.teamId === event.teamId) ||
      // ADMIN/OWNER: for everyone within org
      (ctx.user.role === 'ADMIN' || ctx.user.role === 'OWNER');

    if (!canRSVP) {
      throw new TRPCError({ 
        code: 'FORBIDDEN', 
        message: 'Insufficient permissions to RSVP for this member' 
      });
    }

    // Business rules: Check if event is in the past
    if (new Date() > new Date(event.startsAt)) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Cannot RSVP for past events' });
    }

    // Business rules: Check capacity if set
    if (event.capacity && status === 'GOING') {
      const currentGoing = event.rsvps.length;
      if (currentGoing >= event.capacity) {
        throw new TRPCError({ 
          code: 'BAD_REQUEST', 
          message: 'Event is at capacity' 
        });
      }
    }

    // Upsert RSVP
    return ctx.db.rSVP.upsert({
      where: {
        eventId_memberProfileId: {
          eventId,
          memberProfileId
        }
      },
      update: {
        status,
        note
      },
      create: {
        orgId,
        eventId,
        memberProfileId,
        status,
        note
      }
    });
  }),

  list: protectedProcedure
    .input(z.object({ 
      orgId: z.string(),
      eventId: z.string().optional(),
      memberProfileId: z.string().optional()
    }))
    .query(async ({ ctx, input }) => {
      const { orgId, eventId, memberProfileId } = input;
      
      await ctx.authz.require('read', 'RSVP', { orgId });
      
      return ctx.db.rSVP.findMany({
        where: {
          orgId,
          ...(eventId ? { eventId } : {}),
          ...(memberProfileId ? { memberProfileId } : {})
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
