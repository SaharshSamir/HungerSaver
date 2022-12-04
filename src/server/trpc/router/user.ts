import { date, string, z } from "zod";
import { router, publicProcedure, protectedProcedure } from "@server/trpc/trpc";
import { FoodType } from "@prisma/client";
import { ignore } from "@cloudinary/url-gen/qualifiers/rotationMode";
const FoodTypeArray = Object.keys(FoodType).filter((v) => isNaN(Number(v)));
export const userRouter = router({
  //create a new volunteer request
  newVolunteerReq: publicProcedure
    .input(z.object({ url: z.string().nullish() }))
    .mutation(async ({ input, ctx }) => {

      const { prisma, session } = ctx;

      const user = await prisma.user.findFirst({
        where: {
          email: session?.user?.email
        }
      })

      const newVolunteerReq = await prisma.volunteerRequest.create({
        data: {
          documennt: input.url,
          user: {
            connect: { id: user?.id }
          }
        }
      })
      if (newVolunteerReq) {
        return "OK"
      }
      return "NOT_OK"
    }),
  //get all volunteer requests
  getVolunteerReqs: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const volReqs = await prisma.volunteerRequest.findMany({ include: { user: true } });
    return volReqs;
  }),
  //handleVolunteerReq
  handleVolunteerReq: protectedProcedure
    .input(z.object({
      reqId: z.string(),
      isApproved: z.boolean()
    }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const volReq = await prisma.volunteerRequest.delete({
        where: {
          id: input.reqId
        },
        include: {
          user: true
        }
      })

      const reqUser = volReq.user;
      if (input.isApproved) {
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

    }),
  //DONATIONS
  //create new donation
  newDonation: protectedProcedure
    .input(z.object({
      name: z.string(),
      expiry: z.date(),
      quantity: z.string(),
      address: z.string(),
      contact: z.string(),
      foodType: z.nativeEnum(FoodType),
    }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const user = await prisma.user.findFirst({
        where: {
          email: session.user.email
        }
      });

      const newDonation = await prisma.donation.create({
        data: {
          name: input.name,
          expiry: input.expiry,
          quantity: input.quantity,
          address: input.address,
          contact: input.contact,
          foodType: input.foodType,
          User: {
            connect: { id: user?.id }
          }
        },
      })

      if (newDonation) return "OK"
      return "NOT_OK";
    }),
  getDonations: publicProcedure
    .query(async ({ ctx }) => {
      const { prisma } = ctx;
      const donations = await prisma.donation.findMany();

      if (donations.length === 0) return [];
      return donations;
    }),
    newVerificationReq: protectedProcedure
    .input(z.object({
      url: z.string()
    }))
    .mutation(async ({ctx, input}) => {
      const{prisma, session} = ctx;
      const {url} = input; 

      const user = await prisma.user.findFirst({
        where: {
          email: session?.user?.email
        }
      })

      const newVerificationReq = await prisma.verificationRequest.create({
        data: {
          documennt: url,
          user: {
            connect: {id: user?.id}
          }
        }
      });

      if(newVerificationReq) return "OK"
      return "NOT_OK"
    }),
    getVerificationReqs: protectedProcedure
    .query(async ({ctx}) => {
      const {prisma} = ctx;
      const verficationReqs = await prisma.verificationRequest.findMany({include: {user: true}});
      return verficationReqs;
    }),
    handleVerificationReq: protectedProcedure
    .input(z.object({
      reqId: z.string(),
      isApproved: z.boolean()
    }))
    .mutation(async ({ctx, input}) => {
      const {prisma} = ctx;

      const verReq = await prisma.verificationRequest.delete({
        where: {
          id: input.reqId
        },
        include: {
          user: true
        }
      });

      const reqUser = verReq.user;
      if(input.isApproved){
        reqUser.type = "CLIENT"
      }
      await prisma.user.update({
        where: {
          id: reqUser.id
        },
        data: {
          ...reqUser
        }
      });

      return "DONE"
    })
});
