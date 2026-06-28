// server/src/controllers/project.controller.ts
import { Request, Response } from "express";
import { ProjectService } from "../services/project.service.js";
import { createProjectSchema } from "../validations/project.validation.js";

const projectService = new ProjectService();

export const createProjectController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const parsedPayload = await createProjectSchema.parseAsync({
      body: req.body,
    });
    const { name, initialPrompt } = parsedPayload.body;
    const authenticatedUserId = req.userId!;

    const project = await projectService.createProject(
      authenticatedUserId,
      name,
      initialPrompt,
    );

    // FIX: Switched to 202 Accepted to signal asynchronous background execution
    res.status(202).json({
      success: true,
      message:
        "Request accepted and buffered inside Redis queue. Generation loop processing.",
      project, // Returns the base template tracking container to let frontend hook up WebSockets
    });
  } catch (error: any) {
    console.error("❌ Controller Error:", error);

    // Safely check if it's a Zod validation error before using .map()
    if (
      error &&
      typeof error === "object" &&
      "errors" in error &&
      Array.isArray(error.errors)
    ) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors.map((err: any) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Fallback for standard or database errors
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "An unexpected server error occurred.",
    });
  }
};

export const getAllUserProjectsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const authenticatedUserId = req.userId!;

    if (!authenticatedUserId) {
      res.status(401).json({
        success: false,
        message: "Authentication tracking token context is missing or expired.",
      });
      return;
    }

    const projectCollection =
      await projectService.getUserProjectsService(authenticatedUserId);

    res.status(200).json({
      success: true,
      message: "User workspace directory fetched successfully.",
      projects: projectCollection,
    });
  } catch (error: any) {
    console.error("❌ Error in getAllUserProjectsController:", error.message);
    res.status(500).json({
      success: false,
      message:
        "Failed to compile the requested project matrix from the cloud cluster.",
    });
  }
};

export const getProjectByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const authenticatedUserId = req.userId!;
    const projectId = req.params.projectId as string;

    if (!authenticatedUserId) {
      res.status(401).json({ success: false, message: "Unauthorized." });
      return;
    }

    const project = await projectService.getProjectById(
      authenticatedUserId,
      projectId,
    );

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found or unauthorized access.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error: any) {
    console.error("❌ Error in getProjectByIdController:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching project details.",
    });
  }
};
