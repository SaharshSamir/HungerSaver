import { router } from "@server/trpc/trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { orderRouter } from "./order";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  order: orderRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
