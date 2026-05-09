import { Router } from "express";
import { getPatients, getPatientById, createPatient, createMedicalRecord, updatePatient, deletePatient, getMeController } from "../controllers/patientController";
import { authMiddleware } from "../midllewares/authMiddleware";
import { adminMiddleware } from "../midllewares/adminMiddleware";


const router = Router();

router.get("/", getPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.post("/:id/medical-records", createMedicalRecord);
router.put("/:id", adminMiddleware, updatePatient);
router.delete("/:id", deletePatient);
router.get("/me", authMiddleware, getMeController);

export default router;