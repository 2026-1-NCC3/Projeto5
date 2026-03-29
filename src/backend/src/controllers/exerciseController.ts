import { Request, Response } from "express";
import { getExercises, createExercise } from "../services/exerciseService";
 
export const listExercises = async (req: Request, res: Response) => {
  const exercises = await getExercises();
  res.json(exercises);
};
 
export const addExercise = async (req: Request, res: Response) => {
  const { title, description, video_url, image_url, frequency } = req.body;
  const exercise = await createExercise(title, description, video_url, image_url, frequency);
  res.json(exercise);
};