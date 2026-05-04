"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activationController_1 = require("../controllers/activationController");
const router = (0, express_1.Router)();
router.post("/auth/verificar-paciente", activationController_1.verificarPaciente);
router.post("/auth/ativar-conta", activationController_1.ativarConta);
exports.default = router;
