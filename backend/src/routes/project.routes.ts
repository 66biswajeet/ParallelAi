import { Router } from "express";
import { createProjectController } from "../controllers/project.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const projectRouter = Router();

projectRouter.post("/create-project", protectRoute, createProjectController);

export default projectRouter;
