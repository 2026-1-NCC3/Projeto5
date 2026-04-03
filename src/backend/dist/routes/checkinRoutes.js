"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkinController_1 = require("../controllers/checkinController");
const authMiddleware_1 = require("../midllewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/checkin", authMiddleware_1.authenticateToken, checkinController_1.fazerCheckin);
router.get("/checkin/historico", authMiddleware_1.authenticateToken, checkinController_1.historicoCheckins);
exports.default = router;
