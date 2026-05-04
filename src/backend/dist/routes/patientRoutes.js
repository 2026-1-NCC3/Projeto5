"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../midllewares/authMiddleware");
const patientController_1 = require("../controllers/patientController");
const router = (0, express_1.Router)();
router.get("/patients", authMiddleware_1.authenticateToken, patientController_1.listPatients); // lista os pacientes
router.get("/patients/:id", authMiddleware_1.authenticateToken, patientController_1.getPatient); // detalhes de um paciente específico
router.post("/patients", authMiddleware_1.authenticateToken, patientController_1.addPatient); // adiciona um novo paciente
router.put("/patients/:id", authMiddleware_1.authenticateToken, patientController_1.editPatient); // edita as informações de um paciente existente
router.delete("/patients/:id", authMiddleware_1.authenticateToken, patientController_1.removePatient); // remove um paciente do sistema
exports.default = router;
