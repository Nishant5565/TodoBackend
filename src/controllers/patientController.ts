import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const getPatients = async (req: Request, res: Response) => {
  const patients = await prisma.patient.findMany();
  res.json(patients);
};

export const getSpecificPatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  const patient = await prisma.patient.findUnique({
    where: { id: Number(id) },
  });
  // console.log(patient);
  res.json(patient);
};

export const createPatient = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization as string;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as { id: number; email: string };
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (user?.role !== 'Manager') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const newPatient = await prisma.patient.create({
    data: req.body,
  });
  res.json(newPatient);
};

export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedPatient = await prisma.patient.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.json(updatedPatient);
};

export const deletePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.patient.delete({
    where: { id: Number(id) },
  });
  res.sendStatus(204);
};
