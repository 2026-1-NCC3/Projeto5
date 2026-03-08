import { Router } from "express";
import { addExerciseLog, getPatientLogs } from "../controllers/exerciseLogController";

const router = Router();

router.post("/", addExerciseLog);

router.get("/patient/:patientId", getPatientLogs);

export default router;