import { Router } from 'express';
import { getDietCharts, createDietChart, updateDietChart, deleteDietChart , getAllDietCharts} from '../controllers/dietChartController';

const router = Router();
router.get('/', getAllDietCharts);
router.get('/:id', getDietCharts);
router.post('/:id', createDietChart);
router.put('/:id', updateDietChart);
router.delete('/:id', deleteDietChart);

export default router;
