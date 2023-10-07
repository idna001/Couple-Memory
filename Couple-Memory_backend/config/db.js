require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://saura8668:${process.env.USER_KEY}@cluster0.c48azqk.mongodb.net/viewcount`;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected ${conn.connection.host}-${conn.connection.port}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
