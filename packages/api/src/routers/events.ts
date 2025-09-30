import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  EventCreateInput,
  EventUpdateInput,
  EventListQuery
} from "../api-contracts";

export const eventsRouter: any = router({
  list: protectedProcedure.input(EventListQuery).query(async ({ ctx, input }) => {
    const { orgId, teamId, from, to } = input;
    // RBAC: can('read','Event',{orgId})
    await ctx.authz.require('read','Event',{ orgId });
    return ctx.db.event.findMany({
      where: {
        orgId,
        ...(teamId ? { teamId } : {}),
        ...(from || to ? { startsAt: { gte: from ? new Date(from) : undefined, lte: to ? new Date(to) : undefined } } : {})
      },
      orderBy: { startsAt: 'asc' }
    });
  }),
  create: protectedProcedure.input(EventCreateInput).mutation(async ({ ctx, input }) => {
    await ctx.authz.require('create','Event',{ orgId: input.orgId, teamId: input.teamId });
    if (new Date(input.endsAt) <= new Date(input.startsAt)) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'endsAt must be after startsAt' });
    }
    return ctx.db.event.create({ data: {
      orgId: input.orgId, teamId: input.teamId ?? null,
      title: input.title, description: input.description, location: input.location,
      startsAt: new Date(input.startsAt), endsAt: new Date(input.endsAt),
      capacity: input.capacity ?? null, createdById: ctx.user.id
    }});
  }),
  update: protectedProcedure.input(EventUpdateInput).mutation(async ({ ctx, input }) => {
    await ctx.authz.require('update','Event',{ orgId: input.orgId, teamId: input.teamId });
    return ctx.db.event.update({ where: { id: input.eventId }, data: {
      title: input.title, description: input.description, location: input.location,
      startsAt: new Date(input.startsAt), endsAt: new Date(input.endsAt),
      capacity: input.capacity ?? null
    }});
  })
});
