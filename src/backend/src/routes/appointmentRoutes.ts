import { Router } from "express";
import {
  createAppointmentController,
  getAppointmentsController
} from "../controllers/appointmentController";

const router = Router();

router.post("/", createAppointmentController);
router.get("/", getAppointmentsController);

export default router;