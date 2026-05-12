import { Router } from "express";
import {
  createCheckinController,
  getMyCheckinsController, getPatientCheckinsController
} from "../controllers/checkinController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createCheckinController);
router.get("/", authMiddleware, getMyCheckinsController);
router.get("/patient/:patientId", authMiddleware, getPatientCheckinsController);

export default router;