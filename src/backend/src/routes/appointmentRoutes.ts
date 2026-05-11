import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  patchAppointment
} from '../controllers/appointmentController';
import { authMiddleware } from '../midllewares/authMiddleware';

const router = Router();

// CORRIGIDO: authMiddleware adicionado no GET para identificar o paciente logado
router.get('/', authMiddleware, getAppointments);
router.patch('/:id', patchAppointment);
router.post('/', createAppointment);

export default router;