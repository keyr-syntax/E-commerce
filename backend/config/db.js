const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
const envResult = dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (envResult.error) {
  console.error('Error loading .env file:', envResult.error);
  process.exit(1);
}
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_ATLAS && !process.env.MONGODB_LOCAL) {
      throw new Error('MongoDB connection string not found in environment variables');
    }

    const mongoURI = process.env.MONGODB_LOCAL || process.env.MONGODB_LOCAL;
    console.log('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    console.error('Error message:', error.message);
    console.error('Environment variables loaded:', {
      MONGODB_LOCAL: process.env.MONGODB_LOCAL,
      MONGODB_ATLAS: process.env.MONGODB_ATLAS,
    });
    process.exit(1);
  }
};

module.exports = connectDB;
