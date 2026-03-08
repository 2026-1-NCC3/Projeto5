import { Request, Response } from "express";
import { loginUser } from "../services/authService";

export const login = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.json(result);

  } catch (error: any) {

    res.status(401).json({
      message: error.message
    });

  }

};