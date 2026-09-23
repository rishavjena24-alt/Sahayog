import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;
    const services = await prisma.service.findMany({
      where: {
        ...(category && category !== 'all' ? { category: String(category) } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: String(search) } },
                { description: { contains: String(search) } },
                { categoryLabel: { contains: String(search) } },
              ],
            }
          : {}),
      },
    });

    const parsed = services.map((s) => ({
      ...s,
      inclusions: JSON.parse(s.inclusions || '[]'),
      providers: JSON.parse(s.providerIds || '[]'),
    }));

    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching services' });
  }
};

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const service = await prisma.service.findUnique({ where: { id } });

    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json({
      ...service,
      inclusions: JSON.parse(service.inclusions || '[]'),
      providers: JSON.parse(service.providerIds || '[]'),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching service' });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching categories' });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, categoryLabel, price, duration, description, inclusions, providers } = req.body;
    const newService = await prisma.service.create({
      data: {
        name,
        category,
        categoryLabel: categoryLabel || category,
        price: Number(price),
        duration: duration || '1-2 hrs',
        description: description || '',
        inclusions: JSON.stringify(inclusions || []),
        providerIds: JSON.stringify(providers || []),
        verified: true,
      },
    });

    res.status(201).json({
      ...newService,
      inclusions: JSON.parse(newService.inclusions),
      providers: JSON.parse(newService.providerIds),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error creating service' });
  }
};
