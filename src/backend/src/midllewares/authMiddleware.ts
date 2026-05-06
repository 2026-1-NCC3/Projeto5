import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabaseClient";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Token inválido" });
  }

(req as any).user = {
  id: data.user.id,
  email: data.user.email
};

  next();
}