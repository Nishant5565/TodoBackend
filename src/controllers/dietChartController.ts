import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getAllDietCharts = async (req: Request, res: Response) => {
  const dietCharts = await prisma.dietChart.findMany();
  res.json(dietCharts);
};

export const getDietCharts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dietCharts = await prisma.dietChart.findMany({
    where: {
      patientId: Number(id)
    }
  });

  res.json(dietCharts);
};

export const createDietChart = async (req: Request, res: Response) => {

  const { name, mealType, ingredients, instructions } = req.body;
  const { id } = req.params;

  const newDietChart = await prisma.dietChart.create({
    data: {
      name,
      mealType,
      ingredients,
      instructions,
      patientId : Number(id)
    },
  });
  res.json(newDietChart);
};
export const updateDietChart = async (req: Request, res: Response) => {


  const { name, mealType, ingredients, instructions } = req.body;
  const { id } = req.params;
  console.log(id);
  const dietChart = await prisma.dietChart.update({
    where: { id: Number(id) },
    data: {
      name,
      mealType,
      ingredients,
      instructions,
    },
  });

  res.json(dietChart);

}

export const deleteDietChart = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.dietChart.delete({
    where: { id: Number(id) },
  });
  res.sendStatus(204);
};
