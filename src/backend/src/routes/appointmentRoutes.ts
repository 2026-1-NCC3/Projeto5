import { Router } from 'express';

import {
  createAppointment,
  getAppointments,
  patchAppointment
} from '../controllers/appointmentController';

const router = Router();

router.get('/', getAppointments);
router.patch('/:id', patchAppointment);

router.post('/', createAppointment);

export default router;