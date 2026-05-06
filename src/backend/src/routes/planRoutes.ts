import { Router } from "express";
import { getMyPlansController } from "../controllers/planController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

router.get("/my", authMiddleware, getMyPlansController);

export default router;