import {z} from "zod";
import { router, publicProcedure, protectedProcedure } from "@server/trpc/trpc";

export const userRouter = router({
  //create a new volunteer request
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
  //get all volunteer requests
  getVolunteerReqs: protectedProcedure.query(async({ctx}) => {
    const {prisma} = ctx;
    const volReqs = await prisma.volunteerRequest.findMany({include: {user: true}});
    return volReqs;
  }),
  //handleVolunteerReq
  handleVolunteerReq: protectedProcedure
  .input(z.object({
    reqId: z.string(),
    isApproved: z.boolean()
  }))
  .mutation(async ({ctx, input}) => {
    const {prisma} = ctx;

    const volReq = await prisma.volunteerRequest.delete({
      where: {
        id: input.reqId
      },
      include: {
        user: true
      }
    })

    const reqUser = volReq.user;
    if(input.isApproved){
      reqUser.type = "VOLUNTEER";
    }
    await prisma.user.update({
      where: {
        id: reqUser.id
      },
      data: {
        ...reqUser,
      }
    })

    return "DONE";

  })
});