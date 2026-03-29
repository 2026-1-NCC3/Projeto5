import { Router } from "express";
import { fazerCheckin, historicoCheckins } from "../controllers/checkinController";
import { authenticateToken } from "../midllewares/authMiddleware";
 
const router = Router();
 
// POST /api/checkin
router.post("/checkin", authenticateToken, fazerCheckin);
 
// GET /api/checkin/historico?dias=7
router.get("/checkin/historico", authenticateToken, historicoCheckins);
 
export default router;