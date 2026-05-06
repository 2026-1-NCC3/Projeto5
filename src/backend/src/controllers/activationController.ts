import { Request, Response } from "express";
import { activateAccount } from "../services/activationService";
import { handleError } from "./baseController";

export async function activateAccountController(
  req: Request,
  res: Response
) {
  try {
    const result = await activateAccount(req.body);
    return res.json(result);
  } catch (error: any) {
    return handleError(res, error);
  }
}