"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exerciseLogController_1 = require("../controllers/exerciseLogController");
const router = (0, express_1.Router)();
router.post("/", exerciseLogController_1.addExerciseLog);
router.get("/patients/:patientId", exerciseLogController_1.getPatientLogs);
router.get("/patients/:patientId/progress", exerciseLogController_1.getProgress);
exports.default = router;
