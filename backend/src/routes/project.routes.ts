import { Router } from "express";
import {
  createProjectController,
  getAllUserProjectsController,
  getProjectByIdController,
} from "../controllers/project.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const projectRouter = Router();

projectRouter.post("/create-project", protectRoute, createProjectController);
projectRouter.get("/get-projects", protectRoute, getAllUserProjectsController);
projectRouter.get("/:projectId", protectRoute, getProjectByIdController);

export default projectRouter;
