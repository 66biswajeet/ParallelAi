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
    // Catch Zod parsing issues and return a clean 400 Bad Request array response
    if (error.name === "ZodError") {
      res.status(400).json({
        success: false,
        errors: error.errors.map((err: any) => err.message),
      });
      return;
    }

    if (error.message === "INSUFFICIENT_CREDITS") {
      res.status(403).json({
        success: false,
        message:
          "Operation Blocked: Insufficient credit balance allocations remaining on this profile.",
      });
      return;
    }

    if (error.message === "USER_NOT_FOUND") {
      res.status(404).json({
        success: false,
        message: "Authorized identity context missing.",
      });
      return;
    }

    console.error("Project Core Compilation Fault Event:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal transactional processing compilation error.",
    });
  }
};
