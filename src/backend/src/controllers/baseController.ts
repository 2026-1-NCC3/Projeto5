import { Response } from "express";

export function handleError(res: Response, error: any) {
  console.error(error);
  const status = error.statusCode ?? 400;
  return res.status(status).json({
    error: error.message || "Erro interno"
  });
}