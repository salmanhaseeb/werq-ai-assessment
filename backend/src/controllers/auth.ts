import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import { AuthenticatedRequest } from "../types/auth-request";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message
      });
    } else {
      res.status(500).json("An unexpected error occurred");
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await AuthService.login(req.body.email, req.body.password);
    res.json(token);
  } catch (error) {
    if (error instanceof Error) {
        res.status(401).json({
          error: error.message
        });
      } else {
        res.status(500).json("An unexpected error occurred");
      }
  }
};

export const refreshTokens = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const token = await AuthService.refreshAccessToken(req.user);
    res.json(token);
  } catch (error) {
    res.status(500);
    throw new Error("An unexpected error occurred");
  }
};
