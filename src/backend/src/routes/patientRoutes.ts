import { Router } from "express";
import { authenticateToken } from "../midllewares/authMiddleware";

import {
  listPatients,
  getPatient,
  addPatient,
  editPatient,
  removePatient
} from "../controllers/patientController";

const router = Router();

router.get("/patients", listPatients); // lista os pacientes
router.get("/patients/:id", getPatient); // detalhes de um paciente específico

router.post("/patients", addPatient); // adiciona um novo paciente

router.put("/patients/:id", editPatient); // edita as informações de um paciente existente

router.delete("/patients/:id", removePatient); // remove um paciente do sistema

export default router;