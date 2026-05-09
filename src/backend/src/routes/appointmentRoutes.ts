import { Router } from "express";
import { authMiddleware } from "../midllewares/authMiddleware";
import {
  createAppointmentController,
  getAppointmentsController
} from "../controllers/appointmentController";


const router = Router();

router.post("/", createAppointmentController);
router.get("/", authMiddleware, getAppointmentsController);

export default router;