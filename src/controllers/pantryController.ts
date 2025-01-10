import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPantryTasks = async (req: Request, res: Response) => {
  try {
    const pantryTasks = await prisma.pantry.findMany();
    res.json(pantryTasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPantryTask = async (req: Request, res: Response) => {
  try {
    const newPantryTask = await prisma.pantry.create({
      data: req.body,
    });
    res.json(newPantryTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePantryTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPantryTask = await prisma.pantry.update({
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
    await prisma.pantry.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
