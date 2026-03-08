import { Request, Response } from "express"; // ele vai receber o http 
import { getExercises, createExercise } from "../services/exerciseService";

export const listExercises = async (req: Request, res: Response) => {

  const exercises = await getExercises();

  res.json(exercises);

};

export const addExercise = async (req: Request, res: Response) => {

  const { title, description, video_url } = req.body;

  const exercise = await createExercise(
    title,
    description,
    video_url
  );

  res.json(exercise);

};