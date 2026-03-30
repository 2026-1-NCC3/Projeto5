"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exerciseController_1 = require("../controllers/exerciseController");
const router = (0, express_1.Router)();
router.get("/exercises", exerciseController_1.listExercises);
router.post("/exercises", exerciseController_1.addExercise);
exports.default = router;
