"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientController_1 = require("../controllers/patientController");
const router = (0, express_1.Router)();
router.get("/patients", patientController_1.listPatients); // lista os pacientes
router.get("/patients/:id", patientController_1.getPatient); // detalhes de um paciente específico
router.post("/patients", patientController_1.addPatient); // adiciona um novo paciente
router.put("/patients/:id", patientController_1.editPatient); // edita as informações de um paciente existente
router.delete("/patients/:id", patientController_1.removePatient); // remove um paciente do sistema
exports.default = router;
