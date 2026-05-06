import { Router } from "express";
import { getPatients, createPatient, updatePatient, deletePatient } from "../controllers/patientController";
import { authMiddleware } from "../midllewares/authMiddleware";
import { adminMiddleware } from "../midllewares/adminMiddleware";

const router = Router();

router.get("/", getPatients);
router.post("/", createPatient);
router.put("/:id", adminMiddleware, updatePatient);
router.delete("/:id", adminMiddleware, deletePatient);

export default router;