import { Request, Response } from "express";
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} from "../services/patientService";

export async function listPatients(req: Request, res: Response) {
  const patients = await getPatients();
  res.json(patients);
}

export async function getPatient(req: Request, res: Response) {
  const id = Number(req.params.id);
  const patient = await getPatientById(id);

  res.json(patient);
}

export async function addPatient(req: Request, res: Response) {
  console.log("BODY:", req.body);
  const { name, email, phone, cpf, birth_date, diagnostico, prioridade } = req.body;

  const patient = await createPatient(name, email, phone, cpf, birth_date, diagnostico, prioridade);

  res.json(patient);
}

export async function editPatient(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, email, phone, cpf, birth_date, diagnostico, prioridade } = req.body;

  const patient = await updatePatient(id, name, email, phone, cpf, birth_date, diagnostico, prioridade);

  res.json(patient);
}

export async function removePatient(req: Request, res: Response) {
  const id = Number(req.params.id);

  await deletePatient(id);

  res.json({ message: "Paciente deletado" });
}