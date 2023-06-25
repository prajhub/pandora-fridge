import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const foodRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      expiresIn: z.number().positive(), // Assuming expiresIn should be a positive number
    }))
    .mutation(async ({ input: { name, expiresIn }, ctx }) => {
      const food = await ctx.prisma.food.create({
        data: { name, userId: ctx.session.user.id, expiresIn }, // Replace 0 with the desired initial value
      });
      

      return food;
    }),

    getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.food.findMany();
    }),
});
