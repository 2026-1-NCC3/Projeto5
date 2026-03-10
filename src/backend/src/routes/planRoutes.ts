import { Router } from "express";
import {
  createExercisePlan,
  listPatientPlans,
  addExercise,
  getPatientFullPlan 
} from "../controllers/planController";

const router = Router();

router.post("/plans", createExercisePlan);

router.get("/plans/patients/:patientId", listPatientPlans);

router.post("/plans/:planId/exercises", addExercise);

router.get("/patients/:patientId/full-plan", getPatientFullPlan);

export default router;