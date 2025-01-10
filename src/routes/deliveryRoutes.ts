import { Router } from 'express';
import { getDeliveries, createDelivery, updateDelivery, deleteDelivery } from '../controllers/deliveryController';

const router = Router();

router.get('/', getDeliveries);
router.post('/', createDelivery);
router.put('/:id', updateDelivery);
router.delete('/:id', deleteDelivery);

export default router;
