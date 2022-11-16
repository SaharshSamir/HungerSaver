import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  getVolunteerReq: publicProcedure.query(({ ctx }) => {
    
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
});