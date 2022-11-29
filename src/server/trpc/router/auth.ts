import { router, publicProcedure, protectedProcedure } from "@server/trpc/trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    console.log("heythere");
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  getUser: protectedProcedure.query(async ({ctx}) => {
    const sessionUser = ctx.session.user; 

    const user = await ctx.prisma.user.findFirst({where: {email: sessionUser.email}});
    return user;
  }),
  getUserWithOrders: protectedProcedure.query(async ({ctx}) => {
    const {prisma } = ctx;
    const sessionUser = ctx.session.user; 
  
    const userWithOrders = await prisma.user.findFirst({
      where: {
        email: sessionUser.email
      },
      include: {
        placedOrders: true
      }
    })
    
    if(userWithOrders) return userWithOrders;  
    else return undefined;
  })
});
