import { Response } from "express";

export function handleError(res: Response, error: any) {
  console.error(error);
  return res.status(400).json({
    error: error.message || "Erro interno"
  });
}