import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await prisma.deliveryPersonnel.findMany();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const newDelivery = await prisma.deliveryPersonnel.create({
      data: req.body,
    });
    res.json(newDelivery);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateDelivery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedDelivery = await prisma.deliveryPersonnel.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteDelivery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.deliveryPersonnel.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
