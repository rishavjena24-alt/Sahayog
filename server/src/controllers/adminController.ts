import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalUsers = await prisma.user.count();
    const totalProviders = await prisma.provider.count();
    const totalBookings = await prisma.booking.count();
    const bookings = await prisma.booking.findMany();
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

    const activeCoops = await prisma.cooperativeGroup.count();

    res.json({
      totalUsers,
      totalProviders,
      totalBookings,
      totalRevenue,
      activeCoops,
      workerSurplusDistributed: Math.round(totalRevenue * 0.95), // 95% cooperative dividend model
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching admin stats' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        location: true,
        phone: true,
        memberSince: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching users' });
  }
};

export const getGroups = async (req: Request, res: Response): Promise<void> => {
  try {
    const groups = await prisma.cooperativeGroup.findMany();
    const parsed = groups.map((g) => ({
      ...g,
      membersList: JSON.parse(g.membersList || '[]'),
    }));
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching groups' });
  }
};

export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await prisma.review.findMany({ orderBy: { id: 'desc' } });
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching reviews' });
  }
};
