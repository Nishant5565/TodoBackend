import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import patientRoutes from './routes/patientRoutes';
import dietChartRoutes from './routes/dietChartRoutes';
import pantryRoutes from './routes/pantryRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import authRoutes from './routes/authRoutes';
import pantryTaskRoutes from './routes/pantryTasksRoutes'; 
import { authenticateToken } from './middleware/authMiddleware';
import cors from 'cors';
import env from 'dotenv';

env.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
)); 

app.use('/auth', authRoutes);


//* Middleware to authenticate JWT token
app.use(authenticateToken);

//* Routes
app.use('/patients', patientRoutes);
app.use('/diet-charts', dietChartRoutes);
app.use('/pantry', pantryRoutes);
app.use('/deliveries', deliveryRoutes);
app.use('/pantry-tasks', pantryTaskRoutes); // Add this line


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
