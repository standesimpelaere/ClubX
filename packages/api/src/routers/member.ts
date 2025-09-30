import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const memberRouter: any = router({
  list: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { orgId } = input;
      
      await ctx.authz.require('read', 'Member', { orgId });
      
      return ctx.db.memberProfile.findMany({
        where: { orgId },
        select: {
          id: true,
          displayName: true,
          role: true,
          teamId: true,
          createdAt: true
        }
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const member = await ctx.db.memberProfile.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          displayName: true,
          role: true,
          teamId: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      });

      if (!member) {
        throw new Error('Member not found');
      }

      await ctx.authz.require('read', 'Member', { orgId: 'org-1' });
      
      return member;
    })
});
