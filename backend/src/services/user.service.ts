// server/src/services/user.service.ts
import { db } from "../lib/db.js";
import { users } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export class UserService {
  async getUserCreditBalance(userId: string): Promise<number> {
    // Optimization: explicitly select only the credits column metric
    const [result] = await db
      .select({
        credits: users.credits,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!result) {
      throw new Error("USER_NOT_FOUND");
    }

    return result.credits;
  }
}
