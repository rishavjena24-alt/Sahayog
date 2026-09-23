import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await prisma.providerRequest.findMany();
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching requests' });
  }
};

export const updateRequestStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    const updated = await prisma.providerRequest.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error updating request status' });
  }
};
