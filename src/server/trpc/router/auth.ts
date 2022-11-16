import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  getUser: protectedProcedure.query(async ({ctx}) => {
    const sessionUser = ctx.session.user; 

    const user = await prisma.user.findFirst({where: {email: sessionUser.email}});
    return user;
  })
});
