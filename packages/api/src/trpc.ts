import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure: any = t.procedure.use(({ ctx, next }) => {
  // In a real app, you'd validate the user's session here
  // For now, we'll just pass through with the mock user
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
