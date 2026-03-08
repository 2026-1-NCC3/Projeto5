import { Request, Response } from "express";

import {
  createPlan,
  getPlansByPatient,
  addExerciseToPlan, 
  getFullPlanByPatient
} from "../services/planService";

export const createExercisePlan = async (req: Request, res: Response) => {

  const { patient_id, notes } = req.body;

  const plan = await createPlan(patient_id, notes);

  res.json(plan);

};

export const listPatientPlans = async (req: Request, res: Response) => {

  const patientId = Number(req.params.patientId);

  const plans = await getPlansByPatient(patientId);

  res.json(plans);

};

export const addExercise = async (req: Request, res: Response) => {

  const planId = Number(req.params.planId);

  const { exercise_id, frequency, instructions } = req.body;

  const item = await addExerciseToPlan(
    planId,
    exercise_id,
    frequency,
    instructions
  );

  res.json(item);

};

export const getFullPlan = async (req: Request, res: Response) => {

  const patientId = Number(req.params.patientId);

  const plan = await getFullPlanByPatient(patientId);

  res.json(plan);

};