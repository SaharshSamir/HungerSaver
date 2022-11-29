import { router } from "@server/trpc/trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { orderRouter } from "./order";
import { userRouter } from "./user";
import { volunteerRouter } from "./volunteer";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  order: orderRouter,
  volunteer: volunteerRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
