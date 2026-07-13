import app from "../src/app";
import { connectDB } from "../src/config/db";

// Ensure database connects in serverless environment
connectDB().catch(console.error);

module.exports = app;
