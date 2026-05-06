import { Request, Response } from "express";
import { login } from "../services/authService";
import { handleError } from "./baseController";

export async function loginController(req: Request, res: Response) {
  try {
    const result = await login(req.body);
    return res.json(result);
  } catch (error: any) {
    return handleError(res, error);
  }
}