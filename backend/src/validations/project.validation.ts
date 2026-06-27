// server/src/validations/project.validation.ts
import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Project name must be at least 3 characters long.")
      .max(100, "Project name cannot exceed 50 characters."),
    initialPrompt: z
      .string()
      .min(10, "Your descriptive prompt must be at least 10 characters long."),
  }),
});
