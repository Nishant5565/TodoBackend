import { Router } from 'express';
import { getDeliveriePersonal, createDeliveryPersonal, updateDeliveryPersonal, deleteDeliveryPersonal } from '../controllers/deliveryController';

const router = Router();

router.get('/', getDeliveriePersonal);
router.post('/', createDeliveryPersonal);
router.put('/:id', updateDeliveryPersonal);
router.delete('/:id', deleteDeliveryPersonal);

export default router;
