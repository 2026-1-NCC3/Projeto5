import { Router } from "express";
import { activateAccountController } from "../controllers/activationController";

const router = Router();

router.post("/activate", activateAccountController);

export default router;