import { Router } from "express";
import {
  createCheckinController,
  cancelCheckinController,
  getMyCheckinsController,
  getCheckinsByPatientController
} from "../controllers/checkinController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createCheckinController);
router.get("/", authMiddleware, getMyCheckinsController);
router.delete("/:id", authMiddleware, cancelCheckinController);
router.get("/patient/:patientId", authMiddleware, getCheckinsByPatientController);

export default router;