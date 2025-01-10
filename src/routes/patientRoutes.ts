import { Router } from 'express';
import { getPatients, createPatient, updatePatient, deletePatient, getSpecificPatient } from '../controllers/patientController';

const router = Router();

router.get('/', getPatients);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get('/:id', getSpecificPatient);


export default router;
