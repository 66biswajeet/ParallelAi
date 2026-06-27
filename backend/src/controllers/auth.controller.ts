import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../lib/db.js";
import { users } from "../models/user.model.js";
import { eq } from "drizzle-orm";
import { generateTokenAndSetCookie } from "../utils/token.util.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        name: name || "Unknown Name",
        password: hashedPassword,
        credits: 20, // Provisioning 20 free onboarding tokens
      })
      .returning();

    generateTokenAndSetCookie(res, newUser.id);

    res.status(200).json({
      success: true,
      message: "Identity verified and profile established.",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        credits: newUser.credits,
      },
    });
  } catch (error: any) {
    console.error("Registration operational fault:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error during signup.",
    });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
      return;
    }

    // 1. Lookup targeted identity records
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid email or password parameters.",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
      return;
    }

    // Note: In your next layer, you will cross-compare incoming passwords against hashed variants
    generateTokenAndSetCookie(res, user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits,
      },
    });
  } catch (error: any) {
    console.error("Login verification fault:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error during signin.",
    });
  }
};

export const signOut = async (req: Request, res: Response): Promise<void> => {
  // Clear the tracking cookie on session logout
  res.cookie("auth_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  res
    .status(200)
    .json({ success: true, message: "Session closed successfully." });
};
