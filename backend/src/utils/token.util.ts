// server/src/utils/token.util.ts
import jwt from "jsonwebtoken";
import { Response } from "express";

const ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "super_secret_access_key_2026";

export const generateTokenAndSetCookie = (
  res: Response,
  userId: string,
): string => {
  // 1. Generate a secure token containing the userId payload
  const token = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "12h" });

  // 2. Attach the token to an HTTP-Only cookie stream
  res.cookie("auth_session", token, {
    httpOnly: true, // Shields tokens from client-side XSS malicious scripts
    secure: process.env.NODE_ENV === "production", // Forces transmission exclusively over HTTPS in production
    sameSite: "lax", // Guards against CSRF attacks while maintaining standard navigation
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days lifespan in milliseconds
    path: "/",
  });

  return token;
};
