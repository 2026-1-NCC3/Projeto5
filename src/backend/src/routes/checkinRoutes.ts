import { Router } from "express";
import {
  createCheckinController,
  getMyCheckinsController
} from "../controllers/checkinController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createCheckinController);
router.get("/", authMiddleware, getMyCheckinsController);

export default router;