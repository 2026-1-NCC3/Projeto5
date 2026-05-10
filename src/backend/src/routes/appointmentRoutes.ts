import { Router } from 'express';

import {
  createAppointment,
  getAppointments
} from '../controllers/appointmentController';

const router = Router();

router.get('/', getAppointments);

router.post('/', createAppointment);

export default router;