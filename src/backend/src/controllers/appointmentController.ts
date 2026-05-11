import { Request, Response } from 'express';
import * as service from '../services/appointmentService';

export async function createAppointment(req: Request, res: Response) {
  try {
    const data = await service.createAppointment(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMyAppointments(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const data = await service.getMyAppointments(userId);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAppointments(req: Request, res: Response) {
  try {
    const data = await service.getAppointments();
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