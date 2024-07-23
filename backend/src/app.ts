import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import jobRoutes from './routes/job';
import { config } from './config';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);


mongoose.connect(config.DATABSE_URI || "")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));
  

export default app;
