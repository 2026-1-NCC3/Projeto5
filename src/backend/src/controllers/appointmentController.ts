import { Request, Response } from "express";
import { getPatientId } from "../utils/getPatientId";
import {
  createAppointment,
  getAppointmentsByPatient
} from "../services/appointmentService";

export async function createAppointmentController(req: Request, res: Response) {
  try {
    const result = await createAppointment(req.body);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getAppointmentsController(req: Request, res: Response) {
  try {
    const authUserId = (req as any).user.id; // vem do authMiddleware
    const patientId = await getPatientId(authUserId);
    if (!patientId) return res.status(404).json({ error: "Paciente não encontrado" });

    const data = await getAppointmentsByPatient(patientId);
    return res.json(data);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}