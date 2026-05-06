import { Router } from "express";
import { getPatients, addPatient, editPatient, removePatient, getMe } from "../controllers/patientController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

router.get("/", getPatients);
router.post("/", addPatient);
router.put("/:id", editPatient);
router.delete("/:id", removePatient);
router.get("/me", authMiddleware, getMe);

export default router;