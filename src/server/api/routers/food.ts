import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const foodRouter = createTRPCRouter({
  // create: protectedProcedure
  //   .input(z.object({ name: z.string() }))
  //   .mutation(async ({ input: { name }, ctx }) => {
  //     const food = await ctx.prisma.food.create({
  //       data: { name, userId: ctx.session.user.id },
  //     });

  //     return food;
  //   }),
});
