import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

export const getBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, customerId, providerId } = req.query;
    const bookings = await prisma.booking.findMany({
      where: {
        ...(status ? { status: String(status) } : {}),
        ...(customerId ? { customerId: String(customerId) } : {}),
        ...(providerId ? { providerId: Number(providerId) } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(bookings);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching bookings' });
  }
};

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      serviceId,
      providerId,
      customer,
      date,
      time,
      price,
      address,
      phone,
      notes,
      payment,
    } = req.body;

    const id = `SH-${Date.now().toString().slice(-4)}`;

    const booking = await prisma.booking.create({
      data: {
        id,
        customer: customer || req.user?.email || 'Valued Member',
        customerId: req.user?.id || null,
        serviceId: serviceId ? Number(serviceId) : null,
        providerId: providerId ? Number(providerId) : null,
        date: date || new Date().toISOString().split('T')[0],
        time: time || '10:00 AM',
        price: Number(price) || 499,
        status: 'confirmed',
        address: address || '',
        phone: phone || '',
        notes: notes || '',
        payment: payment || 'UPI',
      },
    });

    // Also update provider jobs counter if providerId present
    if (providerId) {
      await prisma.provider.update({
        where: { id: Number(providerId) },
        data: { jobs: { increment: 1 } },
      }).catch(() => {});
    }

    res.status(201).json(booking);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error creating booking' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error updating booking' });
  }
};

export const rateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { rating } = req.body;

    const updated = await prisma.booking.update({
      where: { id },
      data: { rating: Number(rating) },
    });

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error rating booking' });
  }
};
