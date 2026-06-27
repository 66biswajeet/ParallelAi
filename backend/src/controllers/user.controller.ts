// server/src/controllers/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

export const getUserCreditsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const authenticatedUserId = req.userId!;

    const currentCreditBalance =
      await userService.getUserCreditBalance(authenticatedUserId);

    res.status(200).json({
      success: true,
      credits: currentCreditBalance,
    });
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      res
        .status(404)
        .json({ success: false, message: "Profile context not discovered." });
      return;
    }

    console.error("User Metrics Pipeline Exception:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal metrics generation failure.",
    });
  }
};
