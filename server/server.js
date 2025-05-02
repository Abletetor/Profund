import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import userRouter from './routes/userRoute.js';
import investmentRouter from './routes/investmentRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDB();

// CORS setup for testing - Allow any origin and custom headers
app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser
app.use(express.json());

// API EndPoints
app.use('/api/user', userRouter);
app.use('/api/investments', investmentRouter);

// Server start
app.listen(port, () => {
   console.log(`Server Listening on ${port}`);
});
