import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middleware/authMiddleware';
import cors from 'cors';
import env from 'dotenv';

env.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors(
  {
    origin: ['http://localhost:3000', 'https://hospital-management-rose.vercel.app'],
    credentials: true
  }
)); 


app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
}
);

app.use('/auth', authRoutes);


//* Middleware to authenticate JWT token
app.use(authenticateToken);

//* Routes



app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
