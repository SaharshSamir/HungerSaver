import { z } from "zod";
import { router, protectedProcedure } from "@server/trpc/trpc";

export const volunteerRouter = router({
    //volunteer picks up an order
    newVolunteer: protectedProcedure
        .input(z.object({
            orderId: z.string(),
            volunteerId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { prisma } = ctx;
            const { orderId, volunteerId } = input;

            //fetch the order to be delivered
            const order = await prisma.order.findFirst({
                where: {
                    id: orderId
                }
            });

            //change order status form searching to found
            if (order && order.status === "SEARCHING") {
                const updatedOrder = await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        status: "FOUND",
                        volunteeringBy: {
                            connect: { id: volunteerId }
                        }
                    }
                });
                //add order to active Orders
                await prisma.activeOrder.create({
                    data: {
                        order: {
                            connect: { id: order?.id }
                        }
                    }
                });
                return updatedOrder ? updatedOrder : undefined;
            }

        }),
    activeOrders: protectedProcedure
        .input(z.object({
            volId: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const { prisma } = ctx;
            const { volId } = input;

            const activeOrders = await prisma.activeOrder.findMany({
                where: {
                    order: {
                        volunteerUserId: volId
                    }
                }
            });

            return activeOrders ? activeOrders : [];

        })


});
