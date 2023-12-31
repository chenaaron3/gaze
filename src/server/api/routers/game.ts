import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  addSubmission: publicProcedure
    .input(z.object({ time: z.number(), dimension: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.submission.create({
        data: {
          time: input.time,
          dimension: input.dimension,
        },
      });
    }),
});
