import { Router } from 'express';
import { getServices, getServiceById, getCategories, createService } from '../controllers/serviceController';
import { authenticateToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getServices);
router.get('/categories', getCategories);
router.get('/:id', getServiceById);
router.post('/', authenticateToken, requireRole(['admin']), createService);

export default router;
