import { Request, Response } from "express";
import * as service from "../services/patientService";
import { handleError } from "./baseController";
import { getPatientId } from "../utils/getPatientId";
import {
  getExercisePlanByPatient,
  createExercisePlan,
  updateExercisePlan,
  deleteExercisePlan,
} from "../services/ExercisePlanService";

export async function getPatients(req: Request, res: Response) {
  try {
    const data = await service.getAllPatients();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
  export async function getPatientById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const data = await service.getPatientById(id);

      res.json(data);

    } catch (err: any) {

      res.status(500).json({
        error: err.message
      });

    }
  }

export async function createPatient(req: Request, res: Response) {
  try {
    console.log("Corpo da requisição:", req.body);
    const data = await service.createPatient(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function createMedicalRecord(
  req: Request,
  res: Response
) {
  try {

    const patientId = req.params.id as string;

    const data = await service.createMedicalRecord(
      patientId,
      req.body
    );

    res.status(201).json(data);

  } catch (err: any) {

    res.status(500).json({
      error: err.message
    });
  }
}

export async function updatePatient(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const data = await service.updatePatient(id, req.body);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deletePatient(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    await service.deletePatient(id);
    res.json({ message: "Paciente deletado" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMeController(req: Request, res: Response) {
  try {
    const authUserId = (req as any).user.id;
    const patientId = await getPatientId(authUserId);
    if (!patientId) return res.status(404).json({ error: "Paciente não encontrado" });

    const data = await service.getPatientById(patientId);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMedicalRecordsController(req: Request, res: Response) {
  try {
    const patientId = req.params.id as string;
    const data = await service.getMedicalRecordsByPatient(patientId);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getExercisePlanController(req: Request, res: Response) {
  try {
    const patientId = req.params.id as string;
    const data = await getExercisePlanByPatient(patientId);
    res.json(data ?? null);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function createExercisePlanController(req: Request, res: Response) {
  try {
    const patientId = req.params.id as string;
    const data = await createExercisePlan(patientId, req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateExercisePlanController(req: Request, res: Response) {
  try {
    const patientId = req.params.id as string;
    const planId = req.params.planId as string;
    const data = await updateExercisePlan(planId, patientId, req.body);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteExercisePlanController(req: Request, res: Response) {
  try {
    const planId = req.params.planId as string;
    const data = await deleteExercisePlan(planId);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}