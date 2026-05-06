import { Request, Response } from "express";
import { logExercise } from "../services/exerciseLogService";
import { handleError } from "./baseController";

export async function logExerciseController(
  req: Request,
  res: Response
) {
  try {
    const user = (req as any).user;

    const result = await logExercise(user.id, req.body);

    return res.json(result);
  } catch (error: any) {
    return handleError(res, error);
  }
}