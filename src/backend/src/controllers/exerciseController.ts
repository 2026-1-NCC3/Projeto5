import { Request, Response } from "express";
import {
  createExercise,
  getExercises
} from "../services/exerciseService";
import { handleError } from "./baseController";

export async function createExerciseController(
  req: Request,
  res: Response
) {
  try {
    const result = await createExercise(req.body);
    return res.json(result);
  } catch (error: any) {
    return handleError(res, error);
  }
}

export async function getExercisesController(
  req: Request,
  res: Response
) {
  try {
    const data = await getExercises();
    return res.json(data);
  } catch (error: any) {
    return handleError(res, error);
  }
}