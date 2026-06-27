// server/src/services/project.service.ts
import { db } from "../lib/db.js";
import { websiteProjects } from "../models/project.model.js";
import { users } from "../models/user.model.js";
import { eq, sql } from "drizzle-orm";
import { codeGenerationQueue } from "../lib/queue.js";

export class ProjectService {
  async createProject(userId: string, name: string, initialPrompt: string) {
    // Execute a multi-table database transaction block
    return await db.transaction(async (tx) => {
      // 1. Fetch user data records to verify credit eligibility
      const [user] = await tx
        .select({ credits: users.credits })
        .from(users)
        .where(eq(users.id, userId));

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      // 2. Enforce credit baseline check bounds
      if (user.credits < 5) {
        throw new Error("INSUFFICIENT_CREDITS");
      }

      // 3. Deduct 1 credit and increment creation metrics atomically
      await tx
        .update(users)
        .set({
          credits: sql`${users.credits} - 5`,
          totalCreations: sql`${users.totalCreations} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));

      // 4. Save the project sandbox canvas record
      const [newProject] = await tx
        .insert(websiteProjects)
        .values({
          name,
          initialPrompt,
          userId,
          currentCode: `\n<div class="p-8 text-center">Rendering base structural canvas context...</div>`,
        })
        .returning();

      await codeGenerationQueue.add(`generate:${newProject.id}`, {
        projectId: newProject.id,
        userId: userId,
        prompt: initialPrompt,
        name: name,
      });

      return newProject;
    });
  }
}
