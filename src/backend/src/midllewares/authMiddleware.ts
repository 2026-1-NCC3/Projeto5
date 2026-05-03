import { Request, Response, NextFunction } from "express";
import { supabaseClient} from "../config/supabaseClient"; 

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabaseClient.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ message: "Token inválido" });
  }


  (req as any).user = data.user;

  next();
};