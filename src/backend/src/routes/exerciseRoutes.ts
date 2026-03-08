import { Router } from "express";
import { listExercises, addExercise } from "../controllers/exerciseController";

const router = Router();

router.get("/exercises", listExercises);

router.post("/exercises", addExercise);

export default router;