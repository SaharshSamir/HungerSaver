import {z} from "zod";
import { router, publicProcedure, protectedProcedure } from "@server/trpc/trpc";

export const userRouter = router({
  newVolunteerReq: publicProcedure
  .input(z.object({url: z.string().nullish()}))
  .mutation(async ({ input, ctx }) => {

    const { prisma, session} = ctx;

    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email
      }
    })
   
    const newVolunteerReq = await prisma.volunteerRequest.create({
      data: {
        documennt: input.url,
        user: {
          connect: {id: user?.id}
        } 
      }
    })
    if(newVolunteerReq){
      return "OK"
    }
    return "NOT_OK"
  }),
  getVolunteerReqs: protectedProcedure.query(async({ctx}) => {
    const {prisma} = ctx;
    const volReqs = await prisma.volunteerRequest.findMany({include: {user: true}});
    return volReqs;
  }),
});