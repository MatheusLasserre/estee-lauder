import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const foodRouter = createTRPCRouter({
  getFoodTrucksPaginated: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).max(100).optional(),
        limit: z.number().min(1).max(100).optional(),
        search: z.string().optional(),
        foodItemsFilter: z.array(z.string()).optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        const page = input.page ?? 1
        const limit = input.limit ?? 10
        const search = input.search ?? ''
        const foodTrucks = await ctx.db.foodTruck.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            AND: {
              ...(search !== '' && {
                OR: [
                  { name: { contains: search } },
                  { LocationDescription: { contains: search } },
                  { Address: { contains: search } },
                  { block: { contains: search } },
                  { lot: { contains: search } },
                  { permit: { contains: search } },
                ],
              }),
              ...(input.foodItemsFilter && input.foodItemsFilter.length > 0
                ? {
                    foodItems: { some: { name: { in: input.foodItemsFilter } } },
                  }
                : {}),
            },
          },
          include: {
            foodItems: {
              select: {
                name: true,
              },
            },
          },
        })
        return {
          foodTrucks,
        }
      } catch (error) {
        console.error('Error:', error)
        throw new Error('Error getting food trucks')
      }
    }),

  getFoodItemsQuery: publicProcedure
    .input(z.object({ foodItem: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const items = await ctx.db.foodItem.findMany({
          where: {
            name: {
              contains: input.foodItem,
            },
          },
          take: 15,
        })
        return {
          foodItems: items,
        }
      } catch (error) {
        console.error('Error:', error)
        throw new Error('Error getting food items')
      }
    }),
})
