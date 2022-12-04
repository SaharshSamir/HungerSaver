import { date, string, z } from "zod";
import { router, publicProcedure, protectedProcedure } from "@server/trpc/trpc";
import { OrderStatus } from "@prisma/client";

export const orderRouter = router({
  //optimize db calls. 3 db calls are happening. not good
  placeOrder: protectedProcedure
    .input(z.object({
      address: z.string(),
      donationId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { prisma, session } = ctx;
        console.log("------input------", input);
        const placedByUser = await prisma.user.findFirst({
          where: {
            email: session.user.email
          }
        });

        console.log(placedByUser);

        const donation = await prisma.donation.findFirst({
          where: {
            id: input.donationId
          }
        })
        console.log("-----DONATION--------", donation?.id);
        console.log("-----PLACED BY USER--------", placedByUser?.name);
        const newOrder = await prisma.order.create({
          data: {
            placedAt: new Date(),
            deliveryLocation: input.address,
            status: "SEARCHING",
            placedBy: {
              connect: { id: placedByUser?.id }
            },
            donation: {
              connect: { id: donation?.id }
            }
          }
        })
        console.log("-----NEW ORDER-----", newOrder);
        if (newOrder) {
          return newOrder;
        }
      } catch (error) {
        console.log(error);
      }

      return "NOT_OK";
    }),

  getOrder: protectedProcedure
    .input(z.object({
      orderId: z.string()
    }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const order = await prisma.order.findFirst({
        where: {
          id: input.orderId
        },
        include: {
          donation: true
        }
      })

      if (order) return order;
      return undefined;
    }),
  getOrders: protectedProcedure
    .query(async ({ ctx }) => {
      const { prisma } = ctx;
      const orders = prisma.order.findMany({
        include: {
          donation: true
        }
      });

      if (orders) return orders;
      return [];
    }),
  updateOrderStep: protectedProcedure
    .input(z.object({
      orderId: z.string(),
      step: z.nativeEnum(OrderStatus)
    }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { orderId, step } = input;
      
      const order = await prisma.order.update({
        where: {
          id: orderId
        },
        data: {
          status: step
        }
      });

      return order || undefined;
    }),
    getOrderFromDonation: protectedProcedure
    .input(z.object({
      donationId: z.string()
    }))
    .query(async ({ctx, input}) => {
      const {prisma} = ctx;
      const {donationId} = input;

      const order = await prisma.order.findFirst({
        where: {
          donationId: donationId
        }
      });

      return order || undefined;
    })

})

