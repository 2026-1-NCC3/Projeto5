import { Request, Response } from "express";
import {
  createAppointment,
  getAppointments
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
    const data = await getAppointments();
    return res.json(data);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}