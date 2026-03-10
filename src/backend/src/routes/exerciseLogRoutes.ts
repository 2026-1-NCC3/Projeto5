import { Router } from "express";
import { addExerciseLog, getPatientLogs, getProgress } from "../controllers/exerciseLogController";

const router = Router();

router.post("/", addExerciseLog);

router.get("/patients/:patientId", getPatientLogs);

router.get("/patients/:patientId/progress", getProgress);

export default router;