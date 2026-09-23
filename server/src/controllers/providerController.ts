import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getProviders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, available } = req.query;
    const providers = await prisma.provider.findMany({
      where: {
        ...(category ? { category: String(category) } : {}),
        ...(available !== undefined ? { available: available === 'true' } : {}),
      },
    });

    const parsed = providers.map((p) => ({
      ...p,
      skills: JSON.parse(p.skills || '[]'),
    }));

    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching providers' });
  }
};

export const getProviderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const provider = await prisma.provider.findUnique({ where: { id } });

    if (!provider) {
      res.status(404).json({ error: 'Provider not found' });
      return;
    }

    res.json({
      ...provider,
      skills: JSON.parse(provider.skills || '[]'),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching provider' });
  }
};

export const verifyProvider = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const { verified } = req.body;

    const updated = await prisma.provider.update({
      where: { id },
      data: { verified: Boolean(verified) },
    });

    res.json({
      ...updated,
      skills: JSON.parse(updated.skills || '[]'),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error updating verification' });
  }
};
