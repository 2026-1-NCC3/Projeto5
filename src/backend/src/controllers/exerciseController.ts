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

// Alias para o catálogo de exercícios (mesmo dado, rota semântica diferente)
export async function getExerciseCatalogController(
  req: Request,
  res: Response
) {
  try {
    const data = await getExercises();
    // Retorna no formato { id, name, title, description, image_url }
    const catalog = (data ?? []).map((ex: any) => ({
      id: ex.id,
      name: ex.title,
      title: ex.title,
      description: ex.description,
      image_url: ex.image_url,
    }));
    return res.json(catalog);
  } catch (error: any) {
    return handleError(res, error);
  }
}