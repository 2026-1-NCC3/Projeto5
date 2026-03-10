import { Router } from "express";
import { login, register } from "../controllers/authController";

const router = Router();

router.post("/auth/login", login);
router.post("/auth/register", register);

export default router;