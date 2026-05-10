import { Router } from "express";
import {
  getPatients,
  getPatientById,
  createPatient,
  createMedicalRecord,
  updatePatient,
  deletePatient,
  getMeController,
  getMedicalRecordsController,
  getExercisePlanController,
  createExercisePlanController,
  updateExercisePlanController,
  deleteExercisePlanController,
} from "../controllers/patientController";
import { authMiddleware } from "../midllewares/authMiddleware";
import { adminMiddleware } from "../midllewares/adminMiddleware";

const router = Router();

router.get("/me", authMiddleware, getMeController);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);

// Medical records
router.post("/:id/medical-records", createMedicalRecord);
router.get("/:id/medical-records", getMedicalRecordsController);

// Exercise plan
router.get("/:id/exercise-plan", getExercisePlanController);
router.post("/:id/exercise-plan", createExercisePlanController);
router.put("/:id/exercise-plan/:planId", updateExercisePlanController);
router.delete("/:id/exercise-plan/:planId", deleteExercisePlanController);

router.put("/:id", adminMiddleware, updatePatient);
router.delete("/:id", deletePatient);

export default router;