import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || ``;
  if (uri.length === 0) {
    throw new Error(
      'MONGO_URI not defined. Please define MONGO_URI in your .env.local file'
    );
  }
  try {
    await mongoose.connect(uri);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
