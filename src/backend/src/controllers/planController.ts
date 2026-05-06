import { Request, Response } from "express";
import { getMyPlans } from "../services/planService";
import { handleError } from "./baseController";

export async function getMyPlansController(
  req: Request,
  res: Response
) {
  try {
    const user = (req as any).user;

    const data = await getMyPlans(user.id);

    return res.json(data);
  } catch (error: any) {
    return handleError(res, error);
  }
}