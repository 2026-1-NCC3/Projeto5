import { Router } from "express";
import { fazerCheckin, historicoCheckins } from "../controllers/checkinController";
import { authenticateToken } from "../midllewares/authMiddleware";

const router = Router();

router.post("/checkin", authenticateToken, fazerCheckin);
router.get("/checkin/historico", authenticateToken, historicoCheckins);

export default router;