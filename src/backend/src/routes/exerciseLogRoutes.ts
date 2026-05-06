import { Router } from "express";
import { logExerciseController } from "../controllers/exerciseLogController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, logExerciseController);

export default router;