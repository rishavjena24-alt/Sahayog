import { Router } from 'express';
import { getProviders, getProviderById, verifyProvider } from '../controllers/providerController';
import { authenticateToken, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProviders);
router.get('/:id', getProviderById);
router.patch('/:id/verify', authenticateToken, requireRole(['admin']), verifyProvider);

export default router;
