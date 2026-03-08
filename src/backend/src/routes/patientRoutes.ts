import { Router } from "express";

import {
  listPatients,
  getPatient,
  addPatient,
  editPatient,
  removePatient
} from "../controllers/patientController";

const router = Router();

router.get("/patients", listPatients);
router.get("/patients/:id", getPatient);

router.post("/patients", addPatient);

router.put("/patients/:id", editPatient);

router.delete("/patients/:id", removePatient);

export default router;