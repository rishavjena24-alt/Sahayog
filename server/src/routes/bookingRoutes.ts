import { Router } from 'express';
import { getBookings, createBooking, updateBookingStatus, rateBooking } from '../controllers/bookingController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getBookings);
router.post('/', createBooking);
router.patch('/:id/status', updateBookingStatus);
router.patch('/:id/rate', rateBooking);

export default router;
