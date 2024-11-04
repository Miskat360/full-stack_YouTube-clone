import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/youtube-clone',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
};