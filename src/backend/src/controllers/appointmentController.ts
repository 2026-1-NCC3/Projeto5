import { Request, Response } from 'express';
import * as service from '../services/appointmentService';
import { getPatientId } from '../utils/getPatientId';

export async function createAppointment(req: Request, res: Response) {
  try {
    const data = await service.createAppointment(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// CORRIGIDO: autentica via token, busca o patientId e filtra os appointments
export async function getAppointments(req: Request, res: Response) {
  try {
    const authUserId = (req as any).user.id;
    const patientId = await getPatientId(authUserId);

    if (!patientId) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    const data = await service.getAppointmentsByPatient(patientId);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function patchAppointment(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const data = await service.updateAppointment(id, req.body);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}