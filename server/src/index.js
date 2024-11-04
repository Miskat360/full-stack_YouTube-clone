import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config/index.js';
import authRoutes from './routes/auth.js';
import videoRoutes from './routes/videos.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});