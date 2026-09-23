import { Router } from 'express';
import { syncAllSheets, downloadSheet } from '../controllers/syncController';

const router = Router();

router.post('/sync', syncAllSheets);
router.get('/download/:sheetName', downloadSheet);

export default router;
