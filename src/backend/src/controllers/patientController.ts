import { Request, Response } from "express";
import * as service from "../services/patientService";
import { handleError } from "./baseController";

export async function getPatients(req: Request, res: Response) {
  try {
    const data = await service.getAllPatients();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
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