import { Router } from 'express';
import { getStats, getAllUsers, getGroups, getReviews } from '../controllers/adminController';

const router = Router();

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/groups', getGroups);
router.get('/reviews', getReviews);

export default router;
