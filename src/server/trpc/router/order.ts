
import { date, string, z } from "zod";
import { router, publicProcedure, protectedProcedure } from "@server/trpc/trpc";
import { FoodType } from "@prisma/client";
const FoodTypeArray = Object.keys(FoodType).filter((v) => isNaN(Number(v)));
export const orderRouter = router({
  //optimize db calls. 3 db calls are happening. not good
  placeOrder: protectedProcedure
    .input(z.object({
      address: z.string(),
      donationId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;

      const placedByUser = await prisma.user.findFirst({
        where: {
          email: session.user.email
        }
      });

      const donation = await prisma.donation.findFirst({
        where: {
          id: input.donationId
        }
      })

      try {
        const newOrder = await prisma.order.create({
          data: {
            placedAt: new Date(),
            deliveryLocation: input.address,
            status: "SEARCHING",
            donation: {
              connect: { id: donation?.id }
            },
            placedBy: {
              connect: { id: placedByUser?.id }
            }
          }
        })
        if (newOrder) {
          return newOrder;
        }
      } catch (error) {
        console.log(error); 
      }

      return "NOT_OK";
    })

});
