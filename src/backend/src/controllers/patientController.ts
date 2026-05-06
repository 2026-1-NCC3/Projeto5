import { Request, Response } from "express";
import { getAllPatients, createPatient, updatePatient, deletePatient, getMyPatient } from "../services/patientService";
import { handleError } from "./baseController";

export async function getPatients(req: Request, res: Response) {
  try {
    const data = await getAllPatients();
    return res.json(data);
  } catch (error: any) {
    return handleError(res, error);
  }
}

export async function addPatient(req: Request, res: Response) {
  try {
    const data = await createPatient(req.body);
    return res.status(201).json(data);
  } catch (error: any) {
    return handleError(res, error);
  }
}

export async function editPatient(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const data = await updatePatient(id, req.body);
    return res.json(data);
  } catch (error: any) {
    return handleError(res, error);
  }
}

export async function removePatient(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    await deletePatient(id);
    return res.status(204).send();
  } catch (error: any) {
    return handleError(res, error);
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const user = (req as any).user;
  if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const data = await getMyPatient(user.id);

    return res.json(data);
  } catch (error: any) {
    return handleError(res, error);
  }
}