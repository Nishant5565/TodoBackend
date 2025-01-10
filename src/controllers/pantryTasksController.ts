import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPantryTasks = async (req: Request, res: Response) => {
  try {
    const pantryTasks = await prisma.mealPreparation.findMany();
    res.json(pantryTasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPantryTask = async (req: Request, res: Response) => {
     const { dietChartId, pantryId, deliveryNotes } = req.body.pantryTaskData;
  try {
    const newPantryTask = await prisma.mealPreparation.create({
     data: {
            dietChartId: dietChartId,
            pantryId: pantryId,
            deliveryNotes: deliveryNotes,
          },
    });
    res.json(newPantryTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePantryTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPantryTask = await prisma.mealPreparation.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updatedPantryTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePantryTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dietChartId = id  ;
    await prisma.mealPreparation.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};