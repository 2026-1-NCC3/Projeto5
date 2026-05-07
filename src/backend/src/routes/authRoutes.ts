import { Router } from "express";
import { loginController, verifyPatientController } from "../controllers/authController";

const router = Router();

router.post("/login", loginController);
router.post("/verificar-paciente", verifyPatientController);

export default router;