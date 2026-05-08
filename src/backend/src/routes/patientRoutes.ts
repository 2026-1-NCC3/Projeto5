import { Router } from "express";
import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from "../controllers/patientController";
import { authMiddleware } from "../midllewares/authMiddleware";
import { adminMiddleware } from "../midllewares/adminMiddleware";

const router = Router();

router.get("/", getPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.put("/:id", adminMiddleware, updatePatient);
router.delete("/:id", deletePatient);

export default router;