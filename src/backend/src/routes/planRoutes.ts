import { Router } from "express";
import {
  createExercisePlan,
  listPatientPlans,
  addExercise,
  getFullPlan
} from "../controllers/planController";

const router = Router();

router.post("/plans", createExercisePlan);

router.get("/plans/patient/:patientId", listPatientPlans);

router.post("/plans/:planId/exercises", addExercise);

router.get("/patients/:patientId/plan", getFullPlan);

export default router;