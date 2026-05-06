import { Request, Response, NextFunction } from "express";

const ADMIN_EMAILS = [
  "rafaelafm1009@gmail.com",
  "testepi@email.com"
];

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user?.email) {
    return res.status(401).json({ error: "Não autenticado" });
  }
   const isAdmin = ADMIN_EMAILS.includes(user.email);

  if (!isAdmin) {
    return res.status(403).json({ error: "Acesso negado (admin only)" });
  }

  next();
}