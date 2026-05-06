import { Router } from "express";
import {
  createExerciseController,
  getExercisesController
} from "../controllers/exerciseController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

// 👩‍⚕️ criar exercício (admin depois a gente trava)
router.post("/", authMiddleware, createExerciseController);

// 📋 listar exercícios
router.get("/", authMiddleware, getExercisesController);

export default router;