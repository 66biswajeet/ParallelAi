import { Router } from "express";

import { getUserCreditsController } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/credits", protectRoute, getUserCreditsController);

export default userRouter;
