import { Request, Response } from "express";
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} from "../services/patientService";

export async function listPatients(req: Request, res: Response) {
  const user = (req as any).user;

  const patients = await getPatients(user.id);
  res.json(patients);
}

export async function getPatient(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);

  const patient = await getPatientById(id, user.id);
  res.json(patient);
}

export async function addPatient(req: Request, res: Response) {
  const user = (req as any).user;

  console.log("USER:", user);
  console.log("BODY:", req.body);

  const patient = await createPatient(user.id, req.body);

  res.json(patient);
}

export async function editPatient(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);

  const patient = await updatePatient(id, user.id, req.body);

  res.json(patient);
}

export async function removePatient(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);

  await deletePatient(id, user.id);

  res.json({ message: "Paciente deletado" });
}