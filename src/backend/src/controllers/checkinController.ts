import { Request, Response } from "express";
import {
  createCheckin,
  cancelCheckin,
  getMyCheckins,
  getCheckinsByPatientId
} from "../services/checkinService";
import { handleError } from "./baseController";

export async function createCheckinController(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const result = await createCheckin(user.id, req.body);
    return res.json(result);
  } catch (error: any) {
    return handleError(res, error);
  }
}

export async function cancelCheckinController(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const checkinId = req.params.id as string;;
    const result = await cancelCheckin(user.id, checkinId);
    return res.json(result);
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    return handleError(res, error);
  }
}

export async function getMyCheckinsController(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const data = await getMyCheckins(user.id);
    return res.json(data);
  } catch (error: any) {
    return handleError(res, error);
  }
}

export async function getCheckinsByPatientController(req: Request, res: Response) {
  try {
    const patientId = req.params.patientId as string;
    const data = await getCheckinsByPatientId(patientId);
    return res.json(data);
  } catch (error: any) {
    return handleError(res, error);
  }
}