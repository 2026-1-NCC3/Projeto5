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

  const { name, email, phone, cpf, birth_date, diagnostico, prioridade } = req.body;

  const patient = await createPatient(
    user.id,
    name,
    email,
    phone,
    cpf,
    birth_date,
    diagnostico,
    prioridade
  );

  res.json(patient);
}

export async function editPatient(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);

  const { name, email, phone, cpf, birth_date, diagnostico, prioridade } = req.body;

  const patient = await updatePatient(
    id,
    user.id,
    name,
    email,
    phone,
    cpf,
    birth_date,
    diagnostico,
    prioridade
  );

  res.json(patient);
}

export async function removePatient(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);

  await deletePatient(id, user.id);

  res.json({ message: "Paciente deletado" });
}