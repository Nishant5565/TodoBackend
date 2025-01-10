import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDeliveriePersonal = async (req: Request, res: Response) => {
  try {
    const deliveries = await prisma.deliveryPersonnel.findMany();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const createDeliveryPersonal = async (req: Request, res: Response) => {
  console.log("createDeliveryPersonal");
  const { name, additionalDetails, contactInfo, pantryId } = req.body;
  try {
    const newDelivery = await prisma.deliveryPersonnel.create({
      data: {
        name,
        additionalDetails,
        contactInfo,
        pantryId: parseInt(pantryId, 10), // Convert pantryId to integer
      }
    });
    res.json(newDelivery);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error});
  }
};

export const updateDeliveryPersonal = async (req: Request, res: Response) => {
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

export const deleteDeliveryPersonal = async (req: Request, res: Response) => {
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
