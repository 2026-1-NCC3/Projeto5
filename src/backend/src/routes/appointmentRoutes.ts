import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  getMyAppointments,
  patchAppointment,
} from '../controllers/appointmentController';
import { authMiddleware } from '../midllewares/authMiddleware';

const router = Router();

router.get('/my', authMiddleware, getMyAppointments);
router.get('/', getAppointments);
router.post('/', createAppointment);
router.patch('/:id', patchAppointment);

export default router;