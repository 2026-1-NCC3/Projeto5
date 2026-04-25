import { Router } from "express";
import { verificarPaciente, ativarConta } from "../controllers/activationController";

const router = Router();

router.post("/auth/verificar-paciente", verificarPaciente);
router.post("/auth/ativar-conta", ativarConta);

export default router;