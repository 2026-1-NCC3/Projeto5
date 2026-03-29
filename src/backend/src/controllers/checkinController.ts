import { Request, Response } from "express";
import {
  getPatientIdByUserId,
  registrarCheckin,
  getHistoricoCheckins,
} from "../services/checkinService";
 
export const fazerCheckin = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const patientId = await getPatientIdByUserId(userId);
    const resultado = await registrarCheckin(patientId);
 
    const status = resultado.jaFez ? 200 : 201;
    return res.status(status).json(resultado);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
 
export const historicoCheckins = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const dias = parseInt(req.query.dias as string) || 7;
    const patientId = await getPatientIdByUserId(userId);
    const resultado = await getHistoricoCheckins(patientId, dias);
 
    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};