import { Router } from "express";
import {
  createCheckinController,
  getMyCheckinsController,
  jaFezCheckinHojeController,
} from "../controllers/checkinController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

router.get("/hoje", authMiddleware, jaFezCheckinHojeController);
router.get("/", authMiddleware, getMyCheckinsController);
router.post("/", authMiddleware, createCheckinController);

export default router;