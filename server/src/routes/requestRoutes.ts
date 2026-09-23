import { Router } from 'express';
import { getRequests, updateRequestStatus } from '../controllers/requestController';

const router = Router();

router.get('/', getRequests);
router.patch('/:id/status', updateRequestStatus);

export default router;
