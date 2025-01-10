import { Router } from 'express';
import { getPantryTasks, createPantryTask, updatePantryTask, deletePantryTask } from '../controllers/pantryTasksController';

const router = Router();

router.get('/', getPantryTasks);
router.post('/', createPantryTask);
router.put('/', updatePantryTask);
router.delete('/:id', deletePantryTask);

export default router;