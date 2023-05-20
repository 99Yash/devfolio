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
    const connection = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
